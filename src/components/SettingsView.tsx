
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  Trash2, 
  Info,
  Moon,
  Volume2
} from 'lucide-react';

const SettingsView = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold text-gradient">Settings</h2>
        <p className="text-muted-foreground text-sm">Customize your journal experience</p>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Notifications */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Daily Reminders</p>
                <p className="text-sm text-muted-foreground">Get reminded to journal</p>
              </div>
            </div>
            <Switch />
          </div>
        </Card>

        {/* Sounds */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Sound Effects</p>
                <p className="text-sm text-muted-foreground">Typing and notification sounds</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>

        {/* Privacy */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Local Storage Only</p>
                <p className="text-sm text-muted-foreground">Data stays on your device</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              Active
            </div>
          </div>
        </Card>

        {/* Theme */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Palette className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              Light
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-gradient-primary text-white border-primary">
              Gradient
            </Button>
          </div>
        </Card>

        {/* Data Management */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Data Management
          </h3>
          
          <Card className="p-4">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-3" />
              Export Journal Data
            </Button>
          </Card>

          <Card className="p-4">
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-3" />
              Clear All Data
            </Button>
          </Card>
        </div>

        {/* App Info */}
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Info className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">AI Chat Journal</p>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your privacy-focused AI journal companion. All data is stored locally on your device.
            No accounts, no tracking, no cloud storage.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SettingsView;
