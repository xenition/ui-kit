import * as React from 'react';
import { cn } from '../primitives/cn';
import { clamp } from './internal/format';

export type TouPeriod = 'off-peak' | 'mid-peak' | 'on-peak';

export interface TouBlock {
  /** Block start, hour of day (0–24). */
  startHour: number;
  /** Block end, hour of day (0–24). */
  endHour: number;
  /** Rate period — drives the segment color and legend entry. */
  period: TouPeriod;
}

export interface TimeOfUseScheduleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card title (default "Time of use"). */
  title?: string;
  /** Rate blocks across the 24h day. */
  blocks: TouBlock[];
  /** Current hour of day (0–24) — draws a thin "now" marker when supplied. */
  nowHour?: number;
}

const PERIOD_LABEL: Record<TouPeriod, string> = {
  'off-peak': 'Off-peak',
  'mid-peak': 'Mid-peak',
  'on-peak': 'On-peak',
};

const PERIOD_ORDER: TouPeriod[] = ['off-peak', 'mid-peak', 'on-peak'];

const PERIOD_FILL: Record<TouPeriod, string> = {
  'off-peak': 'bg-success/85',
  'mid-peak': 'bg-warn/85',
  'on-peak': 'bg-danger/85',
};

const TICKS = [0, 6, 12, 18, 24];

/**
 * A clean-card time-of-use day bar (web parity). A 24-hour horizontal track is
 * split into rate blocks, each segment sized by its share of the day and colored
 * by rate period — off-peak → `success`, mid-peak → `warn`, on-peak → `danger` —
 * so the color is meaningful, not decorative. A thin `on-surface` "now" marker
 * locates the current hour, hour ticks anchor the axis, and a legend names each
 * period present with its dot + tone. Purely presentational; every color traces
 * to a token.
 */
export const TimeOfUseSchedule = React.forwardRef<HTMLDivElement, TimeOfUseScheduleProps>(
  function TimeOfUseSchedule({ title = 'Time of use', blocks, nowHour, className, ...rest }, ref) {
    const present = PERIOD_ORDER.filter((p) => blocks.some((b) => b.period === p));
    const nowPct = nowHour != null ? clamp(nowHour, 0, 24) / 24 : null;

    return (
      <div
        ref={ref}
        aria-label={title}
        className={cn('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className)}
        {...rest}
      >
        <span className="text-base font-bold text-on-surface">{title}</span>

        <div className="relative mt-[var(--xen-space-md)]">
          <div aria-hidden="true" className="flex h-4 overflow-hidden rounded-full bg-neutral-100">
            {blocks.map((b, i) => {
              const span = clamp(b.endHour - b.startHour, 0, 24);
              return (
                <div
                  key={`${b.period}-${b.startHour}-${i}`}
                  className={cn('h-full', PERIOD_FILL[b.period])}
                  style={{ flexGrow: span, flexShrink: 1, flexBasis: 0 }}
                />
              );
            })}
          </div>

          {nowPct != null ? (
            <div
              aria-hidden="true"
              className="absolute top-0 h-4 w-0.5 bg-on-surface"
              style={{ left: `${nowPct * 100}%` }}
            />
          ) : null}
        </div>

        <div className="mt-[var(--xen-space-xs)] flex justify-between">
          {TICKS.map((t) => (
            <span key={t} className="text-xs text-muted">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-[var(--xen-space-md)] flex flex-wrap gap-[var(--xen-space-md)]">
          {present.map((p) => (
            <div key={p} className="flex items-center gap-[var(--xen-space-xs)]">
              <span className={cn('h-2.5 w-2.5 rounded-full', PERIOD_FILL[p])} />
              <span className="text-xs font-semibold text-muted">{PERIOD_LABEL[p]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
