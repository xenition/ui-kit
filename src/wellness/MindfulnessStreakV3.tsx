import * as React from 'react';
import { cn } from '../primitives/cn';
import { SLOT_BG, SLOT_TEXT, type WellnessSlot } from './_tokens';
import type { MindfulnessStreakProps } from './MindfulnessStreak';

/** Same public contract as {@link MindfulnessStreak} — a drop-in alternate design. */
export type MindfulnessStreakV3Props = MindfulnessStreakProps;

/**
 * MindfulnessStreak, redesigned (v3): a **compact streak row**. A flame + count,
 * the "best" folded inline, and a tiny last-7-days dot strip on the right — all on
 * one dense line. The opposite of v2's medallion. Same props, token-only.
 */
export const MindfulnessStreakV3 = React.forwardRef<HTMLDivElement, MindfulnessStreakV3Props>(
  function MindfulnessStreakV3({ count, best, week, tone = 'primary', unit = 'day', emptyLabel = 'Start your streak', className }, ref) {
    const slot = tone as WellnessSlot;
    const last7 = (week ?? []).slice(-7);

    return (
      <div ref={ref} data-xen-mindfulness-streak="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}>
        {count > 0 ? (
          <>
            <span aria-hidden>🔥</span>
            <span className={cn('text-lg font-bold', SLOT_TEXT[slot])}>{count}</span>
            <span className="text-xs text-muted">{unit}{count === 1 ? '' : 's'}{typeof best === 'number' ? ` · best ${best}` : ''}</span>
          </>
        ) : (
          <span className="text-sm text-muted">{emptyLabel}</span>
        )}
        {last7.length > 0 ? (
          <div className="ml-auto flex gap-1">
            {last7.map((done, i) => (
              <span key={i} className={cn('h-2 w-2 rounded-full', done ? SLOT_BG[slot] : 'bg-neutral-200')} aria-hidden />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
