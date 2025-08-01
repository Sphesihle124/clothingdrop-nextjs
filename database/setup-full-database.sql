-- ClothingDrop Full Database Setup
-- Run this in Supabase SQL Editor to set up the complete database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image VARCHAR(500),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100) REFERENCES categories(name),
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  sku VARCHAR(100) UNIQUE,
  weight DECIMAL(5,2),
  dimensions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  date_of_birth DATE,
  gender VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type VARCHAR(20) DEFAULT 'shipping', -- 'shipping', 'billing'
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company VARCHAR(100),
  street_address VARCHAR(255) NOT NULL,
  apartment VARCHAR(100),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(2) DEFAULT 'ZA',
  phone VARCHAR(20),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) PRIMARY KEY, -- Custom format like CD-2024-001
  user_id UUID REFERENCES profiles(id),
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled
  total_amount DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'ZAR',
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_method VARCHAR(50),
  payment_intent_id VARCHAR(255), -- Stripe payment intent ID
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  tracking_number VARCHAR(100),
  estimated_delivery TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(200) NOT NULL, -- Store product name at time of order
  price DECIMAL(10,2) NOT NULL, -- Store price at time of order
  quantity INTEGER NOT NULL DEFAULT 1,
  size VARCHAR(20),
  color VARCHAR(50),
  sku VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart table (for persistent cart)
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  size VARCHAR(20),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id, size, color)
);

-- Create order_tracking table
CREATE TABLE IF NOT EXISTS order_tracking (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  message TEXT,
  location VARCHAR(255),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  order_id VARCHAR(50) REFERENCES orders(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(200),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, user_id, order_id)
);

-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed_amount'
  discount_value DECIMAL(10,2) NOT NULL,
  minimum_amount DECIMAL(10,2) DEFAULT 0,
  maximum_discount DECIMAL(10,2),
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample categories
INSERT INTO categories (name, description, image, sort_order) VALUES
('T-Shirts', 'Comfortable and stylish t-shirts for every occasion', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', 1),
('Jeans', 'Premium denim jeans in various fits and styles', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', 2),
('Jackets', 'Stylish jackets and outerwear for all seasons', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop', 3),
('Dresses', 'Beautiful dresses for casual and formal occasions', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', 4),
('Hoodies', 'Cozy hoodies and sweatshirts', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', 5),
('Shoes', 'Comfortable and fashionable footwear', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 6)
ON CONFLICT (name) DO NOTHING;

-- Insert sample products (South African Rand pricing)
INSERT INTO products (name, description, price, image, category, sizes, featured, stock_quantity, sku) VALUES
('Classic White T-Shirt', 'Premium cotton t-shirt with a comfortable fit. Perfect for casual wear or layering.', 549.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', 'T-Shirts', ARRAY['S', 'M', 'L', 'XL'], true, 50, 'CD-TSH-001'),
('Vintage Denim Jacket', 'Timeless denim jacket with a vintage wash. A wardrobe essential that never goes out of style.', 1649.99, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop', 'Jackets', ARRAY['S', 'M', 'L', 'XL'], true, 25, 'CD-JAC-001'),
('Slim Fit Black Jeans', 'Modern slim-fit jeans in classic black. Comfortable stretch denim for all-day wear.', 1449.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', 'Jeans', ARRAY['28', '30', '32', '34', '36'], false, 30, 'CD-JEA-001'),
('Floral Summer Dress', 'Light and airy summer dress with beautiful floral print. Perfect for warm weather.', 1099.99, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', 'Dresses', ARRAY['XS', 'S', 'M', 'L'], true, 20, 'CD-DRE-001'),
('Cozy Pullover Hoodie', 'Soft and comfortable hoodie made from premium cotton blend. Great for lounging or casual outings.', 899.99, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', 'Hoodies', ARRAY['S', 'M', 'L', 'XL', 'XXL'], false, 40, 'CD-HOO-001'),
('Running Sneakers', 'Lightweight running shoes with excellent cushioning and support. Perfect for workouts or casual wear.', 2399.99, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 'Shoes', ARRAY['7', '8', '9', '10', '11', '12'], true, 15, 'CD-SHO-001'),

-- Additional products for variety
('Striped Long Sleeve Tee', 'Classic striped long sleeve t-shirt in navy and white. Timeless style for any season.', 649.99, 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop', 'T-Shirts', ARRAY['S', 'M', 'L', 'XL'], false, 35, 'CD-TSH-002'),
('Leather Bomber Jacket', 'Premium leather bomber jacket with modern styling. A statement piece for your wardrobe.', 3699.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', 'Jackets', ARRAY['S', 'M', 'L', 'XL'], true, 10, 'CD-JAC-002'),
('High-Waisted Mom Jeans', 'Trendy high-waisted jeans with a relaxed fit. Vintage-inspired style with modern comfort.', 1299.99, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop', 'Jeans', ARRAY['26', '28', '30', '32', '34'], false, 25, 'CD-JEA-002'),
('Elegant Midi Dress', 'Sophisticated midi dress perfect for office or evening wear. Flattering silhouette in classic black.', 1649.99, 'https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=400&h=400&fit=crop', 'Dresses', ARRAY['XS', 'S', 'M', 'L', 'XL'], false, 18, 'CD-DRE-002'),
('Zip-Up Hoodie', 'Versatile zip-up hoodie in heather gray. Perfect for layering or wearing on its own.', 999.99, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', 'Hoodies', ARRAY['S', 'M', 'L', 'XL'], false, 30, 'CD-HOO-002'),
('Canvas Sneakers', 'Classic canvas sneakers in white. Versatile and comfortable for everyday wear.', 1099.99, 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop', 'Shoes', ARRAY['6', '7', '8', '9', '10', '11'], false, 22, 'CD-SHO-002'),

-- More products to fill out the catalog
('Graphic Print Tee', 'Cool graphic print t-shirt with artistic design. Express your style with this unique piece.', 459.99, 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400&h=400&fit=crop', 'T-Shirts', ARRAY['S', 'M', 'L', 'XL'], false, 45, 'CD-TSH-003'),
('Windbreaker Jacket', 'Lightweight windbreaker perfect for outdoor activities. Water-resistant and packable.', 1199.99, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop', 'Jackets', ARRAY['S', 'M', 'L', 'XL'], false, 20, 'CD-JAC-003'),
('Distressed Skinny Jeans', 'Trendy distressed skinny jeans with strategic rips. Edgy style for the fashion-forward.', 1399.99, 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=400&fit=crop', 'Jeans', ARRAY['26', '28', '30', '32'], false, 15, 'CD-JEA-003'),
('Maxi Dress', 'Flowing maxi dress in beautiful paisley print. Bohemian style perfect for summer events.', 1449.99, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop', 'Dresses', ARRAY['S', 'M', 'L', 'XL'], false, 12, 'CD-DRE-003')
ON CONFLICT (sku) DO NOTHING;

-- Create RLS (Row Level Security) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Addresses policies
CREATE POLICY "Users can manage own addresses" ON addresses FOR ALL USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Cart policies
CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Users can manage own reviews" ON reviews FOR ALL USING (auth.uid() = user_id);

-- Wishlist policies
CREATE POLICY "Users can manage own wishlist" ON wishlist_items FOR ALL USING (auth.uid() = user_id);

-- Allow public read access to products and categories
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products" ON products FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT TO authenticated, anon USING (true);

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Success message
SELECT 'ClothingDrop database setup completed successfully! 🎉' as message;
