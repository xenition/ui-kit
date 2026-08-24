"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatisfactionRating = SatisfactionRating;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Rating_1 = require("../primitives/Rating");
const internal_1 = require("./internal");
const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];
const SIZE_PX = { sm: 20, md: 28, lg: 40 };
/**
 * Customer-satisfaction (CSAT) rating input. In read-only mode it reuses the
 * `Rating` primitive for a token-colored star row; when `onRate` is supplied it
 * renders tappable glyphs (`stars` / emoji `faces` / `thumbs`) that each report
 * a 1-based score. The active glyph is emphasized by size/opacity plus text
 * (the numeric a11y label), not color alone. Colors come from tokens only.
 */
function SatisfactionRating({ value = 0, max = 5, variant = 'stars', size = 'md', onRate, readOnly = false, label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
    const current = (0, internal_1.clamp)(Math.round(value), 0, total);
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphPx = SIZE_PX[size] ?? SIZE_PX.md;
    const caption = label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginBottom: tokens.spacing.xs }, children: label })) : null;
    // Read-only star display delegates to the Rating primitive.
    if (!interactive && variant === 'stars') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [caption, (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: current, max: total, size: size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md', showValue: true })] }));
    }
    const glyphFor = (index) => {
        if (variant === 'faces')
            return FACE_GLYPHS[index] ?? '🙂';
        if (variant === 'thumbs')
            return THUMB_GLYPHS[index] ?? '👍';
        return '★';
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [caption, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: interactive ? 'radiogroup' : 'image', accessibilityLabel: interactive ? undefined : `${current} out of ${total}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: Array.from({ length: total }, (_, i) => {
                    const score = i + 1;
                    const selected = score === current || (variant === 'stars' && score <= current);
                    const glyph = glyphFor(i);
                    const cell = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontSize: glyphPx,
                            lineHeight: glyphPx * 1.15,
                            opacity: selected ? 1 : 0.35,
                            color: variant === 'stars' ? (selected ? colors.accent : colors.muted) : colors.onSurface,
                        }, children: glyph }));
                    if (!interactive) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: 2 }, children: cell }, score));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: score === current }, accessibilityLabel: `Rate ${score} of ${total}`, onPress: () => onRate?.(score), hitSlop: 6, style: { padding: 2 }, children: cell }, score));
                }) })] }));
}
//# sourceMappingURL=SatisfactionRating.js.map