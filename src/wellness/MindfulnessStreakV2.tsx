import * as React from 'react';
import { cn } from '../primitives/cn';
import { SLOT_BG, SLOT_TEXT, SLOT_TINT, type WellnessSlot } from './_tokens';
import type { MindfulnessStreakProps } from './MindfulnessStreak';

/** Same public contract as {@link MindfulnessStreak} — a drop-in alternate design. */
export type MindfulnessStreakV2Props = MindfulnessStreakProps;

/**
 * MindfulnessStreak, redesigned (v2): a **big streak medallion**. A large flame +
 * count lead in a tone-tinted panel, the best streak is a secondary stat, and the
 * last-7-days render as filled/empty dots. Bolder than v1. Same props, token-only.
 */
export const MindfulnessStreakV2 = React.forwardRef<HTMLDivElement, MindfulnessStreakV2Props>(
  function MindfulnessStreakV2({ count, best, week, tone = 'primary', unit = 'day', emptyLabel = 'Start your streak', className }, ref) {
    const slot = tone as WellnessSlot;
    const last7 = (week ?? []).slice(-7);

    return (
      <div ref={ref} data-xen-mindfulness-streak="" className={cn('flex flex-col items-center gap-3 rounded-lg p-md text-center', SLOT_TINT[slot], className)}>
        {count > 0 ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-4xl" aria-hidden>🔥</span>
              <span className={cn('text-5xl font-bold', SLOT_TEXT[slot])}>{count}</span>
            </div>
            <p className="text-sm font-medium text-on-surface">{unit}{count === 1 ? '' : 's'} in a row{typeof best === 'number' ? ` · best ${best}` : ''}</p>
          </>
        ) : (
          <p className="py-4 text-sm text-muted">{emptyLabel}</p>
        )}
        {last7.length > 0 ? (
          <div className="flex gap-1.5">
            {last7.map((done, i) => (
              <span key={i} className={cn('h-4 w-4 rounded-full', done ? SLOT_BG[slot] : 'bg-neutral-200')} aria-hidden />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
