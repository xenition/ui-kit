import * as React from 'react';
import { cn } from '../primitives/cn';
import { BG_CLASS, TEXT_CLASS, type HealthColor } from './internal';

export type SleepQuality = 'poor' | 'fair' | 'good' | 'excellent';

const QUALITY_COLOR: Record<SleepQuality, HealthColor> = {
  poor: 'danger',
  fair: 'warn',
  good: 'primary',
  excellent: 'success',
};

const QUALITY_LABEL: Record<SleepQuality, string> = {
  poor: 'Poor',
  fair: 'Fair',
  good: 'Good',
  excellent: 'Excellent',
};

export interface SleepBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hours actually slept. */
  hours: number;
  /** Target hours; the bar fills to `hours / goal`. */
  goal?: number;
  /** Sleep-quality rating; colors the bar and shows a tag. */
  quality?: SleepQuality;
  /** Optional bedtime label, e.g. "11:20 PM". */
  bedtime?: string;
  /** Optional wake time label, e.g. "6:45 AM". */
  wakeTime?: string;
}

/**
 * A sleep-duration summary: hours slept versus goal drawn as a single fill bar,
 * a color-coded quality tag, and optional bed / wake times. The bar color comes
 * from `quality` (falling back to `primary`). Guards `goal <= 0`. Web parity of
 * the native `SleepBar`; token-only colors.
 */
export const SleepBar = React.forwardRef<HTMLDivElement, SleepBarProps>(function SleepBar(
  { hours, goal = 8, quality, bedtime, wakeTime, className, ...rest },
  ref
) {
  const safeGoal = Math.max(goal, 0);
  const safeHours = Math.max(hours, 0);
  const ratio = safeGoal > 0 ? Math.min(safeHours / safeGoal, 1) : 0;
  const tone: HealthColor = quality ? QUALITY_COLOR[quality] : 'primary';

  return (
    <div
      ref={ref}
      aria-label={`Sleep: ${safeHours} hours${safeGoal > 0 ? ` of ${safeGoal}` : ''}${
        quality ? `, ${QUALITY_LABEL[quality]} quality` : ''
      }`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-end justify-between">
        <span className="flex items-baseline gap-[var(--xen-space-xs)]">
          <span aria-hidden="true" className="text-base leading-none">
            😴
          </span>
          <span className="text-2xl font-bold text-on-surface">{safeHours}</span>
          <span className="text-sm text-muted">h{safeGoal > 0 ? ` / ${safeGoal}h` : ''}</span>
        </span>
        {quality ? (
          <span className={cn('text-xs font-bold', TEXT_CLASS[tone])}>{QUALITY_LABEL[quality]}</span>
        ) : null}
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-border">
        <div className={cn('h-full rounded-full', BG_CLASS[tone])} style={{ width: `${ratio * 100}%` }} />
      </div>

      {bedtime || wakeTime ? (
        <div className="flex justify-between">
          <span className="text-xs text-muted">{bedtime ? `🌙 ${bedtime}` : ''}</span>
          <span className="text-xs text-muted">{wakeTime ? `☀️ ${wakeTime}` : ''}</span>
        </div>
      ) : null}
    </div>
  );
});
