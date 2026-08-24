"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = Rating;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SIZE_KEY = {
    sm: 'sm',
    md: 'base',
    lg: 'xl',
};
const STAR = '★'; // ★
/**
 * A ★ rating row — the native mirror of the web `Rating`. Draws `max` glyphs:
 * filled (the `accent` token) up to the rounded `value`, empty (the `muted`
 * token) after. The whole row is one accessible `image` with an aria-label
 * (`"{value} out of {max} stars"` or a custom `label`); optional trailing
 * numeric value. Token-only — no literal colors.
 */
function Rating({ value, max = 5, size = 'md', showValue = false, label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(0, Math.floor(max));
    const filled = Math.max(0, Math.min(total, Math.round(value)));
    const fontSize = tokens.typography.scale[SIZE_KEY[size]];
    const ariaLabel = label ?? `${value} out of ${total} stars`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: ariaLabel, style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: Array.from({ length: total }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        /*
                          `accentText`, not `accent`. A filled star IS the text here — it is
                          a glyph, not a fill — and `accent` is a background colour with no
                          contrast guarantee against `surface`. Measured at 1.43:1 in light,
                          which is a star you cannot see. `accentText` is the same hue pushed
                          until it clears AA, and is identical wherever `accent` already did.
                        */
                        color: i < filled ? colors.accentText : colors.muted,
                        fontSize,
                        letterSpacing: 1,
                    }, children: STAR }, i))) }), showValue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                }, children: String(value) })) : null] }));
}
//# sourceMappingURL=Rating.js.map