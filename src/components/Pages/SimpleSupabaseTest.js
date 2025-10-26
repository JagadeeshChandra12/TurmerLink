import React, { useState } from 'react';

const SimpleSupabaseTest = () => {
  const [message, setMessage] = useState('Click a button to test');

  const testBasicConnection = () => {
    setMessage('Testing basic connection...');
    
    try {
      // Just test if we can import the module
      import('../../config/supabase').then((config) => {
        setMessage('✅ Supabase config loaded successfully!');
        console.log('Supabase config:', config);
      }).catch((error) => {
        setMessage('❌ Failed to load Supabase config: ' + error.message);
        console.error('Import error:', error);
      });
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    }
  };

  const testDatabaseCall = async () => {
    setMessage('Testing database call...');
    
    try {
      const config = await import('../../config/supabase');
      const { dbHelpers } = config;
      
      const result = await dbHelpers.getAllSubmissions();
      
      if (result.error) {
        setMessage('❌ Database error: ' + result.error.message);
      } else {
        setMessage(`✅ Database connected! Found ${result.data?.length || 0} submissions`);
      }
    } catch (error) {
      setMessage('❌ Database call failed: ' + error.message);
      console.error('Database error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🧪 Supabase Test
        </h1>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-lg font-medium">{message}</div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={testBasicConnection}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Config Load
          </button>
          
          <button
            onClick={testDatabaseCall}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Test Database Call
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Instructions:</strong></p>
          <p>1. Click "Test Config Load" first</p>
          <p>2. Then click "Test Database Call"</p>
          <p>3. Check browser console (F12) for details</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleSupabaseTest;
