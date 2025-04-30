
import React from 'react';
import OtpListener from '@/components/OtpListener';
import DeviceInfoDisplay from '@/components/DeviceInfoDisplay';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-app-blue">AirNaija OTP Detector</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">SMS OTP Detection</h2>
              <p className="text-gray-600 mt-2">
                Enable OTP detection to automatically process verification codes
              </p>
            </div>
            
            <OtpListener isActive={false} />
          </section>
          
          <div className="border-t border-gray-200 my-8"></div>
          
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Device Info</h2>
              <p className="text-gray-600 mt-2">
                Information about your current device
              </p>
            </div>
            
            <DeviceInfoDisplay />
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
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 AirNaija - OTP Detection Service
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
