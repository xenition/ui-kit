import * as React from 'react';
import { cn } from '../primitives/cn';
import { DueDatePill } from './DueDatePill';
import type { ReminderRowProps } from './ReminderRow';

/** Drop-in for {@link ReminderRowProps} — same props, the V4 "flow" design. */
export type ReminderRowV4Props = ReminderRowProps;

/**
 * ReminderRow — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a reminder line: a bell glyph seated in a
 * **soft-primary disc**, a bigger legible title over its time
 * {@link DueDatePill}, and an enable toggle exposing a `switch` role with a
 * stateful label. When the reminder is enabled the whole row settles into a
 * calm **soft-primary tint** so an active reminder reads at a glance. Same
 * props/behavior as {@link ReminderRowProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export const ReminderRowV4 = React.forwardRef<HTMLDivElement, ReminderRowV4Props>(function ReminderRowV4(
  { title, timeLabel, tone = 'upcoming', enabled = true, onToggle, onClick, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 rounded-[var(--xen-radius-md)] p-3 transition-colors',
        enabled ? 'bg-primary/[0.08]' : 'bg-surface',
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl transition-colors',
          enabled ? 'bg-primary/[0.14] text-primary-text' : 'bg-border/[0.5] text-muted-text'
        )}
      >
        {enabled ? '🔔' : '🔕'}
      </span>

      <button
        type="button"
        aria-label={title}
        onClick={onClick}
        disabled={!onClick}
        className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left disabled:cursor-default"
      >
        <span
          className={cn(
            'truncate text-base font-semibold leading-relaxed',
            enabled ? 'text-on-surface' : 'text-muted-text'
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
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl transition-opacity hover:opacity-70',
          enabled ? 'text-primary-text' : 'text-muted-text'
        )}
      >
        {enabled ? '🔔' : '🔕'}
      </button>
    </div>
  );
});
