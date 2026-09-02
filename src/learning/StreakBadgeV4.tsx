import * as React from 'react';
import { cn } from '../primitives/cn';
import type { StreakBadgeProps, StreakTone, StreakBadgeSize } from './StreakBadge';

/** Drop-in for {@link StreakBadgeProps} — same props, the V4 "campus" design. */
export type StreakBadgeV4Props = StreakBadgeProps;

const TONE_TEXT: Record<StreakTone, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  warn: 'text-warn',
  success: 'text-success',
};
const TONE_WELL: Record<StreakTone, string> = {
  primary: 'bg-primary/10',
  accent: 'bg-accent/10',
  warn: 'bg-warn/10',
  success: 'bg-success/10',
};
const SIZE_FONT: Record<StreakBadgeSize, { count: string; unit: string }> = {
  sm: { count: 'text-lg', unit: 'text-xs' },
  md: { count: 'text-xl', unit: 'text-xs' },
  lg: { count: 'text-2xl', unit: 'text-sm' },
};

/**
 * StreakBadge — **V4** "campus" design (web parity of the native V4). A gamified
 * streak pill on a tone-tinted well: a flame glyph + the **tabular-nums** streak
 * count and unit. A zero streak degrades to a muted prompt instead of a "0"
 * badge. The count uses a semantic `tone` color. Identical props/behavior to
 * {@link StreakBadgeProps}. All colors from `--xen-*` token classes (no literals).
 */
export const StreakBadgeV4 = React.forwardRef<HTMLSpanElement, StreakBadgeV4Props>(function StreakBadgeV4(
  { count, unit = 'day', tone = 'warn', glyph = '🔥', size = 'md', emptyLabel = 'Start your streak', className, ...rest },
  ref
) {
  const font = SIZE_FONT[size];

  if (count <= 0) {
    return (
      <span
        ref={ref}
        data-xen-streak-badge=""
        aria-label={emptyLabel}
        className={cn('inline-flex items-center gap-1 self-start rounded-full border border-border bg-surface px-2.5 py-1 shadow-sm', className)}
        {...rest}
      >
        <span aria-hidden="true" className="text-base opacity-50">{glyph}</span>
        <span className="text-sm text-muted">{emptyLabel}</span>
      </span>
    );
  }

  const unitLabel = `${unit}${count === 1 ? '' : 's'}`;

  return (
    <span
      ref={ref}
      data-xen-streak-badge=""
      aria-label={`${count} ${unitLabel} streak`}
      className={cn('inline-flex items-baseline gap-1 self-start rounded-full px-3 py-1 shadow-sm', TONE_WELL[tone], className)}
      {...rest}
    >
      <span aria-hidden="true" className="text-base">{glyph}</span>
      <span className={cn('font-extrabold tabular-nums', font.count, TONE_TEXT[tone])}>{count}</span>
      <span className={cn('text-muted', font.unit)}>{unitLabel}</span>
    </span>
  );
});
