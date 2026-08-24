import * as React from 'react';
import { cn } from '../primitives/cn';
import { SLABadge, type SLAState } from './SLABadge';
import { formatDuration } from './internal';

export interface ResolutionTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Signed seconds remaining until the SLA due time — positive = time left,
   * negative = overdue. Provide this **or** `dueAt`.
   */
  remainingSeconds?: number;
  /** SLA due instant (ISO-8601). Used with `now` when `remainingSeconds` is absent. */
  dueAt?: string;
  /** Reference "now" (ISO-8601 or ms). Defaults to `Date.now()`. Enables deterministic tests. */
  now?: string | number;
  /** Seconds-remaining threshold below which the state becomes `at-risk` (default 900 = 15m). */
  atRiskThresholdSeconds?: number;
  /** Caption above the timer (default "Time to resolution"). */
  label?: string;
  /** Force a specific SLA state instead of deriving it (rarely needed). */
  state?: SLAState;
}

function toMs(value: string | number | undefined, fallback: number): number {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return value;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * A resolution/SLA countdown. Given a signed `remainingSeconds` (or a `dueAt` +
 * `now` pair) it renders the formatted time left / overdue and derives the SLA
 * state — `breached` once time is up, `at-risk` under the configurable
 * threshold, else `on-track` — surfaced through the glyph+text `SLABadge` so the
 * state is never color-only. Pure/presentational (no internal ticking); the app
 * re-renders with a fresh value. The big time text uses `text-danger`/`text-warn`
 * token classes for breached/at-risk. Token colors only.
 */
export const ResolutionTimer = React.forwardRef<HTMLDivElement, ResolutionTimerProps>(
  function ResolutionTimer(
    { remainingSeconds, dueAt, now, atRiskThresholdSeconds = 900, label = 'Time to resolution', state, className, ...rest },
    ref
  ) {
    const remaining =
      typeof remainingSeconds === 'number' && Number.isFinite(remainingSeconds)
        ? remainingSeconds
        : (toMs(dueAt, Date.now()) - toMs(now, Date.now())) / 1000;

    const derived: SLAState =
      state ??
      (remaining <= 0 ? 'breached' : remaining <= Math.max(0, atRiskThresholdSeconds) ? 'at-risk' : 'on-track');

    const overdue = remaining < 0;
    const timeText = formatDuration(Math.abs(remaining));
    const prefix = overdue ? '-' : '';
    const hint = overdue ? 'over' : 'left';
    const timeCls =
      derived === 'breached' ? 'text-danger' : derived === 'at-risk' ? 'text-warn' : 'text-on-surface';

    return (
      <div
        ref={ref}
        role="timer"
        aria-label={`${label}: ${overdue ? 'overdue by ' : ''}${timeText}${overdue ? '' : ' remaining'}`}
        className={cn('flex flex-col gap-1', className)}
        {...rest}
      >
        <span className="text-sm text-muted">{label}</span>
        <span className="flex items-center gap-2">
          <span className={cn('text-2xl font-bold leading-none tabular-nums', timeCls)}>
            {prefix}
            {timeText}
          </span>
          <SLABadge state={derived} hint={hint} size="sm" />
        </span>
      </div>
    );
  }
);
