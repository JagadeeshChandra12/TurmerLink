import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  CurrencyRupeeIcon, 
  BookOpenIcon, 
  AcademicCapIcon, 
  BellIcon,
  SunIcon,
  ShieldCheckIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  CameraIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const SimpleRuralHomePage = ({ onNavigate, user, onLogout, onUpdateProfile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { language, changeLanguage } = useLanguage();
  
  // User profile state - use actual user data
  const [userProfile, setUserProfile] = useState({
    name: user?.name || 'Farmer',
    phone: user?.phoneNumber ? `+91 ${user.phoneNumber}` : '+91 0000000000',
    village: user?.village || 'Unknown',
    district: user?.district || 'Unknown',
    state: user?.state || 'Unknown',
    farmerId: user?.id ? `FARM${user.id.toString().padStart(3, '0')}` : 'FARM001',
    joinDate: user?.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-15',
    totalSales: '₹0', // This will be calculated from actual sales data
    avatar: user?.name ? user.name.charAt(0).toUpperCase() : 'F'
  });

  const [editForm, setEditForm] = useState({
    name: user?.name || 'Farmer',
    phone: user?.phoneNumber ? `+91 ${user.phoneNumber}` : '+91 0000000000',
    village: user?.village || 'Unknown',
    district: user?.district || 'Unknown',
    state: user?.state || 'Unknown'
  });

  const features = [
    {
      id: 'dashboard',
      title: language === 'te' ? 'మార్కెట్ ధరలు' : 'Market Prices',
      subtitle: language === 'te' ? 'లైవ్ టర్మరిక్ ధరలు' : 'Live turmeric prices',
      icon: CurrencyRupeeIcon,
      color: 'bg-green-500',
      description: language === 'te' ? 'ప్రస్తుత మార్కెట్ ధరలను తనిఖీ చేయండి' : 'Check current market prices'
    },
    {
      id: 'ledger',
      title: language === 'te' ? 'నా అమ్మకాలు' : 'My Sales',
      subtitle: language === 'te' ? 'డిజిటల్ లెడ్జర్' : 'Digital ledger',
      icon: BookOpenIcon,
      color: 'bg-blue-500',
      description: language === 'te' ? 'మీ అమ్మకాలను రికార్డ్ చేసి ట్రాక్ చేయండి' : 'Record and track your sales'
    },
    {
      id: 'learning',
      title: language === 'te' ? 'నేర్చుకోండి' : 'Learn',
      subtitle: language === 'te' ? 'వ్యవసాయ చిట్కాలు' : 'Farming tips',
      icon: AcademicCapIcon,
      color: 'bg-purple-500',
      description: language === 'te' ? 'వీడియోలు చూసి వ్యవసాయం నేర్చుకోండి' : 'Watch videos and learn farming'
    },
    {
      id: 'notifications',
      title: language === 'te' ? 'అలర్ట్లు' : 'Alerts',
      subtitle: language === 'te' ? 'ధర నవీకరణలు' : 'Price updates',
      icon: BellIcon,
      color: 'bg-orange-500',
      description: language === 'te' ? 'ధర మరియు వాతావరణ అలర్ట్లను పొందండి' : 'Get price and weather alerts'
    },
    {
      id: 'weather',
      title: language === 'te' ? 'వాతావరణం' : 'Weather',
      subtitle: language === 'te' ? 'వేసవి' : 'Forecast',
      icon: SunIcon,
      color: 'bg-yellow-500',
      description: language === 'te' ? 'వ్యవసాయం కోసం వాతావరణాన్ని తనిఖీ చేయండి' : 'Check weather for farming'
    },
    {
      id: 'msp',
      title: language === 'te' ? 'MSP రేట్లు' : 'MSP Rates',
      subtitle: language === 'te' ? 'ప్రభుత్వ ధరలు' : 'Government prices',
      icon: ShieldCheckIcon,
      color: 'bg-indigo-500',
      description: language === 'te' ? 'కనీస మద్దతు ధర' : 'Minimum Support Price'
    }
  ];


  const handleFeatureClick = (featureId) => {
    onNavigate(featureId);
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'te' : 'en';
    changeLanguage(newLanguage);
  };

  const handleNavClick = (section) => {
    if (section === 'supabase-test') {
      onNavigate('supabase-test');
    } else if (section === 'dashboard') {
      onNavigate('dashboard');
    } else if (section === 'ledger') {
      onNavigate('ledger');
    } else if (section === 'learning') {
      onNavigate('learning');
    } else if (section === 'contact') {
      alert(language === 'te' ? 'సంప్రదించండి: +91 9876543210' : 'Contact: +91 9876543210');
    }
  };

  const handleSaveProfile = () => {
    setUserProfile({
      ...userProfile,
      ...editForm,
      avatar: editForm.name.charAt(0).toUpperCase()
    });
    setIsEditingProfile(false);
    alert(language === 'te' ? 'ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది!' : 'Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditForm({
      name: userProfile.name,
      phone: userProfile.phone,
      village: userProfile.village,
      district: userProfile.district,
      state: userProfile.state
    });
  };

  const ProfileEditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {language === 'te' ? 'ప్రొఫైల్ సవరించండి' : 'Edit Profile'}
          </h3>
          <button
            onClick={handleCancelEdit}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-3xl font-bold">{editForm.name.charAt(0).toUpperCase()}</span>
            </div>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              <CameraIcon className="h-5 w-5 inline mr-1" />
              {language === 'te' ? 'ఫోటో మార్చండి' : 'Change Photo'}
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'పేరు' : 'Name'}
              </label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={language === 'te' ? 'మీ పేరు నమోదు చేయండి' : 'Enter your name'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'ఫోన్ నంబర్' : 'Phone Number'}
              </label>
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={language === 'te' ? 'ఫోన్ నంబర్ నమోదు చేయండి' : 'Enter phone number'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'గ్రామం' : 'Village'}
              </label>
              <input
                type="text"
                value={editForm.village}
                onChange={(e) => setEditForm({...editForm, village: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={language === 'te' ? 'గ్రామం నమోదు చేయండి' : 'Enter village'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'జిల్లా' : 'District'}
              </label>
              <input
                type="text"
                value={editForm.district}
                onChange={(e) => setEditForm({...editForm, district: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={language === 'te' ? 'జిల్లా నమోదు చేయండి' : 'Enter district'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'రాష్ట్రం' : 'State'}
              </label>
              <input
                type="text"
                value={editForm.state}
                onChange={(e) => setEditForm({...editForm, state: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={language === 'te' ? 'రాష్ట్రం నమోదు చేయండి' : 'Enter state'}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              onClick={handleCancelEdit}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
            </button>
            <button
              onClick={handleSaveProfile}
              className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <CheckIcon className="h-5 w-5" />
              <span>{language === 'te' ? 'సేవ్ చేయండి' : 'Save'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Turmeric background images */}
      <div className="absolute inset-0 opacity-5">
        {/* Turmeric field background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-200 via-yellow-200 to-orange-200"></div>
      </div>
      
      {/* Turmeric images overlay */}
      <div className="absolute inset-0 opacity-15">
        {/* Turmeric root patterns */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-300 to-red-400 rounded-full shadow-lg"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg"></div>
        
        {/* Turmeric leaf patterns */}
        <div className="absolute top-60 left-1/4 w-16 h-16 bg-gradient-to-br from-green-300 to-green-500 rounded-full shadow-lg"></div>
        <div className="absolute top-80 right-1/3 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg"></div>
        <div className="absolute bottom-60 left-1/3 w-14 h-14 bg-gradient-to-br from-green-300 to-green-500 rounded-full shadow-lg"></div>
      </div>
      
      {/* Clean Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-20">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500"></div>
        
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">🌱</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{language === 'te' ? 'టర్మర్‌లింక్' : 'TurmerLink'}</h1>
                <p className="text-sm text-green-600 font-medium">{language === 'te' ? 'హోమ్' : 'Home'}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => handleNavClick('dashboard')}
                className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-200"
              >
                {language === 'te' ? 'మార్కెట్ ధరలు' : 'Market Prices'}
              </button>
              <button 
                onClick={() => handleNavClick('ledger')}
                className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-200"
              >
                {language === 'te' ? 'నా అమ్మకాలు' : 'My Sales'}
              </button>
              <button 
                onClick={() => handleNavClick('learning')}
                className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-200"
              >
                {language === 'te' ? 'నేర్చుకోండి' : 'Learn'}
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg font-medium transition-all duration-200"
              >
                {language === 'te' ? 'సంప్రదించండి' : 'Contact'}
              </button>
            </nav>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Toggle */}
              <button 
                onClick={handleLanguageToggle}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-semibold"
              >
                {language === 'te' ? 'English' : 'తెలుగు'}
              </button>

              {/* Profile Card */}
              <div 
                onClick={() => onNavigate('profile')}
                className="flex items-center space-x-3 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3 cursor-pointer hover:shadow-xl transition-all duration-200 hover:border-green-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center border-2 border-green-200">
                  <span className="text-green-700 font-bold text-lg">{userProfile.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{userProfile.name}</p>
                  <p className="text-sm text-gray-600 truncate">{userProfile.phone}</p>
                </div>
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400 hover:text-green-600 transition-colors" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg border-4 border-yellow-200 flex items-center justify-center">
              <span className="text-4xl">🌱</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'te' ? `${userProfile.name} గారికి TurmerLink కు స్వాగతం` : `Welcome to TurmerLink, ${userProfile.name}`}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'te' ? 'టర్మరిక్ రైతులకు మీ పూర్తి వ్యవసాయ సహచరుడు' : 'Your complete farming companion for turmeric farmers'}
          </p>
        </div>

        {/* Today's Market Overview */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12 border border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {language === 'te' ? 'ఈరోజు మార్కెట్ అవలోకనం' : 'Today\'s Market Overview'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-3 shadow-md flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">₹8,500</div>
              <div className="text-gray-600">{language === 'te' ? 'నిజామాబాద్ ధర' : 'Nizamabad Price'}</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mx-auto mb-3 shadow-md flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">₹7,500</div>
              <div className="text-gray-600">{language === 'te' ? 'MSP రేట్' : 'MSP Rate'}</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-3 shadow-md flex items-center justify-center">
                <span className="text-2xl">☀️</span>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">28°C</div>
              <div className="text-gray-600">{language === 'te' ? 'ఉష్ణోగ్రత' : 'Temperature'}</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full mx-auto mb-3 shadow-md flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">+₹200</div>
              <div className="text-gray-600">{language === 'te' ? 'ధర మార్పు' : 'Price Change'}</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'te' ? '🌱 మా లక్షణాలు' : 'Our Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature.id)}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow border-2 border-transparent hover:border-yellow-300"
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-3">
                      {feature.subtitle}
                    </p>
                    <p className="text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-yellow-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {language === 'te' ? 'త్వరిత చర్యలు' : 'Quick Actions'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={() => handleFeatureClick('dashboard')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
            >
              {language === 'te' ? 'మార్కెట్ ధరలను తనిఖీ చేయండి' : 'Check Market Prices'}
            </button>
            <button 
              onClick={() => handleFeatureClick('ledger')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              {language === 'te' ? 'కొత్త అమ్మకాన్ని రికార్డ్ చేయండి' : 'Record New Sale'}
            </button>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-gradient-to-r from-yellow-800 via-orange-800 to-red-800 text-white py-12 relative">
        {/* Footer background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-10 w-16 h-16 bg-yellow-300 rounded-full"></div>
          <div className="absolute top-8 right-20 w-12 h-12 bg-orange-300 rounded-full"></div>
          <div className="absolute bottom-8 left-32 w-14 h-14 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-4 right-10 w-10 h-10 bg-orange-400 rounded-full"></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🌱</span>
                </div>
                <span className="text-xl font-bold">TurmerLink</span>
              </div>
              <p className="text-gray-400">
                {language === 'te' ? 'టెక్నాలజీ మరియు పారదర్శకతతో టర్మరిక్ రైతులను శక్తివంతం చేస్తోంది.' : 'Empowering turmeric farmers with technology.'}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{language === 'te' ? 'లక్షణాలు' : 'Features'}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{language === 'te' ? 'మార్కెట్ ధరలు' : 'Market Prices'}</li>
                <li>{language === 'te' ? 'డిజిటల్ లెడ్జర్' : 'Digital Ledger'}</li>
                <li>{language === 'te' ? 'నేర్చుకోవడం కేంద్రం' : 'Learning Center'}</li>
                <li>{language === 'te' ? 'వాతావరణ వేసవి' : 'Weather Forecast'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{language === 'te' ? 'మద్దతు' : 'Support'}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{language === 'te' ? 'సహాయ కేంద్రం' : 'Help Center'}</li>
                <li>{language === 'te' ? 'మమ్మల్ని సంప్రదించండి' : 'Contact Us'}</li>
                <li>{language === 'te' ? 'తరచుగా అడిగే ప్రశ్నలు' : 'FAQ'}</li>
                <li>{language === 'te' ? 'సమాజం' : 'Community'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{language === 'te' ? 'సంప్రదించండి' : 'Contact'}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{language === 'te' ? 'నిజామాబాద్, తెలంగాణ' : 'Nizamabad, Telangana'}</li>
                <li>+91 9876543210</li>
                <li>support@turmerlink.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TurmerLink. {language === 'te' ? 'అన్ని హక్కులు ప్రతిష్టాపితం.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🌱</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">TurmerLink</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Language Toggle */}
              <div className="mb-6">
                <button 
                  onClick={handleLanguageToggle}
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors font-semibold"
                >
                  {language === 'te' ? 'English' : 'తెలుగు'}
                </button>
              </div>
              
              <nav className="space-y-4">
                <button 
                  onClick={() => { handleNavClick('dashboard'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-primary-600 font-semibold py-2"
                >
                  {language === 'te' ? '🏠 హోమ్' : '🏠 Home'}
                </button>
                <button 
                  onClick={() => { handleNavClick('dashboard'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-gray-600 py-2"
                >
                  {language === 'te' ? '💰 మార్కెట్ ధరలు' : '💰 Market Prices'}
                </button>
                <button 
                  onClick={() => { handleNavClick('ledger'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-gray-600 py-2"
                >
                  {language === 'te' ? '📊 నా అమ్మకాలు' : '📊 My Sales'}
                </button>
                <button 
                  onClick={() => { handleNavClick('learning'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-gray-600 py-2"
                >
                  {language === 'te' ? '🎓 నేర్చుకోండి' : '🎓 Learning'}
                </button>
                <button 
                  onClick={() => { handleNavClick('contact'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-gray-600 py-2"
                >
                  {language === 'te' ? '📞 సంప్రదించండి' : '📞 Contact'}
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      {isEditingProfile && <ProfileEditModal />}
    </div>
  );
};

export default SimpleRuralHomePage;