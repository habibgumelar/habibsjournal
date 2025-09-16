'use client';

import { useContext } from 'react';
import type { JournalContextType } from '@/app/lib/journal-provider';
import { JournalContext } from '@/app/lib/journal-provider';

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}
