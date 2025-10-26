import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, ScaleIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { ledger } from '../../utils/blockchain';

const DigitalLedger = () => {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    setLoading(true);
    try {
      // Get transactions for current farmer (in real app, this would be filtered by farmer ID)
      const farmerTransactions = ledger.getFarmerTransactions('farmer_001');
      setTransactions(farmerTransactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionAdded = (newTransaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
    setShowForm(false);
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseTransaction = () => {
    setSelectedTransaction(null);
  };

  // Calculate summary statistics
  const totalSales = transactions.reduce((sum, t) => sum + (t.totalAmount || 0), 0);
  const totalQuantity = transactions.reduce((sum, t) => sum + (t.quantity || 0), 0);
  const averagePrice = totalQuantity > 0 ? totalSales / totalQuantity : 0;
  const paidTransactions = transactions.filter(t => t.paymentStatus === 'paid').length;
  const pendingTransactions = transactions.filter(t => t.paymentStatus === 'pending').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('ledger')}
            </h1>
            <p className="text-gray-600">
              Track your turmeric sales with tamper-proof records
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>{t('addSale')}</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <ScaleIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {totalQuantity.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Total Quantity (kg)</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CurrencyRupeeIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{totalSales.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Sales</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CurrencyRupeeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{averagePrice.toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Average Price/kg</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-turmeric-100 rounded-lg">
                <ScaleIcon className="h-6 w-6 text-turmeric-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {transactions.length}
                </div>
                <div className="text-sm text-gray-600">Total Transactions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">{paidTransactions}</span>
              </div>
              <div>
                <div className="text-lg font-semibold text-green-900">Paid</div>
                <div className="text-sm text-green-700">Transactions completed</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-lg">{pendingTransactions}</span>
              </div>
              <div>
                <div className="text-lg font-semibold text-yellow-900">Pending</div>
                <div className="text-sm text-yellow-700">Awaiting payment</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">
                  {ledger.verifyChain() ? '✓' : '✗'}
                </span>
              </div>
              <div>
                <div className="text-lg font-semibold text-blue-900">Verified</div>
                <div className="text-sm text-blue-700">Blockchain integrity</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <TransactionForm
                onTransactionAdded={handleTransactionAdded}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {/* Transaction List */}
        <TransactionList
          transactions={transactions}
          onViewTransaction={handleViewTransaction}
        />

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Transaction Details
                  </h3>
                  <button
                    onClick={handleCloseTransaction}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Sale Date</label>
                      <div className="text-lg font-semibold text-gray-900">
                        {new Date(selectedTransaction.saleDate).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Buyer</label>
                      <div className="text-lg font-semibold text-gray-900">
                        {selectedTransaction.buyer}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Quantity</label>
                      <div className="text-lg font-semibold text-gray-900">
                        {selectedTransaction.quantity} kg
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Price per kg</label>
                      <div className="text-lg font-semibold text-gray-900">
                        ₹{selectedTransaction.price}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Total Amount</label>
                      <div className="text-2xl font-bold text-primary-600">
                        ₹{selectedTransaction.totalAmount?.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Payment Status</label>
                      <div className="text-lg font-semibold text-gray-900">
                        {selectedTransaction.paymentStatus}
                      </div>
                    </div>
                  </div>

                  {selectedTransaction.hash && (
                    <div className="pt-4 border-t border-gray-200">
                      <label className="text-sm font-medium text-gray-600">Transaction Hash</label>
                      <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                        <code className="text-sm font-mono break-all">
                          {selectedTransaction.hash}
                        </code>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        This hash verifies the authenticity of your transaction
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalLedger;
