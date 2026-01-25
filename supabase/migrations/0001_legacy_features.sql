-- JOBS SYSTEM
CREATE TYPE job_type AS ENUM ('full_time', 'part_time', 'contract', 'locum', 'internship');

CREATE TABLE public.jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  employer_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT NOT NULL,
  type job_type DEFAULT 'full_time',
  salary_range TEXT,
  description JSONB,
  requirements TEXT[],
  apply_url TEXT,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Jobs are public." ON public.jobs FOR SELECT USING (true);

-- AWARDS SYSTEM
CREATE TABLE public.awards (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL, -- e.g. "DentalReach Awards 2026"
    slug TEXT UNIQUE NOT NULL,
    year INTEGER NOT NULL,
    status TEXT DEFAULT 'nominations_open', -- nominations_open, voting, closed
    hero_image TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.award_categories (
    id SERIAL PRIMARY KEY,
    award_id INTEGER REFERENCES public.awards(id),
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE public.award_nominees (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category_id INTEGER REFERENCES public.award_categories(id),
    nominee_name TEXT NOT NULL,
    nominee_bio TEXT,
    nominee_image TEXT,
    vote_count INTEGER DEFAULT 0,
    is_winner BOOLEAN DEFAULT false
);

ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.award_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.award_nominees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Awards public read" ON public.awards FOR SELECT USING (true);
CREATE POLICY "Categories public read" ON public.award_categories FOR SELECT USING (true);
CREATE POLICY "Nominees public read" ON public.award_nominees FOR SELECT USING (true);
