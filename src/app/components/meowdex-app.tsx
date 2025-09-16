'use client';

import { JournalProvider } from '@/app/lib/journal-provider';
import { PokedexFrame } from '@/app/components/pokedex-frame';

export function MeowDexApp() {
  return (
    <JournalProvider>
      <main className="container mx-auto flex min-h-screen items-center justify-center p-4">
        <PokedexFrame />
      </main>
    </JournalProvider>
  );
}
