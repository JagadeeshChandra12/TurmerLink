import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://fnwmvnewzirxagcyxwid.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZud212bmV3emlyeGFnY3l4d2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDY5OTEsImV4cCI6MjA3Njk4Mjk5MX0.8-udxQ9Uwe55jXsyzxleXIc2e6Pif3tEFUYa9-pyU8w'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database table names
export const TABLES = {
  FARMERS: 'farmers',
  GOVERNMENT_OFFICERS: 'government_officers',
  SALES: 'sales',
  SUBMISSIONS: 'submissions',
  MARKET_PRICES: 'market_prices',
  WEATHER_DATA: 'weather_data',
  NOTIFICATIONS: 'notifications'
}

// Helper functions for database operations
export const dbHelpers = {
  // Farmers
  async createFarmer(farmerData) {
    const { data, error } = await supabase
      .from(TABLES.FARMERS)
      .insert([farmerData])
      .select()
    return { data, error }
  },

  async getFarmer(phoneNumber) {
    const { data, error } = await supabase
      .from(TABLES.FARMERS)
      .select('*')
      .eq('phone_number', phoneNumber)
      .single()
    return { data, error }
  },

  // Sales
  async createSale(saleData) {
    const { data, error } = await supabase
      .from(TABLES.SALES)
      .insert([saleData])
      .select()
    return { data, error }
  },

  async getFarmerSales(farmerId) {
    const { data, error } = await supabase
      .from(TABLES.SALES)
      .select('*')
      .eq('farmer_id', farmerId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Submissions
  async createSubmission(submissionData) {
    const { data, error } = await supabase
      .from(TABLES.SUBMISSIONS)
      .insert([submissionData])
      .select()
    return { data, error }
  },

  async getAllSubmissions() {
    const { data, error } = await supabase
      .from(TABLES.SUBMISSIONS)
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async updateSubmissionStatus(submissionId, status, governmentResponse = null) {
    const { data, error } = await supabase
      .from(TABLES.SUBMISSIONS)
      .update({ 
        status, 
        government_response: governmentResponse,
        updated_at: new Date().toISOString()
      })
      .eq('id', submissionId)
      .select()
    return { data, error }
  },

  // Government Officers
  async createGovernmentOfficer(officerData) {
    const { data, error } = await supabase
      .from(TABLES.GOVERNMENT_OFFICERS)
      .insert([officerData])
      .select()
    return { data, error }
  },

  async getGovernmentOfficer(officerId, department) {
    const { data, error } = await supabase
      .from(TABLES.GOVERNMENT_OFFICERS)
      .select('*')
      .eq('officer_id', officerId)
      .eq('department', department)
      .single()
    return { data, error }
  },

  // Market Prices
  async createMarketPrice(priceData) {
    const { data, error } = await supabase
      .from(TABLES.MARKET_PRICES)
      .insert([priceData])
      .select()
    return { data, error }
  },

  async getLatestMarketPrices() {
    const { data, error } = await supabase
      .from(TABLES.MARKET_PRICES)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    return { data, error }
  },

  // Weather Data
  async createWeatherData(weatherData) {
    const { data, error } = await supabase
      .from(TABLES.WEATHER_DATA)
      .insert([weatherData])
      .select()
    return { data, error }
  },

  async getLatestWeatherData(location) {
    const { data, error } = await supabase
      .from(TABLES.WEATHER_DATA)
      .select('*')
      .eq('location', location)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    return { data, error }
  },

  // Notifications
  async createNotification(notificationData) {
    const { data, error } = await supabase
      .from(TABLES.NOTIFICATIONS)
      .insert([notificationData])
      .select()
    return { data, error }
  },

  async getFarmerNotifications(farmerId) {
    const { data, error } = await supabase
      .from(TABLES.NOTIFICATIONS)
      .select('*')
      .eq('farmer_id', farmerId)
      .order('created_at', { ascending: false })
    return { data, error }
  }
}

export default supabase