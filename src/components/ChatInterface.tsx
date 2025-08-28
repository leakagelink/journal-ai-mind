
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI journal companion. How are you feeling today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's really interesting! Tell me more about how that made you feel.",
      "I understand. It sounds like you're going through a lot. How can I help?",
      "Thank you for sharing that with me. What thoughts come to mind about this?",
      "That's a meaningful reflection. How do you think this relates to your goals?",
      "I appreciate your openness. What would you like to explore further?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-in`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 chat-bubble-shadow ${
                message.isUser
                  ? 'bg-gradient-primary text-white'
                  : 'bg-surface border border-border'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isUser ? 'text-white/70' : 'text-muted-foreground'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-surface/50 backdrop-blur-sm p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <Image className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts..."
              className="rounded-full pr-12 border-border focus:border-primary"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 p-0 bg-gradient-primary hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
