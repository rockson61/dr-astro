-- 12. COMMENTS SYSTEM
CREATE TABLE public.comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  article_id BIGINT REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE, -- For nested replies
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true, -- Auto-approve for now
  is_pinned BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Policies

-- 1. Public Read (Approved comments only)
CREATE POLICY "Public can view approved comments" 
ON public.comments FOR SELECT 
USING (is_approved = true);

-- 2. Authenticated Insert
CREATE POLICY "Authenticated users can comment" 
ON public.comments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 3. Users can update their own comments
CREATE POLICY "Users can update own comments" 
ON public.comments FOR UPDATE 
USING (auth.uid() = user_id);

-- 4. Users can delete their own comments
CREATE POLICY "Users can delete own comments" 
ON public.comments FOR DELETE 
USING (auth.uid() = user_id);

-- 5. Admins can view all (Optional, good to have)
-- Assuming admin checks are done via app logic or separate admin policy if needed.
-- For now, relying on basic RLS.

-- Trigger for updated_at
CREATE TRIGGER update_comments_updated_at 
BEFORE UPDATE ON public.comments 
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Add 'comments_count' to articles if desired (for performance), 
-- or just use count(*) query. Let's keep it simple for now and just use the table.
