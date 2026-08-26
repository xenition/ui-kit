/**
 * The metrics and the focus ring shared by the **V4 form-control line** —
 * `CheckboxV4`, `RadioGroupV4`, `SwitchV4`, `SelectV4`, `MultiSelectV4`,
 * `NumberInputV4`, `CurrencyInputV4`, `PasswordInputV4`, `PhoneInputV4`,
 * `PinInputV4` and `TextareaV4`.
 *
 * These are the controls a user touches most, and the single biggest quality
 * signal a form can send is that every control in it agrees. So the numbers
 * that decide whether two controls look like the same family — height, radius,
 * horizontal padding, the width of the focus ring — are decided **once**, here,
 * rather than eleven times.
 *
 * Every value is read off `useXenitionTheme()`; nothing in this file is picked.
 * The height and radius deliberately match the already-shipped `InputV4` so a
 * text field, a select and a currency field stacked in one form share an edge.
 *
 * Depth is absent on purpose. `design.md` §35.11 asks that gradients stay rare,
 * §8 lists glassmorphism-without-purpose among the tells of generic AI UI, and
 * §16 asks that forms stay minimal — a control the user is trying to type into
 * is the last place to spend a shadow. The one exception is a control whose
 * affordance genuinely is a physical object above a surface (a switch knob) or
 * genuinely is a layer above the page (a select's option sheet); those consume
 * `elevation` unconditionally, which means a `depth: 'flat'` seed flattens them
 * for free with no branch at the call site.
 */

import type { ViewStyle } from 'react-native';
import type { XenitionNativeTheme } from '../../theme';
import { withAlpha } from './color';
import { V4_MOTION } from './motion-v4';
import { V4_STATE } from '../../../primitives/internal/v4-state';

/**
 * How solid the focus halo sits.
 *
 * M3's focus state layer, 0.12, from `_md-sys-state.scss` v0_192 — not the 18%
 * this file and the picker line each picked separately. It is a translucent
 * wash of a **semantic** colour, never of a ramp step: `ramps.primary[400]`
 * keeps the light-mode orientation in both schemes and would be a near-white
 * halo on a dark page.
 */
export const FIELD_HALO_ALPHA = V4_STATE.focus;

/**
 * How long a control takes to acknowledge a state change, in ms.
 *
 * `design.md` §36.2 puts small state transitions at 160–240ms and micro-feedback
 * at 100–180ms, and a checkbox filling or a switch throwing is the overlap of
 * the two — but a band is not a scale, and 160 was this file's guess inside it
 * while the picker line guessed 180 for the same idea. It is now M3's
 * `standard`, 200ms, from `_md-sys-motion.scss` v0_192.
 */
export const FIELD_MOTION = V4_MOTION.standard;

/** The numbers every V4 form control shares. */
export interface FieldV4Metrics {
  /**
   * Control height. `2xl` off the spacing scale — the same height `InputV4`
   * takes, comfortably past the 44pt touch target, and roomy enough that the
   * value inside is not wedged against the border.
   */
  height: number;
  /** Corner radius — `md`, again matching `InputV4`. A `sharp` seed stays square. */
  radius: number;
  /**
   * Focus-ring width. Its space is reserved whether or not the ring is
   * showing, so focusing a control never nudges the layout (§36.11 — do not
   * move a control out from under the finger).
   */
  ring: number;
  /** Horizontal padding inside the control. */
  padX: number;
  /** Vertical rhythm between a label, its control and its message. */
  gap: number;
  /** Gap between a control's own parts (a badge and its input, a chip and the next). */
  inner: number;
}

/** Read the shared control metrics off the theme. */
export function fieldMetrics(theme: XenitionNativeTheme): FieldV4Metrics {
  const { spacing, radius } = theme.tokens;
  return {
    height: spacing['2xl'],
    radius: radius.md,
    ring: spacing.xs,
    padX: spacing.md,
    gap: spacing.sm,
    inner: spacing.sm,
  };
}

/**
 * The colour a control's border and focus halo answer in.
 *
 * `danger` when the field is invalid, `ring` otherwise — both scheme-resolved
 * by the provider. One function so a control can never paint a brand ring
 * around a field it has already outlined in red.
 *
 * `ring` and not `primary`: a focus indicator is an accessibility affordance,
 * and it should look identical on every control a keyboard or a screen reader
 * can reach. `colors.ring` is the compiler's one answer to that — `primary`
 * pulled until it clears 3:1 against `surface`, which is the non-text minimum
 * an indicator has to meet and which the raw fill slot promises nothing about.
 * shadcn/ui carries `--ring` as a first-class token for the same reason.
 */
export function fieldAccent(theme: XenitionNativeTheme, invalid: boolean): string {
  return invalid ? theme.colors.danger : theme.colors.ring;
}

/**
 * The reserved-space wrapper that paints the halo.
 *
 * The negative margin lets the halo bleed outward, so the control's own edge
 * stays flush with the label above it and a row of fields still lines up.
 * `showing` is the only thing that changes between states — the box it
 * occupies is identical either way.
 */
export function haloStyle(
  theme: XenitionNativeTheme,
  options: { showing: boolean; accent: string; radius?: number }
): ViewStyle {
  const { ring, radius } = fieldMetrics(theme);
  const corner = options.radius ?? radius;
  return {
    padding: ring,
    margin: -ring,
    borderRadius: corner + ring,
    backgroundColor: options.showing ? withAlpha(options.accent, FIELD_HALO_ALPHA) : 'transparent',
  };
}

/**
 * The border a control wears: `danger` when invalid, the accent while it has
 * focus, the hairline the rest of the time.
 *
 * The width never changes with state. A border that thickens on error would
 * reflow the control's contents by a pixel, which is exactly the jitter the
 * reserved ring exists to avoid.
 */
export function fieldBorder(
  theme: XenitionNativeTheme,
  options: { invalid: boolean; focused: boolean }
): { borderWidth: number; borderColor: string } {
  const { colors } = theme;
  return {
    borderWidth: 1,
    borderColor: options.invalid
      ? colors.danger
      : options.focused
        ? colors.ring
        : colors.border,
  };
}
