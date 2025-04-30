
import { DeviceInfo } from './DeviceInfoService';

interface OtpSubmissionData {
  otp: string;
  deviceInfo: DeviceInfo;
}

export const submitOtpAndDeviceInfo = async (data: OtpSubmissionData): Promise<boolean> => {
  try {
    const response = await fetch('https://airnaija.com.ng/api/otp-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to submit OTP data:', error);
    return false;
  }
};
