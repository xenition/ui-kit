import * as React from 'react';
import { cn } from '../primitives/cn';
import { DueDatePill, type DueDateTone } from './DueDatePill';

export interface ReminderRowProps {
  /** Reminder text. */
  title: string;
  /** Pre-formatted time label (e.g. `'9:00 AM'`). */
  timeLabel?: string;
  /** Urgency tone for the time pill. */
  tone?: DueDateTone;
  /** Whether the reminder is enabled (bell on). */
  enabled?: boolean;
  /** Fires with the next enabled value when the bell is toggled. */
  onToggle?: (enabled: boolean) => void;
  /** Fires when the row body is clicked. */
  onClick?: () => void;
  className?: string;
}

/**
 * A reminder line: title, an optional time {@link DueDatePill}, and a bell toggle
 * that reads as primary (on) or muted (off) and exposes a `switch` role with a
 * stateful label. Web parity of the native `ReminderRow` (`onPress` → `onClick`).
 * No literal colors.
 */
export const ReminderRow = React.forwardRef<HTMLDivElement, ReminderRowProps>(function ReminderRow(
  { title, timeLabel, tone = 'upcoming', enabled = true, onToggle, onClick, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-2 rounded-[var(--xen-radius-md)] bg-surface p-2',
        className
      )}
    >
      <button
        type="button"
        aria-label={title}
        onClick={onClick}
        disabled={!onClick}
        className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left disabled:cursor-default"
      >
        <span
          className={cn(
            'truncate text-sm font-medium',
            enabled ? 'text-on-surface' : 'text-muted'
          )}
        >
          {title}
        </span>
        {timeLabel ? <DueDatePill label={timeLabel} tone={tone} glyph="⏰" /> : null}
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={`${title} reminder`}
        onClick={() => onToggle?.(!enabled)}
        className={cn(
          'p-1 text-lg transition-opacity hover:opacity-70',
          enabled ? 'text-primary' : 'text-muted'
        )}
      >
        {enabled ? '🔔' : '🔕'}
      </button>
    </div>
  );
});
