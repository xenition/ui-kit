/**
 * Depth and metric plumbing shared by the **V4 picker line** — `CalendarV4`,
 * `DatePickerV4`, `DateRangePickerV4`, `TimePickerV4`, `ColorPickerV4`,
 * `SliderV4`, `RangeSliderV4`, `SearchInputV4`, `AutoCompleteV4`,
 * `ComboboxV4`, `TagInputV4`, `UploadV4`.
 *
 * Pickers are the controls users most often find fiddly, and the fiddliness is
 * almost never about the picking — it is about the target being too small, the
 * selection being ambiguous, or the field looking nothing like the fields
 * beside it. So this file owns exactly three things, and every V4 picker reads
 * them rather than deciding for itself:
 *
 * 1. **The field.** {@link fieldSkin} and {@link ringWrap} reproduce
 *    `InputV4`'s treatment — the same minimum height, the same radius, the
 *    same reserved focus halo — so a `DatePickerV4` sitting between two
 *    `InputV4`s in a form is visibly the same species of control (§16: forms
 *    should be minimal; a form of four different field shapes is not).
 * 2. **The target.** {@link TAP_TARGET} is one number, taken off the spacing
 *    scale, and it is the floor for every day cell, swatch, thumb and chevron
 *    in the line. Calendar day cells are the classic offender here, and they
 *    are the reason this is a shared constant instead of a per-file guess.
 * 3. **The float.** {@link popoverSkin} and {@link scrimColor} say what it
 *    means for a picker's surface to be above the page. Elevation is consumed
 *    unconditionally — the compiler has already zeroed it for a flat seed, so
 *    no caller branches on depth for it — and glass is the one treatment that
 *    has to be asked for, because `flatten()` never neutralises it.
 *
 * Everything reads `useXenitionTheme()`, which resolves `gradient`, `glass` and
 * `elevation` for the ACTIVE scheme. `tokens.ramps` does not: it carries the
 * light orientation in both schemes, which is why nothing here tints with
 * `ramps.primary[50]` and why {@link rangeFill} exists.
 */

import type { ViewStyle } from 'react-native';
import { mixToken } from '../../../primitives/internal/v4-depth';
import { composeGlass } from '../../../theme/glass';
import type { XenitionNativeTheme } from '../../theme';
import { withAlpha } from './color';
import { elevationStyle, scrimColor, SCRIM_ALPHA } from './surface-v4';
import { V4_MOTION } from './motion-v4';
import { V4_STATE } from '../../../primitives/internal/v4-state';

export { elevationStyle, scrimColor, SCRIM_ALPHA };

/**
 * The minimum interactive size for anything in the picker line, in px.
 *
 * 48 rather than a hand-typed 44: it is `spacing['2xl']`, so it is a scale
 * value rather than a picked one, and it clears the 44pt floor both platform
 * guidelines set with room to spare. A calendar day cell is the classic
 * offender — the base `Calendar` sizes its day pill at `xl + xs` (36px) — and
 * a 36px target inside a 7-column grid is exactly the "fiddly" this line is
 * meant to remove.
 *
 * It is a function of the theme rather than a bare constant so a future seed
 * that scales its spacing scales the targets with it.
 */
export function tapTarget(theme: XenitionNativeTheme): number {
  return theme.tokens.spacing['2xl'];
}

/** Alias for the common `tapTarget()` value, for docs that want to name it. */
export const TAP_TARGET_KEY = '2xl' as const;

/** The reserved focus-halo thickness — the same one `InputV4` reserves. */
export function ringSize(theme: XenitionNativeTheme): number {
  return theme.tokens.spacing.xs;
}

/**
 * How strongly the focus halo tints.
 *
 * M3's focus state layer, 0.12 — the same value `field-v4` now uses, which is
 * the point: the two files each carried their own `0.18` and were "the same"
 * only by coincidence.
 */
export const RING_ALPHA = V4_STATE.focus;

export interface FieldState {
  /** The field currently has focus (or its popover is open). */
  focused?: boolean;
  /** The field is in the danger state. */
  invalid?: boolean;
  /** The field cannot be operated. */
  disabled?: boolean;
}

/**
 * The accent a field's border and halo take: `danger` when invalid, else the
 * one focus `ring`.
 *
 * See `field-v4.fieldAccent` for why this is `ring` and not `primary`.
 */
export function fieldAccent(theme: XenitionNativeTheme, state: FieldState): string {
  return state.invalid ? theme.colors.danger : theme.colors.ring;
}

/**
 * `InputV4`'s field treatment, as a style object.
 *
 * A minimum height off `spacing['2xl']` (which is also {@link tapTarget}, so a
 * field is never smaller than the smallest thing you are allowed to tap) and
 * the `md` radius instead of the base pickers' `sm`. Both come off the scales,
 * so a `sharp` seed still gets square corners and nothing is picked here.
 *
 * The border follows focus as well as validity, so the field reads as focused
 * at a glance — but the halo in {@link ringWrap} is what actually says
 * "responding", and it is the halo, not the border, that does the work.
 */
export function fieldSkin(theme: XenitionNativeTheme, state: FieldState = {}): ViewStyle {
  const { colors, tokens } = theme;
  return {
    width: '100%',
    minHeight: tapTarget(theme),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: state.invalid
      ? colors.danger
      : state.focused
        ? colors.ring
        : colors.border,
    borderRadius: tokens.radius.md,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    opacity: state.disabled ? theme.state.disabledContent : 1,
  };
}

/**
 * The wrapper that paints the focus halo AROUND a field.
 *
 * The halo's space is reserved whether or not it is showing, so focusing a
 * field never nudges the layout (§36.11 — do not move controls out from under
 * the finger). The negative margin lets the halo bleed outward, keeping the
 * field's own edge flush with whatever sits above it.
 *
 * The colour is `colors.ring` / `colors.danger`, both of which the provider
 * has resolved for the active scheme; `ramps.primary[400]` would be a
 * near-white halo on a dark page, because the ramps keep the light orientation
 * in both schemes.
 */
export function ringWrap(theme: XenitionNativeTheme, state: FieldState = {}): ViewStyle {
  const ring = ringSize(theme);
  return {
    padding: ring,
    margin: -ring,
    borderRadius: theme.tokens.radius.md + ring,
    backgroundColor: state.focused
      ? withAlpha(fieldAccent(theme, state), RING_ALPHA)
      : 'transparent',
  };
}

/**
 * The skin of a picker's floating surface — the popover under a trigger, or
 * the panel inside a modal.
 *
 * `level` picks which elevation the surface claims: `'card'` for a popover
 * that sits just off the field it belongs to, `'sheet'` for a panel that has
 * covered the page. Both are consumed unconditionally, because `flatten()` has
 * already zeroed them under `depth: 'flat'`.
 *
 * Glass is the one treatment that has to be asked for. `flatten()` neutralises
 * gradients and elevation and stops there — `glass.tint` is live even at
 * `depth: 'flat'` — so a component that consumed it unconditionally would put
 * frosted panels in an app that asked for a flat utility, which is the
 * "glassmorphism without purpose" §8 bans.
 *
 * The hairline is kept on BOTH treatments here, unlike the V4 sheets. A
 * popover is small and often lands over content of a similar tone; its shadow
 * alone does not always separate it, and a panel whose edge you cannot find is
 * a panel you do not trust.
 */
export function popoverSkin(
  theme: XenitionNativeTheme,
  level: 'card' | 'sheet' = 'card'
): ViewStyle {
  const glassy = theme.depth === 'glass';
  const skin = glassy
    ? composeGlass(theme.glass, theme.colors.surface, 'regular')
    : { backgroundColor: theme.colors.surface, borderColor: theme.colors.border };

  return {
    ...elevationStyle(theme.elevation[level]),
    backgroundColor: skin.backgroundColor,
    borderWidth: 1,
    borderColor: skin.borderColor,
    borderRadius: theme.tokens.radius.lg,
  };
}

/**
 * The fill for the days BETWEEN a range's two ends.
 *
 * Not `ramps.primary[50]`, and not a translucent primary. The ramps carry the
 * light orientation in both schemes, so step 50 is a near-white band on a dark
 * page — the range would read as a hole punched through the calendar. A
 * translucent primary is scheme-correct but composites against whatever ground
 * it lands on, and a range band lands on the panel, on glass, and (in a modal)
 * on a scrimmed page.
 *
 * So the tint is composited ONCE, here, against the panel's own surface: the
 * result is an opaque colour that is a little more brand than the panel in
 * light mode and a little more brand than the panel in dark mode, which is the
 * behaviour a reader expects in both.
 */
export function rangeFill(theme: XenitionNativeTheme): string {
  return brandWash(theme);
}

/**
 * A soft brand tint over the surface, composited to an opaque colour.
 *
 * The same value {@link rangeFill} uses, under the name that describes what it
 * IS rather than the first thing it was needed for: a wash of the brand across
 * a surface, for a range band, a drop target, or anything else that has to look
 * brand-touched without becoming a filled control.
 *
 * Opaque, and never a ramp step — see {@link rangeFill} for why both of those
 * matter.
 */
export function brandWash(theme: XenitionNativeTheme): string {
  return mixToken(theme.colors.surface, theme.colors.primary, 0.16);
}

/**
 * The fill for a day cell under a finger, or an option row being pressed.
 *
 * Same compositing argument as {@link rangeFill} — opaque, so the label's
 * contrast promise holds — but the opacity is no longer this file's to pick.
 * It was `0.07` here and `0.08` in the web row line, for no reason other than
 * that two files guessed separately; it is now M3's pressed state layer,
 * `0.12`, from `_md-sys-state.scss` v0_192. See `internal/state-v4`.
 */
export { pressFill, pressLayer, stateLayer } from './state-v4';

/**
 * Motion durations for the picker line, in the bands §36.2 sets: small state
 * transitions 160–240ms, micro-feedback 100–180ms.
 *
 * There is deliberately no entry here for a slider thumb. §36.4 is explicit
 * that direct manipulation tracks the finger, and a thumb that animates to its
 * resting place after the gesture is the disconnected canned animation that
 * section is about. The thumb's position is derived from `value` every render
 * and never interpolated.
 */
export const PICKER_MOTION = {
  /** A popover or suggestion list appearing under a field. M3 `standard`. */
  popover: V4_MOTION.standard,
  /** A swatch ring, a chip, a thumb's press halo. M3 `quick` — micro-feedback. */
  feedback: V4_MOTION.quick,
} as const;

/**
 * A `hitSlop` that grows a small glyph up to {@link tapTarget} without growing
 * the thing that contains it.
 *
 * Some controls in this line are genuinely small on purpose — a clear ✕ inside
 * a field, a remove ✕ on a chip — and sizing the glyph itself to 48px would
 * make the field or the chip 48px taller than it should be. `hitSlop` is the
 * platform's answer: the touch area extends past the view without affecting
 * layout at all.
 *
 * `glyph` is the drawn size; the returned inset is whatever it takes to reach
 * the floor, never negative.
 */
export function hitSlopTo(theme: XenitionNativeTheme, glyph: number): number {
  return Math.max(0, Math.round((tapTarget(theme) - glyph) / 2));
}
