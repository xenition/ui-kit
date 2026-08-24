import * as React from 'react';
import { cn } from '../primitives/cn';

export type IcebreakerChipSize = 'sm' | 'md';
export type IcebreakerChipVariant = 'soft' | 'outline' | 'solid';

export interface IcebreakerChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'value'> {
  /** The prompt shown on the chip (e.g. "Coffee or tea?"). */
  label: string;
  /** Value reported to `onClick`; falls back to `label`. */
  value?: string;
  /** Selected/answered state (drawn AND announced via `aria-pressed`, never color-only). */
  selected?: boolean;
  /** Disabled (already used / unavailable). */
  disabled?: boolean;
  /** Visual weight. Defaults to `soft`. */
  variant?: IcebreakerChipVariant;
  /** Size scale. Defaults to `md`. */
  size?: IcebreakerChipSize;
  /** Leading glyph (emoji). */
  glyph?: string;
  /** Fires the chip's `value` (or `label`) when clicked. */
  onClick?: (value: string) => void;
}

const SIZE: Record<IcebreakerChipSize, string> = {
  sm: 'gap-1 px-sm py-xs text-xs',
  md: 'gap-1 px-md py-sm text-sm',
};

/**
 * Tappable conversation-starter chip — the web parity of the native icebreaker. A
 * person picks a prompt to break the ice; `selected` reflects an already-chosen
 * prompt and is surfaced to screen readers via `aria-pressed` (not color alone).
 * A real `<button>` so it is keyboard-operable by default. Token classes only —
 * no literal colors.
 */
export const IcebreakerChip = React.forwardRef<HTMLButtonElement, IcebreakerChipProps>(
  function IcebreakerChip(
    { label, value, selected = false, disabled = false, variant = 'soft', size = 'md', glyph, onClick, className, ...rest },
    ref
  ) {
    const tone = selected
      ? 'bg-primary text-on-primary'
      : variant === 'solid'
        ? 'bg-primary-100 text-primary'
        : variant === 'soft'
          ? 'bg-primary-50 text-primary'
          : 'border border-border bg-transparent text-on-surface';

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        aria-label={label}
        disabled={disabled}
        onClick={() => onClick?.(value ?? label)}
        className={cn(
          'inline-flex items-center self-start rounded-full font-semibold transition-opacity',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          'disabled:pointer-events-none disabled:opacity-50 hover:opacity-90',
          SIZE[size],
          tone,
          className
        )}
        {...rest}
      >
        {glyph ? <span aria-hidden="true">{glyph}</span> : null}
        <span>{label}</span>
      </button>
    );
  }
);
