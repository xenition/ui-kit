import * as React from 'react';
import { cn } from '../primitives/cn';
import { CARD_SHELL, SLOT_BG, type WellnessSlot } from './_tokens';
import type { Mood } from './MoodCheckIn';

export interface MoodTrendPoint {
  label: string;
  mood: Mood;
}

export interface MoodTrendProps extends React.HTMLAttributes<HTMLDivElement> {
  data: MoodTrendPoint[];
  title?: string;
}

interface MoodBarMeta {
  level: number;
  color: WellnessSlot;
}

const MOOD_BAR: Record<Mood, MoodBarMeta> = {
  awful: { level: 1, color: 'danger' },
  bad: { level: 2, color: 'warn' },
  okay: { level: 3, color: 'muted' },
  good: { level: 4, color: 'primary' },
  great: { level: 5, color: 'success' },
};

/**
 * MoodTrend — a week of mood at a glance: a clean card with one vertical bar per
 * day, its height set by the mood level (awful→great, 1..5 of a fixed max) and
 * its fill the mood's semantic color. The card stays calm (surface + border);
 * only the bars carry color, and each day's mood is announced (state, not color
 * alone). Empty data shows a muted note. Token-only colors.
 */
export const MoodTrend = React.forwardRef<HTMLDivElement, MoodTrendProps>(function MoodTrend(
  { data, title = 'Mood this week', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="group"
      className={cn(CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-5 shadow-sm', className)}
      {...rest}
    >
      <p className="text-base font-bold text-on-surface">{title}</p>

      {data.length === 0 ? (
        <p className="text-sm text-muted">No mood data yet.</p>
      ) : (
        <div className="flex items-end justify-between gap-[var(--xen-space-xs)]" style={{ height: 120 }}>
          {data.map((point, i) => {
            const meta = MOOD_BAR[point.mood] ?? MOOD_BAR.okay;
            const heightPct = Math.max(4, (meta.level / 5) * 100);
            return (
              <div
                key={`${point.label}-${i}`}
                aria-label={`${point.label}: ${point.mood}`}
                className="flex h-full flex-1 flex-col items-center gap-[var(--xen-space-xs)]"
              >
                <div className="flex w-full flex-1 items-end justify-center">
                  <div
                    aria-hidden="true"
                    className={cn('w-full rounded-[var(--xen-radius-sm)]', SLOT_BG[meta.color])}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="w-full truncate text-center text-xs text-muted">{point.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
