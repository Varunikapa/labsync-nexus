
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'Researcher',
  department TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add user_id to all existing tables
ALTER TABLE public.labs ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.equipment ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.maintenance_records ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.bookings ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.inventory ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop old public read policies
DROP POLICY IF EXISTS "Labs are viewable by everyone" ON public.labs;
DROP POLICY IF EXISTS "Equipment is viewable by everyone" ON public.equipment;
DROP POLICY IF EXISTS "Maintenance records are viewable by everyone" ON public.maintenance_records;
DROP POLICY IF EXISTS "Bookings are viewable by everyone" ON public.bookings;
DROP POLICY IF EXISTS "Inventory is viewable by everyone" ON public.inventory;

-- Delete seed data (it has no user_id)
DELETE FROM public.maintenance_records;
DELETE FROM public.equipment;
DELETE FROM public.bookings;
DELETE FROM public.inventory;
DELETE FROM public.labs;

-- Per-user RLS policies for labs
CREATE POLICY "Users can view own labs" ON public.labs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own labs" ON public.labs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own labs" ON public.labs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own labs" ON public.labs FOR DELETE USING (auth.uid() = user_id);

-- Per-user RLS policies for equipment
CREATE POLICY "Users can view own equipment" ON public.equipment FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own equipment" ON public.equipment FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own equipment" ON public.equipment FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own equipment" ON public.equipment FOR DELETE USING (auth.uid() = user_id);

-- Per-user RLS policies for maintenance_records
CREATE POLICY "Users can view own maintenance" ON public.maintenance_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own maintenance" ON public.maintenance_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own maintenance" ON public.maintenance_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own maintenance" ON public.maintenance_records FOR DELETE USING (auth.uid() = user_id);

-- Per-user RLS policies for bookings
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookings" ON public.bookings FOR DELETE USING (auth.uid() = user_id);

-- Per-user RLS policies for inventory
CREATE POLICY "Users can view own inventory" ON public.inventory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own inventory" ON public.inventory FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own inventory" ON public.inventory FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own inventory" ON public.inventory FOR DELETE USING (auth.uid() = user_id);
