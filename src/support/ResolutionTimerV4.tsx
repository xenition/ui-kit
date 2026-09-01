import * as React from 'react';
import { cn } from '../primitives/cn';
import { SLABadgeV4 } from './SLABadgeV4';
import type { SLAState } from './SLABadge';
import type { ResolutionTimerProps } from './ResolutionTimer';
import { formatDuration, clamp } from './internal';

/** Drop-in for {@link ResolutionTimerProps} — same props, the V4 "calm console" design. */
export type ResolutionTimerV4Props = ResolutionTimerProps;

function toMs(value: string | number | undefined, fallback: number): number {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return value;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * ResolutionTimer — **V4** "calm console" design (drop-in for
 * {@link ResolutionTimerProps}). A calm timer card: a big monospaced-feel
 * numeral (via `formatDuration`, `tabular-nums`) showing time left / overdue, a
 * soft-tint state pill (the V4 {@link SLABadgeV4}), and — when a target is
 * derivable — a subtle token progress hint that fills toward the deadline. State
 * is derived exactly as the base — `breached` once time is up, `at-risk` under
 * the configurable threshold, else `on-track` — and surfaced by glyph + color
 * (never color-only). Same props/behavior as the base; colors only from `--xen-*`
 * token classes (no literal hex). Presentational (no internal ticking).
 */
export const ResolutionTimerV4 = React.forwardRef<HTMLDivElement, ResolutionTimerV4Props>(
  function ResolutionTimerV4(
    { remainingSeconds, dueAt, now, atRiskThresholdSeconds = 900, label = 'Time to resolution', state, className, ...rest },
    ref
  ) {
    const remaining =
      typeof remainingSeconds === 'number' && Number.isFinite(remainingSeconds)
        ? remainingSeconds
        : (toMs(dueAt, Date.now()) - toMs(now, Date.now())) / 1000;

    const threshold = Math.max(0, atRiskThresholdSeconds);
    const derived: SLAState =
      state ?? (remaining <= 0 ? 'breached' : remaining <= threshold ? 'at-risk' : 'on-track');

    const overdue = remaining < 0;
    const timeText = formatDuration(Math.abs(remaining));
    const prefix = overdue ? '-' : '';
    const hint = overdue ? 'over' : 'left';
    const timeCls =
      derived === 'breached' ? 'text-danger' : derived === 'at-risk' ? 'text-warn' : 'text-on-surface';
    const barCls =
      derived === 'breached' ? 'bg-danger' : derived === 'at-risk' ? 'bg-warn' : 'bg-primary';

    // Subtle progress hint toward the at-risk threshold window: empty when
    // comfortably on-track, filling as the deadline nears, full once breached.
    const progress = overdue
      ? 1
      : threshold > 0
        ? clamp(1 - remaining / threshold, 0, 1)
        : 0;

    return (
      <div
        ref={ref}
        role="timer"
        aria-label={`${label}: ${overdue ? 'overdue by ' : ''}${timeText}${overdue ? '' : ' remaining'}`}
        className={cn(
          'flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 shadow-sm',
          className
        )}
        {...rest}
      >
        <span className="text-sm text-muted">{label}</span>
        <span className="flex items-center gap-2">
          <span className={cn('text-3xl font-bold leading-none tabular-nums', timeCls)}>
            {prefix}
            {timeText}
          </span>
          <SLABadgeV4 state={derived} hint={hint} size="sm" />
        </span>
        <span className="h-1.5 w-full overflow-hidden rounded-full bg-on-surface/10" aria-hidden="true">
          <span
            className={cn('block h-full rounded-full', barCls)}
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </span>
      </div>
    );
  }
);
