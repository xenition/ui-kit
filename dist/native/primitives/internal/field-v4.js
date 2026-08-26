"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIELD_MOTION = exports.FIELD_HALO_ALPHA = void 0;
exports.fieldMetrics = fieldMetrics;
exports.fieldAccent = fieldAccent;
exports.haloStyle = haloStyle;
exports.fieldBorder = fieldBorder;
const color_1 = require("./color");
const motion_v4_1 = require("./motion-v4");
const v4_state_1 = require("../../../primitives/internal/v4-state");
/**
 * How solid the focus halo sits.
 *
 * M3's focus state layer, 0.12, from `_md-sys-state.scss` v0_192 — not the 18%
 * this file and the picker line each picked separately. It is a translucent
 * wash of a **semantic** colour, never of a ramp step: `ramps.primary[400]`
 * keeps the light-mode orientation in both schemes and would be a near-white
 * halo on a dark page.
 */
exports.FIELD_HALO_ALPHA = v4_state_1.V4_STATE.focus;
/**
 * How long a control takes to acknowledge a state change, in ms.
 *
 * `design.md` §36.2 puts small state transitions at 160–240ms and micro-feedback
 * at 100–180ms, and a checkbox filling or a switch throwing is the overlap of
 * the two — but a band is not a scale, and 160 was this file's guess inside it
 * while the picker line guessed 180 for the same idea. It is now M3's
 * `standard`, 200ms, from `_md-sys-motion.scss` v0_192.
 */
exports.FIELD_MOTION = motion_v4_1.V4_MOTION.standard;
/** Read the shared control metrics off the theme. */
function fieldMetrics(theme) {
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
function fieldAccent(theme, invalid) {
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
function haloStyle(theme, options) {
    const { ring, radius } = fieldMetrics(theme);
    const corner = options.radius ?? radius;
    return {
        padding: ring,
        margin: -ring,
        borderRadius: corner + ring,
        backgroundColor: options.showing ? (0, color_1.withAlpha)(options.accent, exports.FIELD_HALO_ALPHA) : 'transparent',
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
function fieldBorder(theme, options) {
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
//# sourceMappingURL=field-v4.js.map