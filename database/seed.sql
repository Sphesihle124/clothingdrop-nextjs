-- ClothingDrop Sample Data
-- Run this after creating the schema

-- Insert categories
INSERT INTO categories (name, description, image, sort_order) VALUES
('T-Shirts', 'Comfortable and stylish t-shirts for everyday wear', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', 1),
('Jackets', 'Stylish jackets and outerwear for all seasons', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop', 2),
('Jeans', 'Premium denim jeans in various fits and styles', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', 3),
('Dresses', 'Elegant dresses for every occasion', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', 4),
('Hoodies', 'Cozy hoodies and sweatshirts', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', 5),
('Shoes', 'Comfortable and fashionable footwear', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 6);

-- Insert sample products (prices in South African Rand)
INSERT INTO products (name, description, price, image, category, sizes, featured) VALUES
('Classic White T-Shirt', 'Premium cotton t-shirt with a comfortable fit. Perfect for casual wear or layering.', 549.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', 'T-Shirts', ARRAY['S', 'M', 'L', 'XL'], true),
('Vintage Denim Jacket', 'Timeless denim jacket with a vintage wash. A wardrobe essential that never goes out of style.', 1649.99, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop', 'Jackets', ARRAY['S', 'M', 'L', 'XL'], true),
('Slim Fit Black Jeans', 'Modern slim-fit jeans in classic black. Comfortable stretch denim for all-day wear.', 1449.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', 'Jeans', ARRAY['28', '30', '32', '34', '36'], false),
('Floral Summer Dress', 'Light and airy summer dress with beautiful floral print. Perfect for warm weather.', 1099.99, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', 'Dresses', ARRAY['XS', 'S', 'M', 'L'], true),
('Cozy Pullover Hoodie', 'Soft and comfortable hoodie made from premium cotton blend. Great for lounging or casual outings.', 899.99, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', 'Hoodies', ARRAY['S', 'M', 'L', 'XL', 'XXL'], false),
('Running Sneakers', 'Lightweight running shoes with excellent cushioning and support. Perfect for workouts or casual wear.', 2399.99, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 'Shoes', ARRAY['7', '8', '9', '10', '11', '12'], true),

-- Additional products for variety
('Striped Long Sleeve Tee', 'Classic striped long sleeve t-shirt in navy and white. Timeless style for any season.', 649.99, 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop', 'T-Shirts', ARRAY['S', 'M', 'L', 'XL'], false),
('Leather Bomber Jacket', 'Premium leather bomber jacket with modern styling. A statement piece for your wardrobe.', 3699.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', 'Jackets', ARRAY['S', 'M', 'L', 'XL'], true),
('High-Waisted Mom Jeans', 'Trendy high-waisted jeans with a relaxed fit. Vintage-inspired style with modern comfort.', 1299.99, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop', 'Jeans', ARRAY['26', '28', '30', '32', '34'], false),
('Elegant Midi Dress', 'Sophisticated midi dress perfect for office or evening wear. Flattering silhouette in classic black.', 1649.99, 'https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=400&h=400&fit=crop', 'Dresses', ARRAY['XS', 'S', 'M', 'L', 'XL'], false),
('Zip-Up Hoodie', 'Versatile zip-up hoodie in heather gray. Perfect for layering or wearing on its own.', 999.99, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', 'Hoodies', ARRAY['S', 'M', 'L', 'XL'], false),
('Canvas Sneakers', 'Classic canvas sneakers in white. Versatile and comfortable for everyday wear.', 1099.99, 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop', 'Shoes', ARRAY['6', '7', '8', '9', '10', '11'], false),

-- More products to fill out the catalog
('Graphic Print Tee', 'Cool graphic print t-shirt with artistic design. Express your style with this unique piece.', 459.99, 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400&h=400&fit=crop', 'T-Shirts', ARRAY['S', 'M', 'L', 'XL'], false),
('Windbreaker Jacket', 'Lightweight windbreaker perfect for outdoor activities. Water-resistant and packable.', 1199.99, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop', 'Jackets', ARRAY['S', 'M', 'L', 'XL'], false),
('Distressed Skinny Jeans', 'Trendy distressed skinny jeans with strategic rips. Edgy style for the fashion-forward.', 1399.99, 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=400&fit=crop', 'Jeans', ARRAY['26', '28', '30', '32'], false),
('Maxi Dress', 'Flowing maxi dress in beautiful paisley print. Bohemian style perfect for summer events.', 1449.99, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop', 'Dresses', ARRAY['S', 'M', 'L', 'XL'], false);

-- Note: In a real application, you would also want to insert sample users and orders
-- However, users are managed by Supabase Auth, so they would be created through the authentication flow
