
-- Create products table for chili pepper varieties
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price_lkr INTEGER NOT NULL,
  price_usd INTEGER NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  available BOOLEAN DEFAULT true,
  spice_level TEXT CHECK (spice_level IN ('mild', 'medium', 'hot', 'extra_hot')),
  weight_kg DECIMAL(10,2),
  origin_region TEXT,
  harvest_season TEXT,
  certifications TEXT[], -- Array for organic, export, quality certifications
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create customer leads table for export inquiries
CREATE TABLE public.customer_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  country TEXT NOT NULL,
  inquiry_type TEXT CHECK (inquiry_type IN ('bulk_order', 'samples', 'partnership', 'general')),
  message TEXT,
  preferred_language TEXT DEFAULT 'en',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create orders table for tracking sales
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  currency TEXT CHECK (currency IN ('LKR', 'USD')) NOT NULL,
  unit_price INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  order_status TEXT DEFAULT 'processing' CHECK (order_status IN ('processing', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT CHECK (payment_method IN ('payhere', 'stripe', 'bank_transfer')),
  payment_reference TEXT,
  shipping_method TEXT,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create testimonials table for customer reviews
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  company_name TEXT,
  country TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  product_id UUID REFERENCES public.products(id),
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create export certifications table
CREATE TABLE public.export_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  certificate_url TEXT,
  issuing_authority TEXT,
  valid_from DATE,
  valid_until DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.export_certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to products and approved testimonials
CREATE POLICY "Products are publicly readable" ON public.products
  FOR SELECT USING (available = true);

CREATE POLICY "Approved testimonials are publicly readable" ON public.testimonials
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Export certifications are publicly readable" ON public.export_certifications
  FOR SELECT USING (is_active = true);

-- Create policies for lead insertion (public can submit leads)
CREATE POLICY "Anyone can submit leads" ON public.customer_leads
  FOR INSERT WITH CHECK (true);

-- Create policies for order insertion (public can create orders)
CREATE POLICY "Anyone can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Insert sample data
INSERT INTO public.products (name, description, price_lkr, price_usd, stock_quantity, spice_level, weight_kg, origin_region, harvest_season, certifications) VALUES
('Hot Dragon Chili Pepper - Premium Grade', 'Premium quality greenhouse-grown hot chili peppers with exceptional flavor and heat. Perfect for export markets seeking high-quality Sri Lankan chilies.', 15000, 45, 1000, 'extra_hot', 25.0, 'Central Province, Sri Lanka', 'Year-round', ARRAY['Organic Certified', 'Export Quality', 'GAP Certified']),
('Dragon Fire Red Chilies', 'Intense heat with rich flavor profile. These red chilies are carefully cultivated using modern greenhouse techniques for consistent quality.', 12000, 36, 800, 'hot', 25.0, 'Uva Province, Sri Lanka', 'Peak: March-August', ARRAY['Export Quality', 'GAP Certified']),
('Golden Dragon Mild Variety', 'Mild yet flavorful chili variety perfect for customers who prefer less heat but authentic Sri Lankan taste.', 10000, 30, 600, 'mild', 25.0, 'Western Province, Sri Lanka', 'Year-round', ARRAY['Organic Certified', 'Export Quality']);

INSERT INTO public.export_certifications (name, description, issuing_authority, valid_from, valid_until) VALUES
('Organic Certification', 'Certified organic farming practices ensuring chemical-free production', 'Sri Lanka Organic Agriculture Association', '2024-01-01', '2025-12-31'),
('GAP Certification', 'Good Agricultural Practices certification for quality assurance', 'Department of Agriculture Sri Lanka', '2024-01-01', '2024-12-31'),
('Export Quality Certification', 'Quality standards certification for international export', 'Sri Lanka Export Development Board', '2024-01-01', '2025-06-30');

INSERT INTO public.testimonials (customer_name, company_name, country, message, rating, is_featured, is_approved) VALUES
('James Mitchell', 'Spice Importers Ltd', 'United Kingdom', 'Exceptional quality chilies with consistent heat levels. Hot Dragon has become our primary supplier for Sri Lankan varieties.', 5, true, true),
('Maria Santos', 'Global Flavors Inc', 'United States', 'The greenhouse cultivation ensures year-round availability with premium quality. Highly recommended for serious spice importers.', 5, true, true),
('Ahmed Hassan', 'Middle East Spice Trading', 'UAE', 'Outstanding packaging and reliable delivery. The Hot Dragon variety has become very popular with our customers.', 4, false, true);
