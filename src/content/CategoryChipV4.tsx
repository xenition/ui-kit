import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { CategoryChipProps, CategoryChipVariant } from './CategoryChip';
import { TONE_INK } from './internal/reading-v4';

export interface CategoryChipV4Props extends CategoryChipProps {
  /**
   * Build the pressable chip's accessible name. Default
   * ``(label) => `Category ${label}` ``.
   */
  formatLabel?: (label: string) => string;
}

/**
 * The chip's ground and ink, per variant.
 *
 * `soft` moves from `surface` to `card`. `ArticleCard` renders the chip inside
 * a `Card`, and a `Card` is `surface` — so the chip was exactly the colour of
 * the thing it sat on and there was no chip, only a word. `card` is the slot
 * the theme added for a surface that has to read as raised on both schemes.
 *
 * Every ink is `accentText`, never `accent`. That pairing was measured at
 * 1.32:1 and already corrected in `Tag`; `CategoryChip` never got the fix.
 *
 * The transparent border on `solid` is load-bearing: `active` adds a border on
 * every variant now (native drew it on `solid`, web did not), and without a
 * placeholder edge the chip would grow by two pixels the moment it is selected.
 */
const VARIANT_CLASS: Record<CategoryChipVariant, string> = {
  solid: cn('border border-transparent bg-accent text-on-accent'),
  soft: cn('border border-transparent bg-card', TONE_INK.accent),
  outline: cn('border border-border bg-transparent', TONE_INK.accent),
};

/** The chip's own shape and type, shared by the static and pressable forms. */
const CHIP_CLASS = cn(
  'inline-flex select-none items-center justify-center',
  'rounded-[var(--xen-radius-sm)] px-sm',
  'text-xs uppercase tracking-wide'
);

/**
 * **V4 category chip** — the web twin of the native `CategoryChipV4`, same
 * props as {@link CategoryChip} plus `formatLabel`.
 *
 * ## Five changes
 *
 * 1. **The `soft` chip gets a chip.** It was `bg-surface`, the same token as
 *    the `Card` it is rendered inside, so a section label on an article card
 *    was a floating word with no container at all.
 * 2. **`accent` as ink becomes `accentText`.** The raw pairing measures
 *    1.32:1 — the kit already corrected it in `Tag` and never came back here.
 * 3. **`active` is not colour alone.** It gains weight as well as the border,
 *    and the border rule is now identical on both twins.
 * 4. **A pressable chip is a real `<button>`** that clears 44 and announces as
 *    a toggle, not a `<span>` with `role="button"`, a `tabIndex` and a
 *    hand-written Enter/Space handler.
 * 5. **Press is the state layer**, not `opacity: 0.7` — which is the band the
 *    kit spends on *disabled*.
 */
export const CategoryChipV4 = React.forwardRef<HTMLSpanElement, CategoryChipV4Props>(
  function CategoryChipV4(
    {
      label,
      variant = 'solid',
      onClick,
      active = false,
      formatLabel = (value: string) => `Category ${value}`,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const skin = cn(
      CHIP_CLASS,
      VARIANT_CLASS[variant],
      // Weight AND border, so the selected filter survives greyscale and CVD.
      active ? 'border-accent font-bold' : 'font-semibold'
    );

    if (!onClick) {
      return (
        <span ref={ref} className={cn(skin, 'self-start py-[var(--xen-space-xs)]', className)} {...rest}>
          {label}
        </span>
      );
    }

    /*
      The base's props extend `HTMLAttributes<HTMLSpanElement>` and its ref is a
      span, so the root stays a span and the button goes inside it. Turning the
      root into a `<button>` would silently break every caller passing a span
      attribute or holding the ref.
    */
    return (
      <span ref={ref} className={cn('inline-flex self-start', className)} {...rest}>
        <button
          type="button"
          aria-label={formatLabel(label)}
          aria-pressed={active}
          onClick={onClick}
          data-xen-v4-state=""
          style={
            stateGroundVars(
              variant === 'solid' ? 'var(--xen-accent)' : 'var(--xen-card)',
              variant === 'solid' ? 'var(--xen-on-accent)' : 'var(--xen-on-card)'
            ) as React.CSSProperties
          }
          className={cn(
            skin,
            // The HIG floor, composed from the spacing scale — not a typed 44.
            MIN_TAP_CLASS,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {label}
        </button>
      </span>
    );
  }
);
