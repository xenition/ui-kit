"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatisfactionRatingV2 = SatisfactionRatingV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Rating_1 = require("../primitives/Rating");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];
const SCORE_WORDS = ['Very bad', 'Bad', 'Okay', 'Good', 'Great'];
const CARD_GLYPH_PX = { sm: 32, md: 44, lg: 56 };
/**
 * SatisfactionRating — **V2 (big selector card)**. A raised CSAT card: an
 * optional caption, a large row of tappable stars / emoji faces / thumbs, and a
 * live word readout of the current score. Same `SatisfactionRatingProps` as
 * {@link SatisfactionRating}. The active glyph is emphasized by size + opacity
 * and its numeric a11y label (not color alone); token colors only.
 */
function SatisfactionRatingV2({ value = 0, max = 5, variant = 'faces', size = 'lg', onRate, readOnly = false, label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
    const current = (0, internal_1.clamp)(Math.round(value), 0, total);
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphPx = CARD_GLYPH_PX[size] ?? CARD_GLYPH_PX.lg;
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const glyphFor = (index) => {
        if (variant === 'faces')
            return FACE_GLYPHS[index] ?? '🙂';
        if (variant === 'thumbs')
            return THUMB_GLYPHS[index] ?? '👍';
        return '★';
    };
    const readout = current > 0
        ? variant === 'thumbs'
            ? current === 2
                ? 'Positive'
                : 'Negative'
            : (SCORE_WORDS[Math.min(SCORE_WORDS.length - 1, Math.round(((current - 1) / Math.max(1, total - 1)) * (SCORE_WORDS.length - 1)))] ?? `${current} of ${total}`)
        : 'Not yet rated';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            { opacity: enter.opacity, transform: enter.transform },
            (0, appearance_1.appearanceStyle)('elevated', colors, tokens),
            { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, alignItems: 'center' },
            style,
        ], children: [label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '700',
                    marginBottom: tokens.spacing.md,
                    textAlign: 'center',
                }, children: label })) : null, !interactive && variant === 'stars' ? ((0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: current, max: total, size: "lg", showValue: true })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: interactive ? 'radiogroup' : 'image', accessibilityLabel: interactive ? undefined : `${current} out of ${total}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: Array.from({ length: total }, (_, i) => {
                    const score = i + 1;
                    const selected = score === current || (variant === 'stars' && score <= current);
                    const cell = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            fontSize: glyphPx,
                            lineHeight: glyphPx * 1.15,
                            opacity: selected ? 1 : 0.3,
                            color: variant === 'stars' ? (selected ? colors.accentText : colors.muted) : colors.onSurface,
                        }, children: glyphFor(i) }));
                    if (!interactive) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: 2 }, children: cell }, score));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: score === current }, accessibilityLabel: `Rate ${score} of ${total}`, onPress: () => onRate?.(score), onPressIn: press.onPressIn, onPressOut: press.onPressOut, hitSlop: 8, style: { padding: 4, borderRadius: tokens.radius.full, backgroundColor: score === current ? (0, internal_1.withAlpha)(colors.primary, 0.1) : 'transparent' }, children: cell }, score));
                }) })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: current > 0 ? colors.onSurface : colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    marginTop: tokens.spacing.md,
                }, children: readout })] }));
}
//# sourceMappingURL=SatisfactionRatingV2.js.map