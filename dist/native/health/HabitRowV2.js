"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitRowV2 = HabitRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
/**
 * HabitRow — **circular tile** design (v2). A grid-friendly square: a large
 * {@link ProgressRing} (full & `success` when done, an empty `border` track when
 * not) with a check in its center, the habit name beneath, and a streak flame
 * chip. The whole tile is one tap target that toggles `done`. Same props as
 * {@link HabitRowProps}; token-only colors.
 */
function HabitRowV2({ name, done, streak = 0, meta, onToggle, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeStreak = Math.max(Math.floor(streak), 0);
    const a11y = `${name}, ${done ? 'done' : 'not done'}${safeStreak > 0 ? `, ${safeStreak} day streak` : ''}`;
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
                alignItems: 'center',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: done ? 1 : 0, max: 1, size: 72, strokeWidth: 8, color: "success", label: done ? '✓' : '', showPercent: false, accessibilityLabel: `${name} ${done ? 'done' : 'not done'}` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                    color: done ? colors.onSurface : colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                    textAlign: 'center',
                }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: meta })) : null, safeStreak > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDD25" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.warnText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: safeStreak })] })) : null] }));
    if (!onToggle) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: a11y, style: { opacity: enter.opacity, transform: enter.transform }, children: tile }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: a11y, onPress: () => onToggle(!done), onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.8 : 1 }), children: tile }) }));
}
//# sourceMappingURL=HabitRowV2.js.map