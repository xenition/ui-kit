/**
 * Depth and metric plumbing shared by the **V4 picker line** on the web —
 * `CalendarV4`, `DatePickerV4`, `DateRangePickerV4`, `TimePickerV4`,
 * `ColorPickerV4`, `SliderV4`, `RangeSliderV4`, `SearchInputV4`,
 * `AutoCompleteV4`, `ComboboxV4`, `TagInputV4`, `UploadV4`.
 *
 * Pickers are the controls users most often find fiddly, and the fiddliness is
 * almost never about the picking — it is about the target being too small, the
 * selection being ambiguous, or the field looking nothing like the fields
 * beside it. So this file owns exactly three things, and every V4 picker reads
 * them rather than deciding for itself:
 *
 * 1. **The field.** {@link FIELD_CLASS} reproduces `InputV4`'s treatment — the
 *    same minimum height, the same radius, the same focus halo drawn with
 *    `box-shadow` so it costs no layout — and a `DatePickerV4` sitting between
 *    two `InputV4`s in a form is visibly the same species of control (§16:
 *    forms should be minimal; a form of four different field shapes is not).
 * 2. **The target.** {@link TAP_TARGET} is one custom-property reference,
 *    resolving to the spacing scale's `2xl`, and it is the floor for every day
 *    cell, swatch, thumb and chevron in the line. Calendar day cells are the
 *    classic offender, and they are why this is a shared constant rather than
 *    a per-file guess.
 * 3. **The float.** {@link PICKER_V4_CSS} says what it means for a picker's
 *    surface to be above the page. Elevation is consumed unconditionally — the
 *    compiler has already zeroed it for a flat seed — and glass is the one
 *    treatment that has to be asked for, because `flatten()` never neutralises
 *    it.
 *
 * ## Why this is a stylesheet and not inline styles
 *
 * Almost every value here is a `var()` or a `color-mix()`. A CSSOM that does
 * not parse custom properties — jsdom, and any SSR style extractor built on
 * one — drops such a value from an inline `style` outright, silently leaving
 * the control unstyled. In a stylesheet the declaration is never parsed by that
 * layer at all: it is a string handed to the browser. `GlassPanel` and the V4
 * surfaces already work this way; the pickers follow them.
 */
import { useDepth } from './surface-v4';
export { useDepth };
export { SCRIM_ALPHA, scrimCss, panelKind } from './surface-v4';
/**
 * The minimum interactive size for anything in the picker line.
 *
 * `--xen-space-2xl` (48px on the stock scale) rather than a hand-typed 44px:
 * it is a scale value rather than a picked one, and it clears the 44px floor
 * both platform guidelines set with room to spare. A calendar day cell is the
 * classic offender — the base `Calendar` sizes its day pill at `h-8` (32px) —
 * and a 32px target inside a 7-column grid is exactly the "fiddly" this line
 * is meant to remove.
 */
export declare const TAP_TARGET = "var(--xen-space-2xl)";
/** Tailwind arbitrary values for the tap-target floor, as a class fragment. */
export declare const TAP_TARGET_CLASS = "min-h-[var(--xen-space-2xl)] min-w-[var(--xen-space-2xl)]";
/**
 * `InputV4`'s field treatment, as a class string.
 *
 * A minimum height off `--xen-space-2xl` (which is also {@link TAP_TARGET}, so
 * a field is never smaller than the smallest thing you are allowed to tap) and
 * the `md` radius instead of the base pickers' `sm`. Both come off the scales,
 * so a `sharp` seed still gets square corners and nothing is picked here.
 *
 * The border colour and the focus ring live in {@link PICKER_V4_CSS}, keyed off
 * `data-xen-v4-field`, because the ring is a translucent mix of a token that
 * changes with the field's validity and a utility class cannot express that.
 */
export declare const FIELD_CLASS: string;
/**
 * The fill for the days BETWEEN a range's two ends.
 *
 * Not `bg-primary-50`, which is what the base `Upload` reaches for. The ramps
 * carry the light orientation in both schemes, so step 50 is a near-white band
 * on a dark page — the range would read as a hole punched through the
 * calendar. `color-mix` against `--xen-surface` composites the tint against the
 * panel's own ground instead, so it is a little more brand than the panel in
 * light mode and a little more brand than the panel in dark mode, which is the
 * behaviour a reader expects in both.
 */
export declare const RANGE_FILL = "color-mix(in srgb, var(--xen-primary) 16%, var(--xen-surface))";
/**
 * The same value under the name that describes what it IS rather than the first
 * thing it was needed for: a wash of the brand across a surface, for a range
 * band, a live drop target, an icon well — anything that has to look
 * brand-touched without becoming a filled control. Applied through
 * `[data-xen-v4-wash]`.
 */
export declare const BRAND_WASH = "color-mix(in srgb, var(--xen-primary) 16%, var(--xen-surface))";
/**
 * The fill for a day that is merely hovered, or an option row under the
 * pointer. Same compositing argument as {@link RANGE_FILL}, drawn from the ink
 * rather than the brand so the two are never confused with each other.
 */
export declare const HOVER_FILL = "color-mix(in srgb, var(--xen-on-surface) 7%, var(--xen-surface))";
/**
 * Motion durations for the picker line, in the bands §36.2 sets: small state
 * transitions 160–240ms, micro-feedback 100–180ms.
 *
 * There is deliberately no entry here for a slider thumb. §36.4 is explicit
 * that direct manipulation tracks the finger, and a thumb that animates to its
 * resting place after the gesture is the disconnected canned animation that
 * section is about. The thumb's position is derived from `value` every render
 * and never transitioned.
 */
export declare const PICKER_MOTION: {
    /** A popover or suggestion list appearing under a field. M3 `standard`. */
    readonly popover: number;
    /** A swatch ring, a chip, a thumb's press halo. M3 `quick` — micro-feedback. */
    readonly feedback: number;
};
/**
 * Everything the V4 pickers paint that a utility class cannot say.
 *
 * The focus ring is the same recipe `InputV4` uses — a `box-shadow` halo mixed
 * from `--xen-v4-ring-color`, which each field points at `--xen-ring` or
 * `--xen-danger` — so a picker focused beside an input rings identically.
 *
 * §36.10: under `prefers-reduced-motion` the transitions and the popover's
 * entrance are dropped to nothing rather than shortened. A popover is small
 * and anchored; unlike a full-screen overlay it does not read as a glitch when
 * it is simply there.
 */
export declare const PICKER_V4_CSS: string;
/**
 * The V4 slider skin, shared by `SliderV4` and `RangeSliderV4`.
 *
 * ## Why it is still `<input type="range">`
 *
 * §36.4 requires that direct manipulation track the pointer continuously, and
 * the browser's own range input does exactly that — plus arrow keys, Home/End,
 * and the platform's drag semantics — for free. Reimplementing it on a `div`
 * with pointer events would mean re-earning all of that and getting the touch
 * behaviour subtly wrong. So the element stays, and only its skin changes:
 * `appearance: none` on the track and thumb, then both redrawn from tokens.
 *
 * There is **no transition on the thumb**, on purpose. A transition is exactly
 * the "disconnected canned animation" §36.4 rules out: the thumb would lag the
 * finger by however long the easing ran. The fill follows the same rule, since
 * it is painted by the track and the track is where the value is.
 *
 * ## The fill
 *
 * A two-stop gradient with both stops at the same position is a hard edge, so
 * the filled portion is drawn by the track itself rather than by a second
 * element. Each field sets `--xen-v4-slider-pct` (and, for the two-thumb
 * variant, `--xen-v4-slider-from`) inline as a plain percentage — a custom
 * property, which every CSSOM keeps, unlike a `color-mix()` on a standard
 * property.
 */
export declare const SLIDER_V4_CSS: string;
//# sourceMappingURL=picker-v4.d.ts.map