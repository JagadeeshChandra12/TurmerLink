import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CalendarIcon, 
  ScaleIcon, 
  CurrencyRupeeIcon, 
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const TransactionList = ({ transactions, onViewTransaction }) => {
  const { t } = useTranslation();

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'delayed':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPaymentStatusColor = (status) => {
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

  const getPaymentStatusText = (status) => {
    switch (status) {
      case 'paid':
        return t('paid');
      case 'pending':
        return t('pending');
      case 'delayed':
        return t('delayed');
      default:
        return status;
    }
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ScaleIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Sales Recorded</h3>
        <p className="text-gray-500">Start recording your turmeric sales to track your transactions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Transaction History
        </h3>
        <p className="text-sm text-gray-600">
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} recorded
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {transactions.map((transaction, index) => (
          <div key={transaction.hash || index} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(transaction.saleDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{transaction.buyer}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <ScaleIcon className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Quantity</div>
                      <div className="font-medium">{transaction.quantity} kg</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <CurrencyRupeeIcon className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Price</div>
                      <div className="font-medium">₹{transaction.price}/kg</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <CurrencyRupeeIcon className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Total</div>
                      <div className="font-medium text-lg">₹{transaction.totalAmount?.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(transaction.paymentStatus)}`}>
                    {getPaymentStatusIcon(transaction.paymentStatus)}
                    <span>{getPaymentStatusText(transaction.paymentStatus)}</span>
                  </div>
                </div>

                <button
                  onClick={() => onViewTransaction(transaction)}
                  className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>{t('view')}</span>
                </button>
              </div>
            </div>

            {/* Transaction Hash for Verification */}
            {transaction.hash && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>Transaction ID:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                    {transaction.hash.substring(0, 16)}...
                  </code>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
