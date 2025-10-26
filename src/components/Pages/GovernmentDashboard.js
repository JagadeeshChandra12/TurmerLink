import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSubmissions } from '../../contexts/SubmissionContext';
import { 
  BuildingOfficeIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';
import AnimatedPage from './AnimatedPage';

const GovernmentDashboard = ({ onBack, governmentUser, onLogout }) => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { language } = useLanguage();
  const { getAllSubmissions, updateSubmissionStatus } = useSubmissions();
  
  // Get all farmer submissions from shared context
  const farmerSubmissions = getAllSubmissions();

  const handleStatusUpdate = (submissionId, newStatus) => {
    updateSubmissionStatus(submissionId, newStatus);
    
    // In real app, this would update farmer's account
    console.log(`Updated submission ${submissionId} to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon className="h-4 w-4" />;
      case 'rejected': return <XCircleIcon className="h-4 w-4" />;
      case 'pending': return <ClockIcon className="h-4 w-4" />;
      default: return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      approved: language === 'te' ? 'అనుమతించబడింది' : 'Approved',
      rejected: language === 'te' ? 'తిరస్కరించబడింది' : 'Rejected',
      pending: language === 'te' ? 'వేచి ఉంది' : 'Pending'
    };
    return statusMap[status] || status;
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === undefined || amount === null) {
      return '₹0';
    }
    return `₹${amount.toLocaleString()}`;
  };

  const totalSubmissions = farmerSubmissions.length;
  const pendingSubmissions = farmerSubmissions.filter(s => s.status === 'pending').length;
  const approvedSubmissions = farmerSubmissions.filter(s => s.status === 'approved').length;
  const totalQuantity = farmerSubmissions.reduce((sum, s) => sum + s.quantity, 0);
  const totalValue = farmerSubmissions.reduce((sum, s) => sum + (s.quantity * s.price), 0);

  return (
    <AnimatedPage 
      title={language === 'te' ? 'ప్రభుత్వ డాష్‌బోర్డ్' : 'Government Dashboard'} 
      onBack={onBack}
      icon={BuildingOfficeIcon}
    >
      {/* Header Info */}
      <div className="bg-blue-50 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-900">
              {governmentUser.departmentName}
            </h2>
            <p className="text-blue-700">
              {language === 'te' ? 'అధికారి' : 'Officer'}: {governmentUser.name} ({governmentUser.id})
            </p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            {language === 'te' ? 'లాగౌట్' : 'Logout'}
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserGroupIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{totalSubmissions}</div>
          <div className="text-gray-600">{language === 'te' ? 'మొత్తం దరఖాస్తులు' : 'Total Submissions'}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClockIcon className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{pendingSubmissions}</div>
          <div className="text-gray-600">{language === 'te' ? 'వేచి ఉన్నవి' : 'Pending'}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{approvedSubmissions}</div>
          <div className="text-gray-600">{language === 'te' ? 'అనుమతించబడినవి' : 'Approved'}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ScaleIcon className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{totalQuantity}</div>
          <div className="text-gray-600">{language === 'te' ? 'క్వింటాళ్లు' : 'Quintals'}</div>
        </motion.div>
      </div>

      {/* Farmer Submissions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {language === 'te' ? 'కర్షకుల దరఖాస్తులు' : 'Farmer Submissions'}
          </h3>
          <div className="text-sm text-gray-600">
            {language === 'te' ? 'మొత్తం విలువ' : 'Total Value'}: {formatCurrency(totalValue)}
          </div>
        </div>

        <div className="space-y-4">
          {farmerSubmissions.map((submission, index) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {submission.farmerName}
                      </h4>
                      <span className="text-sm text-gray-500">({submission.farmerId})</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full flex items-center space-x-1 ${getStatusColor(submission.status)}`}>
                      {getStatusIcon(submission.status)}
                      <span className="text-sm font-medium">{getStatusText(submission.status)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">{language === 'te' ? 'పరిమాణం' : 'Quantity'}</div>
                      <div className="font-semibold">{submission.quantity} {language === 'te' ? 'క్వింటాళ్లు' : 'quintals'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{language === 'te' ? 'నాణ్యత' : 'Quality'}</div>
                      <div className="font-semibold">{submission.quality}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{language === 'te' ? 'ధర' : 'Price'}</div>
                      <div className="font-semibold">{formatCurrency(submission.price)}/{language === 'te' ? 'క్వింటల్' : 'quintal'}</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    <strong>{language === 'te' ? 'స్థానం' : 'Location'}:</strong> {submission.location} • 
                    <strong className="ml-2">{language === 'te' ? 'తేదీ' : 'Date'}:</strong> {submission.submissionDate}
                  </div>
                  
                  <div className="text-sm text-gray-700">
                    <strong>{language === 'te' ? 'వివరణ' : 'Description'}:</strong> {submission.description}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 ml-4">
                  {submission.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(submission.id, 'approved')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-1"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                        <span>{language === 'te' ? 'అనుమతించు' : 'Approve'}</span>
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(submission.id, 'rejected')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-1"
                      >
                        <XCircleIcon className="h-4 w-4" />
                        <span>{language === 'te' ? 'తిరస్కరించు' : 'Reject'}</span>
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => {
                      setSelectedSubmission(submission);
                      setShowPurchaseModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <CurrencyRupeeIcon className="h-4 w-4" />
                    <span>{language === 'te' ? 'కొనుగోలు చేయండి' : 'Purchase'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'te' ? 'కొనుగోలు వివరాలు' : 'Purchase Details'}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>{language === 'te' ? 'కర్షకుడు' : 'Farmer'}:</strong> {selectedSubmission.farmerName}
                </div>
                <div className="text-sm text-blue-800">
                  <strong>{language === 'te' ? 'పరిమాణం' : 'Quantity'}:</strong> {selectedSubmission.quantity} {language === 'te' ? 'క్వింటాళ్లు' : 'quintals'}
                </div>
                <div className="text-sm text-blue-800">
                  <strong>{language === 'te' ? 'మొత్తం విలువ' : 'Total Value'}:</strong> {formatCurrency(selectedSubmission.quantity * selectedSubmission.price)}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  handleStatusUpdate(selectedSubmission.id, 'approved');
                  setShowPurchaseModal(false);
                }}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {language === 'te' ? 'కొనుగోలు చేయండి' : 'Confirm Purchase'}
              </button>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default GovernmentDashboard;
