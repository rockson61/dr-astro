-- 0015_moderation_policies.sql
-- Allow moderators to view and manage all comments

-- 1. View All Comments (Admins/Moderators)
CREATE POLICY "Moderators can view all comments"
ON public.comments
FOR SELECT
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles 
    WHERE role IN ('super_admin', 'admin', 'moderator')
  )
);

-- 2. Update Comments (Approve/Reject)
CREATE POLICY "Moderators can update comments"
ON public.comments
FOR UPDATE
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles 
    WHERE role IN ('super_admin', 'admin', 'moderator')
  )
);

-- 3. Delete Comments
CREATE POLICY "Moderators can delete comments"
ON public.comments
FOR DELETE
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles 
    WHERE role IN ('super_admin', 'admin', 'moderator')
  )
);
