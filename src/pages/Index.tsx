
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import ChatInterface from '@/components/ChatInterface';
import JournalView from '@/components/JournalView';
import MoodTracker from '@/components/MoodTracker';
import SettingsView from '@/components/SettingsView';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import TermsOfService from '@/components/TermsOfService';
import About from '@/components/About';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [currentPage, setCurrentPage] = useState('main');

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page: string) => {
    if (page === 'settings') {
      setActiveTab('settings');
      setCurrentPage('main');
    } else {
      setCurrentPage(page);
    }
  };

  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <About onBack={handleBackToMain} />;
      case 'privacy':
        return <PrivacyPolicy onBack={handleBackToMain} />;
      case 'terms':
        return <TermsOfService onBack={handleBackToMain} />;
      default:
        return renderActiveTab();
    }
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
        return <SettingsView onNavigate={handleNavigation} />;
      default:
        return <ChatInterface />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col max-w-md mx-auto relative">
      <Header onNavigate={handleNavigation} />
      
      <main className="flex-1 overflow-hidden pb-16">
        {renderCurrentPage()}
      </main>
      
      {currentPage === 'main' && (
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
};

export default Index;
