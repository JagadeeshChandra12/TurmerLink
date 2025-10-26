import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarIcon, ScaleIcon, CurrencyRupeeIcon, UserIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { ledger } from '../../utils/blockchain';

const TransactionForm = ({ onTransactionAdded, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    saleDate: new Date().toISOString().split('T')[0],
    quantity: '',
    price: '',
    buyer: '',
    paymentStatus: 'pending'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.quantity || !formData.price || !formData.buyer) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Create transaction data
      const transactionData = {
        farmerId: 'farmer_001', // This would come from user context
        saleDate: formData.saleDate,
        quantity: parseFloat(formData.quantity),
        price: parseFloat(formData.price),
        buyer: formData.buyer,
        paymentStatus: formData.paymentStatus,
        totalAmount: parseFloat(formData.quantity) * parseFloat(formData.price)
      };

      // Add to blockchain ledger
      const block = ledger.addTransaction(transactionData);
      
      toast.success('Sale recorded successfully!');
      onTransactionAdded(block);
      
      // Reset form
      setFormData({
        saleDate: new Date().toISOString().split('T')[0],
        quantity: '',
        price: '',
        buyer: '',
        paymentStatus: 'pending'
      });
    } catch (error) {
      console.error('Error recording transaction:', error);
      toast.error('Failed to record sale');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        {t('addSale')}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sale Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('saleDate')}
          </label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              name="saleDate"
              value={formData.saleDate}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Quantity and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('quantity')}
            </label>
            <div className="relative">
              <ScaleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity in kg"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                step="0.1"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('price')}
            </label>
            <div className="relative">
              <CurrencyRupeeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price per kg"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Buyer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('buyer')}
          </label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="buyer"
              value={formData.buyer}
              onChange={handleInputChange}
              placeholder="Enter buyer name or company"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Payment Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('paymentStatus')}
          </label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="pending">{t('pending')}</option>
            <option value="paid">{t('paid')}</option>
            <option value="delayed">{t('delayed')}</option>
          </select>
        </div>

        {/* Total Amount Display */}
        {formData.quantity && formData.price && (
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Amount:</span>
              <span className="text-lg font-bold text-primary-600">
                ₹{(parseFloat(formData.quantity) * parseFloat(formData.price)).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t('loading') : t('save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
