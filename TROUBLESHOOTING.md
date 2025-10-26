# 🔧 TurmerLink Troubleshooting Guide

## "Failed to perform authorization check" Error

This error typically occurs due to one of these issues:

### 1. **Environment Variables Not Loaded**
**Solution:** The app now has hardcoded Supabase credentials as fallbacks, so this should work even without a `.env` file.

### 2. **Database Not Set Up**
**Solution:** Make sure you've run the `supabase-setup.sql` script in your Supabase SQL Editor.

### 3. **RLS (Row Level Security) Issues**
**Solution:** For hackathon purposes, we've disabled RLS. If you still get errors, check your Supabase project settings.

## 🧪 **Test Connection**

1. **Start the app:**
   ```bash
   npm start
   ```

2. **Navigate to test page:**
   ```
   http://localhost:3000/test
   ```

3. **Check connection status:**
   - ✅ Green = Connection successful
   - ❌ Red = Connection failed (check error message)

## 🔍 **Common Issues & Solutions**

### Issue 1: "Invalid API key"
**Solution:** 
- Check if your Supabase project is active
- Verify the anon key is correct
- Make sure you're using the right project URL

### Issue 2: "Table doesn't exist"
**Solution:**
- Run the complete `supabase-setup.sql` script
- Check if all tables were created successfully

### Issue 3: "Permission denied"
**Solution:**
- Check Supabase project settings
- Ensure RLS is disabled for hackathon
- Verify your anon key has proper permissions

### Issue 4: "Network error"
**Solution:**
- Check your internet connection
- Verify Supabase project URL is accessible
- Try refreshing the page

## 🚀 **Quick Fixes**

### Fix 1: Restart Development Server
```bash
# Stop the server (Ctrl+C)
npm start
```

### Fix 2: Clear Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or open in incognito/private mode

### Fix 3: Check Supabase Dashboard
1. Go to https://fnwmvnwzirxagcyxwid.supabase.co
2. Check if your project is active
3. Verify the anon key in Settings > API

### Fix 4: Verify Database Setup
1. Go to Supabase SQL Editor
2. Run: `SELECT * FROM users LIMIT 1;`
3. Should return sample data

## 📱 **Test the App**

Once connection is working:

1. **Login:** Use any phone number (OTP is mocked)
2. **Dashboard:** Should show live prices and weather
3. **Ledger:** Add a new sale transaction
4. **Learning:** Browse videos and FAQ
5. **Notifications:** View alerts
6. **Admin:** Check admin dashboard (if logged in as admin)

## 🆘 **Still Having Issues?**

1. **Check browser console** for detailed error messages
2. **Verify Supabase project** is active and accessible
3. **Test with simple query** in Supabase SQL Editor
4. **Try different browser** or incognito mode

## 🎯 **Success Indicators**

You'll know everything is working when:
- ✅ Connection test shows green
- ✅ Dashboard loads with sample data
- ✅ You can add/view transactions
- ✅ Videos and FAQ load properly
- ✅ Notifications appear

**The app is designed to work even with limited internet connectivity for hackathon demo purposes!** 🌱
