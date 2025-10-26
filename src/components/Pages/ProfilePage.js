import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  UserCircleIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  GlobeAmericasIcon,
  TagIcon,
  ChartBarIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import AnimatedPage from './AnimatedPage';

const ProfilePage = ({ onBack, user, onLogout, onUpdateProfile }) => {
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(user);

  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(user);
    setIsEditing(false);
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <AnimatedPage 
      title={language === 'te' ? 'ప్రొఫైల్' : 'Profile'} 
      onBack={onBack} 
      icon={UserCircleIcon}
    >
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center space-x-6">
            {/* Profile Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">
                {getInitial(user?.name)}
              </span>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.name || 'Farmer User'}
              </h2>
              <p className="text-lg text-gray-600 mb-1">
                {language === 'te' ? 'ఫోన్' : 'Phone'}: {user?.phoneNumber || '+91 9876543210'}
              </p>
              <p className="text-lg text-gray-600 mb-1">
                {language === 'te' ? 'గ్రామం' : 'Village'}: {user?.village || 'Nizamabad'}
              </p>
              <p className="text-lg text-gray-600">
                {language === 'te' ? 'జిల్లా' : 'District'}: {user?.district || 'Nizamabad'}
              </p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg transition-colors"
            >
              <PencilSquareIcon className="h-5 w-5" />
              <span>{language === 'te' ? 'సవరించండి' : 'Edit'}</span>
            </button>
          </div>
        </motion.div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <UserCircleIcon className="h-6 w-6 text-blue-600 mr-2" />
              {language === 'te' ? 'వ్యక్తిగత సమాచారం' : 'Personal Information'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{language === 'te' ? 'ఫోన్ నంబర్' : 'Phone Number'}</p>
                  <p className="font-semibold text-gray-900">{user?.phoneNumber || '+91 9876543210'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{language === 'te' ? 'గ్రామం' : 'Village'}</p>
                  <p className="font-semibold text-gray-900">{user?.village || 'Nizamabad'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <BuildingOffice2Icon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{language === 'te' ? 'జిల్లా' : 'District'}</p>
                  <p className="font-semibold text-gray-900">{user?.district || 'Nizamabad'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <GlobeAmericasIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{language === 'te' ? 'రాష్ట్రం' : 'State'}</p>
                  <p className="font-semibold text-gray-900">{user?.state || 'Telangana'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Farming Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <ChartBarIcon className="h-6 w-6 text-green-600 mr-2" />
              {language === 'te' ? 'వ్యవసాయ గణాంకాలు' : 'Farming Statistics'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TagIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{language === 'te' ? 'వ్యవసాయదారు ID' : 'Farmer ID'}</p>
                  <p className="font-semibold text-gray-900">{user?.farmerId || 'FARM12345'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <ChartBarIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{language === 'te' ? 'మొత్తం అమ్మకాలు' : 'Total Sales'}</p>
                  <p className="font-semibold text-gray-900">{user?.totalSales || '₹2,45,000'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <UserCircleIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{language === 'te' ? 'సభ్యత్వం' : 'Member Since'}</p>
                  <p className="font-semibold text-gray-900">{user?.joinDate || '2024-01-15'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-colors"
          >
            <PencilSquareIcon className="h-5 w-5" />
            <span>{language === 'te' ? 'ప్రొఫైల్ సవరించండి' : 'Edit Profile'}</span>
          </button>
          
          <button
            onClick={() => alert(language === 'te' ? 'సెట్టింగ్లు త్వరలో వస్తాయి' : 'Settings coming soon')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-colors"
          >
            <Cog6ToothIcon className="h-5 w-5" />
            <span>{language === 'te' ? 'సెట్టింగ్లు' : 'Settings'}</span>
          </button>
          
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>{language === 'te' ? 'లాగ్ అవుట్' : 'Logout'}</span>
          </button>
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
          >
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {language === 'te' ? 'ప్రొఫైల్ సవరించండి' : 'Edit Profile'}
            </h2>

            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg border-4 border-yellow-200 flex items-center justify-center text-5xl font-bold text-white">
                {getInitial(editedProfile?.name)}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {language === 'te' ? 'పేరు' : 'Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  value={editedProfile?.name || ''}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'te' ? 'మీ పేరు నమోదు చేయండి' : 'Enter your name'}
                />
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  {language === 'te' ? 'ఫోన్ నంబర్' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={editedProfile?.phoneNumber || ''}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phoneNumber: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'te' ? 'ఫోన్ నంబర్ నమోదు చేయండి' : 'Enter phone number'}
                  disabled
                />
              </div>
              
              <div>
                <label htmlFor="village" className="block text-sm font-medium text-gray-700">
                  {language === 'te' ? 'గ్రామం' : 'Village'}
                </label>
                <input
                  type="text"
                  id="village"
                  value={editedProfile?.village || ''}
                  onChange={(e) => setEditedProfile({ ...editedProfile, village: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'te' ? 'గ్రామం నమోదు చేయండి' : 'Enter village'}
                />
              </div>
              
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                  {language === 'te' ? 'జిల్లా' : 'District'}
                </label>
                <input
                  type="text"
                  id="district"
                  value={editedProfile?.district || ''}
                  onChange={(e) => setEditedProfile({ ...editedProfile, district: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'te' ? 'జిల్లా నమోదు చేయండి' : 'Enter district'}
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  {language === 'te' ? 'రాష్ట్రం' : 'State'}
                </label>
                <input
                  type="text"
                  id="state"
                  value={editedProfile?.state || ''}
                  onChange={(e) => setEditedProfile({ ...editedProfile, state: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'te' ? 'రాష్ట్రం నమోదు చేయండి' : 'Enter state'}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <CheckIcon className="h-5 w-5" />
                <span>{language === 'te' ? 'సేవ్ చేయండి' : 'Save'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default ProfilePage;
