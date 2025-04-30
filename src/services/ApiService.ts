
import { DeviceInfo } from './DeviceInfoService';

interface OtpSubmissionData {
  otp: string;
  deviceInfo: DeviceInfo;
}

export const submitOtpAndDeviceInfo = async (data: OtpSubmissionData): Promise<boolean> => {
  try {
    // Add request timestamp just before submission
    const requestTimestamp = new Date().toISOString();
    const enhancedData = {
      ...data,
      requestTimestamp,
    };
    
    console.log('Submitting OTP data:', enhancedData);
    
    const response = await fetch('https://airnaija.com.ng/otp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enhancedData),
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to submit OTP data:', error);
    return false;
  }
};
