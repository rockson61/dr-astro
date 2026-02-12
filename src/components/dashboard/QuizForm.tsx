import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Loader2, CheckCircle } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';

const supabase = createSupabaseBrowserClient();

export default function QuizForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [articles, setArticles] = useState<any[]>([]);
    const [cases, setCases] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        article_id: '',
        case_id: '',
        ce_credits: 1.0,
        passing_score: 70,
        questions: [
            { question_text: '', options: ['', '', '', ''], correct_option: 0 }
        ]
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        const { data: articlesData } = await supabase.from('articles').select('id, title');
        const { data: casesData } = await supabase.from('clinical_cases').select('id, title');
        if (articlesData) setArticles(articlesData);
        if (casesData) setCases(casesData);
    };

    const handleQuestionChange = (index: number, field: string, value: any) => {
        const newQuestions = [...formData.questions];
        // @ts-ignore
        newQuestions[index][field] = value;
        setFormData({ ...formData, questions: newQuestions });
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const newQuestions = [...formData.questions];
        newQuestions[qIndex].options[oIndex] = value;
        setFormData({ ...formData, questions: newQuestions });
    };

    const addQuestion = () => {
        setFormData({
            ...formData,
            questions: [...formData.questions, { question_text: '', options: ['', '', '', ''], correct_option: 0 }]
        });
    };

    const removeQuestion = (index: number) => {
        const newQuestions = [...formData.questions];
        newQuestions.splice(index, 1);
        setFormData({ ...formData, questions: newQuestions });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // 1. Create Quiz
            const { data: quiz, error: quizError } = await supabase
                .from('quizzes')
                .insert({
                    title: formData.title,
                    article_id: formData.article_id || null,
                    case_id: formData.case_id || null,
                    ce_credits: formData.ce_credits,
                    passing_score: formData.passing_score
                })
                .select()
                .single();

            if (quizError) throw quizError;

            // 2. Create Questions
            const questionsPayload = formData.questions.map(q => ({
                quiz_id: quiz.id,
                question_text: q.question_text,
                options: q.options,
                correct_option: parseInt(q.correct_option as any),
                explanation: ''
            }));

            const { error: qError } = await supabase
                .from('quiz_questions')
                .insert(questionsPayload);

            if (qError) throw qError;

            alert('Quiz created successfully!');
            window.location.href = '/dashboard/admin'; // Redirect to admin

        } catch (err: any) {
            console.error(err);
            alert('Error creating quiz: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlassCard className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-tuio-navy mb-6">Create CE Quiz</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Quiz Details */}
                <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Quiz Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200"
                            placeholder="e.g. Endodontics Case Review Quiz"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Link Article (Optional)</label>
                            <select
                                value={formData.article_id}
                                onChange={(e) => setFormData({ ...formData, article_id: e.target.value, case_id: '' })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white"
                            >
                                <option value="">Select Article...</option>
                                {articles.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Link Case (Optional)</label>
                            <select
                                value={formData.case_id}
                                onChange={(e) => setFormData({ ...formData, case_id: e.target.value, article_id: '' })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white"
                            >
                                <option value="">Select Case...</option>
                                {cases.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">CE Credits</label>
                            <input
                                type="number"
                                step="0.5"
                                value={formData.ce_credits}
                                onChange={(e) => setFormData({ ...formData, ce_credits: parseFloat(e.target.value) })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Passing Score (%)</label>
                            <input
                                type="number"
                                value={formData.passing_score}
                                onChange={(e) => setFormData({ ...formData, passing_score: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                            />
                        </div>
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-6">
                    {formData.questions.map((q, qIndex) => (
                        <div key={qIndex} className="bg-white p-6 rounded-2xl border border-gray-200 relative">
                            <button
                                type="button"
                                onClick={() => removeQuestion(qIndex)}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
                            >
                                <Trash2 size={18} />
                            </button>
                            <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-4">Question {qIndex + 1}</h4>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    required
                                    value={q.question_text}
                                    onChange={(e) => handleQuestionChange(qIndex, 'question_text', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200"
                                    placeholder="Enter question text..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {q.options.map((opt, oIndex) => (
                                    <div key={oIndex} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name={`correct-${qIndex}`}
                                            checked={q.correct_option === oIndex}
                                            onChange={() => handleQuestionChange(qIndex, 'correct_option', oIndex)}
                                            className="w-4 h-4 text-tuio-red focus:ring-tuio-red"
                                        />
                                        <input
                                            type="text"
                                            required
                                            value={opt}
                                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                            className={`w-full px-3 py-2 rounded-lg border ${q.correct_option === oIndex ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                                            placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addQuestion}
                        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold hover:border-tuio-navy hover:text-tuio-navy transition-all flex items-center justify-center gap-2"
                    >
                        <Plus size={20} /> Add Question
                    </button>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-4 bg-tuio-navy text-white rounded-xl font-bold uppercase tracking-wide hover:bg-tuio-red transition-all flex items-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        Save Quiz
                    </button>
                </div>
            </form>
        </GlassCard>
    );
}
