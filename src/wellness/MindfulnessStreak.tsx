import * as React from 'react';
import { cn } from '../primitives/cn';
import { CARD_SHELL, SLOT_BG, SLOT_ON, SLOT_TEXT, SLOT_TINT, type WellnessSlot } from './_tokens';

export type MindfulnessStreakTone = 'primary' | 'accent' | 'success' | 'warn' | 'danger';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

export interface MindfulnessStreakProps {
  /** Current consecutive-day streak. */
  count: number;
  /** Best / longest streak (shown as a secondary stat). */
  best?: number;
  /**
   * Last-7-days completion, oldest→newest. `true` = practiced that day.
   * Trailing/short arrays are tolerated; only the last 7 are shown.
   */
  week?: boolean[];
  /** Accent tone. Default `'primary'`. */
  tone?: MindfulnessStreakTone;
  /** Word for the unit. Default "day". */
  unit?: string;
  /** Prompt shown when `count` is 0. Default "Start your streak". */
  emptyLabel?: string;
  className?: string;
}

const TONE_KEY: Record<MindfulnessStreakTone, WellnessSlot> = {
  primary: 'primary',
  accent: 'accent',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/**
 * A mindfulness streak card (web parity of the native block): a flame + big day
 * count, an optional best-streak stat, and a 7-day dot strip where practiced
 * days fill in the tone color and missed days read as a muted track (state via
 * fill + a11y label, not color alone). At `count` 0 it drops the flame and shows
 * an encouraging prompt. Token-only colors.
 */
export const MindfulnessStreak = React.forwardRef<HTMLDivElement, MindfulnessStreakProps>(
  function MindfulnessStreak(
    { count, best, week, tone = 'primary', unit = 'day', emptyLabel = 'Start your streak', className },
    ref
  ) {
    const slot = TONE_KEY[tone] ?? 'primary';
    const active = count > 0;

    const last7 = (week ?? []).slice(-7);
    const summary = active
      ? `${count} ${unit}${count === 1 ? '' : 's'} streak${best != null ? `, best ${best}` : ''}`
      : emptyLabel;

    return (
      <div
        ref={ref}
        data-xen-mindfulness-streak=""
        aria-label={summary}
        className={cn(CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)}
      >
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <div
            aria-hidden="true"
            className={cn('flex h-14 w-14 items-center justify-center rounded-full text-xl', SLOT_TINT[slot])}
          >
            {active ? '🔥' : '🌱'}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            {active ? (
              <>
                <div className="flex items-baseline gap-[var(--xen-space-xs)]">
                  <span className={cn('font-heading text-3xl font-extrabold', SLOT_TEXT[slot])}>{count}</span>
                  <span className="text-sm text-muted">
                    {unit}
                    {count === 1 ? '' : 's'}
                  </span>
                </div>
                {best != null ? (
                  <span className="text-xs text-muted">
                    Best {best} {unit}
                    {best === 1 ? '' : 's'}
                  </span>
                ) : null}
              </>
            ) : (
              <span className="text-base font-semibold text-on-surface">{emptyLabel}</span>
            )}
          </div>
        </div>

        {last7.length > 0 ? (
          <div className="flex justify-between">
            {DAY_LABELS.map((day, i) => {
              const done = last7[i] === true;
              return (
                <div key={i} className="flex flex-col items-center gap-[var(--xen-space-xs)]">
                  <span
                    aria-label={`${done ? 'Practiced' : 'Missed'}, day ${i + 1}`}
                    className={cn(
                      'flex h-[22px] w-[22px] items-center justify-center rounded-full border text-xs',
                      done ? cn('border-transparent', SLOT_BG[slot], SLOT_ON[slot]) : 'border-border bg-neutral-200'
                    )}
                  >
                    {done ? '✓' : ''}
                  </span>
                  <span className="text-xs text-muted">{day}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
);
