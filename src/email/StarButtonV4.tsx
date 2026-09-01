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
import type { IconSize } from '../primitives';
import { TONE_INK } from './internal/mail-v4';
import type { StarButtonProps } from './StarButton';

export interface StarButtonV4Props extends StarButtonProps {
  /** The action offered while the message is **not** starred. Default `'Star'`. */
  starLabel?: string;
  /** The action offered while it **is**. Default `'Remove star'`. */
  unstarLabel?: string;
}

/**
 * The glyph's size as a type-scale class.
 *
 * Redrawn here rather than delegated to `Icon` because `IconColor` has no
 * contrast-corrected slot: `Icon` can only paint the star in `warn`, which is a
 * **fill**. `ReadReceiptV4` resolves the same conflict the same way.
 */
const GLYPH_SIZE: Record<IconSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

/** 44 on both axes, composed from the spacing scale — never a typed 44. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';

/**
 * **V4 star button** — same props as {@link StarButton} plus `starLabel` and
 * `unstarLabel`.
 *
 * ## Five changes
 *
 * 1. **It is big enough to hit.** The base was a glyph in `xs` padding — about
 *    26px square — sitting on the busiest line of a mail row, between a subject
 *    that opens the message and a row that opens the message. A miss did not do
 *    nothing; it opened the mail.
 * 2. **The name is the action, and the state is `aria-pressed`.** "Starred" as
 *    a *name* tells a reader what the message is, not what the button will do,
 *    so nothing announced that pressing it would remove the star. Native said
 *    the same thing a third way. Both twins now name the action and carry the
 *    state in the toggle state.
 * 3. **The star is inked with `warnText`, not the `warn` fill.** The fill slot
 *    carries a contrast promise for things drawn *on* it, not for a mark drawn
 *    *in* it, and an amber star on a white row was the thinnest thing in the
 *    list.
 * 4. **Press is a state layer.** `hover:opacity-70` dims the control's own
 *    content, which is the band M3 spends on *disabled* — a hovered star and a
 *    dead star looked alike.
 * 5. **Disabled is 0.38**, M3's number, not the `opacity-50` that was picked
 *    because fifty is round.
 */
export const StarButtonV4 = React.forwardRef<HTMLButtonElement, StarButtonV4Props>(
  function StarButtonV4(
    {
      starred = false,
      onToggle,
      size = 'lg',
      disabled = false,
      starLabel = 'Star',
      unstarLabel = 'Remove star',
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    return (
      <button
        ref={ref}
        type="button"
        aria-label={starred ? unstarLabel : starLabel}
        aria-pressed={starred}
        disabled={disabled}
        onClick={() => onToggle?.(!starred)}
        data-xen-v4-state=""
        // The ink is already on the glyph; the layer only needs the ground.
        style={stateGroundVars('var(--xen-surface)', 'currentColor') as React.CSSProperties}
        className={cn(
          'inline-flex items-center justify-center rounded-full',
          MIN_TAP_CLASS,
          TAP_SQUARE,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          V4_DISABLED_CLASS,
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'leading-none',
            typeof size === 'number' ? undefined : GLYPH_SIZE[size],
            starred ? TONE_INK.warn : TONE_INK.muted
          )}
          style={typeof size === 'number' ? { fontSize: size } : undefined}
        >
          {starred ? '★' : '☆'}
        </span>
      </button>
    );
  }
);
