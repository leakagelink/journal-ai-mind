
import { ArrowLeft, Heart, Shield, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AboutProps {
  onBack: () => void;
}

const About = ({ onBack }: AboutProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="rounded-full p-2 mr-3">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-bold text-gradient">About AI Journal</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="p-6 border border-border text-center">
          <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gradient mb-2">AI Journal v1.0</h3>
          <p className="text-sm text-muted-foreground">
            Your personal AI-powered journaling companion
          </p>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Privacy First
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We believe your thoughts are private. That's why all your data stays 
            on your device. No cloud storage, no data mining, just you and your journal.
          </p>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-primary" />
            Offline Ready
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Write your thoughts anytime, anywhere. The app works offline, and only 
            connects to the internet when you chat with the AI companion.
          </p>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              AI-powered chat companion
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              Personal journal entries with mood tracking
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              Local data storage for complete privacy
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              Beautiful, intuitive interface
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
