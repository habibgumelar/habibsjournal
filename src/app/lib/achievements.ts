import type { Achievement } from '@/app/lib/types';
import { Award, Medal, Star, Trophy } from 'lucide-react';

export const ACHIEVEMENTS: Achievement[] = [
  { id: '1', name: 'First Step', description: 'Wrote your first journal entry.', threshold: 1, icon: Star },
  { id: '2', name: 'Budding Journalist', description: 'Wrote 5 journal entries.', threshold: 5, icon: Award },
  { id: '3', name: 'Consistent Chronicler', description: 'Wrote 10 journal entries.', threshold: 10, icon: Medal },
  { id: '4', name: 'Journaling Master', description: 'Wrote 25 journal entries.', threshold: 25, icon: Trophy },
];
