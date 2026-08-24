"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitRow = HabitRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A habit-tracker row: a tappable check control, the habit name + meta, and a
 * streak flame. Completing a habit reads in the `success` tone. `onToggle`
 * receives the next boolean state. Token-only; a11y announces done state and
 * streak.
 */
function HabitRow({ name, done, streak = 0, meta, onToggle, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeStreak = Math.max(Math.floor(streak), 0);
    const a11y = `${name}, ${done ? 'done' : 'not done'}${safeStreak > 0 ? `, ${safeStreak} day streak` : ''}`;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                minHeight: 56,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 26,
                    height: 26,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: done ? colors.success : colors.border,
                    backgroundColor: done ? colors.success : colors.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: done ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "\u2713" })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: done ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                            textDecorationLine: done ? 'line-through' : 'none',
                        }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null] }), safeStreak > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDD25" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.warn, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: safeStreak })] })) : null] }));
    if (!onToggle) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: a11y, onPress: () => onToggle(!done), style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: content }));
}
//# sourceMappingURL=HabitRow.js.map