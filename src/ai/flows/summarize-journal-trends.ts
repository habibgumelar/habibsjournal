// Summarize journal trends to display on the trainer card.

'use server';

/**
 * @fileOverview Summarizes journal entries to identify trends for display on the trainer card.
 *
 * - summarizeJournalTrends - A function that summarizes journal entries.
 * - SummarizeJournalTrendsInput - The input type for the summarizeJournalTrends function.
 * - SummarizeJournalTrendsOutput - The return type for the summarizeJournalTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeJournalTrendsInputSchema = z.object({
  journalEntries: z.array(z.string()).describe('An array of journal entries.'),
});
export type SummarizeJournalTrendsInput = z.infer<typeof SummarizeJournalTrendsInputSchema>;

const SummarizeJournalTrendsOutputSchema = z.object({
  summary: z.string().describe('A summary of the trends in the journal entries.'),
});
export type SummarizeJournalTrendsOutput = z.infer<typeof SummarizeJournalTrendsOutputSchema>;

export async function summarizeJournalTrends(input: SummarizeJournalTrendsInput): Promise<SummarizeJournalTrendsOutput> {
  return summarizeJournalTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeJournalTrendsPrompt',
  input: {schema: SummarizeJournalTrendsInputSchema},
  output: {schema: SummarizeJournalTrendsOutputSchema},
  prompt: `You are an AI that analyzes a user's journal entries and summarizes trends.

  Summarize the following journal entries, and identify trends.

  Journal entries:
  {{#each journalEntries}}
  - {{{this}}}
  {{/each}}
  `,
});

const summarizeJournalTrendsFlow = ai.defineFlow({
    name: 'summarizeJournalTrendsFlow',
    inputSchema: SummarizeJournalTrendsInputSchema,
    outputSchema: SummarizeJournalTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
