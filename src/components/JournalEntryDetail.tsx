
import { ArrowLeft, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: string;
}

interface JournalEntryDetailProps {
  entry: JournalEntry;
  onBack: () => void;
}

const JournalEntryDetail = ({ entry, onBack }: JournalEntryDetailProps) => {
  return (
    <div className="flex flex-col h-full bg-gradient-soft">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border bg-surface/80 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="rounded-full p-2 mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gradient">{entry.title}</h2>
          <p className="text-sm text-muted-foreground flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {entry.date.toLocaleDateString('hi-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="text-3xl">{entry.mood}</div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="p-6 border border-border bg-surface">
          <div className="flex items-center mb-4">
            <Heart className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-muted-foreground">
              {entry.date.toLocaleTimeString('hi-IN', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JournalEntryDetail;
