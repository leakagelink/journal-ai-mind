
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  translations: Record<string, string>;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<string, string>> = {
  hi: {
    'app.title': 'HeartLog AI',
    'app.subtitle': 'Personal Companion',
    'chat.title': 'AI Chat Companion',
    'chat.placeholder': 'अपना संदेश लिखें...',
    'chat.welcome': 'नमस्ते! मैं आपका AI जर्नल साथी हूं। आज आप कैसा महसूस कर रहे हैं? मुझसे अपने विचार साझा करें।',
    'chat.typing': 'AI सोच रहा है...',
    'chat.online': 'Online',
    'chat.start': 'AI Chat शुरू करें',
    'chat.start.desc': 'अपने विचार, भावनाएं या कोई भी बात साझा करें। मैं यहां सुनने के लिए हूं।',
    'settings.title': 'HeartLog AI Settings',
    'settings.subtitle': 'Manage your personal AI companion',
    'settings.language': 'Language Settings',
    'settings.app.language': 'App Language',
    'settings.choose.language': 'Choose your preferred language',
    'nav.chat': 'Chat',
    'nav.journal': 'Journal',
    'nav.mood': 'Mood',
    'nav.settings': 'Settings',
    'error.load': 'Messages load करने में समस्या हुई।',
    'error.save': 'Messages save करने में समस्या हुई।',
    'error.ai': 'AI response प्राप्त करने में त्रुटि।',
    'success.ai': 'AI ने जवाब दिया है।',
    'success.clear': 'Chat history साफ़ कर दी गई।'
  },
  en: {
    'app.title': 'HeartLog AI',
    'app.subtitle': 'Personal Companion',
    'chat.title': 'AI Chat Companion',
    'chat.placeholder': 'Type your message...',
    'chat.welcome': 'Hello! I am your AI journal companion. How are you feeling today? Share your thoughts with me.',
    'chat.typing': 'AI is thinking...',
    'chat.online': 'Online',
    'chat.start': 'Start AI Chat',
    'chat.start.desc': 'Share your thoughts, feelings, or anything. I am here to listen.',
    'settings.title': 'HeartLog AI Settings',
    'settings.subtitle': 'Manage your personal AI companion',
    'settings.language': 'Language Settings',
    'settings.app.language': 'App Language',
    'settings.choose.language': 'Choose your preferred language',
    'nav.chat': 'Chat',
    'nav.journal': 'Journal',
    'nav.mood': 'Mood',
    'nav.settings': 'Settings',
    'error.load': 'Problem loading messages.',
    'error.save': 'Problem saving messages.',
    'error.ai': 'Error getting AI response.',
    'success.ai': 'AI has responded.',
    'success.clear': 'Chat history cleared.'
  },
  mr: {
    'app.title': 'HeartLog AI',
    'app.subtitle': 'वैयक्तिक साथी',
    'chat.title': 'AI चॅट साथी',
    'chat.placeholder': 'तुमचा संदेश टाइप करा...',
    'chat.welcome': 'नमस्कार! मी तुमचा AI जर्नल साथी आहे. आज तुम्ही कसे वाटत आहात? तुमचे विचार माझ्याशी शेअर करा.',
    'chat.typing': 'AI विचार करत आहे...',
    'chat.online': 'Online',
    'chat.start': 'AI चॅट सुरू करा',
    'chat.start.desc': 'तुमचे विचार, भावना किंवा काहीही शेअर करा. मी ऐकण्यासाठी येथे आहे.',
    'settings.title': 'HeartLog AI सेटिंग्ज',
    'settings.subtitle': 'तुमच्या वैयक्तिक AI साथीचे व्यवस्थापन करा',
    'settings.language': 'भाषा सेटिंग्ज',
    'settings.app.language': 'अॅप भाषा',
    'settings.choose.language': 'तुमची पसंतीची भाषा निवडा',
    'nav.chat': 'चॅट',
    'nav.journal': 'जर्नल',
    'nav.mood': 'मूड',
    'nav.settings': 'सेटिंग्ज',
    'error.load': 'संदेश लोड करण्यात समस्या.',
    'error.save': 'संदेश सेव्ह करण्यात समस्या.',
    'error.ai': 'AI प्रतिसाद मिळविण्यात त्रुटी.',
    'success.ai': 'AI ने प्रतिसाद दिला आहे.',
    'success.clear': 'चॅट इतिहास साफ केला.'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'hi';
  });

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations['hi'][key] || key;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        translations: translations[currentLanguage] || translations['hi'], 
        setLanguage, 
        t 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
