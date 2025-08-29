
import { WebPlugin, registerPlugin } from '@capacitor/core';

export type BannerPosition = 'top' | 'bottom';

export interface InitializeOptions {
  testMode?: boolean;
  initializeForTesting?: boolean;
}

export interface ShowBannerOptions {
  adId: string;
  position?: BannerPosition;
}

export interface ShowInterstitialOptions {
  adId: string;
}

export interface FacebookAdsPlugin {
  initialize(options?: InitializeOptions): Promise<void>;
  showBanner(options: ShowBannerOptions): Promise<void>;
  hideBanner(): Promise<void>;
  showInterstitial(options: ShowInterstitialOptions): Promise<void>;
}

class FacebookAdsWeb extends WebPlugin implements FacebookAdsPlugin {
  initialize(options?: InitializeOptions): Promise<void> {
    console.log('[FacebookAdsWeb] initialize called', options);
    return Promise.resolve();
  }
  showBanner(options: ShowBannerOptions): Promise<void> {
    console.log('[FacebookAdsWeb] showBanner called', options);
    return Promise.resolve();
  }
  hideBanner(): Promise<void> {
    console.log('[FacebookAdsWeb] hideBanner called');
    return Promise.resolve();
  }
  showInterstitial(options: ShowInterstitialOptions): Promise<void> {
    console.log('[FacebookAdsWeb] showInterstitial called', options);
    return Promise.resolve();
  }
}

// This will proxy to native plugin if present on device, and use the web fallback otherwise.
export const FacebookAds = registerPlugin<FacebookAdsPlugin>('FacebookAds', {
  web: new FacebookAdsWeb(),
});
