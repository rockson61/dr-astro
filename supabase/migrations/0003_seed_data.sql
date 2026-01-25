-- SEED DATA FROM LEGACY MIGRATION
-- Sanitized and compatible with new schema

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 7.0 CREATE AUTH USERS (REQUIRED FOR PROFILES FK)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES 
  ('1e04ac95-b236-4d76-9d10-36eddf9e7e72', 'sarah.johnson@example.com', crypt('password123', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Dr. Sarah Johnson"}', 'authenticated', 'authenticated'),
  ('22222222-2222-2222-2222-222222222222', 'michael.chen@example.com', crypt('password123', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Dr. Michael Chen"}', 'authenticated', 'authenticated'),
  ('33333333-3333-3333-3333-333333333333', 'emily.davis@example.com', crypt('password123', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Dr. Emily Davis"}', 'authenticated', 'authenticated'),
  ('44444444-4444-4444-4444-444444444444', 'james.wilson@example.com', crypt('password123', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Dr. James Wilson"}', 'authenticated', 'authenticated'),
  ('55555555-5555-5555-5555-555555555555', 'robert.smith@example.com', crypt('password123', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"full_name":"Dr. Robert Smith"}', 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- 7.1 Profiles (5 DENTISTS)
INSERT INTO public.profiles (id, full_name, first_name, last_name, slug, is_verified, avatar_url, role, email, bio, specialty, clinic_name, location, years_of_experience)
VALUES 
  ('1e04ac95-b236-4d76-9d10-36eddf9e7e72', 'Dr. Sarah Johnson', 'Sarah', 'Johnson', 'dr-sarah-johnson', true, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80', 'dentist', 'sarah.johnson@example.com', 'Pioneer in Digital Dentistry with 15+ years experience.', 'Prosthodontist', 'Johnson Dental Arts', 'New York, USA', 15),
  ('22222222-2222-2222-2222-222222222222', 'Dr. Michael Chen', 'Michael', 'Chen', 'dr-michael-chen', true, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80', 'dentist', 'michael.chen@example.com', 'Specializing in minimally invasive cosmetic procedures.', 'Cosmetic Dentist', 'Chen Smiles', 'San Francisco, USA', 10),
  ('33333333-3333-3333-3333-333333333333', 'Dr. Emily Davis', 'Emily', 'Davis', 'dr-emily-davis', false, 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80', 'dentist', 'emily.davis@example.com', 'Passionate about pediatric dental health and education.', 'Pediatric Dentist', 'Tiny Teeth Clinic', 'London, UK', 8),
  ('44444444-4444-4444-4444-444444444444', 'Dr. James Wilson', 'James', 'Wilson', 'dr-james-wilson', true, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80', 'dentist', 'james.wilson@example.com', 'Integrating technology into daily dental practice.', 'General Dentist', 'Wilson Family Dental', 'Berlin, Germany', 12),
  ('55555555-5555-5555-5555-555555555555', 'Dr. Robert Smith', 'Robert', 'Smith', 'dr-robert-smith', true, 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80', 'dentist', 'robert.smith@example.com', 'Expert in Oral Surgery and Implantology.', 'Oral Surgeon', 'Smith Implants', 'Sydney, Australia', 20)
ON CONFLICT (id) DO UPDATE 
SET full_name = EXCLUDED.full_name, first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name, slug = EXCLUDED.slug, avatar_url = EXCLUDED.avatar_url, role = EXCLUDED.role, email = EXCLUDED.email;

-- 7.2 Articles
INSERT INTO public.articles (
  title, slug, excerpt, content, category, author_id, is_approved, image_url, views_count, reading_time, tags, doi, "references", created_at
) VALUES
  ('The Future of Digital Dentistry', 'future-of-digital-dentistry', 'AI and 3D printing are revolutionizing dental workflows.', '<p>Deep dive into AI...</p>', 'Editorial', '1e04ac95-b236-4d76-9d10-36eddf9e7e72', true, 'https://images.unsplash.com/photo-1579684385127-1ef15d508118', 1250, 5, ARRAY['AI', 'Technology'], '10.1038/s41415-023-0001', '[{"title": "AI in Dentistry", "year": "2025"}]'::jsonb, NOW()),
  ('Global Dental Market Trends 2026', 'global-dental-market-trends-2026', 'Market analysis predicts 7% growth.', '<p>Market content...</p>', 'News', '22222222-2222-2222-2222-222222222222', true, 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95', 980, 4, ARRAY['Market', 'Business'], '10.1038/s41415-023-0002', '[{"title": "Global Market Report", "year": "2025"}]'::jsonb, NOW() - INTERVAL '1 day'),
  ('New Minimally Invasive Techniques', 'new-minimally-invasive-techniques', 'Preserving tooth structure.', '<p>Clinical content...</p>', 'Editorial', '33333333-3333-3333-3333-333333333333', true, 'https://images.unsplash.com/photo-1609840114035-1c29046a8af3', 1500, 7, ARRAY['Clinical', 'Restorative'], '10.1038/s41415-023-0003', '[{"title": "Minimally Invasive dentistry", "year": "2024"}]'::jsonb, NOW() - INTERVAL '3 days'),
  ('Evaluating Intraoral Scanners', 'evaluating-intraoral-scanners', 'A comparative study of top scanners.', '<p>Detailed comparisons...</p>', 'Clinical', '44444444-4444-4444-4444-444444444444', true, 'https://images.unsplash.com/photo-1516321497487-e288fb19713f', 800, 3, ARRAY['Scanners', 'Comparison'], NULL, '[]'::jsonb, NOW() - INTERVAL '5 days'),
  ('Complex Implant Cases', 'complex-implant-cases', 'Managing poor bone quality.', '<p>Case report...</p>', 'Clinical', '55555555-5555-5555-5555-555555555555', true, 'https://images.unsplash.com/photo-1563986768609-322da13575f3', 2100, 6, ARRAY['Implants', 'Surgery'], NULL, '[]'::jsonb, NOW() - INTERVAL '1 week');

-- 7.3 Events
INSERT INTO public.events (
  title, slug, description, start_date, end_date, location, country, image_url, type, is_virtual, organizer_id, status, website
) VALUES
  ('Global Dental Summit 2026', 'global-dental-summit-2026', 'Overview of modern techniques.', (NOW() + INTERVAL '30 days'), (NOW() + INTERVAL '32 days'), 'New York, NY', 'United States', 'https://images.unsplash.com/photo-1588195538326-c5f1f237a15b', 'conference', false, '1e04ac95-b236-4d76-9d10-36eddf9e7e72', 'upcoming', 'https://summit.example.com'),
  ('Advanced Implantology Workshop', 'advanced-implantology-workshop', 'Hands-on training.', (NOW() + INTERVAL '45 days'), (NOW() + INTERVAL '45 days'), 'London, UK', 'United Kingdom', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d', 'workshop', false, '22222222-2222-2222-2222-222222222222', 'upcoming', 'https://workshop.example.com'),
  ('Pediatric Dentistry Webinar', 'pediatric-dentistry-webinar', 'Managing anxious patients.', (NOW() + INTERVAL '10 days'), (NOW() + INTERVAL '10 days'), 'Online', 'Global', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238', 'webinar', true, '33333333-3333-3333-3333-333333333333', 'upcoming', 'https://webinar.example.com');

-- 7.4 Jobs
INSERT INTO public.jobs (title, slug, company_name, location, type, description, employer_id, is_active, salary_range)
VALUES
  ('Associate Dentist', 'associate-dentist-chicago', 'Johnson Dental Arts', 'Chicago, IL', 'full_time', '{"text": "Join our growing family practice."}', '1e04ac95-b236-4d76-9d10-36eddf9e7e72', true, '$150k - $220k'),
  ('Dental Hygienist', 'dental-hygienist-boston', 'Chen Smiles', 'Boston, MA', 'part_time', '{"text": "Seeking energetic hygienist."}', '22222222-2222-2222-2222-222222222222', true, '$45 - $60 / hr'),
  ('Orthodontist', 'orthodontist-los-angeles', 'Tiny Teeth Clinic', 'Los Angeles, CA', 'full_time', '{"text": "Partner track available."}', '33333333-3333-3333-3333-333333333333', true, '$250k - $400k');

-- 7.5 Podcasts
INSERT INTO public.podcasts (title, slug, host_name, category, duration_minutes, episode_number, spotify_url, image_url, user_id, is_approved, tags)
VALUES
  ('Bits & Bytes of Dentistry', 'bits-and-bytes-of-dentistry', 'Dr. Sarah Johnson', 'Dental Technology', 45, 12, 'https://spotify.com', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc', '1e04ac95-b236-4d76-9d10-36eddf9e7e72', true, ARRAY['Tech', 'Innovation']),
  ('The Dental Business', 'the-dental-business', 'Dr. Michael Chen', 'Practice Management', 30, 8, 'https://spotify.com', 'https://images.unsplash.com/photo-1478737270239-2f52b7126c71', '22222222-2222-2222-2222-222222222222', true, ARRAY['Business', 'Finance']);

-- 7.6 Showcase Products
INSERT INTO public.showcase_products (name, endorsement, link, image, size, gradient, description) VALUES 
('3Shape TRIOS 5', 'Best-in-class intraoral scanner.', 'https://www.3shape.com', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09', 'large', 'from-purple-900/80 to-transparent', 'The TRIOS 5 sets a new standard.'),
('Formlabs Form 3B+', 'Reliable 3D printing.', 'https://dental.formlabs.com', 'https://images.unsplash.com/photo-1631248055158-edec7a3c072b', 'tall', 'from-blue-900/80 to-transparent', 'Advanced desktop 3D printer.'),
('Philips Zoom WhiteSpeed', 'Top-rated whitening.', 'https://www.philips.ca', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787', 'medium', 'from-blue-600/80 to-transparent', 'Clinically proven results.');
