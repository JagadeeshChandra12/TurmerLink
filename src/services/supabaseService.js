import { supabase, TABLES, USER_ROLES, PAYMENT_STATUS } from '../config/supabase';

// User Management
export const userService = {
  // Create a new user
  async createUser(userData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .insert([userData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Get user by phone number
  async getUserByPhone(phoneNumber) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('phone_number', phoneNumber)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Update user profile
  async updateUser(userId, updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

// Sales Management
export const salesService = {
  // Add a new sale transaction
  async addSale(saleData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SALES)
        .insert([saleData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding sale:', error);
      throw error;
    }
  },

  // Get farmer's sales
  async getFarmerSales(farmerId, limit = 50) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SALES)
        .select('*')
        .eq('farmer_id', farmerId)
        .order('sale_date', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching farmer sales:', error);
      throw error;
    }
  },

  // Update payment status
  async updatePaymentStatus(saleId, status) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SALES)
        .update({ payment_status: status })
        .eq('id', saleId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  },

  // Get sales summary
  async getSalesSummary(farmerId) {
    try {
      const { data, error } = await supabase
        .rpc('get_farmer_recent_sales', {
          farmer_uuid: farmerId,
          limit_count: 10
        });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching sales summary:', error);
      throw error;
    }
  }
};

// Market Data Service
export const marketDataService = {
  // Get current market prices
  async getCurrentPrices() {
    try {
      const { data, error } = await supabase
        .rpc('get_market_price_summary');
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching market prices:', error);
      throw error;
    }
  },

  // Get price trends
  async getPriceTrends(marketName, days = 30) {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRICE_DATA)
        .select('*')
        .eq('market_name', marketName)
        .gte('price_date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('price_date', { ascending: true });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching price trends:', error);
      throw error;
    }
  },

  // Add new price data
  async addPriceData(priceData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.PRICE_DATA)
        .insert([priceData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding price data:', error);
      throw error;
    }
  }
};

// MSP Service
export const mspService = {
  // Get current MSP data
  async getCurrentMSP() {
    try {
      const { data, error } = await supabase
        .from(TABLES.MSP_DATA)
        .select('*')
        .eq('commodity', 'turmeric')
        .order('effective_date', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching MSP data:', error);
      throw error;
    }
  },

  // Update MSP data
  async updateMSP(mspData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.MSP_DATA)
        .upsert(mspData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating MSP data:', error);
      throw error;
    }
  }
};

// Weather Service
export const weatherService = {
  // Get weather data
  async getWeatherData(location = 'nizamabad', days = 7) {
    try {
      const { data, error } = await supabase
        .from(TABLES.WEATHER_DATA)
        .select('*')
        .eq('location', location)
        .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: true });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },

  // Add weather data
  async addWeatherData(weatherData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.WEATHER_DATA)
        .insert([weatherData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding weather data:', error);
      throw error;
    }
  }
};

// Learning Service
export const learningService = {
  // Get videos by category
  async getVideosByCategory(category, language = 'te') {
    try {
      const { data, error } = await supabase
        .from(TABLES.VIDEOS)
        .select('*')
        .eq('category', category)
        .eq('language', language)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },

  // Get all videos
  async getAllVideos(language = 'te') {
    try {
      const { data, error } = await supabase
        .from(TABLES.VIDEOS)
        .select('*')
        .eq('language', language)
        .eq('is_active', true)
        .order('category', { ascending: true });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching all videos:', error);
      throw error;
    }
  },

  // Get FAQs
  async getFAQs(language = 'te') {
    try {
      const { data, error } = await supabase
        .from(TABLES.FAQS)
        .select('*')
        .eq('language', language)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  },

  // Get guides
  async getGuides(language = 'te') {
    try {
      const { data, error } = await supabase
        .from(TABLES.GUIDES)
        .select('*')
        .eq('language', language)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching guides:', error);
      throw error;
    }
  }
};

// Notification Service
export const notificationService = {
  // Get user notifications
  async getUserNotifications(userId, limit = 50) {
    try {
      const { data, error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .update({ is_read: true })
        .eq('id', notificationId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Create notification
  async createNotification(notificationData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .insert([notificationData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  // Get unread count
  async getUnreadCount(userId) {
    try {
      const { count, error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_read', false);
      
      if (error) throw error;
      return count;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  }
};

// Dashboard Service
export const dashboardService = {
  // Get farmer dashboard summary
  async getFarmerDashboard(farmerId) {
    try {
      const { data, error } = await supabase
        .from('farmer_dashboard_summary')
        .select('*')
        .eq('farmer_id', farmerId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching farmer dashboard:', error);
      throw error;
    }
  },

  // Get market overview
  async getMarketOverview() {
    try {
      const [mspData, priceData, weatherData] = await Promise.all([
        mspService.getCurrentMSP(),
        marketDataService.getCurrentPrices(),
        weatherService.getWeatherData('nizamabad', 3)
      ]);

      return {
        msp: mspData,
        prices: priceData,
        weather: weatherData
      };
    } catch (error) {
      console.error('Error fetching market overview:', error);
      throw error;
    }
  }
};
