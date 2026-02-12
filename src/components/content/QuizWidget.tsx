import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Award, RefreshCw, Loader2, Activity } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';

const supabase = createSupabaseBrowserClient();

interface QuizWidgetProps {
    articleId?: number; // Should be string if UUID, but articles use BigInt ID as per schema usually? Need to check. 
    // Wait, 0016 schema says article_id BIGINT.
    caseId?: string;
}

export default function QuizWidget({ articleId, caseId }: QuizWidgetProps) {
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [passed, setPassed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [certificateId, setCertificateId] = useState<string | null>(null);

    useEffect(() => {
        fetchQuiz();
    }, [articleId, caseId]);

    const fetchQuiz = async () => {
        try {
            // Find quiz linked to this content
            let query = supabase.from('quizzes').select('*');
            if (articleId) query = query.eq('article_id', articleId);
            else if (caseId) query = query.eq('case_id', caseId);
            else return;

            const { data: quizData, error } = await query.single();
            if (error || !quizData) {
                setLoading(false);
                return;
            }

            setQuiz(quizData);

            // Fetch questions
            const { data: questionsData } = await supabase
                .from('quiz_questions')
                .select('*')
                .eq('quiz_id', quizData.id);

            if (questionsData) setQuestions(questionsData);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = optionIndex;
        setAnswers(newAnswers);
    };

    const submitQuiz = async () => {
        setSubmitting(true);
        let correctCount = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correct_option) correctCount++;
        });

        const calculatedScore = Math.round((correctCount / questions.length) * 100);
        const isPassed = calculatedScore >= (quiz.passing_score || 70);

        setScore(calculatedScore);
        setPassed(isPassed);

        // Save result
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: creditData, error } = await supabase.from('user_ce_credits').insert({
                    user_id: user.id,
                    quiz_id: quiz.id,
                    score: calculatedScore,
                    passed: isPassed,
                    credits_earned: isPassed ? quiz.ce_credits : 0
                }).select().single();

                if (creditData && isPassed) {
                    setCertificateId(creditData.certificate_id);
                }
            }
        } catch (err) {
            console.error("Error saving credits:", err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return null;
    if (!quiz || questions.length === 0) return null;

    if (score !== null) {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center max-w-2xl mx-auto my-12">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {passed ? <Award size={40} /> : <XCircle size={40} />}
                </div>

                <h3 className="text-2xl font-bold text-tuio-navy mb-2">
                    {passed ? 'Congratulations!' : 'Quiz Failed'}
                </h3>
                <p className="text-gray-500 mb-6">
                    You scored <span className="font-bold text-tuio-navy">{score}%</span>.
                    {passed ? ` You have earned ${quiz.ce_credits} CE Credits.` : ' You need 70% to pass.'}
                </p>

                {passed ? (
                    <a href="/dashboard/my-ce" className="inline-block px-8 py-3 bg-tuio-navy text-white rounded-full font-bold hover:bg-tuio-red transition-all">
                        View Certificate
                    </a>
                ) : (
                    <button
                        onClick={() => { setScore(null); setAnswers([]); setCurrentQuestion(0); }}
                        className="px-8 py-3 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw size={18} /> Retry Quiz
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-3xl mx-auto my-12" id="quiz-widget">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-tuio-navy flex items-center gap-2">
                    <Activity className="text-tuio-red" />
                    CE Quiz: {quiz.title}
                </h3>
                <span className="bg-tuio-navy text-white text-xs font-bold px-3 py-1 rounded-full">
                    {currentQuestion + 1} / {questions.length}
                </span>
            </div>

            <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-800 mb-6">
                    {questions[currentQuestion].question_text}
                </h4>
                <div className="space-y-3">
                    {questions[currentQuestion].options.map((option: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${answers[currentQuestion] === index
                                ? 'border-tuio-red bg-red-50 text-tuio-navy font-bold'
                                : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                }`}
                        >
                            <span className="inline-block w-6 h-6 rounded-full border border-gray-300 mr-3 align-middle text-center leading-5 text-xs text-gray-400">
                                {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center pt-4">
                <button
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                    className="text-gray-400 font-bold hover:text-gray-600 disabled:opacity-50"
                >
                    Previous
                </button>

                {currentQuestion < questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentQuestion(prev => prev + 1)}
                        className="px-6 py-2 bg-tuio-navy text-white rounded-full font-bold hover:bg-tuio-red transition-all"
                    >
                        Next Question
                    </button>
                ) : (
                    <button
                        onClick={submitQuiz}
                        disabled={submitting || answers.length < questions.length} // Force answer all? Maybe.
                        className="px-8 py-3 bg-tuio-red text-white rounded-full font-bold hover:bg-tuio-navy transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting && <Loader2 className="animate-spin" size={18} />}
                        Submit Quiz
                    </button>
                )}
            </div>
        </div>
    );
}

// Importing Activity icon here since it was missing in imports
import { Activity } from 'lucide-react';
