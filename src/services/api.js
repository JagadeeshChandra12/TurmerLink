import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.turmerlink.com';

// Market price API endpoints (mock data for now)
export const marketPriceAPI = {
  // Get current turmeric prices from various sources
  getCurrentPrices: async () => {
    try {
      // Mock data - replace with actual API calls
      return {
        mandi: {
          nizamabad: 8500,
          hyderabad: 8700,
          mumbai: 9200
        },
        export: {
          chennai: 9500,
          kochi: 9800
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching market prices:', error);
      throw error;
    }
  },

  // Get price trends for the last 7 days
  getPriceTrends: async () => {
    try {
      // Mock data - replace with actual API calls
      const trends = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        trends.push({
          date: date.toISOString().split('T')[0],
          nizamabad: 8000 + Math.random() * 1000,
          hyderabad: 8200 + Math.random() * 1000,
          mumbai: 8700 + Math.random() * 1000
        });
      }
      
      return trends;
    } catch (error) {
      console.error('Error fetching price trends:', error);
      throw error;
    }
  }
};

// Weather API
export const weatherAPI = {
  // Get current weather and forecast
  getWeather: async (city = 'nizamabad') => {
    try {
      // Mock data - replace with actual OpenWeatherMap API
      return {
        current: {
          temperature: 28,
          humidity: 65,
          condition: 'Partly Cloudy',
          windSpeed: 12
        },
        forecast: [
          {
            date: new Date().toISOString().split('T')[0],
            high: 32,
            low: 22,
            condition: 'Partly Cloudy',
            precipitation: 20
          },
          {
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            high: 30,
            low: 20,
            condition: 'Sunny',
            precipitation: 10
          },
          {
            date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
            high: 29,
            low: 19,
            condition: 'Cloudy',
            precipitation: 40
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
};

// MSP (Minimum Support Price) API
export const mspAPI = {
  // Get current MSP for turmeric
  getCurrentMSP: async () => {
    try {
      // Mock data - replace with actual government API
      return {
        turmeric: {
          current: 7500,
          previous: 7200,
          change: 300,
          changePercent: 4.17,
          effectiveDate: '2024-01-01'
        }
      };
    } catch (error) {
      console.error('Error fetching MSP data:', error);
      throw error;
    }
  }
};

// SMS API
export const smsAPI = {
  // Send SMS notification
  sendSMS: async (phoneNumber, message, language = 'te') => {
    try {
      // Mock implementation - replace with actual SMS gateway
      console.log(`SMS to ${phoneNumber}: ${message}`);
      return { success: true, messageId: `msg_${Date.now()}` };
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }
};

// Price prediction API
export const predictionAPI = {
  // Get price prediction for next 7 days
  getPricePrediction: async () => {
    try {
      // Mock AI prediction - replace with actual ML model
      const predictions = [];
      const today = new Date();
      
      for (let i = 1; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        
        predictions.push({
          date: date.toISOString().split('T')[0],
          predictedPrice: 8500 + Math.random() * 500,
          confidence: 0.7 + Math.random() * 0.2,
          factors: ['Weather', 'Demand', 'Supply']
        });
      }
      
      return predictions;
    } catch (error) {
      console.error('Error fetching price prediction:', error);
      throw error;
    }
  }
};
