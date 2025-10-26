-- TurmerLink Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Farmers table
CREATE TABLE farmers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    language VARCHAR(5) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Government Officers table
CREATE TABLE government_officers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    officer_id VARCHAR(20) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sales table
CREATE TABLE sales (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    farmer_id UUID REFERENCES farmers(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    quantity INTEGER NOT NULL, -- in quintals
    price DECIMAL(10,2) NOT NULL, -- price per quintal
    buyer VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, cancelled
    total_amount DECIMAL(12,2) NOT NULL,
    quality VARCHAR(20) DEFAULT 'Grade A',
    blockchain_id VARCHAR(20),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Submissions table (for government purchases)
CREATE TABLE submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    farmer_id UUID REFERENCES farmers(id) ON DELETE CASCADE,
    farmer_name VARCHAR(100) NOT NULL,
    farmer_phone VARCHAR(15) NOT NULL,
    location VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL, -- in quintals
    quality VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL, -- price per quintal
    total_value DECIMAL(12,2) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    government_response TIMESTAMP WITH TIME ZONE,
    government_officer_id UUID REFERENCES government_officers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Market Prices table
CREATE TABLE market_prices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    location VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    change_amount DECIMAL(10,2) DEFAULT 0,
    change_percentage DECIMAL(5,2) DEFAULT 0,
    trend VARCHAR(10), -- up, down, stable
    volume INTEGER,
    quality VARCHAR(20),
    source VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weather Data table
CREATE TABLE weather_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    location VARCHAR(100) NOT NULL,
    temperature DECIMAL(5,2),
    humidity INTEGER,
    condition VARCHAR(50),
    description TEXT,
    wind_speed DECIMAL(5,2),
    pressure DECIMAL(8,2),
    visibility INTEGER,
    uv_index INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    farmer_id UUID REFERENCES farmers(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info', -- info, warning, success, error
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data

-- Sample Farmers
INSERT INTO farmers (phone_number, name, location, language) VALUES
('9876543210', 'రామయ్య', 'నిజామాబాద్', 'te'),
('9876543211', 'లక్ష్మయ్య', 'కరీంనగర్', 'te'),
('9876543212', 'వెంకటేశ్వర్లు', 'అదిలాబాద్', 'te'),
('9876543213', 'Extension Officer', 'నిజామాబాద్', 'en'),
('9876543214', 'Cooperative Head', 'కరీంనగర్', 'en');

-- Sample Government Officers
INSERT INTO government_officers (officer_id, department, department_name, name, password_hash) VALUES
('AGR001', 'agriculture', 'Agriculture Department', 'Agriculture Officer 1', '$2a$10$example_hash_1'),
('AGR002', 'agriculture', 'Agriculture Department', 'Agriculture Officer 2', '$2a$10$example_hash_2'),
('MKT001', 'marketing', 'Marketing Department', 'Marketing Officer 1', '$2a$10$example_hash_3'),
('MKT002', 'marketing', 'Marketing Department', 'Marketing Officer 2', '$2a$10$example_hash_4'),
('COP001', 'cooperation', 'Cooperation Department', 'Cooperation Officer 1', '$2a$10$example_hash_5'),
('COP002', 'cooperation', 'Cooperation Department', 'Cooperation Officer 2', '$2a$10$example_hash_6'),
('PRO001', 'procurement', 'Procurement Department', 'Procurement Officer 1', '$2a$10$example_hash_7'),
('PRO002', 'procurement', 'Procurement Department', 'Procurement Officer 2', '$2a$10$example_hash_8');

-- Sample Sales
INSERT INTO sales (farmer_id, date, quantity, price, buyer, status, total_amount, quality, blockchain_id, verified) VALUES
((SELECT id FROM farmers WHERE phone_number = '9876543210'), '2024-01-15', 5, 8500, 'Local Trader', 'paid', 42500, 'Grade A', 'BC001', TRUE),
((SELECT id FROM farmers WHERE phone_number = '9876543210'), '2024-01-10', 3, 8200, 'Export Company', 'pending', 24600, 'Export Grade', 'BC002', TRUE),
((SELECT id FROM farmers WHERE phone_number = '9876543211'), '2024-01-12', 4, 8800, 'Wholesale Buyer', 'paid', 35200, 'Grade A', 'BC003', TRUE);

-- Sample Submissions
INSERT INTO submissions (farmer_id, farmer_name, farmer_phone, location, quantity, quality, price, total_value, description, status, government_response) VALUES
((SELECT id FROM farmers WHERE phone_number = '9876543210'), 'రామయ్య', '9876543210', 'నిజామాబాద్', 5, 'Grade A', 8500, 42500, 'ఉత్తమ నాణ్యత టర్మరిక్', 'approved', '2024-01-21'),
((SELECT id FROM farmers WHERE phone_number = '9876543211'), 'లక్ష్మయ్య', '9876543211', 'కరీంనగర్', 3, 'Export Grade', 9200, 27600, 'ఎగుమతి నాణ్యత టర్మరిక్', 'pending', NULL),
((SELECT id FROM farmers WHERE phone_number = '9876543212'), 'వెంకటేశ్వర్లు', '9876543212', 'అదిలాబాద్', 7, 'Grade B', 7800, 54600, 'సాధారణ నాణ్యత టర్మరిక్', 'rejected', '2024-01-19');

-- Sample Market Prices
INSERT INTO market_prices (location, price, change_amount, change_percentage, trend, volume, quality, source) VALUES
('నిజామాబాద్', 8500, 300, 3.66, 'up', 1500, 'Grade A', 'Local Market'),
('కరీంనగర్', 8200, -200, -2.38, 'down', 1200, 'Grade A', 'Local Market'),
('అదిలాబాద్', 7800, 100, 1.30, 'up', 800, 'Grade B', 'Local Market'),
('MSP', 7000, 0, 0, 'stable', 0, 'All Grades', 'Government');

-- Sample Weather Data
INSERT INTO weather_data (location, temperature, humidity, condition, description, wind_speed, pressure, visibility, uv_index) VALUES
('నిజామాబాద్', 28.5, 65, 'Partly Cloudy', 'Partly cloudy with light winds', 12.5, 1013.2, 10, 6),
('కరీంనగర్', 30.2, 58, 'Sunny', 'Clear sunny day', 8.3, 1012.8, 15, 8),
('అదిలాబాద్', 26.8, 72, 'Cloudy', 'Overcast with high humidity', 6.7, 1014.1, 8, 4);

-- Sample Notifications
INSERT INTO notifications (farmer_id, title, message, type) VALUES
((SELECT id FROM farmers WHERE phone_number = '9876543210'), 'Submission Approved', 'Your turmeric submission has been approved by the government.', 'success'),
((SELECT id FROM farmers WHERE phone_number = '9876543211'), 'Price Alert', 'Turmeric prices have increased in your area.', 'info'),
((SELECT id FROM farmers WHERE phone_number = '9876543212'), 'Weather Warning', 'Heavy rain expected in your area. Protect your crops.', 'warning');

-- Create indexes for better performance
CREATE INDEX idx_farmers_phone ON farmers(phone_number);
CREATE INDEX idx_sales_farmer_id ON sales(farmer_id);
CREATE INDEX idx_sales_date ON sales(date);
CREATE INDEX idx_submissions_farmer_id ON submissions(farmer_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_market_prices_location ON market_prices(location);
CREATE INDEX idx_market_prices_created_at ON market_prices(created_at);
CREATE INDEX idx_weather_data_location ON weather_data(location);
CREATE INDEX idx_notifications_farmer_id ON notifications(farmer_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_farmers_updated_at BEFORE UPDATE ON farmers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_government_officers_updated_at BEFORE UPDATE ON government_officers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sales_updated_at BEFORE UPDATE ON sales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Disable RLS (Row Level Security) as requested
ALTER TABLE farmers DISABLE ROW LEVEL SECURITY;
ALTER TABLE government_officers DISABLE ROW LEVEL SECURITY;
ALTER TABLE sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices DISABLE ROW LEVEL SECURITY;
ALTER TABLE weather_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;
