'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calendar, User, Award } from 'lucide-react';
import { DailyCheckin } from './daily-checkin';
import { CalendarView } from './calendar-view';
import { TrainerCard } from './trainer-card';
import { AchievementBadges } from './achievement-badges';

export function PokedexFrame() {
  return (
    <div className="w-full max-w-lg rounded-t-2xl rounded-b-3xl border-4 border-black bg-primary p-2 shadow-2xl sm:p-4">
      <div className="mb-4 flex items-center gap-3 pl-2">
        <div className="h-16 w-16 rounded-full border-4 border-white bg-cyan-300 shadow-inner" />
        <div className="h-5 w-5 rounded-full border-2 border-black bg-red-500" />
        <div className="h-5 w-5 rounded-full border-2 border-black bg-yellow-400" />
        <div className="h-5 w-5 rounded-full border-2 border-black bg-green-500" />
      </div>

      <div className="min-h-[500px] rounded-lg border-4 border-black bg-[#d4e5e5] p-2 shadow-inner sm:p-4">
        <Tabs defaultValue="journal" className="flex h-full flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="journal" aria-label="Journal">
              <BookOpen className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="calendar" aria-label="Calendar">
              <Calendar className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="trainer-card" aria-label="Trainer Card">
              <User className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="badges" aria-label="Badges">
              <Award className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>
          <div className="mt-4 flex-grow rounded-md bg-white/50 p-4">
            <TabsContent value="journal" className="h-full">
              <DailyCheckin />
            </TabsContent>
            <TabsContent value="calendar" className="h-full">
              <CalendarView />
            </TabsContent>
            <TabsContent value="trainer-card" className="h-full">
              <TrainerCard />
            </TabsContent>
            <TabsContent value="badges" className="h-full">
              <AchievementBadges />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <div className="mt-4 flex items-center justify-between px-2">
        <div className="h-12 w-12 rounded-full border-2 border-black bg-red-600" />
        <div className="flex flex-col gap-1.5">
          <div className="h-2 w-20 rounded-full bg-gray-700" />
          <div className="h-2 w-20 rounded-full bg-gray-700" />
          <div className="h-2 w-20 rounded-full bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
