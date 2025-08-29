
import { ArrowLeft, Heart, Shield, Smartphone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AboutProps {
  onBack: () => void;
}

const About = ({ onBack }: AboutProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b border-border bg-gradient-to-r from-primary/10 to-purple-500/10">
        <Button variant="ghost" size="sm" onClick={onBack} className="rounded-full p-2 mr-3">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/de606a59-5688-41ce-875d-87d92367d4c3.png" 
            alt="HeartLog AI" 
            className="w-6 h-6 rounded-full"
          />
          <h2 className="text-xl font-bold text-gradient">About HeartLog AI</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="p-6 border border-border text-center bg-gradient-to-br from-primary/5 to-purple-500/5">
          <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gradient mb-2">HeartLog AI v1.0</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Your personal AI-powered journaling companion for emotional well-being
          </p>
          <div className="flex items-center justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
            ))}
          </div>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Privacy First Design
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We believe your thoughts are private. That's why all your data stays 
            on your device. No cloud storage, no data mining, just you and your journal.
            Your personal information is never shared or sold to third parties.
          </p>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-primary" />
            Offline Ready Experience
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Write your thoughts anytime, anywhere. The app works offline, and only 
            connects to the internet when you chat with the AI companion for enhanced responses.
          </p>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Key Features</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              AI-powered emotional support companion
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              Personal journal with mood tracking & insights
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              Complete data privacy with local storage
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              Beautiful, intuitive user interface
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              Export and backup your data anytime
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-border bg-gradient-to-br from-primary/5 to-purple-500/5">
          <h3 className="text-lg font-semibold mb-4">Mental Health Disclaimer</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            HeartLog AI is designed to support your emotional well-being through journaling and reflection. 
            This app is not a substitute for professional medical advice, diagnosis, or treatment. 
            If you're experiencing severe mental health issues, please consult with a qualified healthcare professional.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default About;
