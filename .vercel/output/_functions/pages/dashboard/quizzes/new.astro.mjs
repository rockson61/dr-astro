import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DcquF9um.mjs';
import 'piccolore';
import { $ as $$DashboardLayout } from '../../../chunks/DashboardLayout_B_rgsWHr.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Trash2, Plus, Loader2, Save } from 'lucide-react';
import { a as createSupabaseBrowserClient, c as createSupabaseServerClient } from '../../../chunks/supabase_CYzxA37O.mjs';
import { G as GlassCard } from '../../../chunks/GlassCard_B5fS4Hva.mjs';
export { renderers } from '../../../renderers.mjs';

const supabase = createSupabaseBrowserClient();
function QuizForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [cases, setCases] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    article_id: "",
    case_id: "",
    ce_credits: 1,
    passing_score: 70,
    questions: [
      { question_text: "", options: ["", "", "", ""], correct_option: 0 }
    ]
  });
  useEffect(() => {
    fetchContent();
  }, []);
  const fetchContent = async () => {
    const { data: articlesData } = await supabase.from("articles").select("id, title");
    const { data: casesData } = await supabase.from("clinical_cases").select("id, title");
    if (articlesData) setArticles(articlesData);
    if (casesData) setCases(casesData);
  };
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };
  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setFormData({ ...formData, questions: newQuestions });
  };
  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question_text: "", options: ["", "", "", ""], correct_option: 0 }]
    });
  };
  const removeQuestion = (index) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    setFormData({ ...formData, questions: newQuestions });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: quiz, error: quizError } = await supabase.from("quizzes").insert({
        title: formData.title,
        article_id: formData.article_id || null,
        case_id: formData.case_id || null,
        ce_credits: formData.ce_credits,
        passing_score: formData.passing_score
      }).select().single();
      if (quizError) throw quizError;
      const questionsPayload = formData.questions.map((q) => ({
        quiz_id: quiz.id,
        question_text: q.question_text,
        options: q.options,
        correct_option: parseInt(q.correct_option),
        explanation: ""
      }));
      const { error: qError } = await supabase.from("quiz_questions").insert(questionsPayload);
      if (qError) throw qError;
      alert("Quiz created successfully!");
      window.location.href = "/dashboard/admin";
    } catch (err) {
      console.error(err);
      alert("Error creating quiz: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(GlassCard, { className: "max-w-4xl mx-auto p-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-tuio-navy mb-6", children: "Create CE Quiz" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white/50 p-6 rounded-2xl border border-gray-100 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Quiz Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: formData.title,
              onChange: (e) => setFormData({ ...formData, title: e.target.value }),
              className: "w-full px-4 py-3 rounded-xl border border-gray-200",
              placeholder: "e.g. Endodontics Case Review Quiz"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Link Article (Optional)" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: formData.article_id,
                onChange: (e) => setFormData({ ...formData, article_id: e.target.value, case_id: "" }),
                className: "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Article..." }),
                  articles.map((a) => /* @__PURE__ */ jsx("option", { value: a.id, children: a.title }, a.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Link Case (Optional)" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: formData.case_id,
                onChange: (e) => setFormData({ ...formData, case_id: e.target.value, article_id: "" }),
                className: "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Case..." }),
                  cases.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.title }, c.id))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "CE Credits" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                step: "0.5",
                value: formData.ce_credits,
                onChange: (e) => setFormData({ ...formData, ce_credits: parseFloat(e.target.value) }),
                className: "w-full px-4 py-3 rounded-xl border border-gray-200"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Passing Score (%)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: formData.passing_score,
                onChange: (e) => setFormData({ ...formData, passing_score: parseInt(e.target.value) }),
                className: "w-full px-4 py-3 rounded-xl border border-gray-200"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        formData.questions.map((q, qIndex) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-2xl border border-gray-200 relative", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => removeQuestion(qIndex),
              className: "absolute top-4 right-4 text-red-400 hover:text-red-600",
              children: /* @__PURE__ */ jsx(Trash2, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsxs("h4", { className: "font-bold text-gray-400 uppercase text-xs tracking-widest mb-4", children: [
            "Question ",
            qIndex + 1
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: q.question_text,
              onChange: (e) => handleQuestionChange(qIndex, "question_text", e.target.value),
              className: "w-full px-4 py-3 rounded-xl border border-gray-200",
              placeholder: "Enter question text..."
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: q.options.map((opt, oIndex) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: `correct-${qIndex}`,
                checked: q.correct_option === oIndex,
                onChange: () => handleQuestionChange(qIndex, "correct_option", oIndex),
                className: "w-4 h-4 text-tuio-red focus:ring-tuio-red"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: opt,
                onChange: (e) => handleOptionChange(qIndex, oIndex, e.target.value),
                className: `w-full px-3 py-2 rounded-lg border ${q.correct_option === oIndex ? "border-green-500 bg-green-50" : "border-gray-200"}`,
                placeholder: `Option ${String.fromCharCode(65 + oIndex)}`
              }
            )
          ] }, oIndex)) })
        ] }, qIndex)),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: addQuestion,
            className: "w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold hover:border-tuio-navy hover:text-tuio-navy transition-all flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Plus, { size: 20 }),
              " Add Question"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: isLoading,
          className: "px-8 py-4 bg-tuio-navy text-white rounded-xl font-bold uppercase tracking-wide hover:bg-tuio-red transition-all flex items-center gap-2",
          children: [
            isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Save, { size: 20 }),
            "Save Quiz"
          ]
        }
      ) })
    ] })
  ] });
}

const $$Astro = createAstro("https://dentalreach.today");
const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const supabase = createSupabaseServerClient(Astro2);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/login");
  }
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  const allowedRoles = ["admin", "super_admin", "editor"];
  if (!profile || !allowedRoles.includes(profile.role)) {
    return Astro2.redirect("/dashboard");
  }
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Create CE Quiz" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="animate-fade-in-up"> ${renderComponent($$result2, "QuizForm", QuizForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/rockson61/Downloads/DR Astro/src/components/dashboard/QuizForm", "client:component-export": "default" })} </div> ` })}`;
}, "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/quizzes/new.astro", void 0);

const $$file = "/Users/rockson61/Downloads/DR Astro/src/pages/dashboard/quizzes/new.astro";
const $$url = "/dashboard/quizzes/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$New,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
