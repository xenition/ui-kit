"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalCardV3 = GoalCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
/**
 * GoalCard — **thin value-first line** design (v3). The current value leads
 * large with its unit, the title sits quietly above, a trailing `NN%` reads the
 * completion, and a thin {@link MiniBar} underlines it all. Switches to the
 * `success` tone when the target is met. Compact enough for a stacked list.
 * Guards `target <= 0`. Same props as {@link GoalCardProps}; token-only colors.
 */
function GoalCardV3({ title, value, target, unit, color = 'primary', icon, onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const hasTarget = target > 0;
    const clamped = hasTarget ? Math.min(Math.max(value, 0), target) : Math.max(value, 0);
    const met = hasTarget && value >= target;
    const pct = hasTarget ? Math.round((clamped / target) * 100) : 0;
    const barColor = met ? 'success' : color;
    const a11y = hasTarget
        ? `${title}: ${value} of ${target}${unit ? ` ${unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`
        : `${title}: ${value}${unit ? ` ${unit}` : ''}`;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                ...(appearance !== 'classic'
                    ? { ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens), borderRadius: tokens.radius.md }
                    : null),
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [icon ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', flex: 1 }, children: title })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: met ? colors.successText : colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: value }), unit ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: unit })) : null, hasTarget ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["/ ", target] })) : null] })] }), hasTarget ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: met ? colors.successText : colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: [pct, "%"] })) : null] }), hasTarget ? ((0, jsx_runtime_1.jsx)(charts_1.MiniBar, { value: clamped, max: target, color: barColor, height: 5, accessibilityLabel: `${title} progress, ${pct}%` })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No target set" }))] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: a11y, style: { opacity: enter.opacity, transform: enter.transform }, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }) }));
}
//# sourceMappingURL=GoalCardV3.js.map