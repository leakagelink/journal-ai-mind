
import { User, Bell, Shield, Info, FileText, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SettingsViewProps {
  onNavigate?: (page: string) => void;
}

const SettingsView = ({ onNavigate }: SettingsViewProps) => {
  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('journalEntries');
      localStorage.removeItem('chatMessages');
      window.location.reload();
    }
  };

  const exportData = () => {
    const journalEntries = localStorage.getItem('journalEntries') || '[]';
    const chatMessages = localStorage.getItem('chatMessages') || '[]';
    
    const data = {
      journalEntries: JSON.parse(journalEntries),
      chatMessages: JSON.parse(chatMessages),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-journal-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold text-gradient">Settings</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Section */}
        <Card className="p-4 border border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-primary p-3 rounded-full">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Personal Journal</h3>
              <p className="text-sm text-muted-foreground">Your private space</p>
            </div>
          </div>
        </Card>

        {/* App Information */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">App Information</h3>
          
          <Card className="border border-border">
            <button 
              onClick={() => onNavigate?.('about')}
              className="w-full p-4 flex items-center justify-between hover:bg-primary/5 transition-colors rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Info className="w-5 h-5 text-primary" />
                <span>About AI Journal</span>
              </div>
            </button>
          </Card>

          <Card className="border border-border">
            <button 
              onClick={() => onNavigate?.('privacy')}
              className="w-full p-4 flex items-center justify-between hover:bg-primary/5 transition-colors rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-primary" />
                <span>Privacy Policy</span>
              </div>
            </button>
          </Card>

          <Card className="border border-border">
            <button 
              onClick={() => onNavigate?.('terms')}
              className="w-full p-4 flex items-center justify-between hover:bg-primary/5 transition-colors rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-primary" />
                <span>Terms of Service</span>
              </div>
            </button>
          </Card>
        </div>

        {/* Data Management */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Data Management</h3>
          
          <Card className="p-4 border border-border">
            <Button 
              onClick={exportData}
              variant="ghost" 
              className="w-full justify-start p-0 h-auto"
            >
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div>Export Data</div>
                  <div className="text-xs text-muted-foreground">Download your journal and chat data</div>
                </div>
              </div>
            </Button>
          </Card>

          <Card className="p-4 border border-destructive">
            <Button 
              onClick={clearAllData}
              variant="ghost" 
              className="w-full justify-start p-0 h-auto text-destructive hover:text-destructive"
            >
              <div className="flex items-center space-x-3">
                <Trash2 className="w-5 h-5" />
                <div className="text-left">
                  <div>Clear All Data</div>
                  <div className="text-xs opacity-70">Permanently delete all journal entries and chats</div>
                </div>
              </div>
            </Button>
          </Card>
        </div>

        {/* App Version */}
        <Card className="p-4 border border-border text-center">
          <p className="text-sm text-muted-foreground">
            AI Journal v1.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Your data stays on your device
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SettingsView;
