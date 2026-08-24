"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineRow = RoutineRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SLOT_GLYPH = {
    morning: '🌅',
    afternoon: '☀️',
    evening: '🌆',
    bedtime: '🌙',
    anytime: '⏰',
};
/**
 * A single routine step row: an icon, label + time, and a tappable done/not-done
 * checkbox. Done state is shown by a check glyph, strike-through, and the a11y
 * `checked` state — never color alone. When `onToggle` is set the whole row is a
 * `checkbox` role. Token-only colors.
 */
function RoutineRow({ label, slot = 'anytime', icon, time, done = false, disabled = false, onToggle, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const glyph = icon ?? SLOT_GLYPH[slot] ?? '⏰';
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                opacity: disabled ? 0.5 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                            textDecorationLine: done ? 'line-through' : 'none',
                        }, children: label }), time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 24,
                    height: 24,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: done ? colors.success : colors.border,
                    backgroundColor: done ? colors.success : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: done ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : null })] }));
    const a11yLabel = `${label}${time ? `, ${time}` : ''}, ${done ? 'done' : 'not done'}`;
    if (!onToggle) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11yLabel, children: row });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done, disabled }, accessibilityLabel: a11yLabel, disabled: disabled, onPress: () => onToggle(!done), style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=RoutineRow.js.map