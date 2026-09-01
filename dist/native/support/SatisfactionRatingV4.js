"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatisfactionRatingV4 = SatisfactionRatingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];
// V4 sizes run a touch larger for the calm, legible console read.
const SIZE_PX = { sm: 24, md: 34, lg: 48 };
/**
 * SatisfactionRating — **V4** "calm console" design. A big, legible CSAT read: a
 * large numeral (`value / total`) paired with a row of glyphs — filled =
 * **primary** (`warn` for the low-score caution), empty = muted, emphasis by
 * size + opacity + the numeric a11y label (never color alone). Interactive
 * glyphs are ≥44px `radio` targets; read-only renders a static image. Same
 * props/behavior as {@link SatisfactionRatingProps}; token-only colors via
 * `useXenitionTheme()`.
 */
function SatisfactionRatingV4({ value = 0, max = 5, variant = 'stars', size = 'md', onRate, readOnly = false, label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
    const current = (0, internal_1.clamp)(Math.round(value), 0, total);
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphPx = SIZE_PX[size] ?? SIZE_PX.md;
    const glyphFor = (index) => {
        if (variant === 'faces')
            return FACE_GLYPHS[index] ?? '🙂';
        if (variant === 'thumbs')
            return THUMB_GLYPHS[index] ?? '👍';
        return '★';
    };
    // A low CSAT (bottom half of the scale) leans on the warn slot as a calm
    // caution; otherwise filled reads as primary.
    const filledColor = current > 0 && current <= Math.ceil(total / 2) ? colors.warn : colors.primary;
    const caption = label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginBottom: tokens.spacing.xs }, children: label })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [caption, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: current > 0 ? colors.onSurface : colors.muted,
                                    fontSize: glyphPx,
                                    fontWeight: '700',
                                }, children: current }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [' ', "/ ", total] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: interactive ? 'radiogroup' : 'image', accessibilityLabel: interactive ? undefined : `${current} out of ${total}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: Array.from({ length: total }, (_, i) => {
                            const score = i + 1;
                            const selected = score === current || (variant === 'stars' && score <= current);
                            const cell = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    fontSize: glyphPx,
                                    lineHeight: glyphPx * 1.15,
                                    opacity: selected ? 1 : 0.35,
                                    color: variant === 'stars' ? (selected ? filledColor : colors.muted) : colors.onSurface,
                                }, children: glyphFor(i) }));
                            if (!interactive) {
                                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: 2 }, children: cell }, score));
                            }
                            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: score === current }, accessibilityLabel: `Rate ${score} of ${total}`, onPress: () => onRate?.(score), hitSlop: 12, style: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }, children: cell }, score));
                        }) })] })] }));
}
//# sourceMappingURL=SatisfactionRatingV4.js.map