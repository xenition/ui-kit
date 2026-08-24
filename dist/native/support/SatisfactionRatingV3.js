"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatisfactionRatingV3 = SatisfactionRatingV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Rating_1 = require("../primitives/Rating");
const internal_1 = require("./internal");
const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];
/**
 * SatisfactionRating — **V3 (compact inline)**. A tight inline control: for
 * read-only stars it delegates to the small `Rating` primitive; otherwise a
 * short row of small tappable stars / faces / thumbs with an optional inline
 * caption. Same `SatisfactionRatingProps` as {@link SatisfactionRating}. The
 * active glyph is carried by size/opacity + numeric a11y label, not color
 * alone; token colors only.
 */
function SatisfactionRatingV3({ value = 0, max = 5, variant = 'stars', onRate, readOnly = false, label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
    const current = (0, internal_1.clamp)(Math.round(value), 0, total);
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphPx = 18;
    const caption = label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginRight: tokens.spacing.xs }, children: label })) : null;
    if (!interactive && variant === 'stars') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center' }, style], children: [caption, (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: current, max: total, size: "sm", showValue: true })] }));
    }
    const glyphFor = (index) => {
        if (variant === 'faces')
            return FACE_GLYPHS[index] ?? '🙂';
        if (variant === 'thumbs')
            return THUMB_GLYPHS[index] ?? '👍';
        return '★';
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center' }, style], children: [caption, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: interactive ? 'radiogroup' : 'image', accessibilityLabel: interactive ? undefined : `${current} out of ${total}`, style: { flexDirection: 'row', alignItems: 'center', gap: 2 }, children: Array.from({ length: total }, (_, i) => {
                    const score = i + 1;
                    const selected = score === current || (variant === 'stars' && score <= current);
                    const cell = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontSize: glyphPx,
                            lineHeight: glyphPx * 1.15,
                            opacity: selected ? 1 : 0.35,
                            color: variant === 'stars' ? (selected ? colors.accentText : colors.muted) : colors.onSurface,
                        }, children: glyphFor(i) }));
                    if (!interactive) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: 1 }, children: cell }, score));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: score === current }, accessibilityLabel: `Rate ${score} of ${total}`, onPress: () => onRate?.(score), hitSlop: 6, style: { padding: 1 }, children: cell }, score));
                }) })] }));
}
//# sourceMappingURL=SatisfactionRatingV3.js.map