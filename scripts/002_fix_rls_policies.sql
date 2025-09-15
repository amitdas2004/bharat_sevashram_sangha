-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

-- Recreate RLS policies for profiles with better error handling
CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Also ensure students policies are correct
DROP POLICY IF EXISTS "students_select_own" ON public.students;
DROP POLICY IF EXISTS "students_insert_own" ON public.students;
DROP POLICY IF EXISTS "students_update_own" ON public.students;

CREATE POLICY "students_select_own" ON public.students 
  FOR SELECT USING (parent_id = auth.uid());

CREATE POLICY "students_insert_own" ON public.students 
  FOR INSERT WITH CHECK (parent_id = auth.uid());

CREATE POLICY "students_update_own" ON public.students 
  FOR UPDATE USING (parent_id = auth.uid()) WITH CHECK (parent_id = auth.uid());

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.students TO authenticated;
GRANT SELECT ON public.attendance TO authenticated;
GRANT SELECT ON public.finance TO authenticated;
GRANT SELECT ON public.events TO authenticated;
GRANT SELECT ON public.school_info TO authenticated;
