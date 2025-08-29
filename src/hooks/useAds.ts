
import { useEffect, useState } from 'react';
import { adsService } from '@/services/adsService';

export const useAds = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAds = async () => {
      try {
        await adsService.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize ads');
      }
    };

    initializeAds();
  }, []);

  const showBannerAd = async (adUnitId?: string) => {
    try {
      await adsService.showBannerAd(adUnitId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to show banner ad');
    }
  };

  const showInterstitialAd = async (adUnitId?: string) => {
    try {
      await adsService.showInterstitialAd(adUnitId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to show interstitial ad');
    }
  };

  const hideBannerAd = async () => {
    try {
      await adsService.hideBannerAd();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to hide banner ad');
    }
  };

  return {
    isInitialized,
    error,
    showBannerAd,
    showInterstitialAd,
    hideBannerAd
  };
};
