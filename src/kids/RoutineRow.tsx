import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

/** Time-of-day slot. Drives the fallback icon. */
export type RoutineSlot = 'morning' | 'afternoon' | 'evening' | 'bedtime' | 'anytime';

const SLOT_GLYPH: Record<RoutineSlot, string> = {
  morning: '🌅',
  afternoon: '☀️',
  evening: '🌆',
  bedtime: '🌙',
  anytime: '⏰',
};

export interface RoutineRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  /** Step label, e.g. "Brush teeth". */
  label: string;
  /** Time-of-day slot; drives the fallback icon. */
  slot?: RoutineSlot;
  /** Explicit emoji/glyph (overrides the slot icon). */
  icon?: string;
  /** Scheduled time, e.g. "7:30 AM". */
  time?: string;
  /** Whether the step is done. */
  done?: boolean;
  /** Disable the toggle. */
  disabled?: boolean;
  /** Toggle the done state. Presence makes the row a tappable checkbox. */
  onToggle?: (next: boolean) => void;
}

/**
 * A single routine step row: an icon, label + time, and a tappable done/not-done
 * checkbox. Done state is shown by a check glyph, strike-through, and the a11y
 * `aria-checked` state — never color alone. When `onToggle` is set the whole row
 * is a real `<button role="checkbox">`. Token-bound throughout — no literal
 * colors.
 */
export const RoutineRow = React.forwardRef<HTMLDivElement, RoutineRowProps>(function RoutineRow(
  { label, slot = 'anytime', icon, time, done = false, disabled = false, onToggle, className, ...rest },
  ref
) {
  const glyph = icon ?? SLOT_GLYPH[slot] ?? '⏰';
  const a11yLabel = `${label}${time ? `, ${time}` : ''}, ${done ? 'done' : 'not done'}`;

  const body = (
    <>
      <Icon glyph={glyph} size="lg" />
      <span className="min-w-0 flex-1 text-left">
        <span className={cn('block truncate text-base font-semibold text-on-surface', done && 'line-through')}>
          {label}
        </span>
        {time ? <span className="block text-xs text-muted">{time}</span> : null}
      </span>
      <span
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
          done ? 'border-success bg-success' : 'border-border bg-transparent'
        )}
      >
        {done ? <Icon glyph="✓" size="xs" color="onSuccess" aria-label="done" /> : null}
      </span>
    </>
  );

  const rowClass = cn(
    'flex w-full items-center gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2',
    disabled && 'opacity-50',
    className
  );

  if (!onToggle) {
    return (
      <div ref={ref} data-xen-routine-row="" aria-label={a11yLabel} className={rowClass} {...rest}>
        {body}
      </div>
    );
  }

  return (
    <button
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      type="button"
      data-xen-routine-row=""
      role="checkbox"
      aria-checked={done}
      aria-disabled={disabled || undefined}
      aria-label={a11yLabel}
      disabled={disabled}
      onClick={() => onToggle(!done)}
      className={cn(
        rowClass,
        'transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'disabled:pointer-events-none'
      )}
      {...(rest as unknown as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {body}
    </button>
  );
});
