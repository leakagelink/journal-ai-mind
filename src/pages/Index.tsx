
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import ChatInterface from '@/components/ChatInterface';
import JournalView from '@/components/JournalView';
import MoodTracker from '@/components/MoodTracker';
import SettingsView from '@/components/SettingsView';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'journal':
        return <JournalView />;
      case 'mood':
        return <MoodTracker />;
      case 'settings':
        return <SettingsView />;
      default:
        return <ChatInterface />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col max-w-md mx-auto relative">
      <Header />
      
      <main className="flex-1 overflow-hidden pb-16">
        {renderActiveTab()}
      </main>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
