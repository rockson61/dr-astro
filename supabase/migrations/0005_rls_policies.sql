-- 0005: RLS Policies for CRUD
-- Adds Insert/Update/Delete policies missing from initial schema

-- 1. JOBS
-- Allow authenticated users to create jobs
CREATE POLICY "Users can create jobs" ON public.jobs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow owners to update their jobs
CREATE POLICY "Owners can update jobs" ON public.jobs
  FOR UPDATE USING (auth.uid() = employer_id);

-- Allow owners to delete their jobs
CREATE POLICY "Owners can delete jobs" ON public.jobs
  FOR DELETE USING (auth.uid() = employer_id);


-- 2. EVENTS
-- Allow authenticated users to create events
CREATE POLICY "Users can create events" ON public.events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow organizers to update events
CREATE POLICY "Organizers can update events" ON public.events
  FOR UPDATE USING (auth.uid() = organizer_id);

-- Allow organizers to delete events
CREATE POLICY "Organizers can delete events" ON public.events
  FOR DELETE USING (auth.uid() = organizer_id);


-- 3. LISTINGS
-- Allow authenticated users to create listings
CREATE POLICY "Users can create listings" ON public.listings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow owners to create listings
CREATE POLICY "Owners can update listings" ON public.listings
  FOR UPDATE USING (auth.uid() = owner_id);

-- Allow owners to create listings
CREATE POLICY "Owners can delete listings" ON public.listings
  FOR DELETE USING (auth.uid() = owner_id);


-- 4. AWARDS & NOMINATIONS (Admin Only)
-- Helper function to check admin role (optional, but using direct query is safer for now)

-- Awards Table
CREATE POLICY "Admins can insert awards" ON public.awards
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

CREATE POLICY "Admins can update awards" ON public.awards
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  );

-- Award Nominations Table (if it exists, assuming inferred schema)
-- We need to check if table exists first or just try creating policy
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'award_nominations') THEN
    ALTER TABLE public.award_nominations ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Public read nominations" ON public.award_nominations FOR SELECT USING (true);
    
    CREATE POLICY "Admins can manage nominations" ON public.award_nominations
      FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
      );
  END IF;
END $$;
