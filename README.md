# TurmerLink - Farmers Market Access Platform

A comprehensive web application designed to empower turmeric farmers in Nizamabad with direct market access, price transparency, and educational resources.

## 🌱 Features

### Core Functionality
- **Live Price Tracking**: Real-time turmeric prices from multiple markets
- **MSP Monitoring**: Government Minimum Support Price tracking with alerts
- **Digital Ledger**: Tamper-proof transaction recording using blockchain simulation
- **Weather Updates**: Local weather forecasts affecting farming decisions
- **Price Predictions**: AI-powered 7-day price trend predictions
- **Educational Content**: Video tutorials and farming guides
- **SMS Notifications**: Daily price alerts and payment notifications
- **Multi-language Support**: Telugu (default) and English

### User Roles
- **Farmer**: Primary users with access to all features
- **Admin/Extension Officer**: Data verification and alert management
- **Cooperative**: Group sales and bulk order management (future)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Supabase account (for database)
- Twilio account (for SMS)
- OpenWeatherMap API key (for weather)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd turmerlink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   Fill in your API keys and configuration in `.env`

4. **Start Development Server**
   ```bash
   npm start
   ```

5. **Open in Browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard widgets and charts
│   ├── Ledger/         # Digital ledger and transactions
│   ├── Learning/       # Educational content
│   ├── Layout/         # Navigation and layout
│   └── Notifications/  # Notification system
├── config/             # Configuration files
├── i18n/              # Internationalization
├── services/           # API services
├── utils/             # Utility functions
└── App.js             # Main application
```

## 🛠️ Technology Stack

### Frontend
- **React.js 18** - UI framework
- **Tailwind CSS** - Styling and responsive design
- **React Router** - Navigation
- **Chart.js** - Data visualization
- **React i18next** - Internationalization
- **Heroicons** - Icon library

### Backend Services
- **Supabase** - Database and authentication
- **Blockchain Simulation** - Transaction verification
- **External APIs** - Market data, weather, SMS

### Key Libraries
- `@supabase/supabase-js` - Database client
- `react-chartjs-2` - Chart components
- `crypto-js` - Blockchain hashing
- `axios` - HTTP client
- `react-hot-toast` - Notifications

## 📱 Features Overview

### Dashboard
- Live price cards for different markets
- MSP rate monitoring
- Weather widget with 7-day forecast
- Price trend charts with predictions
- Quick action buttons

### Digital Ledger
- Add new sales transactions
- View transaction history
- Payment status tracking
- Blockchain verification
- Summary statistics

### Learning Center
- Video tutorials by category
- FAQ section
- Step-by-step guides
- Progress tracking

### Notifications
- Price alerts
- Payment confirmations
- Weather warnings
- Market updates
- Filtering and management

## 🌐 Internationalization

The app supports Telugu and English languages:
- Default language: Telugu
- Toggle available in navigation
- All UI text translated
- RTL support for future languages

## 🔐 Authentication

- Phone number + OTP login
- No password required
- Session management
- Role-based access

## 📊 Data Management

### Blockchain Ledger
- Hash-based transaction verification
- Tamper-proof records
- Verification system
- Chain integrity checking

### Database Schema
- Users (farmers, admins, cooperatives)
- Sales transactions
- MSP data
- Price history
- Weather data
- Educational content

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Ensure all required environment variables are set:
- Supabase credentials
- API keys
- SMS gateway configuration

### Hosting
- Compatible with Vercel, Netlify, or any static hosting
- Requires environment variable configuration

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Set up database tables (see database schema)
3. Configure authentication settings
4. Add environment variables

### SMS Integration
1. Set up Twilio account
2. Configure phone number
3. Add credentials to environment

### API Integrations
- Market price APIs
- Weather service
- Government MSP data

## 📈 Future Enhancements

### Planned Features
- **Mobile App**: React Native version
- **Voice Commands**: Telugu voice interface
- **AI Predictions**: Advanced ML models
- **Cooperative Module**: Group selling features
- **Gamification**: Achievement system
- **Offline Support**: PWA capabilities

### Technical Improvements
- Real blockchain integration
- Advanced caching
- Performance optimization
- Security enhancements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- Nizamabad turmeric farmers for requirements
- Government MSP data sources
- Open source community
- Educational content creators

---

**TurmerLink** - Empowering farmers with technology and transparency.
