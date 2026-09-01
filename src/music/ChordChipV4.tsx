import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import {
  ACCENT_BG_CLASS,
  ACCENT_BORDER_CLASS,
  ACCENT_ICON_COLOR,
  ACCENT_ON_TEXT_CLASS,
  ACCENT_SOFT_BG_CLASS,
  ACCENT_STRONG_BG_CLASS,
  ACCENT_TEXT_CLASS,
  chordLabel,
  type AccentSlot,
} from './types';
import type { ChordChipProps, ChordChipSize } from './ChordChip';

/** Drop-in for {@link ChordChipProps} — same props, the V4 "session" design. */
export type ChordChipV4Props = ChordChipProps;

/**
 * `Icon` on-accent color slot for the selected marker on a `solid` fill. The web
 * `Icon` has no `onAccent` slot (accent folds to `primary`, the accent→primary
 * web gotcha); the rest pass through so the `♪` reads on the solid accent fill.
 */
const ACCENT_ON_ICON_COLOR: Record<AccentSlot, 'onPrimary' | 'onSuccess' | 'onWarn' | 'onDanger'> = {
  primary: 'onPrimary',
  accent: 'onPrimary',
  success: 'onSuccess',
  warn: 'onWarn',
  danger: 'onDanger',
};

/**
 * ChordChip — **V4** "session" design (web parity of the native V4). The clean,
 * tactile chord chip: a rounded token pill where `solid` is a strong accent fill
 * with on-accent text, `soft` is a soft accent tint, and `outline` is a bordered
 * surface. `size` (`sm` / `md` / `lg`) scales padding + text on its own chip
 * scale. A selected chip adds an accent ring + a leading `♪` marker (never color
 * alone) and heavier weight. A real `<button>` when `onClick` is given (fires
 * with the chord), a static `<span>` otherwise. Identical props/behavior to
 * {@link ChordChipProps}; the accent is preserved via the `ACCENT_*` token slot
 * helpers (no literal colors, no gradient).
 */
const SIZE: Record<ChordChipSize, string> = {
  sm: 'gap-1 px-[var(--xen-space-xs)] py-0.5 text-xs',
  md: 'gap-1 px-[var(--xen-space-sm)] py-1 text-sm',
  lg: 'gap-1.5 px-[var(--xen-space-md)] py-1.5 text-base',
};

/** Marker glyph size per chip size — its OWN scale, mapped onto the Icon scale. */
const MARKER_ICON_SIZE: Record<ChordChipSize, 'xs' | 'sm' | 'base'> = {
  sm: 'xs',
  md: 'sm',
  lg: 'base',
};

export const ChordChipV4 = React.forwardRef<HTMLButtonElement | HTMLSpanElement, ChordChipV4Props>(
  function ChordChipV4(
    { chord, variant = 'soft', size = 'md', selected = false, color = 'primary', disabled = false, onClick, className, ...rest },
    ref
  ) {
    const accent: AccentSlot = color;
    const label = chordLabel(chord);

    // Marker uses on-accent color on a solid fill, the accent color otherwise.
    const markerColor = variant === 'solid' ? ACCENT_ON_ICON_COLOR[accent] : ACCENT_ICON_COLOR[accent];

    let tone: string;
    if (variant === 'solid') {
      tone = cn(ACCENT_BG_CLASS[accent], ACCENT_ON_TEXT_CLASS[accent], selected && 'ring-2 ring-offset-1');
    } else if (variant === 'outline') {
      tone = cn('border bg-surface', ACCENT_BORDER_CLASS[accent], ACCENT_TEXT_CLASS[accent], selected && 'border-2 ring-2 ring-offset-1');
    } else {
      tone = cn(
        selected ? ACCENT_STRONG_BG_CLASS[accent] : ACCENT_SOFT_BG_CLASS[accent],
        ACCENT_TEXT_CLASS[accent],
        selected && cn('border-2 ring-2 ring-offset-1', ACCENT_BORDER_CLASS[accent])
      );
    }

    const marker = selected ? (
      <Icon glyph="♪" size={MARKER_ICON_SIZE[size]} color={markerColor} aria-hidden="true" />
    ) : null;

    const classes = cn(
      'inline-flex items-center self-start rounded-[var(--xen-radius-lg)] font-bold transition-colors',
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
          {marker}
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
        {marker}
        {label}
      </button>
    );
  }
);
