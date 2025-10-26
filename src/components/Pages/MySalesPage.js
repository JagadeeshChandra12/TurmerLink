import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSubmissions } from '../../contexts/SubmissionContext';
import { 
  BookOpenIcon, 
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ScaleIcon,
  CurrencyRupeeIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  SpeakerWaveIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import AnimatedPage from './AnimatedPage';

const MySalesPage = ({ onBack, user }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showStockSubmission, setShowStockSubmission] = useState(false);
  const { language } = useLanguage();
  const { getFarmerSubmissions, addSubmission } = useSubmissions();
  
  // Get farmer submissions (using FARM001 as demo farmer ID)
  const governmentSubmissions = getFarmerSubmissions('FARM001');
  
  const [sales, setSales] = useState([
    {
      id: 1,
      date: '15/1/2024',
      quantity: 5,
      price: 8500,
      buyer: 'Local Trader',
      status: 'paid',
      totalAmount: 42500,
      quality: 'Grade A',
      blockchainId: 'BC001',
      verified: true
    },
    {
      id: 2,
      date: '10/1/2024',
      quantity: 3,
      price: 8200,
      buyer: 'Export Company',
      status: 'pending',
      totalAmount: 24600,
      quality: 'Export Grade',
      blockchainId: 'BC002',
      verified: true
    }
  ]);

  const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalSalesCount = sales.length;
  const averagePrice = totalQuantity > 0 ? totalRevenue / totalQuantity : 0;
  const verifiedSales = sales.filter(sale => sale.verified).length;

  // Simple voice announcement
  const announceSales = () => {
    if ('speechSynthesis' in window) {
      const message = language === 'te' 
        ? `మీ మొత్తం అమ్మకాలు ${totalSalesCount}. మొత్తం ఆదాయం ${formatCurrency(totalRevenue)}. సగటు ధర ${formatCurrency(averagePrice)}.`
        : `Your total sales: ${totalSalesCount}. Total revenue: ${formatCurrency(totalRevenue)}. Average price: ${formatCurrency(averagePrice)}.`;
      
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.volume = 0.7;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // Government submission functions
  const submitStockToGovernment = async (submissionData) => {
    // Use actual logged-in user data
    const farmerId = user?.id || 'FARM001';
    const farmerName = user?.name || 'Farmer';
    const farmerPhone = user?.phoneNumber ? `+91 ${user.phoneNumber}` : '+91 0000000000';
    const location = user?.location || 'Unknown';
    
    const newSubmission = {
      farmerId: farmerId,
      farmerName: farmerName,
      farmerPhone: farmerPhone,
      location: location,
      ...submissionData,
      totalValue: submissionData.quantity * submissionData.price
    };
    
    await addSubmission(newSubmission);
    
    // Show success message
    alert(language === 'te' 
      ? 'ప్రభుత్వానికి సమర్పణ విజయవంతంగా పంపబడింది!' 
      : 'Submission sent to government successfully!'
    );
  };

  const getGovernmentStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGovernmentStatusText = (status) => {
    const statusMap = {
      approved: language === 'te' ? 'అనుమతించబడింది' : 'Approved',
      rejected: language === 'te' ? 'తిరస్కరించబడింది' : 'Rejected',
      pending: language === 'te' ? 'ప్రభుత్వ సమీక్షలో' : 'Under Review'
    };
    return statusMap[status] || status;
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === undefined || amount === null) {
      return '₹0';
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4" />;
      case 'delayed':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    if (language === 'te') {
      switch (status) {
        case 'paid': return 'చెల్లింపు చేయబడింది';
        case 'pending': return 'వేచి ఉంది';
        case 'delayed': return 'అవధి ముగిసింది';
        default: return 'వేచి ఉంది';
      }
    } else {
      switch (status) {
        case 'paid': return 'Paid';
        case 'pending': return 'Pending';
        case 'delayed': return 'Overdue';
        default: return 'Pending';
      }
    }
  };

  const AddSaleForm = () => {
    const [formData, setFormData] = useState({
      date: new Date().toISOString().split('T')[0],
      quantity: '',
      price: '',
      buyer: '',
      quality: 'Grade A'
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!formData.quantity || !formData.price || !formData.buyer) {
        alert(language === 'te' ? 'దయచేసి అన్ని వివరాలను నమోదు చేయండి' : 'Please fill in all details');
        return;
      }

      const newSale = {
        id: Date.now(),
        date: formData.date.split('-').reverse().join('/'),
        quantity: parseInt(formData.quantity),
        price: parseInt(formData.price),
        buyer: formData.buyer,
        status: 'pending',
        totalAmount: parseInt(formData.quantity) * parseInt(formData.price),
        quality: formData.quality,
        blockchainId: `BC${Date.now().toString().slice(-3)}`,
        verified: false
      };

      setSales(prev => [newSale, ...prev]);
      setShowAddForm(false);
      
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        quantity: '',
        price: '',
        buyer: '',
        quality: 'Grade A'
      });

      alert(language === 'te' ? 'కొత్త అమ్మకం విజయవంతంగా జోడించబడింది!' : 'New sale added successfully!');
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowAddForm(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {language === 'te' ? 'కొత్త అమ్మకం జోడించండి' : 'Add New Sale'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'తేదీ' : 'Date'}
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'పరిమాణం (క్వింటాళ్లు)' : 'Quantity (Quintals)'}
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder={language === 'te' ? 'క్వింటాళ్లలో పరిమాణం నమోదు చేయండి' : 'Enter quantity in quintals'}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'క్వింటల్ కు ధర (₹)' : 'Price per Quintal (₹)'}
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder={language === 'te' ? 'క్వింటల్ కు ధర నమోదు చేయండి' : 'Enter price per quintal'}
                required
                min="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'కొనుగోలుదారు' : 'Buyer'}
              </label>
              <input
                type="text"
                name="buyer"
                value={formData.buyer}
                onChange={handleInputChange}
                placeholder={language === 'te' ? 'కొనుగోలుదారు పేరు నమోదు చేయండి' : 'Enter buyer name'}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'te' ? 'నాణ్యత' : 'Quality'}
              </label>
              <select
                name="quality"
                value={formData.quality}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Grade A">{language === 'te' ? 'గ్రేడ్ A' : 'Grade A'}</option>
                <option value="Export Grade">{language === 'te' ? 'ఎగుమతి గ్రేడ్' : 'Export Grade'}</option>
                <option value="Grade B">{language === 'te' ? 'గ్రేడ్ B' : 'Grade B'}</option>
              </select>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {language === 'te' ? 'అమ్మకం సేవ్ చేయండి' : 'Save Sale'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <AnimatedPage 
      title={language === 'te' ? 'నా అమ్మకాలు' : 'My Sales'} 
      onBack={onBack} 
      icon={BookOpenIcon}
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ScaleIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{totalQuantity}</div>
          <div className="text-gray-600">{language === 'te' ? 'మొత్తం పరిమాణం (క్వింటాళ్లు)' : 'Total Quantity (Quintals)'}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CurrencyRupeeIcon className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(totalRevenue)}</div>
          <div className="text-gray-600">{language === 'te' ? 'మొత్తం ఆదాయం' : 'Total Revenue'}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpenIcon className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{totalSalesCount}</div>
          <div className="text-gray-600">{language === 'te' ? 'మొత్తం అమ్మకాలు' : 'Total Sales'}</div>
        </motion.div>

        {/* Additional Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(averagePrice)}</div>
          <div className="text-gray-600">{language === 'te' ? 'సగటు ధర' : 'Average Price'}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{verifiedSales}</div>
          <div className="text-gray-600">{language === 'te' ? 'ధృవీకరించబడిన అమ్మకాలు' : 'Verified Sales'}</div>
        </motion.div>

        {/* Voice Announcement Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <button
            onClick={announceSales}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all flex items-center justify-center space-x-2"
          >
            <SpeakerWaveIcon className="h-5 w-5" />
            <span>{language === 'te' ? 'ఆడియోలో వినండి' : 'Listen in Audio'}</span>
          </button>
        </motion.div>

        {/* Submit to Government Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
        >
          <button
            onClick={() => setShowStockSubmission(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
          >
            <BuildingOfficeIcon className="h-5 w-5" />
            <span>{language === 'te' ? 'ప్రభుత్వానికి సమర్పించండి' : 'Submit to Government'}</span>
          </button>
        </motion.div>
      </div>

      {/* Add New Sale Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-8"
      >
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-colors flex items-center space-x-2 mx-auto"
        >
          <PlusIcon className="h-6 w-6" />
          <span>{language === 'te' ? 'కొత్త అమ్మకం జోడించండి' : '+ Add New Sale'}</span>
        </button>
      </motion.div>

      {/* Sales List */}
      <div className="space-y-4">
        {sales.map((sale, index) => (
          <motion.div
            key={sale.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{sale.date}</span>
                    {sale.verified && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <ShieldCheckIcon className="h-4 w-4" />
                        <span className="text-xs font-medium">{sale.blockchainId}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{formatCurrency(sale.totalAmount)}</span>
                </div>
                <div className="text-gray-700 mb-2">
                  {sale.buyer} • {sale.quantity} {language === 'te' ? 'క్వింటాళ్లు' : 'quintals'} @ ₹{sale.price.toLocaleString()}/{language === 'te' ? 'క్వింటల్' : 'quintal'}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'te' ? 'నాణ్యత' : 'Quality'}: {sale.quality}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full flex items-center space-x-1 ${getStatusColor(sale.status)}`}>
                {getStatusIcon(sale.status)}
                <span className="text-sm font-medium">{getStatusText(sale.status)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Government Submissions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {language === 'te' ? 'ప్రభుత్వ సమర్పణలు' : 'Government Submissions'}
        </h3>
        <div className="space-y-4">
          {governmentSubmissions.map((submission, index) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{submission.submissionDate}</span>
                      <span className="text-xs font-medium text-blue-600">{submission.id}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full flex items-center space-x-1 ${getGovernmentStatusColor(submission.status)}`}>
                      <span className="text-sm font-medium">{getGovernmentStatusText(submission.status)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                    <div>
                      <div className="text-sm text-gray-600">{language === 'te' ? 'పరిమాణం' : 'Quantity'}</div>
                      <div className="font-semibold">{submission.quantity} {language === 'te' ? 'క్వింటాళ్లు' : 'quintals'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{language === 'te' ? 'నాణ్యత' : 'Quality'}</div>
                      <div className="font-semibold">{submission.quality}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{language === 'te' ? 'మొత్తం విలువ' : 'Total Value'}</div>
                      <div className="font-semibold">{formatCurrency(submission.totalValue)}</div>
                    </div>
                  </div>

                  {submission.governmentResponse && (
                    <div className="text-sm text-gray-600">
                      <strong>{language === 'te' ? 'ప్రభుత్వ ప్రతిస్పందన' : 'Government Response'}:</strong> {submission.governmentResponse}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {showAddForm && <AddSaleForm />}

      {/* Stock Submission Modal */}
      {showStockSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {language === 'te' ? 'ప్రభుత్వానికి స్టాక్ సమర్పించండి' : 'Submit Stock to Government'}
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const submissionData = {
                quantity: parseInt(formData.get('quantity')),
                quality: formData.get('quality'),
                price: parseInt(formData.get('price')),
                description: formData.get('description')
              };
              submitStockToGovernment(submissionData);
              setShowStockSubmission(false);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'te' ? 'పరిమాణం (క్వింటాళ్లు)' : 'Quantity (Quintals)'}
                </label>
                <input
                  type="number"
                  name="quantity"
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'te' ? 'నాణ్యత' : 'Quality'}
                </label>
                <select
                  name="quality"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">{language === 'te' ? 'నాణ్యతను ఎంచుకోండి' : 'Select Quality'}</option>
                  <option value="Grade A">{language === 'te' ? 'గ్రేడ్ A' : 'Grade A'}</option>
                  <option value="Export Grade">{language === 'te' ? 'ఎగుమతి గ్రేడ్' : 'Export Grade'}</option>
                  <option value="Grade B">{language === 'te' ? 'గ్రేడ్ B' : 'Grade B'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'te' ? 'ధర (క్వింటల్ కు)' : 'Price (per Quintal)'}
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'te' ? 'వివరణ' : 'Description'}
                </label>
                <textarea
                  name="description"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'te' ? 'మీ టర్మరిక్ గురించి వివరించండి' : 'Describe your turmeric'}
                ></textarea>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {language === 'te' ? 'సమర్పించండి' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowStockSubmission(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  {language === 'te' ? 'రద్దు చేయండి' : 'Cancel'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default MySalesPage;
