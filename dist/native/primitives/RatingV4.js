"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingV4 = RatingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SIZE_KEY = {
    sm: 'sm',
    md: 'base',
    lg: 'xl',
};
const STAR = '★';
/**
 * **V4 rating** — same props as {@link Rating}, a different design line.
 *
 * ## The row stops rounding the number away
 *
 * The base drew `Math.round(value)` filled stars. A 4.2 and a 4.4 render
 * identically, a 4.4 and a 4.6 render a whole star apart, and every product
 * that has ever shown "4.2 ★" beside the glyphs was showing two different
 * numbers at once. `design.md` §8 bans meaningless charts, and a five-cell bar
 * chart that rounds its input to the nearest cell is one.
 *
 * V4 clips a filled row over an empty one at the exact fraction, so 4.2 of 5 is
 * 84% of the row and the glyphs agree with the label. Nothing about the props
 * changed — this is the same number, drawn honestly.
 *
 * ## The filled star is text, so it takes a text colour
 *
 * `accent` is a FILL token: the compiler guarantees `onAccent` against it and
 * promises nothing about it against `surface`. A filled star is not a fill — it
 * is a glyph, and the base web twin measured at **1.43:1** in light mode, which
 * is a star you cannot see. `accentText` is the same hue walked until it clears
 * AA, and identical wherever `accent` already did. The native base had already
 * fixed this; its web twin had not, and now both agree.
 *
 * A rating is also, deliberately, the one place in this line that uses a BRAND
 * colour rather than a semantic one. §35.4 reserves success-green for success:
 * four stars out of five is not a healthy state, it is a measurement, and
 * painting it green would spend a meaning on something that does not have one.
 *
 * ## One label, no glyph soup
 *
 * The whole row is a single accessible `image` carrying `"{value} out of {max}
 * stars"`. A screen reader hearing "black star, black star, black star" has
 * been told nothing, and the exact value survives even though the visual is a
 * fraction.
 */
function RatingV4({ value, max = 5, size = 'md', showValue = false, label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(0, Math.floor(max));
    const fontSize = tokens.typography.scale[SIZE_KEY[size]];
    const ariaLabel = label ?? `${value} out of ${total} stars`;
    // The exact fraction of the row, not the nearest whole star.
    // Rounded to two decimals: 4.2/5 is 84%, not 84.00000000000001%, and a
    // width string is not the place to leak binary floating point.
    const pct = total > 0 ? Math.round(Math.max(0, Math.min(1, value / total)) * 10000) / 100 : 0;
    const row = (color) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: Array.from({ length: total }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color, fontSize, letterSpacing: 1, flexShrink: 0 }, children: STAR }, i))) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: ariaLabel, style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'relative' }, children: [row(colors.mutedText), (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-rating-fill", pointerEvents: "none", style: {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: `${pct}%`,
                            overflow: 'hidden',
                        }, children: row(colors.accentText) })] }), showValue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    fontFamily: tokens.typography.fontHeading,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                }, children: String(value) })) : null] }));
}
//# sourceMappingURL=RatingV4.js.map