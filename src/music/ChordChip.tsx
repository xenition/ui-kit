import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  ACCENT_BG_CLASS,
  ACCENT_BORDER_CLASS,
  ACCENT_ON_TEXT_CLASS,
  ACCENT_SOFT_BG_CLASS,
  ACCENT_STRONG_BG_CLASS,
  ACCENT_TEXT_CLASS,
  chordLabel,
  type AccentSlot,
  type Chord,
} from './types';

export type ChordChipVariant = 'solid' | 'soft' | 'outline';
export type ChordChipSize = 'sm' | 'md' | 'lg';

export interface ChordChipProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'color'> {
  /** The chord to display (root + quality → label). */
  chord: Chord;
  /**
   * - `soft` — tinted fill (default).
   * - `solid` — filled accent.
   * - `outline` — ringed only.
   */
  variant?: ChordChipVariant;
  /** Chip size (default `md`). */
  size?: ChordChipSize;
  /** Selected / active state (e.g. current chord in a progression). */
  selected?: boolean;
  /** Accent slot (default `primary`). */
  color?: AccentSlot;
  /** Disable the chip. */
  disabled?: boolean;
  /** Fires with the chord when tapped (omit for a static label). */
  onClick?: (chord: Chord) => void;
}

const SIZE: Record<ChordChipSize, string> = {
  sm: 'px-[var(--xen-space-xs)] py-0.5 text-xs',
  md: 'px-[var(--xen-space-sm)] py-1 text-sm',
  lg: 'px-[var(--xen-space-md)] py-1.5 text-base',
};

/**
 * A chord label chip — a UI shell only, and the DOM parity of `native/music`'s
 * `ChordChip`. Renders a chord's label (from `chord.label` or `root`+`quality`)
 * as a pill; a real `<button>` when `onClick` is given (fires with the chord),
 * a static `<span>` otherwise. `selected` is surfaced in `aria-pressed` and a
 * heavier ring/weight, not color alone. Accent comes from a semantic token
 * class; no literal colors.
 */
export const ChordChip = React.forwardRef<HTMLButtonElement | HTMLSpanElement, ChordChipProps>(
  function ChordChip(
    { chord, variant = 'soft', size = 'md', selected = false, color = 'primary', disabled = false, onClick, className, ...rest },
    ref
  ) {
    const accent: AccentSlot = color;
    const label = chordLabel(chord);

    let tone: string;
    if (variant === 'solid') {
      tone = cn(ACCENT_BG_CLASS[accent], ACCENT_ON_TEXT_CLASS[accent], selected && 'ring-2 ring-offset-1');
    } else if (variant === 'outline') {
      tone = cn('border bg-transparent', ACCENT_BORDER_CLASS[accent], ACCENT_TEXT_CLASS[accent], selected && 'border-2');
    } else {
      tone = cn(
        selected ? ACCENT_STRONG_BG_CLASS[accent] : ACCENT_SOFT_BG_CLASS[accent],
        ACCENT_TEXT_CLASS[accent],
        selected && cn('border-2', ACCENT_BORDER_CLASS[accent])
      );
    }

    const classes = cn(
      'inline-flex items-center self-start rounded-[var(--xen-radius-md)] font-bold transition-colors',
      SIZE[size],
      tone,
      disabled && 'opacity-50',
      className
    );

    if (!onClick) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          role="text"
          aria-label={`Chord ${label}${selected ? ', selected' : ''}`}
          className={classes}
          {...rest}
        >
          {label}
        </span>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        aria-pressed={selected}
        aria-label={`Chord ${label}`}
        onClick={() => onClick(chord)}
        className={cn(classes, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 hover:opacity-90')}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {label}
      </button>
    );
  }
);
