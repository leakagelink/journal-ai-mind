
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy = ({ onBack }: PrivacyPolicyProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b border-border bg-gradient-to-r from-primary/10 to-purple-500/10">
        <Button variant="ghost" size="sm" onClick={onBack} className="rounded-full p-2 mr-3">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-gradient">Privacy Policy - HeartLog AI</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="p-6 border border-border bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
            🔒 Your Privacy is Our Priority
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
            HeartLog AI is built with privacy-first principles. We believe your personal thoughts, 
            feelings, and journal entries should remain completely private and under your control.
          </p>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Data Collection and Storage</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong>Local Storage Only:</strong> All your personal data, including journal entries, 
              chat conversations, and mood tracking data, are stored exclusively on your device using 
              secure local storage mechanisms.
            </p>
            <p>
              <strong>What We DON'T Collect:</strong> We do not collect, store, or have access to your 
              personal information, journal entries, chat messages, or any other user-generated content 
              on external servers.
            </p>
            <p>
              <strong>AI Processing:</strong> When you interact with the AI companion, your messages are 
              processed through secure AI services to provide responses. Messages sent to AI service 
              providers are processed temporarily only for generating responses and are not stored, 
              profiled, or used for advertising.
            </p>
            <p>
              <strong>No Analytics Tracking:</strong> We do not use analytics services that track your 
              behavior, collect personal data, or create user profiles.
            </p>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Advertisement Policy</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong>Advertisement Usage:</strong> HeartLog AI may display advertisements to support 
              the free version of the application. We use reputable advertising networks that comply 
              with privacy standards.
            </p>
            <p>
              <strong>Ad Data:</strong> Advertising partners may collect limited, non-personal data 
              for ad targeting purposes. This does not include your personal journal entries, chat 
              conversations, or sensitive personal information.
            </p>
            <p>
              <strong>Ad-Free Option:</strong> We are committed to providing options for users who 
              prefer an ad-free experience through premium subscriptions in the future.
            </p>
            <p>
              <strong>Third-Party Ad Networks:</strong> We work with trusted advertising partners 
              who follow industry-standard privacy practices and do not access your personal content.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Your Data Rights</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong>Complete Control:</strong> You have full control over your data. You can view, 
              edit, export, or delete any journal entry or chat conversation at any time.
            </p>
            <p>
              <strong>Data Portability:</strong> Use the export feature to download all your data in 
              a standard format that you can backup or transfer to other applications.
            </p>
            <p>
              <strong>Data Deletion:</strong> Uninstalling the app or clearing app data will permanently 
              remove all your information from your device.
            </p>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Third-Party Services</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong>AI Services:</strong> We use reputable AI service providers to generate responses. 
              These services process your messages temporarily but do not store them permanently.
            </p>
            <p>
              <strong>Advertising Services:</strong> We may use third-party advertising services to 
              display ads. These services may collect anonymous usage data but do not access your 
              personal journal content.
            </p>
            <p>
              <strong>No Social Media Integration:</strong> We do not integrate with social media platforms 
              or share your personal data with social networks.
            </p>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Security Measures</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              We implement appropriate security measures to protect your data stored locally on your device. 
              However, no method of transmission or storage is 100% secure, so we cannot guarantee absolute security.
            </p>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Children's Privacy</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              HeartLog AI is intended for users aged 13 and above. We do not knowingly collect personal 
              information from children under 13. If you believe a child under 13 has provided us with 
              personal information, please contact us immediately.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 border border-border bg-gradient-to-br from-primary/5 to-purple-500/5">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-muted-foreground">
            If you have any questions about this Privacy Policy or how we handle your data, 
            please contact us at: <strong>hello@socilet.com</strong>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
