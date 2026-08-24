import * as React from 'react';
import { cn } from '../primitives/cn';

/** Streak emphasis tone. */
export type StreakTone = 'primary' | 'accent' | 'warn' | 'success';

export type StreakBadgeSize = 'sm' | 'md' | 'lg';

/** Token `text-*` class per tone. */
const TONE_CLASS: Record<StreakTone, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  warn: 'text-warn',
  success: 'text-success',
};

const SIZE_FONT: Record<StreakBadgeSize, { count: string; unit: string }> = {
  sm: { count: 'text-lg', unit: 'text-xs' },
  md: { count: 'text-xl', unit: 'text-xs' },
  lg: { count: 'text-2xl', unit: 'text-sm' },
};

export interface StreakBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Current streak length. */
  count: number;
  /** Unit noun (default "day"; pluralized automatically). */
  unit?: string;
  /** Emphasis tone. */
  tone?: StreakTone;
  /** Glyph before the count (default 🔥). */
  glyph?: string;
  /** Size preset. */
  size?: StreakBadgeSize;
  /** Copy shown when `count` is 0. */
  emptyLabel?: string;
}

/**
 * A gamified streak pill: a flame glyph + the streak count and unit. A zero
 * streak degrades to a muted prompt instead of a "0" badge. The count uses a
 * semantic `tone` color. Token-only colors (`--xen-*`).
 */
export const StreakBadge = React.forwardRef<HTMLSpanElement, StreakBadgeProps>(function StreakBadge(
  { count, unit = 'day', tone = 'warn', glyph = '🔥', size = 'md', emptyLabel = 'Start your streak', className, ...rest },
  ref
) {
  const font = SIZE_FONT[size];

  if (count <= 0) {
    return (
      <span
        ref={ref}
        aria-label={emptyLabel}
        className={cn(
          'inline-flex items-center gap-1 self-start rounded-full border border-border bg-surface px-2 py-1',
          className
        )}
        {...rest}
      >
        <span aria-hidden="true" className="text-base opacity-50">
          {glyph}
        </span>
        <span className="text-sm text-muted">{emptyLabel}</span>
      </span>
    );
  }

  const unitLabel = `${unit}${count === 1 ? '' : 's'}`;

  return (
    <span
      ref={ref}
      aria-label={`${count} ${unitLabel} streak`}
      className={cn(
        'inline-flex items-baseline gap-1 self-start rounded-full border border-border bg-surface px-3 py-1',
        className
      )}
      {...rest}
    >
      <span aria-hidden="true" className="text-base">
        {glyph}
      </span>
      <span className={cn('font-extrabold', font.count, TONE_CLASS[tone])}>{count}</span>
      <span className={cn('text-muted', font.unit)}>{unitLabel}</span>
    </span>
  );
});
