import * as React from 'react';
import { cn } from '../primitives/cn';

export interface SettingsRowProps {
  label: string;
  /** Optional current-value readout shown on the right (before `rightSlot`). */
  value?: string;
  /** Optional description under the label. */
  description?: string;
  /** Custom trailing control (switch, badge, …). Overrides the chevron. */
  rightSlot?: React.ReactNode;
  /** When set (and no `rightSlot`), shows a chevron and makes the row a button. */
  onClick?: () => void;
  className?: string;
}

/**
 * A single settings/preferences row: label (+ optional description) on the left,
 * a value and/or trailing control on the right. Shows a chevron and becomes a
 * `<button>` when `onClick` is provided. Token-only.
 */
export const SettingsRow = React.forwardRef<HTMLElement, SettingsRowProps>(
  function SettingsRow({ label, value, description, rightSlot, onClick, className }, ref) {
    const inner = (
      <>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
          <span className="text-base text-on-surface">{label}</span>
          {description ? <span className="text-sm text-muted">{description}</span> : null}
        </span>
        {value ? <span className="shrink-0 text-sm text-muted">{value}</span> : null}
        {rightSlot ?? (onClick ? <span className="text-lg text-muted">›</span> : null)}
      </>
    );

    const classes = cn(
      'flex min-h-[48px] w-full items-center gap-md px-lg py-md',
      className
    );

    if (!onClick) {
      return (
        <div ref={ref as React.Ref<HTMLDivElement>} aria-label={label} className={classes}>
          {inner}
        </div>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        aria-label={label}
        onClick={onClick}
        className={cn(classes, 'text-left transition-colors hover:bg-neutral-100')}
      >
        {inner}
      </button>
    );
  }
);
