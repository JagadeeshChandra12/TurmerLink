import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  BellIcon,
  UserIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';
import MobileNavigation from './MobileNavigation';

const Navigation = ({ user, onLogout, onLanguageToggle }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigationItems = [
    {
      name: t('dashboard'),
      href: '/dashboard',
      icon: HomeIcon,
      current: location.pathname === '/dashboard'
    },
    {
      name: t('ledger'),
      href: '/ledger',
      icon: BookOpenIcon,
      current: location.pathname === '/ledger'
    },
    {
      name: t('learning'),
      href: '/learning',
      icon: AcademicCapIcon,
      current: location.pathname === '/learning'
    },
    {
      name: t('notifications'),
      href: '/notifications',
      icon: BellIcon,
      current: location.pathname === '/notifications'
    }
  ];

  // Add admin link for admin users
  if (user?.role === 'admin') {
    navigationItems.push({
      name: 'Admin',
      href: '/admin',
      icon: UserIcon,
      current: location.pathname === '/admin'
    });
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-turmeric-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900">TurmerLink</span>
              </Link>
            </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu and Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={onLanguageToggle}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              <LanguageIcon className="h-5 w-5" />
              <span>తెలుగు</span>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.name || 'Farmer'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.phoneNumber}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                {t('logout')}
              </button>
            </div>
          </div>

          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNavigation 
        user={user} 
        onLogout={onLogout}
        onLanguageToggle={onLanguageToggle}
      />
    </>
  );
};

export default Navigation;
