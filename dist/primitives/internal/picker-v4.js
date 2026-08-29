"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLIDER_V4_CSS = exports.PICKER_V4_CSS = exports.PICKER_MOTION = exports.HOVER_FILL = exports.BRAND_WASH = exports.RANGE_FILL = exports.FIELD_CLASS = exports.TAP_TARGET_CLASS = exports.TAP_TARGET = exports.panelKind = exports.scrimCss = exports.SCRIM_ALPHA = exports.useDepth = void 0;
const glass_1 = require("../../theme/glass");
const surface_v4_1 = require("./surface-v4");
Object.defineProperty(exports, "useDepth", { enumerable: true, get: function () { return surface_v4_1.useDepth; } });
const v4_motion_1 = require("./v4-motion");
const field_v4_1 = require("./field-v4");
const v4_state_1 = require("./v4-state");
var surface_v4_2 = require("./surface-v4");
Object.defineProperty(exports, "SCRIM_ALPHA", { enumerable: true, get: function () { return surface_v4_2.SCRIM_ALPHA; } });
Object.defineProperty(exports, "scrimCss", { enumerable: true, get: function () { return surface_v4_2.scrimCss; } });
Object.defineProperty(exports, "panelKind", { enumerable: true, get: function () { return surface_v4_2.panelKind; } });
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
exports.TAP_TARGET = 'var(--xen-space-2xl)';
/** Tailwind arbitrary values for the tap-target floor, as a class fragment. */
exports.TAP_TARGET_CLASS = 'min-h-[var(--xen-space-2xl)] min-w-[var(--xen-space-2xl)]';
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
exports.FIELD_CLASS = [
    'flex w-full items-center gap-sm bg-surface text-on-surface',
    'min-h-[var(--xen-space-2xl)] px-md py-sm text-base',
    'border rounded-[var(--xen-radius-md)]',
].join(' ');
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
exports.RANGE_FILL = 'color-mix(in srgb, var(--xen-primary) 16%, var(--xen-surface))';
/**
 * The same value under the name that describes what it IS rather than the first
 * thing it was needed for: a wash of the brand across a surface, for a range
 * band, a live drop target, an icon well — anything that has to look
 * brand-touched without becoming a filled control. Applied through
 * `[data-xen-v4-wash]`.
 */
exports.BRAND_WASH = exports.RANGE_FILL;
/**
 * The fill for a day that is merely hovered, or an option row under the
 * pointer. Same compositing argument as {@link RANGE_FILL}, drawn from the ink
 * rather than the brand so the two are never confused with each other.
 */
exports.HOVER_FILL = 'color-mix(in srgb, var(--xen-on-surface) 7%, var(--xen-surface))';
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
exports.PICKER_MOTION = {
    /** A popover or suggestion list appearing under a field. M3 `standard`. */
    popover: v4_motion_1.V4_MOTION.standard,
    /** A swatch ring, a chip, a thumb's press halo. M3 `quick` — micro-feedback. */
    feedback: v4_motion_1.V4_MOTION.quick,
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
exports.PICKER_V4_CSS = `
@keyframes xen-v4-picker-in {
  from { opacity: 0; transform: translateY(calc(var(--xen-space-xs) * -1)); }
  to { opacity: 1; transform: none; }
}

[data-xen-v4-field] {
  border-color: var(--xen-border);
  transition: ${(0, v4_motion_1.transitionCss)(['border-color', 'box-shadow'], exports.PICKER_MOTION.feedback)};
}
[data-xen-v4-field="invalid"] { border-color: var(--xen-danger); }
[data-xen-v4-field]:focus,
[data-xen-v4-field]:focus-visible,
[data-xen-v4-field]:focus-within,
[data-xen-v4-field][data-open="true"] {
  outline: none;
  border-color: var(--xen-v4-ring-color, var(--xen-ring));
  box-shadow: 0 0 0 var(--xen-space-xs) color-mix(in srgb, var(--xen-v4-ring-color, var(--xen-ring)) ${field_v4_1.FIELD_HALO_PERCENT}%, transparent);
}

[data-xen-v4-pop] {
  background-color: var(--xen-surface);
  border: 1px solid var(--xen-border);
  border-radius: var(--xen-radius-lg);
  box-shadow: var(--xen-elevation-card);
  animation: xen-v4-picker-in ${exports.PICKER_MOTION.popover}ms ${v4_motion_1.EASE_ENTER};
}
[data-xen-v4-pop="sheet"] { box-shadow: var(--xen-elevation-sheet); }
[data-xen-v4-pop][data-glass="true"] {
  background-color: ${(0, glass_1.composeGlassCss)('regular')};
  border-color: var(--xen-glass-border);
  -webkit-backdrop-filter: blur(var(--xen-glass-blur));
  backdrop-filter: blur(var(--xen-glass-blur));
}

[data-xen-v4-hover]:hover:not(:disabled) { background-color: ${exports.HOVER_FILL}; }

/*
  The keyboard's active row in a listbox. It takes the same wash the pointer's
  hover does, so arrowing and hovering never disagree about which row is live.
  A rule rather than an inline style: a CSSOM that does not parse custom
  properties drops a color-mix() from a style attribute outright.
*/
[data-xen-v4-active="true"] { background-color: ${exports.HOVER_FILL}; }

/*
  A tap target that does not change the layout.

  Some controls in this line are genuinely small on purpose — a clear ✕ inside
  a field, a remove ✕ on a chip — and growing the glyph to 48px would grow the
  thing containing it. So the target is an invisible pseudo-element centred on
  the glyph: full ${exports.TAP_TARGET} in both axes, out of flow, costing nothing. It
  is the web's version of React Native's \`hitSlop\`.
*/
[data-xen-v4-hit] { position: relative; }
[data-xen-v4-hit]::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${exports.TAP_TARGET};
  height: ${exports.TAP_TARGET};
  transform: translate(-50%, -50%);
}

/*
  The band behind a date range. It lives here rather than on an inline style
  because a CSSOM that does not parse custom properties — jsdom, and any SSR
  extractor built on one — drops a \`color-mix()\` from a \`style\` attribute
  outright, leaving the span unpainted. Only the two edge offsets, which are
  plain lengths, are set inline.
*/
[data-xen-v4-band] { background-color: ${exports.RANGE_FILL}; }

/* A brand-touched ground — a live drop target, an icon well. */
[data-xen-v4-wash] { background-color: ${exports.BRAND_WASH}; }

@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-field] { transition: none; }
  [data-xen-v4-pop] { animation: none; }
}
`;
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
exports.SLIDER_V4_CSS = `
[data-xen-v4-slider] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  /* The grab strip is the tap-target floor even though the rail is thin. */
  height: var(--xen-space-2xl);
  background: transparent;
  cursor: pointer;
}
[data-xen-v4-slider]:disabled { cursor: default; opacity: ${v4_state_1.V4_STATE.disabledContent}; }

[data-xen-v4-slider]::-webkit-slider-runnable-track {
  height: var(--xen-space-sm);
  border-radius: var(--xen-radius-full);
  background: linear-gradient(
    to right,
    var(--xen-border) var(--xen-v4-slider-from, 0%),
    var(--xen-primary) var(--xen-v4-slider-from, 0%),
    var(--xen-primary) var(--xen-v4-slider-pct, 0%),
    var(--xen-border) var(--xen-v4-slider-pct, 0%)
  );
}
[data-xen-v4-slider]::-moz-range-track {
  height: var(--xen-space-sm);
  border-radius: var(--xen-radius-full);
  background: linear-gradient(
    to right,
    var(--xen-border) var(--xen-v4-slider-from, 0%),
    var(--xen-primary) var(--xen-v4-slider-from, 0%),
    var(--xen-primary) var(--xen-v4-slider-pct, 0%),
    var(--xen-border) var(--xen-v4-slider-pct, 0%)
  );
}

[data-xen-v4-slider]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--xen-space-lg);
  height: var(--xen-space-lg);
  border-radius: var(--xen-radius-full);
  background: var(--xen-primary);
  /* A surface-coloured collar, so the thumb reads on top of its own fill. */
  border: 2px solid var(--xen-surface);
  box-shadow: var(--xen-elevation-card);
  margin-top: calc((var(--xen-space-sm) - var(--xen-space-lg)) / 2);
}
[data-xen-v4-slider]::-moz-range-thumb {
  width: var(--xen-space-lg);
  height: var(--xen-space-lg);
  border-radius: var(--xen-radius-full);
  background: var(--xen-primary);
  border: 2px solid var(--xen-surface);
  box-shadow: var(--xen-elevation-card);
}

/*
  The two-thumb variant stacks two range inputs over one rail. Each input keeps
  its own thumb and its own keyboard handling — the accessible way to expose two
  values — but neither paints a track, and the element itself is transparent to
  the pointer so a click on the rail reaches the thumb nearest it rather than
  whichever input happens to be on top.
*/
[data-xen-v4-rail] {
  height: var(--xen-space-sm);
  border-radius: var(--xen-radius-full);
  background: linear-gradient(
    to right,
    var(--xen-border) var(--xen-v4-slider-from, 0%),
    var(--xen-primary) var(--xen-v4-slider-from, 0%),
    var(--xen-primary) var(--xen-v4-slider-pct, 0%),
    var(--xen-border) var(--xen-v4-slider-pct, 0%)
  );
}
[data-xen-v4-slider][data-overlay] {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
[data-xen-v4-slider][data-overlay]::-webkit-slider-runnable-track { background: transparent; }
[data-xen-v4-slider][data-overlay]::-moz-range-track { background: transparent; }
[data-xen-v4-slider][data-overlay]::-webkit-slider-thumb { pointer-events: auto; }
[data-xen-v4-slider][data-overlay]::-moz-range-thumb { pointer-events: auto; }

/* The same halo InputV4 arms on focus, so a slider rings like a field. */
[data-xen-v4-slider]:focus { outline: none; }
[data-xen-v4-slider]:focus-visible::-webkit-slider-thumb {
  box-shadow: var(--xen-elevation-card),
    0 0 0 var(--xen-space-xs) color-mix(in srgb, var(--xen-ring) ${field_v4_1.FIELD_HALO_PERCENT}%, transparent);
}
[data-xen-v4-slider]:focus-visible::-moz-range-thumb {
  box-shadow: var(--xen-elevation-card),
    0 0 0 var(--xen-space-xs) color-mix(in srgb, var(--xen-ring) ${field_v4_1.FIELD_HALO_PERCENT}%, transparent);
}
`;
//# sourceMappingURL=picker-v4.js.map