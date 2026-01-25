-- CREATE ADMIN USER: rockson68@hotmail.com
-- Password: password123

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
DECLARE
  v_user_id UUID := '68686868-6868-6868-6868-686868686868';
  v_email TEXT := 'rockson68@hotmail.com';
BEGIN
  -- 1. Create Identity in auth.users
  -- Check if user exists first to verify we handle updates or specific ID
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = v_email) THEN
      INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, 
        email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
      ) VALUES (
        v_user_id, 
        '00000000-0000-0000-0000-000000000000', 
        'authenticated', 
        'authenticated', 
        v_email, 
        crypt('password123', gen_salt('bf')), 
        NOW(), 
        '{"provider": "email", "providers": ["email"]}', 
        '{"full_name": "Rockson Admin"}', 
        NOW(), 
        NOW()
      );
  END IF;

  -- 2. Create/Update Profile to Super Admin
  INSERT INTO public.profiles (id, email, role, full_name, slug, is_verified)
  VALUES (
    v_user_id, 
    v_email, 
    'super_admin', 
    'Rockson Admin', 
    'rockson-admin',
    true
  ) ON CONFLICT (id) DO UPDATE SET role = 'super_admin', is_verified = true;

END $$;
