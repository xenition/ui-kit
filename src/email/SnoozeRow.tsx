import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

export interface SnoozeRowProps {
  /** Preset name (e.g. "Later today", "Tomorrow", "Next week"). */
  label: string;
  /** Resolved time shown on the trailing side (e.g. "6:00 PM"). */
  when?: string;
  /** Leading glyph. Default a clock. */
  glyph?: string;
  /** Selected preset — tinted + check. */
  selected?: boolean;
  /** Choose this preset. */
  onClick?: () => void;
  className?: string;
}

/**
 * A single snooze-preset option row — glyph, preset name, and the resolved time
 * it maps to. A real `<button>` used to build the snooze picker sheet. The
 * `selected` state tints the row and shows a check, and reports `aria-pressed`
 * to assistive tech (not by color only). No literal colors.
 */
export const SnoozeRow = React.forwardRef<HTMLButtonElement, SnoozeRowProps>(function SnoozeRow(
  { label, when, glyph = '⏰', selected = false, onClick, className },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Snooze ${label}${when ? `, ${when}` : ''}`}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-md)] py-[var(--xen-space-md)] text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        selected ? 'bg-primary-50' : 'bg-transparent hover:bg-neutral-100',
        className
      )}
    >
      <Icon glyph={glyph} size="lg" color={selected ? 'primary' : 'muted'} />
      <span className={cn('flex-1 text-base text-on-surface', selected ? 'font-bold' : 'font-medium')}>
        {label}
      </span>
      {when ? <span className="text-sm text-muted">{when}</span> : null}
      {selected ? <Icon glyph="✓" size="base" color="primary" aria-label="Selected" /> : null}
    </button>
  );
});
