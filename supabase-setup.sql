-- TurmerLink Supabase Database Setup
-- Run this entire script in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'farmer' CHECK (role IN ('farmer', 'admin', 'cooperative')),
    language VARCHAR(10) DEFAULT 'te' CHECK (language IN ('te', 'en')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Sales transactions table
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    sale_date DATE NOT NULL,
    quantity DECIMAL(10,2) NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    total_amount DECIMAL(12,2) GENERATED ALWAYS AS (quantity * price) STORED,
    buyer VARCHAR(255) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('paid', 'pending', 'delayed')),
    transaction_hash VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MSP (Minimum Support Price) data table
CREATE TABLE msp_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commodity VARCHAR(100) NOT NULL,
    current_msp DECIMAL(10,2) NOT NULL,
    previous_msp DECIMAL(10,2),
    effective_date DATE NOT NULL,
    change_amount DECIMAL(10,2),
    change_percentage DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Market price data table
CREATE TABLE price_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    market_name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    price_date DATE NOT NULL,
    source VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weather data table
CREATE TABLE weather_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    temperature DECIMAL(5,2),
    humidity INTEGER,
    condition VARCHAR(100),
    wind_speed DECIMAL(5,2),
    precipitation DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Educational videos table
CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    youtube_id VARCHAR(50) UNIQUE,
    duration VARCHAR(10),
    thumbnail_url TEXT,
    language VARCHAR(10) DEFAULT 'te' CHECK (language IN ('te', 'en')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('price_alert', 'payment_alert', 'market_alert', 'weather_alert', 'learning')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ table
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    language VARCHAR(10) DEFAULT 'te' CHECK (language IN ('te', 'en')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guides table
CREATE TABLE guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(10),
    steps JSONB,
    language VARCHAR(10) DEFAULT 'te' CHECK (language IN ('te', 'en')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_sales_farmer_id ON sales(farmer_id);
CREATE INDEX idx_sales_sale_date ON sales(sale_date);
CREATE INDEX idx_sales_payment_status ON sales(payment_status);
CREATE INDEX idx_price_data_market_location ON price_data(market_name, location);
CREATE INDEX idx_price_data_date ON price_data(price_date);
CREATE INDEX idx_weather_data_location_date ON weather_data(location, date);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_videos_language ON videos(language);

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sales_updated_at BEFORE UPDATE ON sales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_msp_data_updated_at BEFORE UPDATE ON msp_data FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guides_updated_at BEFORE UPDATE ON guides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO msp_data (commodity, current_msp, previous_msp, effective_date, change_amount, change_percentage) VALUES
('turmeric', 7500.00, 7200.00, '2024-01-01', 300.00, 4.17);

INSERT INTO videos (title, description, category, youtube_id, duration, language) VALUES
('Best Practices for Turmeric Farming', 'Learn the essential techniques for growing high-quality turmeric', 'cultivation', 'turmeric_farming_001', '15:30', 'te'),
('Soil Preparation and Planting', 'Step-by-step guide to preparing soil and planting turmeric', 'cultivation', 'soil_prep_002', '12:45', 'te'),
('When and How to Harvest Turmeric', 'Learn the right time and methods for harvesting turmeric', 'harvesting', 'harvest_guide_003', '14:15', 'te'),
('Understanding Market Prices', 'How to track and understand turmeric market prices', 'marketing', 'market_prices_004', '11:45', 'te'),
('Direct Marketing Strategies', 'Selling directly to buyers for better prices', 'marketing', 'marketing_strategy_005', '13:20', 'te');

INSERT INTO faqs (question, answer, category, language) VALUES
('What is the best time to plant turmeric?', 'Turmeric is typically planted in April-May during the pre-monsoon period. The soil should be well-prepared with organic matter.', 'cultivation', 'te'),
('How long does it take for turmeric to mature?', 'Turmeric takes about 7-9 months to mature. The leaves start turning yellow and drying up when it''s ready for harvest.', 'cultivation', 'te'),
('What is the ideal soil type for turmeric cultivation?', 'Turmeric grows best in well-drained, loamy soil with good organic content. The soil should have a pH between 5.5 to 7.5.', 'cultivation', 'te'),
('How much water does turmeric need?', 'Turmeric requires regular watering, especially during the growing season. However, avoid waterlogging as it can cause root rot.', 'cultivation', 'te'),
('What are the common pests and diseases in turmeric?', 'Common pests include rhizome scale and shoot borer. Diseases include leaf spot and rhizome rot. Proper field hygiene and crop rotation help prevent these issues.', 'cultivation', 'te');

INSERT INTO guides (title, description, icon, steps, language) VALUES
('Storage Guide', 'How to store turmeric properly to maintain quality', '📦', '["Clean and dry the turmeric rhizomes", "Store in a cool, dry place", "Use proper containers to prevent moisture", "Check regularly for any signs of spoilage"]', 'te'),
('Transportation Tips', 'Best practices for transporting turmeric to market', '🚚', '["Use clean, dry bags or containers", "Avoid direct sunlight during transport", "Ensure proper ventilation", "Handle with care to prevent damage"]', 'te'),
('Quality Standards', 'Understanding quality parameters for better prices', '⭐', '["Check for uniform color and size", "Ensure proper drying", "Remove damaged or diseased rhizomes", "Maintain cleanliness throughout"]', 'te');

-- Insert sample users
INSERT INTO users (phone_number, name, role, language) VALUES
('9876543210', 'Rama Rao', 'farmer', 'te'),
('9876543211', 'Sita Devi', 'farmer', 'te'),
('9876543212', 'Krishna Kumar', 'farmer', 'en'),
('9876543213', 'Extension Officer', 'admin', 'te'),
('9876543214', 'Cooperative Head', 'cooperative', 'te');

-- Insert sample sales data
INSERT INTO sales (farmer_id, sale_date, quantity, price, buyer, payment_status, transaction_hash) 
SELECT 
    u.id,
    CURRENT_DATE - INTERVAL '1 day' * (random() * 30)::int,
    (random() * 100 + 50)::decimal(10,2),
    (random() * 2000 + 7000)::decimal(10,2),
    CASE (random() * 4)::int
        WHEN 0 THEN 'Local Trader'
        WHEN 1 THEN 'Export Company'
        WHEN 2 THEN 'Cooperative Society'
        ELSE 'Direct Buyer'
    END,
    CASE (random() * 3)::int
        WHEN 0 THEN 'paid'
        WHEN 1 THEN 'pending'
        ELSE 'delayed'
    END,
    encode(gen_random_bytes(16), 'hex')
FROM users u 
WHERE u.role = 'farmer'
LIMIT 20;

-- Insert sample price data for the last 30 days
INSERT INTO price_data (market_name, location, price, price_date, source)
SELECT 
    market,
    location,
    base_price + (random() * 1000 - 500)::decimal(10,2),
    CURRENT_DATE - INTERVAL '1 day' * day_offset,
    'Government Mandi'
FROM (
    SELECT 
        unnest(ARRAY['Nizamabad', 'Hyderabad', 'Mumbai', 'Chennai']) as market,
        unnest(ARRAY['Nizamabad', 'Hyderabad', 'Mumbai', 'Chennai']) as location,
        unnest(ARRAY[8500, 8700, 9200, 9500]) as base_price,
        generate_series(0, 29) as day_offset
) t;

-- Insert sample weather data
INSERT INTO weather_data (location, date, temperature, humidity, condition, wind_speed, precipitation)
SELECT 
    'Nizamabad',
    CURRENT_DATE - INTERVAL '1 day' * day_offset,
    (random() * 15 + 20)::decimal(5,2),
    (random() * 40 + 40)::int,
    CASE (random() * 4)::int
        WHEN 0 THEN 'Sunny'
        WHEN 1 THEN 'Partly Cloudy'
        WHEN 2 THEN 'Cloudy'
        ELSE 'Light Rain'
    END,
    (random() * 20 + 5)::decimal(5,2),
    CASE WHEN random() > 0.7 THEN (random() * 50)::decimal(5,2) ELSE 0 END
FROM generate_series(0, 29) as day_offset;

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message, priority, is_read, sent_at)
SELECT 
    u.id,
    unnest(ARRAY['price_alert', 'payment_alert', 'market_alert', 'weather_alert']),
    unnest(ARRAY[
        'Price Alert: Turmeric prices increased',
        'Payment Received',
        'MSP Update',
        'Weather Warning'
    ]),
    unnest(ARRAY[
        'Nizamabad mandi price is now ₹8,500/kg, up by ₹200 from yesterday',
        'Payment of ₹45,000 has been credited to your account',
        'Government has announced new MSP of ₹7,500/kg for turmeric',
        'Heavy rainfall expected in next 2 days. Consider harvesting early'
    ]),
    unnest(ARRAY['high', 'medium', 'high', 'high']),
    random() > 0.3,
    NOW() - INTERVAL '1 hour' * (random() * 48)::int
FROM users u 
WHERE u.role = 'farmer'
LIMIT 20;

-- Create a view for farmer dashboard summary
CREATE OR REPLACE VIEW farmer_dashboard_summary AS
SELECT 
    u.id as farmer_id,
    u.name as farmer_name,
    u.phone_number,
    COUNT(s.id) as total_sales,
    COALESCE(SUM(s.quantity), 0) as total_quantity,
    COALESCE(SUM(s.total_amount), 0) as total_revenue,
    COALESCE(AVG(s.price), 0) as average_price,
    COUNT(CASE WHEN s.payment_status = 'paid' THEN 1 END) as paid_sales,
    COUNT(CASE WHEN s.payment_status = 'pending' THEN 1 END) as pending_sales,
    COUNT(CASE WHEN s.payment_status = 'delayed' THEN 1 END) as delayed_sales
FROM users u
LEFT JOIN sales s ON u.id = s.farmer_id
WHERE u.role = 'farmer'
GROUP BY u.id, u.name, u.phone_number;

-- Create a view for market price trends
CREATE OR REPLACE VIEW market_price_trends AS
SELECT 
    market_name,
    location,
    price_date,
    price,
    LAG(price) OVER (PARTITION BY market_name, location ORDER BY price_date) as previous_price,
    price - LAG(price) OVER (PARTITION BY market_name, location ORDER BY price_date) as price_change,
    ROUND(
        ((price - LAG(price) OVER (PARTITION BY market_name, location ORDER BY price_date)) / 
         LAG(price) OVER (PARTITION BY market_name, location ORDER BY price_date)) * 100, 2
    ) as price_change_percentage
FROM price_data
ORDER BY market_name, location, price_date;

-- Create a function to get farmer's recent sales
CREATE OR REPLACE FUNCTION get_farmer_recent_sales(farmer_uuid UUID, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    sale_id UUID,
    sale_date DATE,
    quantity DECIMAL(10,2),
    price DECIMAL(10,2),
    total_amount DECIMAL(12,2),
    buyer VARCHAR(255),
    payment_status VARCHAR(20),
    transaction_hash VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.sale_date,
        s.quantity,
        s.price,
        s.total_amount,
        s.buyer,
        s.payment_status,
        s.transaction_hash
    FROM sales s
    WHERE s.farmer_id = farmer_uuid
    ORDER BY s.sale_date DESC, s.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get market price summary
CREATE OR REPLACE FUNCTION get_market_price_summary()
RETURNS TABLE (
    market_name VARCHAR(100),
    location VARCHAR(100),
    current_price DECIMAL(10,2),
    previous_price DECIMAL(10,2),
    price_change DECIMAL(10,2),
    price_change_percentage DECIMAL(5,2),
    last_updated TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    WITH latest_prices AS (
        SELECT 
            market_name,
            location,
            price,
            price_date,
            ROW_NUMBER() OVER (PARTITION BY market_name, location ORDER BY price_date DESC) as rn
        FROM price_data
    ),
    previous_prices AS (
        SELECT 
            market_name,
            location,
            price,
            price_date,
            ROW_NUMBER() OVER (PARTITION BY market_name, location ORDER BY price_date DESC) as rn
        FROM price_data
    )
    SELECT 
        lp.market_name,
        lp.location,
        lp.price as current_price,
        pp.price as previous_price,
        lp.price - pp.price as price_change,
        ROUND(((lp.price - pp.price) / pp.price) * 100, 2) as price_change_percentage,
        NOW() as last_updated
    FROM latest_prices lp
    LEFT JOIN previous_prices pp ON lp.market_name = pp.market_name 
        AND lp.location = pp.location 
        AND pp.rn = 2
    WHERE lp.rn = 1;
END;
$$ LANGUAGE plpgsql;

-- Success message
SELECT 'TurmerLink database setup completed successfully! 🌱' as message;
