-- SEED DATA FOR TESTING (AWARDS, REVIEWS, LISTINGS)
-- Run this in Supabase SQL Editor or via 'supabase db reset'

-- 1. Ensure IDs exist (relying on 0003_seed_data.sql for base users)
-- We will Use existing users from 0003_seed_data.sql:
-- Dr. Sarah Johnson (1e04ac95-b236-4d76-9d10-36eddf9e7e72)
-- Dr. Michael Chen (22222222-2222-2222-2222-222222222222)
-- Dr. Emily Davis (33333333-3333-3333-3333-333333333333)
-- Dr. James Wilson (44444444-4444-4444-4444-444444444444)
-- Dr. Robert Smith (55555555-5555-5555-5555-555555555555)

-- 2. LISTINGS (Seller Applications)
-- Simulating approved business listings
INSERT INTO public.seller_applications (
    user_id, business_name, business_type, business_description, address, phone, status, reviewed_at
) VALUES
('1e04ac95-b236-4d76-9d10-36eddf9e7e72', 'Johnson Dental Arts', 'Dental Clinic', 'Premier digital dentistry clinic in NY.', '123 Broadway, NY', '+1-212-555-0100', 'approved', NOW()),
('22222222-2222-2222-2222-222222222222', 'Chen Smiles', 'Dental Clinic', 'Cosmetic dentistry specialists.', '456 Market St, SF', '+1-415-555-0100', 'approved', NOW()),
('33333333-3333-3333-3333-333333333333', 'Tiny Teeth Clinic', 'Dental Clinic', 'Pediatric dental care.', '789 High St, London', '+44-20-555-0100', 'approved', NOW()),
('44444444-4444-4444-4444-444444444444', 'Wilson Family Dental', 'Dental Clinic', 'Care for the whole family.', '321 Bismarck, Berlin', '+49-30-555-0100', 'approved', NOW()),
('55555555-5555-5555-5555-555555555555', 'Smith Implants', 'Dental Clinic', 'Advanced implant center.', '101 Harbour, Sydney', '+61-2-555-0100', 'approved', NOW())
ON CONFLICT DO NOTHING;

-- 3. AWARD CATEGORIES
INSERT INTO public.award_categories (
    name, slug, description, is_active, start_date, end_date
) VALUES
('Best Digital Dentist 2026', 'best-digital-dentist-2026', 'Excellence in digital workflows.', true, NOW(), NOW() + INTERVAL '30 days'),
('Young Implantologist', 'young-implantologist-2026', 'Rising stars in implantology.', true, NOW(), NOW() + INTERVAL '30 days'),
('Community Hero', 'community-hero-2026', 'Outstanding public service.', true, NOW(), NOW() + INTERVAL '30 days')
ON CONFLICT (slug) DO NOTHING;

-- 4. AWARD PARTICIPANTS
WITH cats AS (SELECT id, slug FROM public.award_categories)
INSERT INTO public.award_participants (category_id, user_id, status, nomination_video)
SELECT 
    c.id, 
    u.id, 
    'approved', 
    'https://youtube.com/watch?v=demo'
FROM cats c, auth.users u
WHERE 
    (c.slug = 'best-digital-dentist-2026' AND u.email = 'sarah.johnson@example.com') OR
    (c.slug = 'best-digital-dentist-2026' AND u.email = 'michael.chen@example.com') OR
    (c.slug = 'young-implantologist-2026' AND u.email = 'robert.smith@example.com')
ON CONFLICT DO NOTHING;

-- 5. AWARD VOTES (Random votes)
-- We'll manually add a few votes
WITH part AS (
    SELECT p.id, u.email 
    FROM public.award_participants p 
    JOIN auth.users u ON p.user_id = u.id
    WHERE u.email = 'sarah.johnson@example.com'
)
INSERT INTO public.award_votes (participant_id, voter_id, category_id)
SELECT 
    part.id, 
    u.id, 
    p.category_id
FROM part, auth.users u, public.award_participants p
WHERE p.id = part.id AND u.email != 'sarah.johnson@example.com' -- Sarah can't vote for herself
LIMIT 3
ON CONFLICT DO NOTHING;

-- 6. AWARD SCORES
WITH part AS (
    SELECT p.id 
    FROM public.award_participants p 
    JOIN auth.users u ON p.user_id = u.id
    WHERE u.email = 'sarah.johnson@example.com'
)
INSERT INTO public.award_scores (participant_id, score, breakdown)
SELECT id, 150, '{"votes": 3, "judges": 0}'::jsonb FROM part
ON CONFLICT DO NOTHING;

-- 7. REVIEWS (Profile Ratings)
INSERT INTO public.profile_ratings (profile_id, rater_id, rating, comment, created_at)
VALUES
('1e04ac95-b236-4d76-9d10-36eddf9e7e72', '22222222-2222-2222-2222-222222222222', 5, 'Absolutely brilliant mentor!', NOW() - INTERVAL '2 days'),
('1e04ac95-b236-4d76-9d10-36eddf9e7e72', '33333333-3333-3333-3333-333333333333', 4, 'Great insights on digital workflow.', NOW() - INTERVAL '5 days'),
('22222222-2222-2222-2222-222222222222', '1e04ac95-b236-4d76-9d10-36eddf9e7e72', 5, 'Top tier cosmetic work.', NOW() - INTERVAL '1 day'),
('33333333-3333-3333-3333-333333333333', '1e04ac95-b236-4d76-9d10-36eddf9e7e72', 5, 'Amazing with kids!', NOW() - INTERVAL '3 days')
ON CONFLICT DO NOTHING;

-- 8. UPDATE REPUTATION SCORES (Optional, if column exists)
UPDATE public.profiles SET reputation_score = 1250 WHERE email = 'sarah.johnson@example.com';
UPDATE public.profiles SET reputation_score = 980 WHERE email = 'michael.chen@example.com';
UPDATE public.profiles SET reputation_score = 850 WHERE email = 'emily.davis@example.com';
UPDATE public.profiles SET reputation_score = 1100 WHERE email = 'james.wilson@example.com';
UPDATE public.profiles SET reputation_score = 2100 WHERE email = 'robert.smith@example.com';
