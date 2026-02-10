-- 0008_user_management.sql
-- Adds missing columns for User Management

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS account_status TEXT DEFAULT 'active';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'unverified';

-- Ensure these columns have policies? Inherits "profiles" RLS, but we might want to restrict update:
-- For now, default profile update policies usually let user update own profile.
-- We must ensure ONLY admins can update account_status.

-- This policy example assumes you have an explicit "Admins can update everything" policy or similar.
-- If not, you should add one. For now just adding columns.
