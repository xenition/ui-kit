"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardStar = RewardStar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SIZE_KEY = {
    sm: 'lg',
    md: 'xl',
    lg: '2xl',
};
/**
 * A tappable star-reward control: a row of star glyphs where the first `value`
 * are filled. Tapping the Nth star fires `onReward(N)` — the reward gesture.
 * Filled state is conveyed by a solid vs. outline glyph plus the a11y label
 * (never color alone). Filled color is a `SemanticColors` slot; no literals.
 */
function RewardStar({ value, max = 5, size = 'md', label, color = 'warn', readOnly = false, onReward, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(0, Math.floor(max));
    const filled = Math.max(0, Math.min(total, Math.floor(value)));
    const fontSize = tokens.typography.scale[SIZE_KEY[size] ?? 'xl'];
    const interactive = !readOnly && !!onReward;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: interactive ? 'adjustable' : 'image', accessibilityLabel: `Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`, accessibilityValue: { min: 0, max: total, now: filled }, style: [{ gap: tokens.spacing.xs, alignItems: 'flex-start' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: Array.from({ length: total }).map((_, i) => {
                    const isFilled = i < filled;
                    const glyph = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize, color: isFilled ? colors[color] : colors.muted }, children: isFilled ? '★' : '☆' }));
                    if (!interactive) {
                        return (0, jsx_runtime_1.jsx)(react_native_1.View, { children: glyph }, i);
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Give ${i + 1} star${i === 0 ? '' : 's'}`, onPress: () => onReward?.(i + 1), hitSlop: 6, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: glyph }, i));
                }) }), label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label })) : null] }));
}
//# sourceMappingURL=RewardStar.js.map