
import { Capacitor } from '@capacitor/core';
import { FacebookAds } from '@/plugins/FacebookAds';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export class AdsService {
  private static instance: AdsService;
  private isInitialized = false;

  static getInstance(): AdsService {
    if (!AdsService.instance) {
      AdsService.instance = new AdsService();
    }
    return AdsService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      if (Capacitor.isNativePlatform()) {
        // Initialize native ads
        await this.initializeNativeAds();
      } else {
        // Initialize web ads (Facebook SDK)
        await this.initializeWebAds();
      }
      this.isInitialized = true;
      console.log('Ads service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize ads service:', error);
    }
  }

  private async initializeNativeAds(): Promise<void> {
    try {
      await FacebookAds.initialize({
        testMode: true,
        initializeForTesting: true
      });
    } catch (error) {
      console.log('Native ads not available:', error);
    }
  }

  private async initializeWebAds(): Promise<void> {
    return new Promise((resolve) => {
      // Load Facebook SDK for web
      if (document.getElementById('facebook-jssdk')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      
      window.fbAsyncInit = () => {
        if (window.FB) {
          window.FB.init({
            appId: 'your-facebook-app-id', // Replace with actual app ID
            xfbml: true,
            version: 'v18.0'
          });
        }
        resolve();
      };

      document.head.appendChild(script);
    });
  }

  async showBannerAd(adUnitId: string = 'IMG_16_9_APP_INSTALL#1102290566500541_1102290633167201'): Promise<void> {
    try {
      if (Capacitor.isNativePlatform()) {
        await FacebookAds.showBanner({
          adId: adUnitId,
          position: 'bottom'
        });
      } else {
        console.log('Web banner ad would be shown here');
      }
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  }

  async showInterstitialAd(adUnitId: string = 'IMG_16_9_APP_INSTALL#1102290566500541_1102290703167194'): Promise<void> {
    try {
      if (Capacitor.isNativePlatform()) {
        await FacebookAds.showInterstitial({
          adId: adUnitId
        });
      } else {
        console.log('Web interstitial ad would be shown here');
      }
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
    }
  }

  async hideBannerAd(): Promise<void> {
    try {
      if (Capacitor.isNativePlatform()) {
        await FacebookAds.hideBanner();
      }
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }
}

export const adsService = AdsService.getInstance();
