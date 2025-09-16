'use server';

import { summarizeJournalTrends } from '@/ai/flows/summarize-journal-trends';
import type { JournalEntry } from '@/app/lib/types';

export async function getJournalTrendsSummary(
  entries: JournalEntry[]
): Promise<{ summary?: string; error?: string }> {
  if (entries.length < 3) {
    return { summary: 'Not enough entries to analyze trends yet. Keep journaling to see your progress!' };
  }

  try {
    const journalTexts = entries.map(entry => entry.text).filter(Boolean);
    if (journalTexts.length < 3) {
      return { summary: 'More detailed entries are needed to find trends. Try writing a bit more each day!' };
    }
    const result = await summarizeJournalTrends({ journalEntries: journalTexts });
    return { summary: result.summary };
  } catch (error) {
    console.error('Error summarizing journal trends:', error);
    return { error: 'Could not generate summary at this time. Please try again later.' };
  }
}
