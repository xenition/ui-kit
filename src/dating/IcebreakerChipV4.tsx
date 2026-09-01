import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import {
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
  stateGroundVars,
} from '../primitives/internal/v4-state';
import type { IcebreakerChipProps, IcebreakerChipSize } from './IcebreakerChip';

/** Same props as {@link IcebreakerChip}; V4 adds none. */
export type IcebreakerChipV4Props = IcebreakerChipProps;

/**
 * Padding and type scale per size. The **height** is not here: both sizes take
 * {@link MIN_TAP_CLASS}, so `sm` is a smaller chip, not a chip you cannot hit.
 */
const SIZE: Record<IcebreakerChipSize, string> = {
  sm: 'gap-xs px-sm text-xs',
  md: 'gap-xs px-md text-sm',
};

/**
 * **V4 icebreaker chip** — the web twin of the native `IcebreakerChipV4`, same
 * props as {@link IcebreakerChip}.
 *
 * ## Four changes
 *
 * 1. **Both sizes are hittable.** `sm` came out around 22px tall and `md`
 *    around 30 — and `ProfileCard` renders *every* interest chip at `sm`, so a
 *    profile was a field of 22px targets. Both now clear 44.
 * 2. **`solid` is actually solid, and the same solid on both twins.** Web drew
 *    `bg-primary-100 text-primary` under that name — a ramp step wearing the
 *    solid label, and a different chip from its native twin. `soft` is an
 *    opaque `color-mix` into `surface` rather than a `-50` ramp step, so it
 *    keeps its colour on a card, on the page and over a photo.
 * 3. **Brand ink is the contrast-corrected slot.** `text-primary` is a *fill*
 *    with no contrast promise; on a 12% tint of itself it is the one place the
 *    promise actually matters. It becomes `text-primary-text`.
 * 4. **Selected is a mark, not just a colour.** `aria-pressed` always said so;
 *    nothing visible did, and a selected `solid` chip and an unselected one
 *    were the same disc. A check leads the label when the chip is chosen.
 *
 * Press and hover are the shared state layer — the base faded the chip's own
 * content with `hover:opacity-90`, which is the signal M3 spends on *disabled*.
 */
export const IcebreakerChipV4 = React.forwardRef<HTMLButtonElement, IcebreakerChipV4Props>(
  function IcebreakerChipV4(
    {
      label,
      value,
      selected = false,
      disabled = false,
      variant = 'soft',
      size = 'md',
      glyph,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    // A chosen chip is filled whatever its variant — that is what "chosen"
    // looks like — so `solid` and `selected` share one ground and the check
    // tells them apart.
    const filled = selected || variant === 'solid';

    const ground = filled
      ? 'bg-primary text-on-primary'
      : variant === 'soft'
        ? 'bg-[color-mix(in_srgb,var(--xen-primary)_12%,var(--xen-surface))] text-primary-text'
        : 'border border-border bg-surface text-on-surface';

    const stateVars = filled
      ? stateGroundVars('var(--xen-primary)', 'var(--xen-on-primary)')
      : variant === 'soft'
        ? stateGroundVars(
            'color-mix(in srgb, var(--xen-primary) 12%, var(--xen-surface))',
            'var(--xen-primary)'
          )
        : stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)');

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        aria-label={label}
        disabled={disabled}
        onClick={() => onClick?.(value ?? label)}
        data-xen-v4-state=""
        style={stateVars}
        className={cn(
          'inline-flex items-center justify-center self-start rounded-full font-semibold',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          V4_DISABLED_CLASS,
          MIN_TAP_CLASS,
          SIZE[size],
          ground,
          className
        )}
        {...rest}
      >
        {selected ? <span aria-hidden="true">✓</span> : null}
        {glyph ? <span aria-hidden="true">{glyph}</span> : null}
        <span>{label}</span>
      </button>
    );
  }
);
