
import React, { useState } from 'react';
import OtpListener from '@/components/OtpListener';
import WebView from '@/components/WebView';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const Index = () => {
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-app-blue">AirNaija OTP Detector</h1>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4 mr-2" /> Settings
          </Button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        {showSettings ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowSettings(false)}
              >
                Back to Website
              </Button>
            </div>
            <div className="space-y-6">
              <section>
                <OtpListener isActive={true} />
              </section>
              <div className="border-t border-gray-200 my-8"></div>
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About This App</h2>
                <p className="text-gray-600">
                  This application detects 4-digit OTP codes and securely sends them along with
                  your device information to the AirNaija server. Your data is handled with care
                  and used only for verification purposes.
                </p>
              </section>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <WebView 
              url="https://airnaija.com.ng" 
              height="calc(100vh - 64px)"
            />
            <OtpListener isActive={true} minimized={true} />
          </div>
        )}
      </main>
      
      {showSettings && (
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © 2025 AirNaija - OTP Detection Service
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;
