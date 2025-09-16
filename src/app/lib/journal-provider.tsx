'use client';

import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { JournalEntries, JournalEntry } from '@/app/lib/types';

const JOURNAL_STORAGE_KEY = 'meowdex-journal';

export interface JournalContextType {
  entries: JournalEntries;
  saveEntry: (date: Date, entry: JournalEntry) => void;
  getEntryForDate: (date: Date) => JournalEntry | null;
  totalEntries: number;
  isLoading: boolean;
}

export const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<JournalEntries>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error('Failed to load journal entries from local storage', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveEntry = useCallback((date: Date, entry: JournalEntry) => {
    const dateKey = date.toISOString().split('T')[0];
    const newEntries = { ...entries, [dateKey]: entry };
    setEntries(newEntries);
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(newEntries));
    } catch (error) {
      console.error('Failed to save journal entry to local storage', error);
    }
  }, [entries]);

  const getEntryForDate = useCallback((date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return entries[dateKey] || null;
  }, [entries]);

  const totalEntries = Object.keys(entries).length;

  const value = {
    entries,
    saveEntry,
    getEntryForDate,
    totalEntries,
    isLoading,
  };

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
}
