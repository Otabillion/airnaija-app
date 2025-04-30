
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3bd28851be8e43cb95435c896c97272b',
  appName: 'otp-device-listener-air',
  webDir: 'dist',
  server: {
    url: "https://3bd28851-be8e-43cb-9543-5c896c97272b.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
    },
  },
};

export default config;
