'use client';

import { useJournal } from '@/app/lib/journal';
import { ACHIEVEMENTS } from '@/app/lib/achievements';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function AchievementBadges() {
  const { totalEntries, isLoading } = useJournal();

  if (isLoading) {
    return (
       <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center font-headline tracking-tight">
          Achievements
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center font-headline tracking-tight">
          Achievements
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-4">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = totalEntries >= achievement.threshold;
            const Icon = achievement.icon;
            return (
              <Tooltip key={achievement.id}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className={cn(
                        "rounded-full p-3 border-4",
                        isUnlocked ? "bg-amber-300 border-amber-500 text-amber-800" : "bg-muted border-gray-300 text-muted-foreground"
                    )}>
                       <Icon className={cn("h-10 w-10 transition-colors", !isUnlocked && "opacity-50")} />
                    </div>
                    <span className={cn(
                        "font-semibold text-sm",
                        !isUnlocked && "text-muted-foreground"
                    )}>{achievement.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{achievement.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {isUnlocked ? "Unlocked!" : `Requires ${achievement.threshold} entries.`}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
