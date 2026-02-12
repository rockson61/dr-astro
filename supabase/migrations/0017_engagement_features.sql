-- 0017_engagement_features.sql

-- 1. Notifications Table
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL, -- Recipient
  type TEXT NOT NULL, -- 'comment', 'follow', 'system', 'article', 'achievement'
  title TEXT NOT NULL,
  message TEXT,
  link TEXT, -- URL to redirect to
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb, -- Extra data like actor_id
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users default own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System/Triggers can insert notifications" ON public.notifications FOR INSERT WITH CHECK (true); -- Ideally restrict, but for now allow public inserts (e.g. from client triggers) or rely on server-side key
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- 2. Follows Table
CREATE TABLE public.follows (
  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- RLS for Follows
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view follows" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Users can follow" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- Index for performance
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id) WHERE is_read = false;
CREATE INDEX idx_follows_follower ON public.follows(follower_id);
CREATE INDEX idx_follows_following ON public.follows(following_id);
