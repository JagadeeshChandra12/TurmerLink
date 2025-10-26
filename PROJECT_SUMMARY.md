# 🌾 TurmerLink - Project Summary

## 🎯 **Project Overview**
**TurmerLink** is a comprehensive **Farmers Market Access Platform** designed to empower turmeric farmers with direct market access, transparent pricing, and educational resources.

### **Repository:** 
🌐 https://github.com/JagadeeshChandra12/TurmerLink.git

---

## ✨ **Key Features Implemented**

### 1. **User Management System**
- **Phone-based authentication** with OTP verification
- **User registration** with profile details (Name, Village, District, State)
- **Persistent user profiles** stored in Supabase
- **Dynamic user display** - shows actual logged-in user data
- **Multi-language support** (Telugu & English)

### 2. **Market Intelligence**
- **Live price tracking** for turmeric markets
- **MSP monitoring** (Minimum Support Price)
- **Price predictions** with 7-day forecasts
- **Market trend analysis**

### 3. **Government Integration**
- **Government portal** for crop procurement
- **Real-time synchronization** between farmer submissions and government portal
- **Submission management** (Pending, Accepted, Rejected status)
- **LocalStorage-based persistence** for offline functionality

### 4. **Digital Ledger (My Sales)**
- **Transaction recording** and tracking
- **Submit to Government** functionality
- **Sales analytics** and statistics
- **Automatic sync** to government portal

### 5. **Weather Integration**
- **Weather forecasts** for farming decisions
- **Multi-location support**
- **7-day weather predictions**

### 6. **Educational Resources**
- **Learning center** with farming videos
- **Telugu language support**
- **Progressive learning** system

---

## 🛠️ **Technology Stack**

### **Frontend**
- React 18 with Hooks
- Tailwind CSS for styling
- Framer Motion for animations
- Heroicons for UI icons

### **Backend & Database**
- Supabase (PostgreSQL)
- localStorage for offline persistence
- Context API for state management

### **Key Libraries**
- `@supabase/supabase-js` - Database client
- `framer-motion` - Animation library
- `@heroicons/react` - Icon library

---

## 📁 **Project Structure**

```
TurmerLink/
├── src/
│   ├── components/
│   │   ├── Auth/           # Login & Registration
│   │   ├── App/            # Main App component
│   │   ├── Layout/         # Navigation & Home Page
│   │   └── Pages/           # All pages (MySales, MarketPrices, etc.)
│   ├── contexts/           # State management (Language, Submissions)
│   ├── config/             # Supabase configuration
│   └── App.js              # App entry point
├── public/                 # Static assets
├── database/               # SQL schemas
└── README.md              # Complete documentation
```

---

## 🚀 **How to Run**

### **Prerequisites**
- Node.js 16+ and npm
- Supabase account

### **Installation**
```bash
npm install
```

### **Start Development Server**
```bash
npm start
```

### **Build for Production**
```bash
npm run build
```

---

## 🔑 **Key Features Breakdown**

### **1. User Authentication Flow**
1. User enters phone number
2. OTP verification (Demo OTP: 123456)
3. Check if user exists in database
4. If new user → Registration form
5. If existing user → Login with profile
6. Display personalized dashboard

### **2. Government-Farmer Sync**
```
Farmer submits crop → Saved to localStorage → 
Government sees in portal → Accepts/Rejects → 
Status updates in farmer account
```

### **3. Multi-language Support**
- Default: Telugu (తెలుగు)
- Toggle: English available
- All UI text translated

---

## 📊 **Database Schema (Supabase)**

### **Tables Created:**
1. `farmers` - User profiles
2. `submissions` - Crop submissions to government
3. Schema defined in `database/schema.sql`

---

## 🎨 **UI/UX Highlights**

- **Rural-friendly design** with large buttons and icons
- **Color-coded features** for easy navigation
- **Telugu language** for local farmers
- **Mobile responsive**
- **Smooth animations** with Framer Motion

---

## 📝 **Recent Updates**

✅ **User Registration System** - New users fill profile on first login  
✅ **Dynamic User Display** - Shows actual logged-in user name  
✅ **Government Portal Sync** - Real-time submission tracking  
✅ **Removed Supabase Test** - Clean home page interface  
✅ **localStorage Persistence** - Offline functionality  

---

## 🔗 **Important Links**

- **GitHub Repository**: https://github.com/JagadeeshChandra12/TurmerLink.git
- **Supabase Project**: Configured with RLS off for prototype
- **Demo OTP**: 123456 (for testing)

---

## 📧 **Contact & Support**

For issues, questions, or contributions:
- Create an issue in the GitHub repository
- Check the documentation in `/docs` folder

---

**TurmerLink** - Empowering farmers with technology and transparency! 🌾✨

