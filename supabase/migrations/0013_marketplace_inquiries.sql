-- 0013_marketplace_inquiries.sql
-- Inquiries system for Marketplace

CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES public.profiles(id) NOT NULL,
  buyer_id UUID REFERENCES public.profiles(id) NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Policies

-- Sellers can view inquiries for their own products (where they are the seller)
CREATE POLICY "Sellers can view received inquiries" ON public.inquiries
    FOR SELECT USING (auth.uid() = seller_id);

-- Sellers can update status of received inquiries
CREATE POLICY "Sellers can update received inquiries" ON public.inquiries
    FOR UPDATE USING (auth.uid() = seller_id);

-- Buyers can view their own sent inquiries
CREATE POLICY "Buyers can view sent inquiries" ON public.inquiries
    FOR SELECT USING (auth.uid() = buyer_id);

-- Buyers can create new inquiries
CREATE POLICY "Buyers can create inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Indexes for performance
CREATE INDEX idx_inquiries_seller ON public.inquiries(seller_id);
CREATE INDEX idx_inquiries_buyer ON public.inquiries(buyer_id);
CREATE INDEX idx_inquiries_product ON public.inquiries(product_id);
