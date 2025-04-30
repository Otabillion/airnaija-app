
import React, { useState, useEffect } from 'react';
import { collectDeviceInfo, DeviceInfo } from '../services/DeviceInfoService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DeviceInfoDisplay: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDeviceInfo = async () => {
    setLoading(true);
    try {
      const info = await collectDeviceInfo();
      setDeviceInfo(info);
    } catch (error) {
      console.error('Error collecting device info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceInfo();
  }, []);

  const formatInfoItem = (key: string, value: any) => {
    if (typeof value === 'undefined' || value === null) return null;
    
    // Format timestamp as date
    if (key === 'timestamp' && typeof value === 'number') {
      return {
        label: 'Time',
        value: new Date(value).toLocaleString()
      };
    }
    
    // Format other values
    return {
      label: key
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()), // Capitalize first letter
      value: typeof value === 'boolean' ? value.toString() : value
    };
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Device Information</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchDeviceInfo}
            disabled={loading}
          >
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-app-blue"></div>
          </div>
        ) : deviceInfo ? (
          <div className="space-y-2">
            {Object.entries(deviceInfo).map(([key, value]) => {
              const formattedInfo = formatInfoItem(key, value);
              if (!formattedInfo) return null;
              
              return (
                <div key={key} className="flex justify-between border-b border-gray-100 py-2">
                  <span className="text-sm text-gray-600">{formattedInfo.label}:</span>
                  <span className="text-sm font-medium">{formattedInfo.value}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">
            Unable to collect device information
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceInfoDisplay;
