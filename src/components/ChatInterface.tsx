
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateCohereResponse } from '@/services/cohereApi';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    try {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } else {
        // Default welcome message
        const welcomeMessage: Message = {
          id: '1',
          text: 'नमस्ते! मैं आपका AI जर्नल साथी हूं। आज आप कैसा महसूस कर रहे हैं? मुझसे अपने विचार साझा करें।',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        localStorage.setItem('chatMessages', JSON.stringify([welcomeMessage]));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Messages load करने में समस्या हुई।",
        variant: "destructive",
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveMessages = (newMessages: Message[]) => {
    try {
      setMessages(newMessages);
      localStorage.setItem('chatMessages', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages:', error);
      toast({
        title: "Error",
        description: "Messages save करने में समस्या हुई।",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    saveMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      console.log('Sending message to Cohere API:', inputText);
      const aiResponse = await generateCohereResponse(inputText.trim());
      console.log('Cohere API response:', aiResponse);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      const finalMessages = [...updatedMessages, aiMessage];
      saveMessages(finalMessages);
      
      toast({
        title: "Success",
        description: "AI ने जवाब दिया है।",
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'माफ करें, मुझे अभी जवाब देने में परेशानी हो रही है। कृपया फिर से कोशिश करें।',
        isUser: false,
        timestamp: new Date(),
        isError: true,
      };
      const finalMessages = [...updatedMessages, errorMessage];
      saveMessages(finalMessages);
      
      toast({
        title: "Error",
        description: "AI response प्राप्त करने में त्रुटि।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
    toast({
      title: "Success",
      description: "Chat history साफ़ कर दी गई।",
    });
  };

  const retryLastMessage = () => {
    if (messages.length >= 2) {
      const lastUserMessage = messages[messages.length - 2];
      if (lastUserMessage.isUser) {
        setInputText(lastUserMessage.text);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-soft">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AI</span>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">AI Chat Companion</h2>
            <p className="text-xs text-muted-foreground">
              {isLoading ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={retryLastMessage}
            className="rounded-full p-2 hover:bg-accent/10"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearChat}
            className="rounded-full p-2 hover:bg-destructive/10 text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary/10 flex items-center justify-center">
              <span className="text-2xl">💭</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">AI Chat शुरू करें</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                अपने विचार, भावनाएं या कोई भी बात साझा करें। मैं यहां सुनने के लिए हूं।
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-in`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.isUser
                    ? 'bg-gradient-primary text-white ml-4'
                    : message.isError
                    ? 'bg-destructive/10 border border-destructive/20 text-destructive mr-4'
                    : 'bg-surface border border-border mr-4'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.isUser 
                    ? 'text-white/70' 
                    : message.isError 
                    ? 'text-destructive/70'
                    : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString('hi-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start animate-slide-in">
            <div className="bg-surface border border-border rounded-2xl px-4 py-3 mr-4">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-muted-foreground">AI सोच रहा है...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-surface/80 backdrop-blur-sm p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="rounded-full p-2 hover:bg-accent/10">
            <Image className="w-4 h-4 text-muted-foreground" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="अपना संदेश लिखें..."
              className="rounded-full pr-12 border-border focus:border-primary transition-colors"
              disabled={isLoading}
              maxLength={500}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 p-0 bg-gradient-primary hover:opacity-90 disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="rounded-full p-2 hover:bg-accent/10">
            <Mic className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
        
        {inputText.length > 0 && (
          <div className="mt-2 text-xs text-muted-foreground text-right">
            {inputText.length}/500
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
