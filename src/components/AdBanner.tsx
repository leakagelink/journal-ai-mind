
import { useEffect } from 'react';
import { useAds } from '@/hooks/useAds';

interface AdBannerProps {
  adUnitId?: string;
  className?: string;
}

const AdBanner = ({ adUnitId, className = '' }: AdBannerProps) => {
  const { isInitialized, showBannerAd, error } = useAds();

  useEffect(() => {
    if (isInitialized) {
      const timer = setTimeout(() => {
        showBannerAd(adUnitId);
      }, 2000); // Show ad after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [isInitialized, showBannerAd, adUnitId]);

  if (error) {
    console.log('Ad error:', error);
    return null;
  }

  // Placeholder for web environment - will show actual ads on mobile
  return (
    <div className={`w-full h-16 bg-gradient-to-r from-primary/5 to-secondary/5 border border-border rounded-lg flex items-center justify-center ${className}`}>
      <p className="text-xs text-muted-foreground">Advertisement will appear here</p>
    </div>
  );
};

export default AdBanner;
