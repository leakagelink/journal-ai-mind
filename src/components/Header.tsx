
import { Menu, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="glass-effect border-b border-white/20 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-primary p-2 rounded-xl">
            <Menu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gradient font-display">AI Journal</h1>
            <p className="text-xs text-muted-foreground">Personal Companion</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
