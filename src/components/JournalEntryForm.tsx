
import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface JournalEntryFormProps {
  onSave: (title: string, content: string, mood: string) => void;
  onClose: () => void;
}

const JournalEntryForm = ({ onSave, onClose }: JournalEntryFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😊');

  const moods = ['😊', '😢', '😡', '😴', '🤔', '😍', '😰', '🤗'];

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave(title, content, mood);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-surface border border-border p-6 animate-slide-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gradient">New Journal Entry</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full p-2">
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="border-border focus:border-primary"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`text-2xl p-2 rounded-lg border-2 transition-all ${
                    mood === m ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write about your thoughts, feelings, or experiences..."
              className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:border-primary focus:outline-none"
            />
          </div>
          
          <div className="flex space-x-3">
            <Button variant="ghost" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-gradient-primary">
              <Save className="w-4 h-4 mr-2" />
              Save Entry
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JournalEntryForm;
