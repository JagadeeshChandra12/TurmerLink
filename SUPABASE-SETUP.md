# TurmerLink Supabase Setup Guide

## 🚀 Quick Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `turmerlink`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your location
6. Click "Create new project"

### 2. Get Your Project Credentials
1. Go to **Settings** → **API**
2. Copy your:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon Key** (starts with: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Update Configuration
1. Open `src/config/supabase.js`
2. Replace `YOUR_SUPABASE_PROJECT_URL` with your Project URL
3. Replace `YOUR_SUPABASE_ANON_KEY` with your Anon Key

### 4. Run Database Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the entire content from `supabase-schema.sql`
3. Paste it in the SQL Editor
4. Click **Run** to execute the schema

### 5. Verify Setup
1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - `farmers`
   - `government_officers`
   - `sales`
   - `submissions`
   - `market_prices`
   - `weather_data`
   - `notifications`

## 📊 Database Schema Overview

### Tables Created:
- **farmers** - Farmer profiles and authentication
- **government_officers** - Government officer accounts
- **sales** - Farmer sales records
- **submissions** - Government purchase submissions
- **market_prices** - Live market price data
- **weather_data** - Weather information
- **notifications** - System notifications

### Sample Data Included:
- 5 sample farmers
- 8 government officers
- 3 sample sales
- 3 sample submissions
- 4 market price entries
- 3 weather data entries
- 3 notifications

## 🔧 Configuration Details

### Supabase Client Features:
- **Auto-refresh tokens** - Automatic session management
- **Persist sessions** - Login state maintained across browser sessions
- **URL detection** - Handles auth callbacks automatically

### Database Features:
- **UUID primary keys** - Secure, unique identifiers
- **Foreign key relationships** - Data integrity
- **Timestamps** - Created/updated tracking
- **Indexes** - Optimized query performance
- **Triggers** - Automatic updated_at timestamps
- **RLS Disabled** - As requested for prototype

## 🎯 Next Steps

1. **Test the connection** by running your React app
2. **Check browser console** for any connection errors
3. **Verify data** appears in Supabase dashboard
4. **Test CRUD operations** through your app

## 🚨 Important Notes

- **RLS is disabled** as requested for prototype
- **Sample passwords** are not secure - change for production
- **Anon key** is safe to use in frontend (it's designed for this)
- **Database password** is only needed for direct database access

## 📞 Support

If you encounter any issues:
1. Check Supabase dashboard for errors
2. Verify your URL and key are correct
3. Ensure the SQL schema ran successfully
4. Check browser console for connection errors
