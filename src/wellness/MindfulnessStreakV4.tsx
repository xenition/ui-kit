import * as React from 'react';
import { cn } from '../primitives/cn';
import type { MindfulnessStreakProps } from './MindfulnessStreak';

export type MindfulnessStreakV4Props = MindfulnessStreakProps;

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

/**
 * MindfulnessStreakV4 — the "calm" restyle of {@link MindfulnessStreak}. Same
 * props, defaults, labels, a11y and behavior; the card becomes a soft gradient
 * hero: the streak count huge in near-white ink (`text-on-primary`), the unit
 * and best-streak stat in the softer ink (`text-primary-100`), and the last-7
 * week as frosted dots — practiced days fill (`bg-primary-500`) and missed days
 * read as a bordered track (state via fill + a11y label, not color alone). At
 * `count` 0 it drops the flame and shows the same encouraging prompt. The `tone`
 * prop is retained for parity; the calm ground is single-hue. Token-only colors.
 */
export const MindfulnessStreakV4 = React.forwardRef<
  HTMLDivElement,
  MindfulnessStreakV4Props & React.HTMLAttributes<HTMLDivElement>
>(function MindfulnessStreakV4(
  {
    count,
    best,
    week,
    // tone retained for parity; the calm ground is single-hue.
    tone = 'primary',
    unit = 'day',
    emptyLabel = 'Start your streak',
    className,
    ...rest
  },
  ref
) {
  void tone;
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
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-700 p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-primary-300 bg-primary-500 text-xl"
        >
          {active ? '🔥' : '🌱'}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          {active ? (
            <>
              <div className="flex items-baseline gap-[var(--xen-space-xs)]">
                <span className="font-heading text-3xl font-extrabold text-on-primary">{count}</span>
                <span className="text-sm text-primary-100">
                  {unit}
                  {count === 1 ? '' : 's'}
                </span>
              </div>
              {best != null ? (
                <span className="text-xs text-primary-100">
                  Best {best} {unit}
                  {best === 1 ? '' : 's'}
                </span>
              ) : null}
            </>
          ) : (
            <span className="text-base font-semibold text-on-primary">{emptyLabel}</span>
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
                    'flex h-[22px] w-[22px] items-center justify-center rounded-full border border-primary-300 text-xs',
                    done ? 'bg-primary-500 text-on-primary' : 'bg-transparent'
                  )}
                >
                  {done ? '✓' : ''}
                </span>
                <span className="text-xs text-primary-100">{day}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
});
