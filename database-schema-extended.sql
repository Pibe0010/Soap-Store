-- ============================================
-- Complete Database Schema for Soap-Store E-commerce
-- Includes tables, indexes, RLS policies, and example data
-- ============================================

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own data" ON users
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own data" ON users
    FOR DELETE
    USING (auth.uid() = id);

-- ============================================
-- 2. ADDRESSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label TEXT NOT NULL, -- e.g., 'Home', 'Work'
    street_address TEXT NOT NULL,
    apartment_unit TEXT,
    city TEXT NOT NULL,
    state_province TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for addresses
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_addresses_default ON addresses(user_id, is_default) WHERE is_default = TRUE;

-- Enable RLS
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for addresses
CREATE POLICY "Users can view own addresses" ON addresses
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON addresses
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON addresses
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON addresses
    FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- 3. FAVORITES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id) -- Prevent duplicate favorites
);

-- Indexes for favorites
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product_id ON favorites(product_id);

-- Enable RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for favorites
CREATE POLICY "Users can view own favorites" ON favorites
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON favorites
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON favorites
    FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- 4. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 0,
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,  -- FIXED: was total_decimal
    payment_status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, failed, refunded
    payment_method TEXT, -- e.g., 'credit_card', 'paypal', 'bank_transfer'
    shipping_address_id UUID REFERENCES addresses(id),
    billing_address_id UUID REFERENCES addresses(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for orders
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON orders
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own orders" ON orders
    FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- 5. ORDER_ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL, -- Price at time of purchase
    total_price DECIMAL(10, 2) NOT NULL, -- quantity * unit_price
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for order_items
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Enable RLS
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for order_items
-- Users can view their own order items (through their orders)
CREATE POLICY "Users can view own order items" ON order_items
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

-- Users can insert their own order items (through their orders)
CREATE POLICY "Users can insert own order items" ON order_items
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

-- Users can update their own order items (through their orders)
CREATE POLICY "Users can update own order items" ON order_items
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

-- Users can delete their own order items (through their orders)
CREATE POLICY "Users can delete own order items" ON order_items
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

-- ============================================
-- 6. PRODUCTS TABLE (assuming it exists, ensuring RLS)
-- ============================================
-- Enable RLS on products if not already done
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to products (for browsing catalog)
CREATE POLICY "Allow public read access to products" ON products
    FOR SELECT
    USING (true);

-- Note: For a real app, you might want to restrict insert/update/delete to admins only
-- using a service role key or additional checks based on user roles

-- ============================================
-- 7. EXAMPLE DATA (optional, for development)
-- ============================================

-- Insert a test user (password would be handled by auth system)
INSERT INTO users (email, full_name, phone, avatar_url) VALUES
('test@example.com', 'Test User', '+1234567890', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150')
ON CONFLICT (email) DO NOTHING;

-- Insert test addresses for the user
WITH inserted_user AS (
    SELECT id FROM users WHERE email = 'test@example.com' LIMIT 1
)
INSERT INTO addresses (user_id, label, street_address, apartment_unit, city, state_province, postal_code, country, is_default)
SELECT 
    id, 
    'Home', 
    '123 Main St', 
    'Apt 4B', 
    'Springfield', 
    'IL', 
    '62701', 
    'USA', 
    TRUE
FROM inserted_user
ON CONFLICT DO NOTHING;

-- Insert test favorites (assuming some product IDs exist from the products table)
WITH inserted_user AS (
    SELECT id FROM users WHERE email = 'test@example.com' LIMIT 1
), product_ids AS (
    SELECT id FROM products LIMIT 3
)
INSERT INTO favorites (user_id, product_id)
SELECT 
    u.id, 
    p.id
FROM inserted_user u
CROSS JOIN product_ids p
ON CONFLICT DO NOTHING;

-- ============================================
-- 8. VERIFICATION
-- ============================================

-- Verify that the tables were created correctly
SELECT 
    'users' as table_name, 
    COUNT(*) as count 
FROM users
UNION ALL
SELECT 
    'addresses', 
    COUNT(*) 
FROM addresses
UNION ALL
SELECT 
    'favorites', 
    COUNT(*) 
FROM favorites
UNION ALL
SELECT 
    'orders', 
    COUNT(*) 
FROM orders
UNION ALL
SELECT 
    'order_items', 
    COUNT(*) 
FROM order_items
UNION ALL
SELECT 
    'products', 
    COUNT(*) 
FROM products;

-- Check RLS status and policies
SELECT
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('users', 'addresses', 'favorites', 'orders', 'order_items', 'products')
ORDER BY tablename;

-- List all policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;