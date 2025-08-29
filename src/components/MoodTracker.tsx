
import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Heart, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface MoodEntry {
  date: string;
  mood: string;
  emoji: string;
  note: string;
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const { toast } = useToast();

  const moods = [
    { name: 'Happy', emoji: '😊', color: 'bg-yellow-100 border-yellow-300' },
    { name: 'Sad', emoji: '😢', color: 'bg-blue-100 border-blue-300' },
    { name: 'Excited', emoji: '🤩', color: 'bg-orange-100 border-orange-300' },
    { name: 'Calm', emoji: '😌', color: 'bg-green-100 border-green-300' },
    { name: 'Anxious', emoji: '😰', color: 'bg-red-100 border-red-300' },
    { name: 'Grateful', emoji: '🙏', color: 'bg-purple-100 border-purple-300' },
  ];

  useEffect(() => {
    const savedMoods = localStorage.getItem('moodEntries');
    if (savedMoods) {
      setMoodEntries(JSON.parse(savedMoods));
    } else {
      // Default entries
      const defaultEntries = [
        { date: '2024-01-15', mood: 'Happy', emoji: '😊', note: 'Great day at work!' },
        { date: '2024-01-14', mood: 'Calm', emoji: '😌', note: 'Peaceful evening' },
        { date: '2024-01-13', mood: 'Excited', emoji: '🤩', note: 'New project started' },
      ];
      setMoodEntries(defaultEntries);
    }
  }, []);

  const handleMoodSelect = (mood: { name: string; emoji: string }) => {
    setSelectedMood(mood.name);
    setSelectedEmoji(mood.emoji);
  };

  const saveMood = () => {
    if (!selectedMood) {
      toast({
        title: "Error",
        description: "कृपया पहले mood select करें।",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    
    // Check if mood already exists for today
    const existingIndex = moodEntries.findIndex(entry => entry.date === today);
    
    const newEntry: MoodEntry = {
      date: today,
      mood: selectedMood,
      emoji: selectedEmoji,
      note: note.trim() || `Feeling ${selectedMood.toLowerCase()} today!`,
    };

    let updatedEntries;
    if (existingIndex >= 0) {
      // Update existing entry
      updatedEntries = [...moodEntries];
      updatedEntries[existingIndex] = newEntry;
    } else {
      // Add new entry
      updatedEntries = [newEntry, ...moodEntries];
    }

    setMoodEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    
    // Reset form
    setSelectedMood('');
    setSelectedEmoji('');
    setNote('');

    toast({
      title: "Success",
      description: "आपका mood save हो गया है! 🎉",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold text-gradient mb-2">Mood Tracker</h2>
        <p className="text-muted-foreground text-sm">How are you feeling today?</p>
      </div>

      {/* Mood Selection */}
      <div className="p-4">
        <h3 className="font-semibold mb-3 flex items-center">
          <Heart className="w-4 h-4 mr-2 text-primary" />
          Today's Mood
        </h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => handleMoodSelect(mood)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                selectedMood === mood.name 
                  ? 'border-primary bg-primary/10 scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className="text-xs font-medium">{mood.name}</div>
            </button>
          ))}
        </div>

        {/* Note Input */}
        {selectedMood && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Add a note (optional)</label>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How was your day?"
              className="border-border focus:border-primary"
              maxLength={200}
            />
          </div>
        )}
      </div>

      {/* Recent Moods */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="font-semibold mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-primary" />
          Recent Moods
        </h3>
        <div className="space-y-3">
          {moodEntries.map((entry, index) => (
            <Card key={index} className="p-3 border border-border animate-slide-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{entry.emoji}</span>
                  <div>
                    <p className="font-medium">{entry.mood}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString('hi-IN')}
                    </p>
                  </div>
                </div>
              </div>
              {entry.note && (
                <p className="text-sm text-gray-600 mt-2 ml-11">{entry.note}</p>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Save Button */}
      {selectedMood && (
        <div className="p-4 border-t border-border">
          <Button onClick={saveMood} className="w-full bg-gradient-primary hover:opacity-90">
            <Save className="w-4 h-4 mr-2" />
            Save Today's Mood
          </Button>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
