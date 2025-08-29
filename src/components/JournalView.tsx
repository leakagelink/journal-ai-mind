
import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import JournalEntryForm from './JournalEntryForm';
import JournalEntryDetail from './JournalEntryDetail';

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
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filterMood, setFilterMood] = useState('');

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
          content: 'Start writing your thoughts and feelings here. Your data stays private on your device. You can write in Hindi, English, Marathi or any language you prefer.',
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

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = !searchQuery || 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMood = !filterMood || entry.mood === filterMood;
    
    return matchesSearch && matchesMood;
  });

  const allMoods = Array.from(new Set(entries.map(entry => entry.mood)));

  if (selectedEntry) {
    return (
      <JournalEntryDetail 
        entry={selectedEntry} 
        onBack={() => setSelectedEntry(null)} 
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-xl font-bold text-gradient">Your Journal</h2>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full p-2"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <Calendar className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      {showSearch && (
        <div className="p-4 border-b border-border bg-surface/50">
          <div className="space-y-3">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in your journal..."
              className="border-border focus:border-primary"
            />
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filterMood}
                onChange={(e) => setFilterMood(e.target.value)}
                className="text-sm border border-border rounded px-2 py-1 bg-surface"
              >
                <option value="">All Moods</option>
                {allMoods.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-primary/10 flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {searchQuery || filterMood ? 'No entries found' : 'Start Your Journal'}
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                {searchQuery || filterMood 
                  ? 'Try different search terms or filters'
                  : 'Begin writing your thoughts and experiences'
                }
              </p>
            </div>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="p-4 border border-border hover:shadow-lg transition-all duration-200 animate-slide-in">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.date.toLocaleDateString('hi-IN')}
                  </p>
                </div>
                <span className="text-2xl">{entry.mood}</span>
              </div>
              <p className="text-gray-600 line-clamp-3 leading-relaxed">
                {entry.content}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {entry.date.toLocaleTimeString('hi-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:bg-primary/10"
                  onClick={() => setSelectedEntry(entry)}
                >
                  Read More
                </Button>
              </div>
            </Card>
          ))
        )}
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
