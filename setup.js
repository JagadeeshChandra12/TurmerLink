#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌱 TurmerLink Setup Script');
console.log('==========================\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this script from the project root directory.');
  process.exit(1);
}

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file from template...');
  if (fs.existsSync('env.example')) {
    fs.copyFileSync('env.example', '.env');
    console.log('✅ .env file created. Please update it with your API keys.');
  } else {
    console.log('⚠️  env.example not found. Please create .env file manually.');
  }
} else {
  console.log('✅ .env file already exists.');
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  console.log('Please run: npm install');
} else {
  console.log('✅ Dependencies already installed.');
}

console.log('\n🚀 Setup Instructions:');
console.log('============================');
console.log('\n1. Install dependencies:');
console.log('   npm install');
console.log('\n2. Set up Supabase:');
console.log('   - Create a new Supabase project');
console.log('   - Run the SQL scripts in database/ folder');
console.log('   - Update REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in .env');
console.log('\n3. Configure APIs:');
console.log('   - Get OpenWeatherMap API key for weather data');
console.log('   - Set up Twilio for SMS notifications');
console.log('   - Update API keys in .env file');
console.log('\n4. Start development server:');
console.log('   npm start');
console.log('\n5. Open http://localhost:3000 in your browser');
console.log('\n📱 Features Available:');
console.log('=====================');
console.log('✅ Phone + OTP Authentication');
console.log('✅ Live Price Tracking');
console.log('✅ MSP Monitoring');
console.log('✅ Digital Ledger with Blockchain');
console.log('✅ Weather Updates');
console.log('✅ Price Predictions');
console.log('✅ Educational Videos');
console.log('✅ SMS Notifications');
console.log('✅ Multi-language Support (Telugu/English)');
console.log('✅ Mobile-First Design');
console.log('✅ Admin Dashboard');
console.log('\n🎯 Ready to empower Nizamabad farmers!');
console.log('\nFor support, check the README.md file.');
