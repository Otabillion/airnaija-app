
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
  timezone?: string;
  timezoneOffset?: number;
  localTime?: string;
  vendor?: string;
  cookiesEnabled?: boolean;
  historyLength?: number;
  plugins?: string[];
  referrer?: string;
  orientation?: string;
  colorDepth?: number;
  ipAddress?: string;
  windowDimensions?: { width: number; height: number };
}

export const collectDeviceInfo = async (): Promise<DeviceInfo> => {
  const now = new Date();
  
  const deviceInfo: DeviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    timestamp: now.getTime(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: now.getTimezoneOffset(),
    localTime: now.toLocaleString(),
    vendor: navigator.vendor,
    cookiesEnabled: navigator.cookieEnabled,
    historyLength: window.history.length,
    referrer: document.referrer,
    colorDepth: window.screen.colorDepth,
    windowDimensions: {
      width: window.innerWidth,
      height: window.innerHeight
    }
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

  // Add orientation if available
  if (window.screen.orientation) {
    deviceInfo.orientation = window.screen.orientation.type;
  }

  // Add plugins if available
  if (navigator.plugins) {
    deviceInfo.plugins = Array.from(navigator.plugins).map(plugin => plugin.name);
  }

  // Try to get IP address using a third-party service (for demo purposes)
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    deviceInfo.ipAddress = data.ip;
  } catch (error) {
    console.log('IP address fetch failed');
  }

  return deviceInfo;
};
