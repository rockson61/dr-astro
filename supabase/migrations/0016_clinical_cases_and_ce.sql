-- 0016_clinical_cases_and_ce.sql

-- 1. Clinical Cases Table
CREATE TABLE public.clinical_cases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  -- Patient Info (Anonymized)
  patient_age INTEGER,
  gender TEXT,
  chief_complaint TEXT,
  medical_history TEXT,
  dental_history TEXT,
  
  -- Clinical Process
  diagnosis TEXT,
  treatment_plan TEXT,
  procedure_details TEXT,
  conclusion TEXT,
  
  -- Media (JSON Arrays of URLs)
  pre_op_images JSONB DEFAULT '[]'::jsonb,
  intra_op_images JSONB DEFAULT '[]'::jsonb,
  post_op_images JSONB DEFAULT '[]'::jsonb,
  
  status TEXT DEFAULT 'draft', -- draft, published
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Clinical Cases
ALTER TABLE public.clinical_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published cases" 
ON public.clinical_cases FOR SELECT 
USING (status = 'published');

CREATE POLICY "Authors can manage own cases" 
ON public.clinical_cases FOR ALL 
USING (auth.uid() = author_id);

-- 2. Quizzes Table
CREATE TABLE public.quizzes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  article_id BIGINT REFERENCES public.articles(id) ON DELETE CASCADE, -- Optional link to article
  case_id UUID REFERENCES public.clinical_cases(id) ON DELETE CASCADE, -- Optional link to case
  ce_credits DECIMAL(3,1) DEFAULT 1.0, -- e.g. 1.0 or 0.5
  passing_score INTEGER DEFAULT 70, -- Percentage
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Quizzes
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view quizzes" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Admins manage quizzes" ON public.quizzes FOR ALL USING (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'super_admin', 'editor'))
);

-- 3. Quiz Questions Table
CREATE TABLE public.quiz_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of strings e.g. ["Option A", "Option B"]
  correct_option INTEGER NOT NULL, -- Index of correct option (0-based)
  explanation TEXT -- Optional explanation for the answer
);

-- RLS for Questions
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view questions" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "Admins manage questions" ON public.quiz_questions FOR ALL USING (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'super_admin', 'editor'))
);

-- 4. User CE Credits Table
CREATE TABLE public.user_ce_credits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  credits_earned DECIMAL(3,1) NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  certificate_id TEXT UNIQUE DEFAULT ('CERT-' || substring(uuid_generate_v4()::text, 1, 8))
);

-- RLS for CE Credits
ALTER TABLE public.user_ce_credits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own credits" ON public.user_ce_credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own credits" ON public.user_ce_credits FOR INSERT WITH CHECK (auth.uid() = user_id);
