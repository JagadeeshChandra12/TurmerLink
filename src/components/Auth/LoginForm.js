import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PhoneIcon, KeyIcon } from '@heroicons/react/24/outline';
import { dbHelpers } from '../../config/supabase';
import UserRegistration from './UserRegistration';

const LoginForm = ({ onLogin, onGovernmentLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone', 'otp', or 'registration'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language, changeLanguage } = useLanguage();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError(language === 'te' ? 'దయచేసి చెల్లుబాటు అయ్యే 10-అంకెల ఫోన్ నంబర్ నమోదు చేయండి' : 'Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Generate a demo OTP for hackathon
      const demoOTP = '123456';
      
      // Store OTP in localStorage for demo purposes
      localStorage.setItem('demo_otp', demoOTP);
      localStorage.setItem('demo_phone', phoneNumber);
      
      console.log(`Demo OTP for ${phoneNumber}: ${demoOTP}`);
      setStep('otp');
    } catch (error) {
      setError(language === 'te' ? 'OTP పంపడంలో లోపం' : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError(language === 'te' ? 'దయచేసి చెల్లుబాటు అయ్యే 6-అంకెల OTP నమోదు చేయండి' : 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Verify demo OTP
      const storedOTP = localStorage.getItem('demo_otp');
      const storedPhone = localStorage.getItem('demo_phone');
      
      if (otp === storedOTP && phoneNumber === storedPhone) {
        // Check if user exists in database
        const { data: existingFarmer, error: farmerError } = await dbHelpers.getFarmer(phoneNumber);
        
        if (farmerError && farmerError.code !== 'PGRST116') {
          throw farmerError;
        }
        
        if (existingFarmer) {
          // Existing user - login with their data
          const userData = {
            id: existingFarmer.id,
            name: existingFarmer.name,
            phoneNumber: existingFarmer.phone_number,
            location: existingFarmer.location,
            language: existingFarmer.language || 'te',
            isNewUser: false
          };
          
          onLogin(userData);
        } else {
          // New user - go to registration
          setStep('registration');
        }
      } else {
        setError(language === 'te' ? 'చెల్లని OTP' : 'Invalid OTP');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(language === 'te' ? 'లాగిన్ విఫలమైంది' : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationComplete = (userData) => {
    onLogin(userData);
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtp('');
    setError('');
  };

  const handleBackToOtp = () => {
    setStep('otp');
    setOtp('');
    setError('');
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'te' : 'en';
    changeLanguage(newLanguage);
  };

  // Handle registration step
  if (step === 'registration') {
    return (
      <UserRegistration 
        phoneNumber={phoneNumber}
        onComplete={handleRegistrationComplete}
        onBack={handleBackToOtp}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-turmeric-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-end mb-4">
          <button 
            onClick={handleLanguageToggle}
            className="px-3 py-1 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors text-sm font-semibold"
          >
            {language === 'te' ? 'English' : 'తెలుగు'}
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-turmeric-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌱</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">TurmerLink</h1>
          <p className="text-gray-600">{language === 'te' ? 'వ్యవసాయదారుల మార్కెట్ యాక్సెస్ ప్లాట్‌ఫారమ్' : 'Farmers Market Access Platform'}</p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'ఫోన్ నంబర్' : 'Phone Number'}
              </label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={language === 'te' ? '10 అంకెల ఫోన్ నంబర్ నమోదు చేయండి' : 'Enter 10-digit phone number'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  maxLength="10"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (language === 'te' ? 'లోడ్ అవుతోంది' : 'Loading...') : (language === 'te' ? 'OTP పంపండి' : 'Send OTP')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'OTP నమోదు చేయండి' : 'Enter OTP'}
              </label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder={language === 'te' ? '6 అంకెల OTP నమోదు చేయండి' : 'Enter 6-digit OTP'}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  maxLength="6"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {language === 'te' ? `OTP పంపబడింది +91 ${phoneNumber}` : `OTP sent to +91 ${phoneNumber}`}
              </p>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 font-medium">
                  Demo OTP: <span className="font-mono text-lg">123456</span>
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {language === 'te' ? 'ఇది హాకాథాన్ పరీక్ష కోసం డెమో OTP' : 'This is a demo OTP for hackathon testing'}
                </p>
              </div>
            </div>

            {error && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (language === 'te' ? 'లోడ్ అవుతోంది' : 'Loading...') : (language === 'te' ? 'ధృవీకరించండి' : 'Verify')}
              </button>
            </div>
          </form>
        )}
        
        {/* Government Login Option */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              {language === 'te' ? 'ప్రభుత్వ అధికారులకు' : 'For Government Officials'}
            </p>
            <button
              onClick={onGovernmentLogin}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>🏛️</span>
              <span>{language === 'te' ? 'ప్రభుత్వ లాగిన్' : 'Government Login'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
