"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedingSchedule = FeedingSchedule;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const MEAL_GLYPH = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🦴',
    treat: '🍬',
};
/**
 * A daily feeding checklist: each row is a meal-time icon, food + portion, and a
 * tappable fed/not-fed checkbox. A summary chip counts fed vs. total. Renders an
 * explicit empty state. Fed state is conveyed by a check glyph + a11y state
 * (not color alone). Token-only colors.
 */
function FeedingSchedule({ meals, title = 'Feeding schedule', onToggle, emptyLabel = 'No meals scheduled', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fedCount = meals.filter((m) => m.fed).length;
    const container = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
        },
        style,
    ];
    if (meals.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: "\uD83C\uDF7D\uFE0F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: fedCount === meals.length ? colors.success : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [fedCount, "/", meals.length, " fed"] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: meals.map((meal, i) => {
                    const fed = meal.fed ?? false;
                    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: MEAL_GLYPH[meal.type] ?? '🍽️' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                            color: colors.onSurface,
                                            fontSize: tokens.typography.scale.base,
                                            fontWeight: '600',
                                            textDecorationLine: fed ? 'line-through' : 'none',
                                        }, children: meal.food }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [meal.time, meal.amount ? ` · ${meal.amount}` : ''] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 24,
                                    height: 24,
                                    borderRadius: tokens.radius.full,
                                    borderWidth: 1,
                                    borderColor: fed ? colors.success : colors.border,
                                    backgroundColor: fed ? colors.success : 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: fed ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : null })] }));
                    if (!onToggle) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${meal.food}, ${meal.time}, ${fed ? 'fed' : 'not fed'}`, children: row }, meal.id ?? i));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: fed }, accessibilityLabel: `${meal.food}, ${meal.time}, ${fed ? 'fed' : 'not fed'}`, onPress: () => onToggle(i, !fed), style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }, meal.id ?? i));
                }) })] }));
}
//# sourceMappingURL=FeedingSchedule.js.map