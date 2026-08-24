"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardStarV2 = RewardStarV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
/**
 * RewardStar, redesigned (v2): a **big star-burst tile**. One oversized filled
 * star sits in a tinted circular burst, with the count set large as "value / max"
 * beneath it and the optional caption below. Tapping the tile awards the next
 * star — `onReward(value + 1)`, wrapping back to 1 once full — the reward gesture
 * as a single celebratory press. Distinct from v1's small inline star row. Same
 * props.
 */
function RewardStarV2({ value, max = 5, label, color = 'warn', readOnly = false, onReward, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(0, Math.floor(max));
    const filled = Math.max(0, Math.min(total, Math.floor(value)));
    const interactive = !readOnly && !!onReward;
    const press = (0, motion_1.usePressScale)();
    const next = filled >= total ? 1 : filled + 1;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                transform: [{ scale: press.scale }],
                ...(0, elevation_1.shadow)('sm', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 88,
                    height: 88,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors[color], 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'], color: colors[color] }, children: filled > 0 ? '★' : '☆' }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: `${filled} / ${total}` }), label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label })) : null] }));
    const a11y = `Reward: ${filled} of ${total} stars${label ? `, ${label}` : ''}`;
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: a11y, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Give a star, ${a11y}`, onPress: () => onReward?.(next), onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=RewardStarV2.js.map