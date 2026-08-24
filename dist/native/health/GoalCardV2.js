"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalCardV2 = GoalCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
/**
 * GoalCard — **ring hero** design (v2). A large {@link ProgressRing} showing the
 * completion percentage anchors the card, with the title, `value / target`
 * readout, and (when reached) a `success` "Goal met" badge alongside. The ring
 * and readout switch to the `success` tone on completion. Guards `target <= 0`.
 * Same props as {@link GoalCardProps}; token-only colors.
 */
function GoalCardV2({ title, value, target, unit, color = 'primary', icon, onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const hasTarget = target > 0;
    const clamped = hasTarget ? Math.min(Math.max(value, 0), target) : Math.max(value, 0);
    const met = hasTarget && value >= target;
    const pct = hasTarget ? Math.round((clamped / target) * 100) : 0;
    const ringColor = met ? 'success' : color;
    const a11y = hasTarget
        ? `${title}: ${value} of ${target}${unit ? ` ${unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`
        : `${title}: ${value}${unit ? ` ${unit}` : ''}`;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
            },
            style,
        ], children: [hasTarget ? ((0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: clamped, max: target, size: 96, strokeWidth: 11, color: ringColor, label: `${pct}%`, showPercent: false, accessibilityLabel: `${title} progress, ${pct}%` })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 96,
                    height: 96,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: "No target" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [icon ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flex: 1 }, children: title })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: met ? colors.successText : colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: value }), hasTarget ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["/ ", target, unit ? ` ${unit}` : ''] })) : unit ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: unit })) : null] }), met ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", size: "sm", children: "\u2713 Goal met" })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: a11y, style: { opacity: enter.opacity, transform: enter.transform }, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }) }));
}
//# sourceMappingURL=GoalCardV2.js.map