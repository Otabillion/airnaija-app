
// Device information service to collect device details

export interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
  screenWidth: number;
  screenHeight: number;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  connectionType?: string;
  connectionSpeed?: string;
  batteryLevel?: number;
  isCharging?: boolean;
  timestamp: number;
}

export const collectDeviceInfo = async (): Promise<DeviceInfo> => {
  const deviceInfo: DeviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    timestamp: Date.now(),
  };

  // Add device memory if available
  if ('deviceMemory' in navigator) {
    deviceInfo.deviceMemory = (navigator as any).deviceMemory;
  }

  // Add hardware concurrency if available
  if ('hardwareConcurrency' in navigator) {
    deviceInfo.hardwareConcurrency = navigator.hardwareConcurrency;
  }

  // Add network information if available
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection) {
      deviceInfo.connectionType = connection.effectiveType;
      deviceInfo.connectionSpeed = connection.downlink + 'Mbps';
    }
  }

  // Add battery information if available
  try {
    if ('getBattery' in navigator) {
      const battery = await (navigator as any).getBattery();
      deviceInfo.batteryLevel = battery.level;
      deviceInfo.isCharging = battery.charging;
    }
  } catch (error) {
    console.log('Battery status not available');
  }

  return deviceInfo;
};
