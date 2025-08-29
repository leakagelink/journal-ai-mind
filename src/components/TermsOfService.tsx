
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService = ({ onBack }: TermsOfServiceProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="rounded-full p-2 mr-3">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-bold text-gradient">Terms of Service</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Usage Agreement</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              By using this AI Journal application, you agree to use it responsibly 
              and for personal journaling purposes only.
            </p>
            <p>
              This app is intended to support your personal reflection and mental 
              well-being but is not a substitute for professional medical advice.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Acceptable Use</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Use the app for any illegal activities</li>
              <li>Share harmful or inappropriate content</li>
              <li>Attempt to reverse engineer the application</li>
              <li>Use the app to harass or harm others</li>
            </ul>
          </div>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Disclaimer</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              This application is provided "as is" without warranties. The AI responses 
              are generated automatically and should not be considered professional advice.
            </p>
            <p>
              If you're experiencing mental health issues, please consult with a 
              qualified healthcare professional.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
