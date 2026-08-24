import * as React from 'react';
import { cn } from '../primitives/cn';

export interface ChecklistItemProps {
  /** Item text. */
  label: string;
  /** Controlled checked state. */
  checked?: boolean;
  /** Fires with the next checked value on click. */
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * A single checklist line — a round toggle + label. Unlike the square primitive
 * `Checkbox`, a checked item fills with the **success** token (done = success)
 * and strikes through its label. Exposes the `checkbox` a11y role/state. Web
 * parity of the native `ChecklistItem` (`onPress` → `onClick`). No literal colors.
 */
export const ChecklistItem = React.forwardRef<HTMLButtonElement, ChecklistItemProps>(
  function ChecklistItem({ label, checked = false, onCheckedChange, disabled = false, className }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          'flex w-full items-center gap-2 py-1 text-left transition-opacity',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
      >
        <span
          aria-hidden
          className={cn(
            'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
            checked ? 'border-success bg-success text-on-success' : 'border-border bg-surface'
          )}
        >
          {checked ? '✓' : ''}
        </span>
        <span
          className={cn(
            'flex-1 text-sm',
            checked ? 'text-muted line-through' : 'text-on-surface'
          )}
        >
          {label}
        </span>
      </button>
    );
  }
);
