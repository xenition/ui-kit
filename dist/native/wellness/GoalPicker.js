"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalPicker = GoalPicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * GoalPicker — a wrap of selectable goal chips. Unselected chips are clean
 * (surface + border, `onSurface` text); color arrives only on the chosen ones,
 * which flip to the primary fill with `onPrimary` text and a `✓`. Selection is
 * announced (`accessibilityState.selected`) and marked with the check, so it
 * never rests on color alone. Token-only colors.
 */
function GoalPicker({ goals, selected, onToggle, title, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: goals.map((goal) => {
                    const isSelected = selected.includes(goal.id);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: goal.label, accessibilityState: { selected: isSelected }, onPress: () => onToggle(goal.id), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: isSelected ? colors.primary : colors.border,
                            backgroundColor: isSelected ? colors.primary : colors.surface,
                            opacity: pressed ? 0.85 : 1,
                        }), children: [goal.glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: goal.glyph })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: isSelected ? colors.onPrimary : colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: isSelected ? '700' : '600',
                                }, children: goal.label }), isSelected ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "\u2713" })) : null] }, goal.id));
                }) })] }));
}
//# sourceMappingURL=GoalPicker.js.map