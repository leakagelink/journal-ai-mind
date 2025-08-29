
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.heartlogai.com',
  appName: 'HeartLog AI',
  webDir: 'dist',
  server: {
    url: 'https://fc31d0ad-638c-49a5-b87c-cb67b53f98e1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    FacebookAds: {
      testMode: true,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false
    }
  }
};

export default config;
