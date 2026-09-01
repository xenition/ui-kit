import * as React from 'react';
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
export declare const QuantityStepperV4: React.ForwardRefExoticComponent<QuantityStepperV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuantityStepperV4.d.ts.map