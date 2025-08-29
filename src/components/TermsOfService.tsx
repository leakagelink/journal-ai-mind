
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService = ({ onBack }: TermsOfServiceProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b border-border bg-gradient-to-r from-primary/10 to-purple-500/10">
        <Button variant="ghost" size="sm" onClick={onBack} className="rounded-full p-2 mr-3">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-gradient">Terms of Service - HeartLog AI</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="p-6 border border-border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-200">
            Welcome to HeartLog AI
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
            By using HeartLog AI, you agree to these terms of service. Please read them carefully 
            as they govern your use of our application and services.
          </p>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Acceptance of Terms</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              By accessing and using HeartLog AI, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
            <p>
              If you do not agree to these terms, please do not use our application.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Intended Use</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong>Personal Wellness Tool:</strong> HeartLog AI is designed as a personal wellness 
              and journaling application to support your emotional well-being through AI-assisted 
              reflection and mood tracking.
            </p>
            <p>
              <strong>Age Requirement:</strong> You must be at least 13 years old to use this application. 
              Users under 18 should have parental guidance when using mental health-related features.
            </p>
            <p>
              <strong>Not Medical Advice:</strong> This application is not intended to provide medical, 
              psychological, or psychiatric advice, diagnosis, or treatment. Always seek professional 
              help for serious mental health concerns.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Acceptable Use Policy</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>You agree to use HeartLog AI responsibly and not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the app for any illegal activities or purposes</li>
              <li>Share harmful, abusive, or inappropriate content</li>
              <li>Attempt to reverse engineer, hack, or compromise the application</li>
              <li>Use the app to harass, threaten, or harm others</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Share your account access with unauthorized persons</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">AI Companion Disclaimer</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong>Automated Responses:</strong> The AI companion provides automated responses 
              based on artificial intelligence algorithms. These responses are not from human therapists 
              or medical professionals.
            </p>
            <p>
              <strong>Limitations:</strong> While designed to be helpful, AI responses may not always 
              be accurate, appropriate, or suitable for your specific situation.
            </p>
            <p>
              <strong>Emergency Situations:</strong> If you're experiencing a mental health emergency, 
              please contact emergency services or a mental health professional immediately. Do not 
              rely solely on the AI companion for crisis support.
            </p>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Intellectual Property</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              The HeartLog AI application, including its design, features, and content, is protected 
              by intellectual property laws. You may not copy, modify, or distribute the application 
              without permission.
            </p>
            <p>
              Your journal entries and personal data remain your property. We do not claim ownership 
              of your content.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Limitation of Liability</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              HeartLog AI is provided "as is" without warranties of any kind. We are not liable for 
              any direct, indirect, incidental, or consequential damages resulting from your use of 
              the application.
            </p>
            <p>
              We make no guarantees about the accuracy, reliability, or availability of the service.
            </p>
          </div>
        </Card>

        <Card className="p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Updates and Changes</h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              We may update these Terms of Service from time to time. Significant changes will be 
              communicated through the application. Continued use of the app after changes constitutes 
              acceptance of the updated terms.
            </p>
          </div>
        </Card>
        
        <Card className="p-6 border border-border bg-gradient-to-br from-primary/5 to-purple-500/5">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <p className="text-sm text-muted-foreground">
            For questions about these Terms of Service, please contact us through the app settings 
            or our official support channels.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
