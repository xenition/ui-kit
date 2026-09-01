import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import {
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { QuantityStepperProps } from './QuantityStepper';

/**
 * How big the two tap targets are.
 *
 * `'md'` is the **44 floor** — HIG's minimum comfortable target, composed as
 * `2xl - xs` and imported from the nav line's {@link MIN_TAP_SQUARE_CLASS} so
 * the kit still has exactly one 44. It is the size a stepper takes inside a
 * cart row.
 *
 * `'lg'` is the **V4 control metric**, `2xl` (48) — the height `InputV4`,
 * `SelectV4` and every other field-shaped control takes. A stepper standing on
 * a product page beside a quantity field or an add-to-cart button takes this
 * one, so the row of controls has one height instead of two that are nearly
 * the same.
 */
export type QuantityStepperV4Size = 'md' | 'lg';

export interface QuantityStepperV4Props extends QuantityStepperProps {
  /**
   * Tap-target size. Default `'md'` — the 44 floor. `'lg'` is the 48 V4 control
   * metric, for a stepper standing beside fields rather than inside a row.
   */
  size?: QuantityStepperV4Size;
}

export type { QuantityStepperProps };

/**
 * The button box, per size. Square on both axes so `−` and `+` are the same
 * shape as each other and the control's silhouette does not depend on which
 * glyph is wider.
 */
const BUTTON_SIZE: Record<QuantityStepperV4Size, string> = {
  md: MIN_TAP_SQUARE_CLASS,
  lg: 'min-h-[var(--xen-space-2xl)] min-w-[var(--xen-space-2xl)]',
};

/**
 * The value's own box. Wide enough that 9 → 10 does not move the `+` button out
 * from under the finger that is holding it down (§36.11), and it is a *minimum*
 * so a three-digit quantity still fits.
 */
const VALUE_SIZE: Record<QuantityStepperV4Size, string> = {
  md: 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
  lg: 'min-w-[var(--xen-space-2xl)]',
};

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

/**
 * **V4 quantity stepper** — the web twin of the native `QuantityStepperV4`,
 * same props as {@link QuantityStepper} plus {@link QuantityStepperV4Props.size},
 * a different design line.
 *
 * `COMMERCE-MARKETPLACE-V4-BRIEF.md` §2 names this component's `+` / `−` as
 * "the classic 44 violation — a control a shopper taps repeatedly, drawn at
 * glyph size". The base drew them at `h-8 w-8` (32), which is 12 short of the
 * HIG floor on the one control in the module that gets pressed more than once
 * per visit. Four changes:
 *
 * 1. **The 44 floor, painted.** Not `hitSlop` around a 32 box — the target is
 *    the size it looks, because a shopper aiming at a `+` aims at the thing
 *    they can see. `'lg'` opts up to the 48 V4 control metric for a stepper
 *    standing beside fields.
 * 2. **Disabled without changing shape.** At `min` the `−` keeps its box, its
 *    border and its place, and only its content fades to M3's `0.38`
 *    ({@link V4_DISABLED_CLASS}). The base faded to `opacity-40` — a hand-picked
 *    number — but more importantly, a stepper whose buttons *resize* or
 *    *disappear* at the bounds makes the whole cart row jump on the frame the
 *    quantity reaches 1, which is exactly when the shopper is still pointing at
 *    it.
 * 3. **The internal rules are gone.** The base drew a hairline either side of
 *    the value, so a three-part control carried four vertical lines. §9 and the
 *    V4 data line both say the same thing: spacing does what a border was
 *    doing. The container keeps its one edge.
 * 4. **The state layer, not a grey.** `hover:bg-neutral-100` is the
 *    light-oriented ramp — under `[data-theme="dark"]` the emitted
 *    `--xen-neutral-100` is mirrored to the far end and the hover is a
 *    near-white slab on a dark control. `data-xen-v4-state` tints with the
 *    control's own ink at M3's opacities and follows the scheme for free.
 *
 * **The ground is `card`, not `surface`** (brief §1.4): a stepper sits on a
 * card or in a cart row, and painting the page colour is why the base control
 * disappeared into a dark page.
 *
 * Accessibility is unchanged and deliberate: real `<button>`s (so the control
 * is keyboard-native with no `tabIndex` of its own), a labelled `role="group"`,
 * and the value in a polite live region so a screen-reader user hears the new
 * quantity rather than having to go and find it.
 */
export const QuantityStepperV4 = React.forwardRef<HTMLDivElement, QuantityStepperV4Props>(
  function QuantityStepperV4(
    {
      value,
      min = 1,
      max = Number.POSITIVE_INFINITY,
      step = 1,
      onChange,
      disabled = false,
      label = 'Quantity',
      decrementLabel = 'Decrease quantity',
      incrementLabel = 'Increase quantity',
      size = 'md',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const atMin = value <= min;
    const atMax = value >= max;

    const emit = (next: number): void => {
      const clamped = clamp(next, min, max);
      if (clamped !== value) onChange?.(clamped);
    };

    // One class string for both buttons: the two halves of a stepper must be
    // indistinguishable apart from their glyph, and writing the box twice is
    // how they stop being.
    const button = cn(
      'inline-flex items-center justify-center bg-transparent text-on-card',
      BUTTON_SIZE[size],
      V4_DISABLED_CLASS,
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
    );

    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        data-xen-quantity-stepper=""
        data-xen-v4-stepper=""
        data-size={size}
        className={cn(
          'inline-flex items-center overflow-hidden rounded-[var(--xen-radius-md)]',
          'border border-input bg-card text-on-card',
          className
        )}
        {...rest}
      >
        <button
          type="button"
          aria-label={decrementLabel}
          data-xen-v4-state=""
          data-xen-quantity-decrement=""
          disabled={disabled || atMin}
          onClick={() => emit(value - step)}
          className={button}
        >
          {/* `remove` is the monochrome `−`, so it takes the tint; the emoji
              side of the icon set would ignore `color` outright. */}
          <IconV4 name="remove" size="base" color="onSurface" />
        </button>
        <TextV4
          data-xen-quantity-value=""
          size={size === 'lg' ? 'base' : 'sm'}
          weight="medium"
          tone="onCard"
          numeric="tabular"
          align="center"
          aria-live="polite"
          // `inline-block` because `TextV4` renders a span, and a min-width on
          // an inline box does nothing at all.
          className={cn('inline-block px-sm', VALUE_SIZE[size])}
        >
          {value}
        </TextV4>
        <button
          type="button"
          aria-label={incrementLabel}
          data-xen-v4-state=""
          data-xen-quantity-increment=""
          disabled={disabled || atMax}
          onClick={() => emit(value + step)}
          className={button}
        >
          <IconV4 name="add" size="base" color="onSurface" />
        </button>
      </div>
    );
  }
);
