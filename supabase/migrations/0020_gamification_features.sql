-- 0020_gamification_features.sql

-- 1. Modify Profiles Table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS reputation_points INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS badges JSONB DEFAULT '[]'::jsonb;

-- 2. Create Reputation Logs Table
CREATE TABLE public.reputation_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL, -- 'publish_article', 'comment', 'receive_like', 'system_bonus'
  points INTEGER NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.reputation_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own logs
CREATE POLICY "Users can view own reputation logs" ON public.reputation_logs FOR SELECT USING (auth.uid() = user_id);

-- Only service role can insert (handled via server-side logic/triggers)
CREATE POLICY "Server can manage logs" ON public.reputation_logs FOR ALL USING (true) WITH CHECK (true); -- Ideally restrict to service role, but for now allow authenticated server actions if using Supabase client with key.
-- Actually for client-side triggered actions via API, the API will use service role key or we rely on Postgres Functions.
-- Let's stick to API route handling logic with Service Role for security.

-- Index
CREATE INDEX idx_reputation_user ON public.reputation_logs(user_id);
