
import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Plus, Edit, Download, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import JournalEntryForm from './JournalEntryForm';
import JournalEntryDetail from './JournalEntryDetail';
import { useToast } from '@/hooks/use-toast';

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
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filterMood, setFilterMood] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

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
          title: 'Welcome to HeartLog AI',
          content: 'Start writing your thoughts and feelings here. Your data stays private on your device. You can write in Hindi, English, Marathi or any language you prefer. You can edit, download, and copy your entries anytime.',
          mood: '💕',
        }
      ];
      setEntries(defaultEntries);
      localStorage.setItem('journalEntries', JSON.stringify(defaultEntries));
    }
  }, []);

  const saveEntries = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('journalEntries', JSON.stringify(newEntries));
  };

  const handleSaveEntry = (title: string, content: string, mood: string) => {
    if (editingEntry) {
      // Update existing entry
      const updatedEntries = entries.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, title, content, mood, date: new Date() }
          : entry
      );
      saveEntries(updatedEntries);
      setEditingEntry(null);
      toast({
        title: "Entry Updated",
        description: "Your journal entry has been updated successfully.",
      });
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date(),
        title,
        content,
        mood,
      };
      const updatedEntries = [newEntry, ...entries];
      saveEntries(updatedEntries);
      toast({
        title: "Entry Saved",
        description: "Your journal entry has been saved successfully.",
      });
    }
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
    setSelectedEntry(null);
  };

  const handleDeleteEntry = (entryId: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = entries.filter(entry => entry.id !== entryId);
      saveEntries(updatedEntries);
      setSelectedEntry(null);
      toast({
        title: "Entry Deleted",
        description: "Your journal entry has been deleted.",
      });
    }
  };

  const handleDownloadEntry = (entry: JournalEntry) => {
    const content = `Title: ${entry.title}\nDate: ${entry.date.toLocaleDateString('hi-IN')}\nMood: ${entry.mood}\n\n${entry.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${entry.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Your journal entry has been downloaded.",
    });
  };

  const handleCopyEntry = async (entry: JournalEntry) => {
    const content = `${entry.title}\n${entry.date.toLocaleDateString('hi-IN')} ${entry.mood}\n\n${entry.content}`;
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2000);
      toast({
        title: "Copied",
        description: "Entry copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy entry.",
      });
    }
  };

  const createBackup = () => {
    const backup = {
      entries: entries,
      createdAt: new Date().toISOString(),
      appName: 'HeartLog AI'
    };
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heartlog-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Backup Created",
      description: "Your journal backup has been downloaded.",
    });
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
        onEdit={() => handleEditEntry(selectedEntry)}
        onDelete={() => handleDeleteEntry(selectedEntry.id)}
        onDownload={() => handleDownloadEntry(selectedEntry)}
        onCopy={() => handleCopyEntry(selectedEntry)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-soft">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-surface/80 backdrop-blur-sm">
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
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full p-2"
            onClick={createBackup}
          >
            <Download className="w-4 h-4" />
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
              <span className="text-2xl">💕</span>
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
            <Card key={entry.id} className="p-4 border border-border hover:shadow-lg transition-all duration-200 animate-slide-in bg-surface/80 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {entry.date.toLocaleDateString('hi-IN')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{entry.mood}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyEntry(entry)}
                    className="rounded-full p-2"
                  >
                    {copiedId === entry.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 line-clamp-3 leading-relaxed mb-3">
                {entry.content}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {entry.date.toLocaleTimeString('hi-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:bg-primary/10"
                    onClick={() => handleEditEntry(entry)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:bg-primary/10"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <Button 
        onClick={() => {
          setEditingEntry(null);
          setShowForm(true);
        }}
        className="fixed bottom-20 right-4 rounded-full w-14 h-14 bg-gradient-primary shadow-lg hover:opacity-90 z-30"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Journal Entry Form */}
      {showForm && (
        <JournalEntryForm
          entry={editingEntry}
          onSave={handleSaveEntry}
          onClose={() => {
            setShowForm(false);
            setEditingEntry(null);
          }}
        />
      )}
    </div>
  );
};

export default JournalView;
