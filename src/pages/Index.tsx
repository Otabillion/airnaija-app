
import React from 'react';
import OtpListener from '@/components/OtpListener';
import WebView from '@/components/WebView';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-app-blue">Airnaija App</h1>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          <WebView 
            url="https://airnaija.com.ng" 
            height="calc(100vh - 64px)"
          />
          {/* OTP listener is still active but completely hidden */}
          <OtpListener isActive={true} hidden={true} />
        </div>
      </main>
    </div>
  );
};

export default Index;
