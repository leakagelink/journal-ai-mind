
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy = ({ onBack }: PrivacyPolicyProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="rounded-full p-2 mr-3">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-bold text-gradient">Privacy Policy</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Data Collection and Storage</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              This application is designed with your privacy in mind. All your personal data, 
              including journal entries and chat conversations, are stored locally on your device.
            </p>
            <p>
              <strong>What we collect:</strong> We do not collect any personal information, 
              journal entries, or chat data on external servers.
            </p>
            <p>
              <strong>Data Storage:</strong> All your data is stored locally using your device's 
              storage system and remains under your complete control.
            </p>
            <p>
              <strong>Third-party Services:</strong> We use Cohere AI API only to provide 
              AI responses. Your messages are sent to Cohere for processing but are not 
              stored by us.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Your Rights</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              You have complete control over your data. You can delete any journal entry 
              or clear all chat history at any time.
            </p>
            <p>
              Since data is stored locally, uninstalling the app will remove all your data.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm text-muted-foreground">
            For any privacy-related questions, please contact us through the app settings.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
