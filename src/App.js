import React from 'react';
import { Toaster } from 'react-hot-toast';
import './i18n';
import './index.css';

// Components
import App from './components/App/App';

function AppWrapper() {
  return (
    <div className="min-h-screen">
      <App />
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default AppWrapper;
