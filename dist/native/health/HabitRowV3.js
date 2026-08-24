"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitRowV3 = HabitRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
/** How many streak dots the minimal line renders at most. */
const MAX_DOTS = 7;
/**
 * HabitRow — **minimal line** design (v3). A single quiet line: a small round
 * check on the left, the habit name, then a `flame + count` and a compact row
 * of week dots (the last {@link MAX_DOTS} filled in `success`). No surface fill
 * by default — separation comes from spacing. Tapping toggles `done`. Same props
 * as {@link HabitRowProps}; token-only colors.
 */
function HabitRowV3({ name, done, streak = 0, meta, onToggle, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeStreak = Math.max(Math.floor(streak), 0);
    const a11y = `${name}, ${done ? 'done' : 'not done'}${safeStreak > 0 ? `, ${safeStreak} day streak` : ''}`;
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const filled = Math.min(safeStreak, MAX_DOTS);
    const dots = Array.from({ length: MAX_DOTS }, (_, i) => i < filled);
    const line = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                ...(appearance !== 'classic'
                    ? { ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens), borderRadius: tokens.radius.md }
                    : null),
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
                minHeight: 44,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 18,
                    height: 18,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: done ? colors.success : colors.border,
                    backgroundColor: done ? colors.success : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: done ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: "\u2713" })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: done ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                            textDecorationLine: done ? 'line-through' : 'none',
                        }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 3 }, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: dots.map((on, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 6,
                        height: 6,
                        borderRadius: tokens.radius.full,
                        backgroundColor: on ? colors.success : colors.border,
                    } }, i))) }), safeStreak > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDD25" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.warnText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: safeStreak })] })) : null] }));
    if (!onToggle) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: a11y, style: { opacity: enter.opacity, transform: enter.transform }, children: line }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: a11y, onPress: () => onToggle(!done), onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: line }) }));
}
//# sourceMappingURL=HabitRowV3.js.map