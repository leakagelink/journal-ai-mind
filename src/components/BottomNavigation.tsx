
import { MessageCircle, BookOpen, Settings, Heart } from 'lucide-react';
import { useState } from 'react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'mood', label: 'Mood', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/20 z-40">
      <div className="flex justify-around items-center py-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-primary text-white scale-105' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'mb-1' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'block' : 'hidden'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
