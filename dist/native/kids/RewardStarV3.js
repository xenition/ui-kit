"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardStarV3 = RewardStarV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SIZE_KEY = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
};
/**
 * RewardStar, redesigned (v3): a **tight inline star strip**. The stars pack on
 * one line with a small gap and the caption trails inline to the right rather
 * than wrapping below — a compact meter for lists and headers. Tapping the Nth
 * star fires `onReward(N)`. Filled state reads from the solid vs. outline glyph
 * plus the a11y label (never color alone). Same props.
 */
function RewardStarV3({ value, max = 5, size = 'md', label, color = 'warn', readOnly = false, onReward, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(0, Math.floor(max));
    const filled = Math.max(0, Math.min(total, Math.floor(value)));
    const fontSize = tokens.typography.scale[SIZE_KEY[size] ?? 'base'];
    const interactive = !readOnly && !!onReward;
    const rowStyle = [
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: interactive ? 'adjustable' : 'image', accessibilityLabel: `Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`, accessibilityValue: { min: 0, max: total, now: filled }, style: rowStyle, children: [Array.from({ length: total }).map((_, i) => {
                const isFilled = i < filled;
                const glyph = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize, color: isFilled ? colors[color] : colors.muted }, children: isFilled ? '★' : '☆' }));
                if (!interactive) {
                    return (0, jsx_runtime_1.jsx)(react_native_1.View, { children: glyph }, i);
                }
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Give ${i + 1} star${i === 0 ? '' : 's'}`, onPress: () => onReward?.(i + 1), hitSlop: 4, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: glyph }, i));
            }), label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginLeft: tokens.spacing.xs }, children: label })) : null] }));
}
//# sourceMappingURL=RewardStarV3.js.map