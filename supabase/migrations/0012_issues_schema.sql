-- 13. ISSUES MANAGEMENT
CREATE TABLE public.issues (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL, -- e.g. "Vol 1 Issue 1: The Future of Dentistry"
  slug TEXT UNIQUE NOT NULL,
  volume INTEGER,
  issue_number INTEGER,
  cover_image TEXT,
  description TEXT,
  pdf_url TEXT, -- Link to full issue PDF
  published_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add issue_id to articles
ALTER TABLE public.articles 
ADD COLUMN issue_id UUID REFERENCES public.issues(id) ON DELETE SET NULL;

-- Enable RLS
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Policies for Issues
-- 1. Public can view published issues
CREATE POLICY "Public can view published issues" 
ON public.issues FOR SELECT 
USING (status = 'published');

-- 2. Admins/Editors can do everything
-- Assuming we stick to simple auth check for now, or check profile role if implemented
CREATE POLICY "Admins can manage issues" 
ON public.issues FOR ALL 
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role IN ('admin', 'editor', 'super_admin')
  )
);

-- Trigger for updated_at
CREATE TRIGGER update_issues_updated_at 
BEFORE UPDATE ON public.issues 
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Add indexes
CREATE INDEX idx_issues_published_at ON public.issues(published_at);
CREATE INDEX idx_articles_issue_id ON public.articles(issue_id);
