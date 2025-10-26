-- TurmerLink Database Schema
-- Supabase PostgreSQL setup

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

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Farmers can only see their own sales
CREATE POLICY "Farmers can view own sales" ON sales FOR SELECT USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can insert own sales" ON sales FOR INSERT WITH CHECK (auth.uid() = farmer_id);
CREATE POLICY "Farmers can update own sales" ON sales FOR UPDATE USING (auth.uid() = farmer_id);

-- Users can only see their own notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Public data (no RLS needed)
-- msp_data, price_data, weather_data, videos, faqs, guides are public

-- Insert sample data
INSERT INTO msp_data (commodity, current_msp, previous_msp, effective_date, change_amount, change_percentage) VALUES
('turmeric', 7500.00, 7200.00, '2024-01-01', 300.00, 4.17);

INSERT INTO videos (title, description, category, youtube_id, duration, language) VALUES
('Best Practices for Turmeric Farming', 'Learn the essential techniques for growing high-quality turmeric', 'cultivation', 'dQw4w9WgXcQ', '15:30', 'te'),
('Soil Preparation and Planting', 'Step-by-step guide to preparing soil and planting turmeric', 'cultivation', 'dQw4w9WgXcQ', '12:45', 'te'),
('When and How to Harvest Turmeric', 'Learn the right time and methods for harvesting turmeric', 'harvesting', 'dQw4w9WgXcQ', '14:15', 'te');

INSERT INTO faqs (question, answer, category, language) VALUES
('What is the best time to plant turmeric?', 'Turmeric is typically planted in April-May during the pre-monsoon period. The soil should be well-prepared with organic matter.', 'cultivation', 'te'),
('How long does it take for turmeric to mature?', 'Turmeric takes about 7-9 months to mature. The leaves start turning yellow and drying up when it''s ready for harvest.', 'cultivation', 'te'),
('What is the ideal soil type for turmeric cultivation?', 'Turmeric grows best in well-drained, loamy soil with good organic content. The soil should have a pH between 5.5 to 7.5.', 'cultivation', 'te');

INSERT INTO guides (title, description, icon, steps, language) VALUES
('Storage Guide', 'How to store turmeric properly to maintain quality', '📦', '["Clean and dry the turmeric rhizomes", "Store in a cool, dry place", "Use proper containers to prevent moisture", "Check regularly for any signs of spoilage"]', 'te'),
('Transportation Tips', 'Best practices for transporting turmeric to market', '🚚', '["Use clean, dry bags or containers", "Avoid direct sunlight during transport", "Ensure proper ventilation", "Handle with care to prevent damage"]', 'te'),
('Quality Standards', 'Understanding quality parameters for better prices', '⭐', '["Check for uniform color and size", "Ensure proper drying", "Remove damaged or diseased rhizomes", "Maintain cleanliness throughout"]', 'te');
