import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  BuildingOfficeIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import AnimatedPage from './AnimatedPage';

const GovernmentLoginPage = ({ onBack, onGovernmentLogin }) => {
  const [formData, setFormData] = useState({
    department: '',
    officerId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguage();

  const departments = [
    { value: 'agriculture', label: language === 'te' ? 'వ్యవసాయ శాఖ' : 'Agriculture Department' },
    { value: 'marketing', label: language === 'te' ? 'మార్కెటింగ్ శాఖ' : 'Marketing Department' },
    { value: 'cooperation', label: language === 'te' ? 'సహకార శాఖ' : 'Cooperation Department' },
    { value: 'procurement', label: language === 'te' ? 'కొనుగోలు శాఖ' : 'Procurement Department' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock government login validation
    const validCredentials = {
      'agriculture': { 'AGR001': 'gov123', 'AGR002': 'gov456' },
      'marketing': { 'MKT001': 'gov123', 'MKT002': 'gov456' },
      'cooperation': { 'COP001': 'gov123', 'COP002': 'gov456' },
      'procurement': { 'PRO001': 'gov123', 'PRO002': 'gov456' }
    };

    const departmentCredentials = validCredentials[formData.department];
    if (departmentCredentials && departmentCredentials[formData.officerId] === formData.password) {
      // Successful login
      const governmentUser = {
        id: formData.officerId,
        department: formData.department,
        departmentName: departments.find(d => d.value === formData.department)?.label,
        name: `Officer ${formData.officerId}`,
        role: 'government',
        loginTime: new Date().toISOString()
      };
      
      onGovernmentLogin(governmentUser);
    } else {
      setError(language === 'te' ? 'చెల్లని లాగిన్ వివరాలు' : 'Invalid login credentials');
    }
    
    setLoading(false);
  };

  return (
    <AnimatedPage 
      title={language === 'te' ? 'ప్రభుత్వ లాగిన్' : 'Government Login'} 
      onBack={onBack}
      icon={BuildingOfficeIcon}
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BuildingOfficeIcon className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'te' ? 'ప్రభుత్వ అధికారి లాగిన్' : 'Government Officer Login'}
            </h2>
            <p className="text-gray-600">
              {language === 'te' ? 'కర్షకుల నుండి స్టాక్ కొనుగోలు మరియు సేవలు అందించడానికి' : 'To purchase stock from farmers and provide services'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'శాఖ' : 'Department'}
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">
                  {language === 'te' ? 'శాఖను ఎంచుకోండి' : 'Select Department'}
                </option>
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Officer ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'అధికారి ID' : 'Officer ID'}
              </label>
              <input
                type="text"
                name="officerId"
                value={formData.officerId}
                onChange={handleInputChange}
                required
                placeholder={language === 'te' ? 'ఉదా: AGR001' : 'e.g., AGR001'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'పాస్‌వర్డ్' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder={language === 'te' ? 'పాస్‌వర్డ్ నమోదు చేయండి' : 'Enter password'}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <ShieldCheckIcon className="h-5 w-5" />
              <span>
                {loading 
                  ? (language === 'te' ? 'లాగిన్ చేస్తోంది...' : 'Logging in...')
                  : (language === 'te' ? 'లాగిన్ చేయండి' : 'Login')
                }
              </span>
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">
              {language === 'te' ? 'డెమో లాగిన్ వివరాలు' : 'Demo Login Credentials'}
            </h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>{language === 'te' ? 'అధికారి ID' : 'Officer ID'}:</strong> AGR001, MKT001, COP001, PRO001</p>
              <p><strong>{language === 'te' ? 'పాస్‌వర్డ్' : 'Password'}:</strong> gov123</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default GovernmentLoginPage;
