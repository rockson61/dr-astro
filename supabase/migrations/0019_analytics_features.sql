-- 0019_analytics_features.sql

CREATE TABLE public.article_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  article_id BIGINT REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- specific user, if logged in
  type TEXT NOT NULL CHECK (type IN ('view', 'read')),
  ip_hash TEXT, -- hashed IP for anonymous unique tracking (optional, kept simple for now)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- RLS
ALTER TABLE public.article_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert analytics (tracking)
CREATE POLICY "Public can track analytics" ON public.article_analytics FOR INSERT WITH CHECK (true);

-- Allow authors to view analytics for *their* articles
CREATE POLICY "Authors can view own analytics" ON public.article_analytics FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.articles a
    WHERE a.id = article_analytics.article_id
    AND a.author_id = auth.uid()
  )
);

-- Index for performance
CREATE INDEX idx_analytics_article ON public.article_analytics(article_id);
CREATE INDEX idx_analytics_type ON public.article_analytics(type);
CREATE INDEX idx_analytics_created ON public.article_analytics(created_at);
