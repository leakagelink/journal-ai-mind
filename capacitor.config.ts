
import { CapacitorConfig } from '@capacitor/cli';

// Use live reload only if explicitly provided via env
const LIVE_URL = process.env.MOBILE_LIVE_URL?.trim();

const config: CapacitorConfig = {
  appId: 'com.heartlogai.com',
  appName: 'HeartLog AI',
  webDir: 'dist',
  // For production/debug builds, we load from bundled assets (dist) to avoid Cloudflare SSL issues.
  // If you want live reload, set MOBILE_LIVE_URL to your dev server or Lovable preview URL.
  server: LIVE_URL
    ? {
        url: LIVE_URL,
        cleartext: true,
        androidScheme: 'https',
      }
    : {
        cleartext: true,
        androidScheme: 'https',
      },
  plugins: {
    FacebookAds: {
      testMode: true,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    },
  },
};

export default config;

