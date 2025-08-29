
import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import JournalEntryForm from './JournalEntryForm';

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: string;
}

const JournalView = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      setEntries(parsed.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      })));
    } else {
      // Default entries for first time users
      const defaultEntries = [
        {
          id: '1',
          date: new Date(),
          title: 'Welcome to your Journal',
          content: 'Start writing your thoughts and feelings here. Your data stays private on your device.',
          mood: '😊',
        }
      ];
      setEntries(defaultEntries);
    }
  }, []);

  const saveEntries = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('journalEntries', JSON.stringify(newEntries));
  };

  const handleSaveEntry = (title: string, content: string, mood: string) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      title,
      content,
      mood,
    };
    const updatedEntries = [newEntry, ...entries];
    saveEntries(updatedEntries);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-xl font-bold text-gradient">Your Journal</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <Calendar className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Entries List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="p-4 border border-border hover:shadow-lg transition-all duration-200 animate-slide-in">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{entry.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {entry.date.toLocaleDateString()}
                </p>
              </div>
              <span className="text-2xl">{entry.mood}</span>
            </div>
            <p className="text-gray-600 line-clamp-3 leading-relaxed">
              {entry.content}
            </p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {entry.date.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                Read More
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Add Button */}
      <Button 
        onClick={() => setShowForm(true)}
        className="fixed bottom-20 right-4 rounded-full w-14 h-14 bg-gradient-primary shadow-lg hover:opacity-90 z-30"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Journal Entry Form */}
      {showForm && (
        <JournalEntryForm
          onSave={handleSaveEntry}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default JournalView;
