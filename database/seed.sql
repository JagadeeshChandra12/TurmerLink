-- TurmerLink Database Seed Data
-- Sample data for development and testing

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

-- Update sales with proper transaction hashes
UPDATE sales 
SET transaction_hash = encode(gen_random_bytes(16), 'hex')
WHERE transaction_hash IS NULL;

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
