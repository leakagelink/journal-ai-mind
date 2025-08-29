
import { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Faster animation phases
    const phase1 = setTimeout(() => setAnimationPhase(1), 200);
    const phase2 = setTimeout(() => setAnimationPhase(2), 500);
    const phase3 = setTimeout(() => setAnimationPhase(3), 800);
    
    // Shorter duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 1500);

    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearTimeout(phase3);
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-primary animate-fade-out opacity-0 pointer-events-none transition-opacity duration-300" />
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-600 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Logo container with modern effects */}
        <div className={`relative mb-8 transition-all duration-500 ${
          animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}>
          {/* Glowing background effect */}
          <div className="absolute inset-0 animate-pulse-soft">
            <div className="w-24 h-24 mx-auto rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
          </div>
          
          {/* Main logo */}
          <div className={`relative transition-all duration-500 ${
            animationPhase >= 2 ? 'animate-float' : ''
          }`}>
            <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-2xl">
              <img 
                src="/lovable-uploads/de606a59-5688-41ce-875d-87d92367d4c3.png" 
                alt="HeartLog AI" 
                className="w-16 h-16 object-contain"
              />
            </div>
            
            {/* Sparkle effects */}
            <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
            <Heart className="w-4 h-4 text-pink-300 absolute -bottom-1 -left-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
        
        {/* App name with typing effect */}
        <div className={`transition-all duration-500 delay-300 ${
          animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h1 className="text-4xl font-bold text-white mb-3 font-display tracking-wide">
            HeartLog AI
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="w-4 h-4 text-pink-300" />
            <p className="text-white/90 text-lg font-medium">
              Your Personal AI Companion
            </p>
            <Heart className="w-4 h-4 text-pink-300" />
          </div>
          <p className="text-white/70 text-sm mb-8">
            Journal • Chat • Mood Tracking
          </p>
        </div>
        
        {/* Loading indicator */}
        <div className={`transition-all duration-500 delay-500 ${
          animationPhase >= 3 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex justify-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-white/60 text-xs">Ready to start...</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
