import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { testSupabaseConfig } from '../../utils/testSupabase';

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Test configuration first
    testSupabaseConfig();
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test basic connection
      const { data, error } = await supabase
        .from('users')
        .select('count(*)')
        .limit(1);

      if (error) {
        setConnectionStatus('❌ Connection Failed');
        setError(error.message);
      } else {
        setConnectionStatus('✅ Connection Successful');
        setError(null);
      }
    } catch (err) {
      setConnectionStatus('❌ Connection Failed');
      setError(err.message);
    }
  };

  const testInsert = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          phone_number: '9999999999',
          name: 'Test User',
          role: 'farmer'
        }])
        .select();

      if (error) {
        alert('Insert failed: ' + error.message);
      } else {
        alert('Insert successful!');
      }
    } catch (err) {
      alert('Insert error: ' + err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      
      <div className="mb-4">
        <p className="font-medium">Status: {connectionStatus}</p>
        {error && (
          <p className="text-red-600 text-sm mt-2">Error: {error}</p>
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={testConnection}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Test Connection
        </button>
        
        <button
          onClick={testInsert}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Test Insert
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>URL:</strong> https://fnwmvnewzirxagcyxwid.supabase.co</p>
        <p><strong>Key:</strong> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</p>
      </div>
    </div>
  );
};

export default ConnectionTest;
