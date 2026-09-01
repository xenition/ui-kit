import * as React from 'react';
import { cn } from '../primitives/cn';
import type { TimeTrackerProps } from './TimeTracker';

/** Drop-in for {@link TimeTrackerProps} — same props, the V4 "flow" design. */
export type TimeTrackerV4Props = TimeTrackerProps;

/**
 * TimeTracker — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a stopwatch: a **big, monospaced-feel elapsed
 * numeral** with the context label beneath, and a large (≥44px) round start/stop
 * control that reads **primary** when idle and flips to **danger "stop"** while
 * running. A live session lifts the whole card into a soft-primary running glow
 * so the timer reads as alive without shouting. Keeps the running/elapsed
 * contract of {@link TimeTrackerProps}; all colors from `--xen-*` token classes
 * (no literals).
 */
export const TimeTrackerV4 = React.forwardRef<HTMLDivElement, TimeTrackerV4Props>(function TimeTrackerV4(
  { elapsedLabel, running = false, onToggle, label, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 rounded-[var(--xen-radius-md)] border p-3 transition-colors',
        running ? 'border-primary/50 bg-primary/[0.08] shadow-md' : 'border-border bg-surface shadow-sm',
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            'font-mono text-3xl font-bold tabular-nums leading-none tracking-tight',
            running ? 'text-primary-text' : 'text-on-surface'
          )}
        >
          {elapsedLabel}
        </span>
        {label ? <span className="truncate text-xs text-muted-text">{label}</span> : null}
      </div>

      <button
        type="button"
        aria-pressed={running}
        aria-label={running ? 'Stop timer' : 'Start timer'}
        onClick={() => onToggle?.(!running)}
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-opacity hover:opacity-90',
          running ? 'bg-danger text-on-danger' : 'bg-primary text-on-primary'
        )}
      >
        {running ? '■' : '▶'}
      </button>
    </div>
  );
});
