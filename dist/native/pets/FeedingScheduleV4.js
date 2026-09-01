"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedingScheduleV4 = FeedingScheduleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const MEAL_GLYPH = {
    breakfast: '🌅',
    lunch: '☀️',
    dinner: '🌙',
    snack: '🦴',
    treat: '🍬',
};
/**
 * FeedingSchedule — **V4** "companion" design. The warm, friendly take on a daily
 * feeding checklist: an elevated rounded card with a soft shadow, a title +
 * fed/total summary, and one restyled row per meal — the meal-time glyph in a
 * soft-primary tinted well, food + time/portion meta, and a tappable checkbox
 * that toggles served/fed. Same props/behavior as {@link FeedingScheduleProps};
 * every `meal.type` reads via a glyph and fed state via a check glyph + a11y
 * state (never color alone). Token-only colors via `useXenitionTheme()`; rows
 * keep ≥44px tap targets. Web/native parity.
 */
function FeedingScheduleV4({ meals, title = 'Feeding schedule', onToggle, emptyLabel = 'No meals scheduled', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const fedCount = meals.filter((m) => m.fed).length;
    const container = [
        {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    if (meals.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: "\uD83C\uDF7D\uFE0F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: fedCount === meals.length ? colors.success : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [fedCount, "/", meals.length, " fed"] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: meals.map((meal, i) => {
                    const fed = meal.fed ?? false;
                    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            minHeight: 44,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: colors.surface,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: MEAL_GLYPH[meal.type] ?? '🍽️' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
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
                                    backgroundColor: fed ? colors.success : colors.surface,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: fed ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : null })] }));
                    if (!onToggle) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${meal.food}, ${meal.time}, ${fed ? 'fed' : 'not fed'}`, children: row }, meal.id ?? i));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: fed }, accessibilityLabel: `${meal.food}, ${meal.time}, ${fed ? 'fed' : 'not fed'}`, onPress: () => onToggle(i, !fed), style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }, meal.id ?? i));
                }) })] }));
}
//# sourceMappingURL=FeedingScheduleV4.js.map