import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { SubmissionProvider } from '../../contexts/SubmissionContext';
import ErrorBoundary from '../ErrorBoundary';
import SimpleRuralHomePage from '../Layout/SimpleRuralHomePage';
import MarketPricesPage from '../Pages/MarketPricesPage';
import MySalesPage from '../Pages/MySalesPage';
import LearningPage from '../Pages/LearningPage';
import WeatherPage from '../Pages/WeatherPage';
import MSPPage from '../Pages/MSPPage';
import NotificationsPage from '../Pages/NotificationsPage';
import ProfilePage from '../Pages/ProfilePage';
import LoginForm from '../Auth/LoginForm';
import GovernmentLoginPage from '../Pages/GovernmentLoginPage';
import GovernmentDashboard from '../Pages/GovernmentDashboard';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [governmentUser, setGovernmentUser] = useState(null);
  // const { language } = useLanguage(); // Unused for now

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage('home');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUser(updatedProfile);
  };

  const handleGovernmentLogin = (govUser) => {
    setGovernmentUser(govUser);
    setCurrentPage('government-dashboard');
  };

  const handleGovernmentLogout = () => {
    setGovernmentUser(null);
    setCurrentPage('home');
  };

  if (!user && !governmentUser) {
    if (currentPage === 'government-login') {
      return <GovernmentLoginPage onBack={() => setCurrentPage('home')} onGovernmentLogin={handleGovernmentLogin} />;
    }
    return <LoginForm onLogin={handleLogin} onGovernmentLogin={() => setCurrentPage('government-login')} />;
  }

  // Government Dashboard
  if (governmentUser) {
    return (
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
        {currentPage === 'government-dashboard' && (
          <GovernmentDashboard 
            key="government-dashboard" 
            onBack={() => setCurrentPage('home')} 
            governmentUser={governmentUser}
            onLogout={handleGovernmentLogout}
          />
        )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <SimpleRuralHomePage 
            key="home" 
            onNavigate={handleNavigate} 
            user={user}
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
        {currentPage === 'dashboard' && (
          <MarketPricesPage key="dashboard" onBack={handleBack} />
        )}
        {currentPage === 'ledger' && (
          <MySalesPage key="ledger" onBack={handleBack} user={user} />
        )}
        {currentPage === 'learning' && (
          <LearningPage key="learning" onBack={handleBack} />
        )}
        {currentPage === 'weather' && (
          <WeatherPage key="weather" onBack={handleBack} />
        )}
        {currentPage === 'msp' && (
          <MSPPage key="msp" onBack={handleBack} />
        )}
        {currentPage === 'notifications' && (
          <NotificationsPage key="notifications" onBack={handleBack} />
        )}
        {currentPage === 'profile' && (
          <ProfilePage key="profile" onBack={handleBack} user={user} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile} />
        )}
      </AnimatePresence>

      {/* User Info & Logout */}
      <div className="fixed top-4 right-4 z-40">
        <div className="bg-white rounded-lg shadow-lg p-3 flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-semibold text-sm">
              {user?.name?.charAt(0) || 'F'}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{user?.name}</div>
            <div className="text-xs text-gray-500">{user?.phoneNumber}</div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <SubmissionProvider>
          <AppContent />
        </SubmissionProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;
