'use client';

import { useState, useEffect } from 'react';
import { useJournal } from '@/app/lib/journal';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { JournalEntry } from '@/app/lib/types';

const MOODS = ['😿', '😾', '😼', '😊', '😻'];

export function DailyCheckin() {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [journalText, setJournalText] = useState<string>('');
  const { saveEntry, getEntryForDate, isLoading } = useJournal();
  const { toast } = useToast();
  const today = new Date();

  useEffect(() => {
    if (!isLoading) {
      const entry: JournalEntry | null = getEntryForDate(today);
      if (entry) {
        setSelectedMood(entry.mood);
        setJournalText(entry.text);
      }
    }
  }, [isLoading, getEntryForDate, today]);

  const handleSave = () => {
    if (!selectedMood) {
      toast({
        title: 'Select a mood',
        description: 'Please select a cat emoji to represent your mood.',
        variant: 'destructive',
      });
      return;
    }
    saveEntry(today, { mood: selectedMood, text: journalText });
    toast({
      title: 'Entry Saved!',
      description: `Your journal for ${format(today, 'MMMM d, yyyy')} has been saved.`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h2 className="text-2xl font-bold text-center font-headline tracking-tight">
          Today's Check-in
        </h2>
        <p className="text-center text-muted-foreground">{format(today, 'MMMM d, yyyy')}</p>
      </header>
      
      <div className="space-y-2">
        <Label htmlFor="mood-selector" className="text-center block">How are you feeling?</Label>
        <div id="mood-selector" className="flex justify-around items-center rounded-lg bg-muted p-2">
          {MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={cn(
                'text-4xl p-2 rounded-full transition-transform transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-ring',
                selectedMood === mood ? 'bg-accent/50 scale-110' : ''
              )}
              aria-label={`Mood: ${mood}`}
              aria-pressed={selectedMood === mood}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="journal-entry">One good thing that happened today?</Label>
        <Textarea
          id="journal-entry"
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Write a little something..."
          className="min-h-[120px] bg-white"
        />
      </div>

      <Button onClick={handleSave} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
        Save Entry
      </Button>
    </div>
  );
}
