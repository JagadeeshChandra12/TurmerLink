import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { dbHelpers } from '../../config/supabase';

const UserRegistration = ({ phoneNumber, onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    district: '',
    state: '',
    village: '',
    language: 'te',
    phoneNumber: phoneNumber
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Create farmer in database
      const farmerData = {
        phone_number: formData.phoneNumber,
        name: formData.name,
        location: `${formData.village}, ${formData.district}, ${formData.state}`,
        language: formData.language
      };

      const { data: farmer, error: farmerError } = await dbHelpers.createFarmer(farmerData);
      
      if (farmerError) {
        throw farmerError;
      }

      // Create user object for app
      const userData = {
        id: farmer.id,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        location: formData.location,
        district: formData.district,
        state: formData.state,
        village: formData.village,
        language: formData.language,
        isNewUser: true
      };

      onComplete(userData);
    } catch (err) {
      setError(err.message || 'Registration failed');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'te' ? 'కొత్త వినియోగదారు నమోదు' : 'New User Registration'}
          </h1>
          <p className="text-gray-600 text-sm">
            {language === 'te' ? 'దయచేసి మీ వివరాలను నమోదు చేయండి' : 'Please fill in your details'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'te' ? 'పేరు' : 'Name'} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={language === 'te' ? 'మీ పేరు' : 'Your name'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'te' ? 'గ్రామం' : 'Village'} *
            </label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={language === 'te' ? 'మీ గ్రామం' : 'Your village'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'te' ? 'జిల్లా' : 'District'} *
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={language === 'te' ? 'మీ జిల్లా' : 'Your district'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'te' ? 'రాష్ట్రం' : 'State'} *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={language === 'te' ? 'మీ రాష్ట్రం' : 'Your state'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'te' ? 'భాషా' : 'Language'}
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="te">తెలుగు</option>
              <option value="en">English</option>
            </select>
          </div>

          {error && (
            <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              {language === 'te' ? 'వెనుకకు' : 'Back'}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isLoading 
                ? (language === 'te' ? 'సేవ్ చేస్తోంది...' : 'Saving...')
                : (language === 'te' ? 'సేవ్ చేయండి' : 'Save')
              }
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserRegistration;
