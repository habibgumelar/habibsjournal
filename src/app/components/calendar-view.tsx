'use client';

import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useJournal } from '@/app/lib/journal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, isSameDay } from 'date-fns';

export function CalendarView() {
  const { entries, isLoading } = useJournal();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const entryDates = useMemo(() => {
    return Object.keys(entries).map(dateStr => new Date(dateStr));
  }, [entries]);

  const selectedEntry = date ? entries[format(date, 'yyyy-MM-dd')] : null;

  const modifiers = {
    entry: (d: Date) => entryDates.some(entryDate => isSameDay(d, entryDate))
  };

  const modifiersStyles = {
    entry: {
      border: '2px solid hsl(var(--accent))',
      borderRadius: 'var(--radius)',
    }
  };

  if (isLoading) {
    return <p>Loading calendar...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-center font-headline tracking-tight">
        Your Journal History
      </h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-white"
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
      <div className="w-full">
        {selectedEntry ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{date ? format(date, 'MMMM d, yyyy') : ''}</span>
                <span className="text-3xl">{selectedEntry.mood}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{selectedEntry.text || 'No text for this entry.'}</p>
            </CardContent>
          </Card>
        ) : (
          <p className="text-center text-muted-foreground mt-4">
            {date ? 'No entry for this day.' : 'Select a day to see your entry.'}
          </p>
        )}
      </div>
    </div>
  );
}
