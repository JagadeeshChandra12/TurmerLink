import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  UsersIcon, 
  CurrencyRupeeIcon, 
  ScaleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  EyeIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { dashboardService, salesService, notificationService } from '../../services/supabaseService';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState(null);
  const [recentSales, setRecentSales] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch admin-specific data
      const mockData = {
        totalFarmers: 1250,
        totalSales: 15420,
        totalRevenue: 125000000,
        pendingVerifications: 45,
        recentTransactions: [
          {
            id: 1,
            farmerName: 'Rama Rao',
            quantity: 500,
            price: 8500,
            totalAmount: 4250000,
            buyer: 'Export Company',
            paymentStatus: 'pending',
            transactionHash: 'abc123...',
            date: new Date()
          },
          {
            id: 2,
            farmerName: 'Sita Devi',
            quantity: 300,
            price: 8700,
            totalAmount: 2610000,
            buyer: 'Local Trader',
            paymentStatus: 'paid',
            transactionHash: 'def456...',
            date: new Date(Date.now() - 86400000)
          }
        ]
      };

      setDashboardData(mockData);
      setRecentSales(mockData.recentTransactions);
      setPendingVerifications(mockData.pendingVerifications);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyTransaction = async (transactionId) => {
    try {
      // Mock verification - in real app, this would update the database
      console.log('Verifying transaction:', transactionId);
      toast.success('Transaction verified successfully');
      
      // Remove from pending list
      setPendingVerifications(prev => prev - 1);
    } catch (error) {
      console.error('Error verifying transaction:', error);
      toast.error('Failed to verify transaction');
    }
  };

  const handleSendAlert = async (alertData) => {
    try {
      // Mock alert sending - in real app, this would send to all farmers
      console.log('Sending alert:', alertData);
      toast.success('Alert sent to all farmers');
    } catch (error) {
      console.error('Error sending alert:', error);
      toast.error('Failed to send alert');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor farmer activities, verify transactions, and manage alerts
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {dashboardData?.totalFarmers?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Farmers</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ScaleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {dashboardData?.totalSales?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Sales</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-turmeric-100 rounded-lg">
                <CurrencyRupeeIcon className="h-6 w-6 text-turmeric-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{dashboardData?.totalRevenue?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {pendingVerifications}
                </div>
                <div className="text-sm text-gray-600">Pending Verifications</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Transactions
              </h3>
              <p className="text-sm text-gray-600">
                Latest sales requiring verification
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              {recentSales.map((sale) => (
                <div key={sale.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div>
                          <div className="font-medium text-gray-900">
                            {sale.farmerName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {sale.quantity} kg @ ₹{sale.price}/kg
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ₹{sale.totalAmount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {sale.buyer}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sale.paymentStatus === 'paid' 
                            ? 'bg-green-100 text-green-800'
                            : sale.paymentStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {sale.paymentStatus}
                        </span>
                        <span className="text-xs text-gray-500">
                          {sale.transactionHash}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVerifyTransaction(sale.id)}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                        <span>Verify</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm font-medium">
                        <EyeIcon className="h-4 w-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Quick Actions
            </h3>
            <div className="space-y-4">
              <button
                onClick={() => handleSendAlert({ type: 'price_alert', message: 'New price update available' })}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Send Price Alert
              </button>
              <button
                onClick={() => handleSendAlert({ type: 'weather_alert', message: 'Weather warning for your area' })}
                className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                Send Weather Alert
              </button>
              <button
                onClick={() => handleSendAlert({ type: 'market_alert', message: 'MSP update notification' })}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Send Market Alert
              </button>
              <button
                onClick={() => handleSendAlert({ type: 'learning', message: 'New educational content available' })}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Send Learning Alert
              </button>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            System Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-lg font-semibold text-gray-900">Database</div>
              <div className="text-sm text-green-600">Connected</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-lg font-semibold text-gray-900">SMS Gateway</div>
              <div className="text-sm text-green-600">Active</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-lg font-semibold text-gray-900">Price API</div>
              <div className="text-sm text-yellow-600">Limited</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
