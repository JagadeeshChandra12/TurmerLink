# 🚀 TurmerLink Hackathon Setup Guide

## Quick Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Supabase Database
1. Go to your Supabase project: https://fnwmvnwzirxagcyxwid.supabase.co
2. Navigate to SQL Editor
3. Copy and paste the entire content of `supabase-setup.sql` file
4. Click "Run" to execute the SQL script
5. This will create all tables, insert sample data, and set up the database

### 3. Configure Environment Variables
Create a `.env` file in your project root with:
```env
REACT_APP_SUPABASE_URL=https://fnwmvnwzirxagcyxwid.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZud212bmV3emlyeGFnY3l4d2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDY5OTEsImV4cCI6MjA3Njk4Mjk5MX0.8-udxQ9Uwe55jXsyzxleXIc2e6Pif3tEFUYa9-pyU8w
```

### 4. Start the Application
```bash
npm start
```

### 5. Open in Browser
Navigate to `http://localhost:3000`

## 🎯 Demo Features

### Test User Accounts
- **Farmer**: Phone: 9876543210 (Rama Rao)
- **Admin**: Phone: 9876543213 (Extension Officer)
- **Cooperative**: Phone: 9876543214 (Cooperative Head)

### Key Features to Demo
1. **Login**: Use any phone number (OTP will be mocked)
2. **Dashboard**: Live prices, MSP, weather, trends
3. **Digital Ledger**: Add sales, view transactions, blockchain verification
4. **Learning**: Videos, FAQ, guides
5. **Notifications**: Alerts and notifications
6. **Admin Panel**: Transaction verification, system monitoring
7. **Mobile**: Responsive design, mobile navigation

### Sample Data Included
- ✅ 5 sample users (farmers, admin, cooperative)
- ✅ 20 sample sales transactions
- ✅ 30 days of price data
- ✅ Weather data
- ✅ Educational videos and FAQ
- ✅ Notifications
- ✅ MSP data

## 🔧 Technical Notes

### Database Tables Created
- `users` - User accounts and profiles
- `sales` - Transaction records with blockchain hashes
- `msp_data` - Minimum Support Price data
- `price_data` - Market price history
- `weather_data` - Weather information
- `videos` - Educational content
- `notifications` - Alert system
- `faqs` - Frequently asked questions
- `guides` - Step-by-step guides

### Key Functions
- `get_farmer_recent_sales()` - Get farmer's transaction history
- `get_market_price_summary()` - Current market prices
- `farmer_dashboard_summary` - Dashboard statistics view
- `market_price_trends` - Price trend analysis

### Blockchain Simulation
- Hash-based transaction verification
- Tamper-proof records
- Transaction integrity checking

## 🎨 UI/UX Features

### Design
- **Mobile-first** responsive design
- **Telugu + English** language support
- **Earthy color scheme** (greens, yellows, browns)
- **Large buttons** for rural usability
- **Clean, simple** interface

### Navigation
- **Desktop**: Top navigation bar
- **Mobile**: Bottom tab navigation
- **Admin**: Role-based access

### Components
- **Price Cards**: Live market data
- **Weather Widget**: Local forecasts
- **Charts**: Price trends and predictions
- **Forms**: Transaction recording
- **Notifications**: Alert management

## 🚀 Ready to Demo!

The application is fully functional with:
- ✅ Authentication system
- ✅ Dashboard with live data
- ✅ Digital ledger with blockchain
- ✅ Learning center
- ✅ Notification system
- ✅ Admin panel
- ✅ Mobile optimization
- ✅ Multi-language support

**Perfect for hackathon demo! 🌱**
