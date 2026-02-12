-- 0014_role_management.sql
-- Adds 'moderator' to user_role enum if not exists

DO $$
BEGIN
    ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'moderator';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
