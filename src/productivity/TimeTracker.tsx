import * as React from 'react';
import { cn } from '../primitives/cn';

export interface TimeTrackerProps {
  /** Pre-formatted elapsed label (e.g. `'01:24:07'`). */
  elapsedLabel: string;
  /** Whether the timer is currently running. */
  running?: boolean;
  /** Fires with the next running value when the start/stop control is clicked. */
  onToggle?: (running: boolean) => void;
  /** Optional context label (e.g. the task name being timed). */
  label?: string;
  className?: string;
}

/**
 * A start/stop time tracker: an elapsed readout, an optional context label, and
 * a toggle control that reads as **success** (running) or **primary** (stopped)
 * with a matching play/stop glyph. The control exposes a `button` role with a
 * stateful label. Web parity of the native `TimeTracker`. No literal colors.
 */
export const TimeTracker = React.forwardRef<HTMLDivElement, TimeTrackerProps>(function TimeTracker(
  { elapsedLabel, running = false, onToggle, label, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-2 rounded-[var(--xen-radius-md)] border border-border bg-surface p-2',
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-lg font-bold text-on-surface">{elapsedLabel}</span>
        {label ? <span className="truncate text-xs text-muted">{label}</span> : null}
      </div>

      <button
        type="button"
        aria-pressed={running}
        aria-label={running ? 'Stop timer' : 'Start timer'}
        onClick={() => onToggle?.(!running)}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-full text-base font-bold transition-opacity hover:opacity-90',
          running ? 'bg-success text-on-success' : 'bg-primary text-on-primary'
        )}
      >
        {running ? '■' : '▶'}
      </button>
    </div>
  );
});
