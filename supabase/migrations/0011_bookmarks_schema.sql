-- 13. SAVED ARTICLES (BOOKMARKS)
CREATE TABLE public.saved_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  article_id BIGINT REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, article_id) -- Prevent duplicate saves
);

-- Enable RLS
ALTER TABLE public.saved_articles ENABLE ROW LEVEL SECURITY;

-- Policies

-- 1. Users can view their own saved articles
CREATE POLICY "Users can view own saved articles" 
ON public.saved_articles FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Users can insert (save) their own articles
CREATE POLICY "Users can save articles" 
ON public.saved_articles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 3. Users can delete (unsave) their own articles
CREATE POLICY "Users can remove saved articles" 
ON public.saved_articles FOR DELETE 
USING (auth.uid() = user_id);
