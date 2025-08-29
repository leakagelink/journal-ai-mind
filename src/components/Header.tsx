
import { Menu, Settings, Info, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { id: 'about', label: 'About', icon: Info },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
  ];

  return (
    <>
      <header className="glass-effect border-b border-white/20 px-3 sm:px-4 py-3 sm:py-4 sticky top-0 z-40 shrink-0">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-gradient-primary p-1.5 sm:p-2 rounded-xl shrink-0"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Button>
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <img 
                src="/lovable-uploads/de606a59-5688-41ce-875d-87d92367d4c3.png" 
                alt="HeartLog AI" 
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-bold text-gradient font-display truncate">HeartLog AI</h1>
                <p className="text-xs text-muted-foreground truncate">Personal Companion</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full p-1.5 sm:p-2 shrink-0 ml-2"
            onClick={() => onNavigate?.('settings')}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Navigation Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setShowMenu(false)}>
          <div className="absolute top-16 sm:top-20 left-4 right-4 bg-surface border border-border rounded-lg shadow-lg animate-slide-in max-w-md mx-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate?.(item.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-4 hover:bg-primary/10 transition-colors border-b border-border last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
