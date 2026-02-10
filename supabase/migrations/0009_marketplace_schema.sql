-- 0009_marketplace_schema.sql
-- Marketplace Products System

CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  category TEXT,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  inventory_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies
-- Public Read: Everyone can view active products
CREATE POLICY "Public read products" ON public.products
    FOR SELECT USING (status = 'active');

-- Seller Read: Sellers can see all their own products
CREATE POLICY "Seller read own products" ON public.products
    FOR SELECT USING (auth.uid() = seller_id);

-- Seller Insert: Authenticated users can create products (becoming sellers)
CREATE POLICY "Sellers can create products" ON public.products
    FOR INSERT WITH CHECK (auth.uid() = seller_id);

-- Seller Update: Sellers can update their own products
CREATE POLICY "Sellers can update own products" ON public.products
    FOR UPDATE USING (auth.uid() = seller_id);

-- Seller Delete: Sellers can delete their own products
CREATE POLICY "Sellers can delete own products" ON public.products
    FOR DELETE USING (auth.uid() = seller_id);

-- Admin Full Access (assuming admin check in app logic or separate policy if verified via role)
-- For simplicity in this stack, we rely on the above or specific admin policies if needed.
-- Adding a generic admin policy just in case:
CREATE POLICY "Admins full access products" ON public.products
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
    );
