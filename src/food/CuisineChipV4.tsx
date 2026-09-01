import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { CuisineChipProps } from './CuisineChip';

export interface CuisineChipV4Props extends CuisineChipProps {
  /**
   * The chip's state before anything is tapped, when it runs **uncontrolled**
   * — that is, when `selected` is not passed at all. Default `false`, which is
   * what the base rendered; the difference is that it can now change.
   */
  defaultSelected?: boolean;
}

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;
const PRIMARY_STATE = stateGroundVars(
  'var(--xen-primary)',
  'var(--xen-on-primary)'
) as React.CSSProperties;

/**
 * **V4 cuisine chip** — the web twin of the native `CuisineChipV4`, same props
 * as {@link CuisineChip} plus `defaultSelected`.
 *
 * ## Four changes
 *
 * 1. **A filter that can actually be turned on.** The chip held no state and
 *    `selected` defaulted to `false`, so an uncontrolled `CuisineChip` was a
 *    permanently unselected filter: it emitted on every tap and never moved.
 *    Passing `selected` still hands control to the caller; omitting it now
 *    means the chip owns its state, seeded from `defaultSelected`.
 * 2. **It clears 44.** `py-1` around a 12px label is about 24px — a third of
 *    a target on a control that exists to be tapped, and a horizontal strip of
 *    them is the hardest thing on a menu screen to hit.
 * 3. **Press is a state layer, disabled is 0.38.** `hover:bg-neutral-100` is a
 *    light-oriented ramp step that paints a near-white slab on a dark page,
 *    and `opacity-50` was a round number where M3 spends 0.38.
 * 4. **Focus rings on the `ring` token**, not `primary-300` — a ramp step
 *    inverts with the scheme, while `--xen-ring` is `primary` already
 *    corrected to 3:1 against the page.
 */
export const CuisineChipV4 = React.forwardRef<HTMLButtonElement | HTMLSpanElement, CuisineChipV4Props>(
  function CuisineChipV4(
    {
      label,
      glyph,
      selected,
      defaultSelected = false,
      onClick,
      disabled = false,
      size = 'md',
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const controlled = selected !== undefined;
    const [internal, setInternal] = React.useState(defaultSelected);
    const active = controlled ? selected : internal;

    const sizeClass = size === 'sm' ? 'px-sm text-xs' : 'px-md text-sm';
    const chipClass = cn(
      'inline-flex items-center justify-center gap-xs self-start rounded-full border font-semibold',
      sizeClass,
      active ? 'border-primary bg-primary text-on-primary' : 'border-border bg-card text-on-card',
      className
    );

    const inner = (
      <>
        {/* The word is right beside it — a glyph repeating it is a dead stop. */}
        {glyph ? <span aria-hidden="true">{glyph}</span> : null}
        <span>{label}</span>
      </>
    );

    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          aria-pressed={active}
          disabled={disabled}
          onClick={() => {
            if (!controlled) setInternal(!active);
            onClick();
          }}
          data-xen-v4-state=""
          style={active ? PRIMARY_STATE : CARD_STATE}
          className={cn(
            chipClass,
            MIN_TAP_CLASS,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            V4_DISABLED_CLASS
          )}
        >
          {inner}
        </button>
      );
    }

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(chipClass, 'py-xs', disabled && 'opacity-[0.38]')}
      >
        {inner}
      </span>
    );
  }
);
