import type { LucideIcon } from 'lucide-react';

export type JournalEntry = {
  mood: string;
  text: string;
};

export type JournalEntries = Record<string, JournalEntry>;

export type Achievement = {
  id: string;
  name: string;
  description: string;
  threshold: number;
  icon: LucideIcon;
};
