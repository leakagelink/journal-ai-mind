
import { useEffect, useState } from 'react';
import { MessageCircle, Sparkles, BookOpen } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-primary animate-fade-in opacity-0 pointer-events-none transition-opacity duration-500" />
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-primary flex items-center justify-center z-50">
      <div className="text-center animate-slide-in">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-pulse-soft">
            <MessageCircle className="w-20 h-20 text-white/20 mx-auto" />
          </div>
          <div className="relative animate-float">
            <MessageCircle className="w-20 h-20 text-white mx-auto" />
            <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2 font-display">
          AI Chat Journal
        </h1>
        <p className="text-white/80 text-lg mb-8">
          Your Personal AI Companion
        </p>
        
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
