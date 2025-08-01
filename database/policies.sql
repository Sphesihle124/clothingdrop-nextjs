-- Row Level Security (RLS) Policies for ClothingDrop
-- Run this after creating the schema and seeding data

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

CREATE POLICY "Products can be inserted by authenticated users" ON products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Products can be updated by authenticated users" ON products
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Categories policies (public read, admin write)
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Categories can be managed by authenticated users" ON categories
    FOR ALL USING (auth.role() = 'authenticated');

-- User profiles policies (users can only access their own profile)
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Orders policies (users can only access their own orders)
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON orders
    FOR UPDATE USING (auth.uid() = user_id);

-- Order items policies (users can only access items from their own orders)
CREATE POLICY "Users can view own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own order items" ON order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Delivery tracking policies (users can only view tracking for their own orders)
CREATE POLICY "Users can view tracking for own orders" ON delivery_tracking
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = delivery_tracking.order_id 
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Authenticated users can insert tracking updates" ON delivery_tracking
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Cart items policies (users can only access their own cart)
CREATE POLICY "Users can view own cart items" ON cart_items
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items" ON cart_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items" ON cart_items
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items" ON cart_items
    FOR DELETE USING (auth.uid() = user_id);

-- Create a function to handle user profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.user_profiles (id, name)
    VALUES (new.id, new.raw_user_meta_data->>'name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to get order statistics (for admin dashboard)
CREATE OR REPLACE FUNCTION get_order_stats()
RETURNS TABLE (
    total_orders BIGINT,
    pending_orders BIGINT,
    completed_orders BIGINT,
    total_revenue NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_orders,
        COUNT(*) FILTER (WHERE status IN ('pending', 'confirmed', 'preparing', 'in_transit')) as pending_orders,
        COUNT(*) FILTER (WHERE status = 'delivered') as completed_orders,
        COALESCE(SUM(total) FILTER (WHERE status = 'delivered'), 0) as total_revenue
    FROM orders;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to update order status and add tracking
CREATE OR REPLACE FUNCTION update_order_status(
    order_id UUID,
    new_status VARCHAR(50),
    tracking_notes TEXT DEFAULT NULL,
    driver_name VARCHAR(255) DEFAULT NULL,
    driver_phone VARCHAR(20) DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Update the order
    UPDATE orders 
    SET 
        status = new_status,
        driver_name = COALESCE(update_order_status.driver_name, orders.driver_name),
        driver_phone = COALESCE(update_order_status.driver_phone, orders.driver_phone),
        delivered_at = CASE WHEN new_status = 'delivered' THEN NOW() ELSE delivered_at END,
        updated_at = NOW()
    WHERE id = order_id;
    
    -- Add tracking entry
    INSERT INTO delivery_tracking (order_id, status, notes)
    VALUES (order_id, new_status, tracking_notes);
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
