import * as React from 'react';
import { cn } from '../primitives/cn';
import type { ChecklistItemProps } from './ChecklistItem';

/** Drop-in for {@link ChecklistItemProps} — same props, the V4 "flow" design. */
export type ChecklistItemV4Props = ChecklistItemProps;

/**
 * ChecklistItem — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a checklist line: a big ≥44px tap target, a round
 * toggle, and a bigger, more legible label. Checking the item is the satisfying
 * moment — the row settles into a **soft-success glow** with the label struck
 * through. Same props/behavior as {@link ChecklistItemProps} (both `onChange`
 * and `onCheckedChange` spellings, the original winning); all colors from
 * `--xen-*` token classes (no literals).
 */
export const ChecklistItemV4 = React.forwardRef<HTMLButtonElement, ChecklistItemV4Props>(
  function ChecklistItemV4(
    { label, checked = false, onCheckedChange, onChange, disabled = false, className },
    ref
  ) {
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onCheckedChange ?? onChange;
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => emit?.(!checked)}
        className={cn(
          'flex w-full min-h-[44px] items-center gap-3 rounded-[var(--xen-radius-md)] px-2 py-2 text-left transition-colors',
          'disabled:pointer-events-none disabled:opacity-50',
          checked ? 'bg-success/[0.08]' : 'bg-surface',
          className
        )}
      >
        <span
          aria-hidden
          className={cn(
            'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-bold',
            checked ? 'border-success bg-success text-on-success' : 'border-border bg-surface'
          )}
        >
          {checked ? '✓' : ''}
        </span>
        <span
          className={cn(
            'flex-1 text-base font-medium leading-relaxed',
            checked ? 'text-muted line-through' : 'text-on-surface'
          )}
        >
          {label}
        </span>
      </button>
    );
  }
);
