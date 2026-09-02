"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPillV4 = StatusPillV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 status pill** — same props as {@link StatusPill} plus
 * `accessibilityLabel`, `decorative` and `testID`.
 *
 * ## Four changes
 *
 * 1. **The two halves of the pill grow together.** The base pinned the glyph
 *    with `allowFontScaling={false}` and left the word to scale, so a user on
 *    200% Dynamic Type got a 12pt "✓" beside a 24pt "Approved" — the tick
 *    stranded at the bottom of a line twice its height, on every status in the
 *    module. Neither half is pinned now: type that is information scales, and
 *    it scales at the same rate on both sides of the gap.
 * 2. **The word is inked with ink.** `toneColor()` returns `colors[tone]` — the
 *    **fill** slot — and the base assigned it straight to `color:`. A rendered
 *    audit measured `primary` as text at 1.32:1. Soft and inline pills now take
 *    the contrast-corrected `*Text` slots via `toneInk()`, and only a `solid`
 *    pill (which really is drawing on its tone) uses the fill, with the
 *    compiler's own paired ink on top via `onPair()` rather than the base's
 *    hand-written five-branch ladder.
 * 3. **The soft ground is opaque.** `withAlpha(tint, 0.14)` is a translucent
 *    wash, so the identical pill was a different colour on a card, on a tinted
 *    open-shift row and over the page — and the label's contrast against it was
 *    whatever happened to be behind. It is composited against `card` once.
 * 4. **The pill is one announced object, or none.** The base put an
 *    `accessibilityLabel` on a plain `View` with no `accessible`, which
 *    announces nothing and leaves the glyph and the word as two loose text
 *    nodes; a reader heard "check mark" and then "Approved".
 */
function StatusPillV4({ meta, variant = 'soft', size = 'md', accessibilityLabel, decorative = false, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const solid = variant === 'solid';
    const inline = variant === 'inline';
    const textSize = size === 'sm' ? 'xs' : 'sm';
    const ground = solid
        ? (0, tone_v4_1.toneFill)(theme, meta.tone)
        : inline
            ? 'transparent'
            : (0, tone_v4_1.pillGround)(theme, meta.tone);
    // Ink with ink: `onPair` on a fill, the `*Text` slot everywhere else.
    const ink = solid ? (0, tone_v4_1.onPair)(theme, meta.tone) : (0, tone_v4_1.toneInk)(theme, meta.tone);
    const reader = decorative
        ? {
            accessibilityElementsHidden: true,
            importantForAccessibility: 'no-hide-descendants',
        }
        : {
            accessible: true,
            accessibilityRole: 'text',
            accessibilityLabel: accessibilityLabel ?? meta.label,
        };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { ...reader, testID: testID, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: tokens.spacing.xs / 2,
                backgroundColor: ground,
                borderRadius: tokens.radius.full,
                paddingVertical: inline ? 0 : tokens.spacing.xs / 2,
                paddingHorizontal: inline ? 0 : tokens.spacing.xs,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: textSize, style: { color: ink }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: textSize, weight: "semibold", style: { color: ink }, children: meta.label })] }));
}
//# sourceMappingURL=StatusPillV4.js.map