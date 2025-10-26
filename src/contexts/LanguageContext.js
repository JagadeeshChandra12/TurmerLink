import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('turmerlink_language');
    return savedLanguage || 'en';
  });

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('turmerlink_language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation helper
export const t = (key, language = 'en') => {
  const translations = {
    en: {
      'market_prices': 'Market Prices',
      'my_sales': 'My Sales',
      'learn': 'Learn',
      'alerts': 'Alerts',
      'weather': 'Weather',
      'msp_rates': 'MSP Rates',
      'home': 'Home',
      'contact': 'Contact',
      'settings': 'Settings',
      'logout': 'Logout',
      'edit_profile': 'Edit Profile',
      'save': 'Save',
      'cancel': 'Cancel',
      'welcome': 'Welcome to TurmerLink',
      'today_market': 'Today\'s Market Overview',
      'nizamabad_price': 'Nizamabad Price',
      'msp_rate': 'MSP Rate',
      'temperature': 'Temperature',
      'price_change': 'Price Change',
      'our_features': 'Our Features',
      'quick_actions': 'Quick Actions',
      'check_prices': 'Check Market Prices',
      'record_sale': 'Record New Sale'
    },
    te: {
      'market_prices': 'మార్కెట్ ధరలు',
      'my_sales': 'నా అమ్మకాలు',
      'learn': 'నేర్చుకోండి',
      'alerts': 'అలర్ట్లు',
      'weather': 'వాతావరణం',
      'msp_rates': 'MSP రేట్లు',
      'home': 'హోమ్',
      'contact': 'సంప్రదించండి',
      'settings': 'సెట్టింగ్లు',
      'logout': 'లాగ్ అవుట్',
      'edit_profile': 'ప్రొఫైల్ సవరించండి',
      'save': 'సేవ్ చేయండి',
      'cancel': 'రద్దు చేయండి',
      'welcome': 'TurmerLink కు స్వాగతం',
      'today_market': 'ఈరోజు మార్కెట్ అవలోకనం',
      'nizamabad_price': 'నిజామాబాద్ ధర',
      'msp_rate': 'MSP రేట్',
      'temperature': 'ఉష్ణోగ్రత',
      'price_change': 'ధర మార్పు',
      'our_features': 'మా లక్షణాలు',
      'quick_actions': 'త్వరిత చర్యలు',
      'check_prices': 'మార్కెట్ ధరలను తనిఖీ చేయండి',
      'record_sale': 'కొత్త అమ్మకాన్ని రికార్డ్ చేయండి'
    }
  };

  return translations[language]?.[key] || key;
};
