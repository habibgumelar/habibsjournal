'use client';

import { useState, useTransition } from 'react';
import { useJournal } from '@/app/lib/journal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getJournalTrendsSummary } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot } from 'lucide-react';

export function TrainerCard() {
  const { totalEntries, entries, isLoading } = useJournal();
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGenerateSummary = () => {
    startTransition(async () => {
      setError(null);
      setSummary(null);
      const allEntries = Object.values(entries);
      const result = await getJournalTrendsSummary(allEntries);
      if (result.summary) {
        setSummary(result.summary);
      } else if (result.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
       <h2 className="text-2xl font-bold text-center font-headline tracking-tight">
        Trainer Card
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>A summary of your journaling journey.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <Skeleton className="h-8 w-1/2" />
          ) : (
            <div className="text-4xl font-bold">{totalEntries} <span className="text-lg font-normal text-muted-foreground">Entries</span></div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot size={20} /> AI Trend Summary</CardTitle>
          <CardDescription>Discover patterns in your entries.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[100px]">
          {isPending && <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>}
          {error && <p className="text-destructive">{error}</p>}
          {summary && <p className="text-sm text-foreground">{summary}</p>}
        </CardContent>
        <CardFooter>
           <Button onClick={handleGenerateSummary} disabled={isPending || isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isPending ? 'Analyzing...' : 'Generate Summary'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
