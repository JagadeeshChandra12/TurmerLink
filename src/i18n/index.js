import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  translation: {
    // Navigation
    dashboard: 'Dashboard',
    ledger: 'Digital Ledger',
    learning: 'Learning',
    notifications: 'Notifications',
    profile: 'Profile',
    
    // Dashboard
    livePrices: 'Live Turmeric Prices',
    mspRates: 'MSP Rates',
    weather: 'Weather',
    priceTrend: 'Price Trend',
    todayPrice: 'Today\'s Price',
    mspPrice: 'MSP Price',
    weatherForecast: 'Weather Forecast',
    next7Days: 'Next 7 Days',
    
    // Common
    login: 'Login',
    logout: 'Logout',
    phoneNumber: 'Phone Number',
    enterOTP: 'Enter OTP',
    verify: 'Verify',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Ledger
    addSale: 'Add Sale',
    saleDate: 'Sale Date',
    quantity: 'Quantity (kg)',
    price: 'Price (₹/kg)',
    buyer: 'Buyer',
    paymentStatus: 'Payment Status',
    paid: 'Paid',
    pending: 'Pending',
    delayed: 'Delayed',
    
    // Learning
    watchVideos: 'Watch Videos',
    faq: 'FAQ',
    guides: 'Guides',
    
    // Notifications
    priceAlerts: 'Price Alerts',
    paymentAlerts: 'Payment Alerts',
    marketAlerts: 'Market Alerts',
    
    // Units
    kg: 'kg',
    rupees: '₹',
    perKg: '₹/kg'
  }
};

// Telugu translations
const te = {
  translation: {
    // Navigation
    dashboard: 'డ్యాష్‌బోర్డ్',
    ledger: 'డిజిటల్ లెడ్జర్',
    learning: 'అభ్యాసం',
    notifications: 'నోటిఫికేషన్‌లు',
    profile: 'ప్రొఫైల్',
    
    // Dashboard
    livePrices: 'నిజ-సమయ టర్మరిక్ ధరలు',
    mspRates: 'MSP రేట్లు',
    weather: 'వాతావరణం',
    priceTrend: 'ధర ట్రెండ్',
    todayPrice: 'ఈరోజు ధర',
    mspPrice: 'MSP ధర',
    weatherForecast: 'వాతావరణ అంచనా',
    next7Days: 'తదుపరి 7 రోజులు',
    
    // Common
    login: 'లాగిన్',
    logout: 'లాగ్‌అవుట్',
    phoneNumber: 'ఫోన్ నంబర్',
    enterOTP: 'OTP ని నమోదు చేయండి',
    verify: 'ధృవీకరించండి',
    submit: 'సమర్పించండి',
    cancel: 'రద్దు చేయండి',
    save: 'సేవ్ చేయండి',
    edit: 'సవరించండి',
    delete: 'తొలగించండి',
    view: 'చూడండి',
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    success: 'విజయం',
    
    // Ledger
    addSale: 'అమ్మకం జోడించండి',
    saleDate: 'అమ్మకం తేదీ',
    quantity: 'పరిమాణం (కిలో)',
    price: 'ధర (₹/కిలో)',
    buyer: 'కొనుగోలుదారు',
    paymentStatus: 'చెల్లింపు స్థితి',
    paid: 'చెల్లించబడింది',
    pending: 'వేచి ఉంది',
    delayed: 'విలంబం',
    
    // Learning
    watchVideos: 'వీడియోలు చూడండి',
    faq: 'ప్రశ్నలు',
    guides: 'గైడ్‌లు',
    
    // Notifications
    priceAlerts: 'ధర హెచ్చరికలు',
    paymentAlerts: 'చెల్లింపు హెచ్చరికలు',
    marketAlerts: 'మార్కెట్ హెచ్చరికలు',
    
    // Units
    kg: 'కిలో',
    rupees: '₹',
    perKg: '₹/కిలో'
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      te
    },
    lng: 'te', // Default to Telugu
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
