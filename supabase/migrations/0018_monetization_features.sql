-- 0018_monetization_features.sql

-- 1. Subscriptions Table
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_id TEXT, -- Stripe Price ID 'price_...'
  status TEXT, -- 'active', 'trailing', 'past_due', 'canceled', 'incomplete'
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
-- Only service role (server) can insert/update/delete subscriptions via webhooks

-- Index for performance
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON public.subscriptions(stripe_customer_id);

-- 2. Modify Articles Table for Premium Content
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE;

-- 3. Modify Profiles Table (Optional, for caching status, but let's query subscription for now)
-- ALTER TABLE public.profiles ADD COLUMN is_pro BOOLEAN DEFAULT FALSE;
