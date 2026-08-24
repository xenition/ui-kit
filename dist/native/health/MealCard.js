"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealCard = MealCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const MEAL_META = {
    breakfast: { glyph: '🍳', label: 'Breakfast' },
    lunch: { glyph: '🥗', label: 'Lunch' },
    dinner: { glyph: '🍽️', label: 'Dinner' },
    snack: { glyph: '🍎', label: 'Snack' },
};
const MACRO_META = [
    { key: 'protein', label: 'Protein', color: 'primary' },
    { key: 'carbs', label: 'Carbs', color: 'warn' },
    { key: 'fat', label: 'Fat', color: 'accent' },
];
/**
 * A logged-meal card: meal-slot icon + tag, dish name, calories, and a
 * color-coded protein / carbs / fat macro strip. Macros with no value are
 * omitted. Pressable when `onPress` is set. Token-only colors.
 */
function MealCard({ name, variant, calories, macros, time, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = MEAL_META[variant];
    const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: meta.label }), time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name })] })] }), calories != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: [calories, " ", (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "kcal" })] })) : null, shownMacros.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.lg }, children: shownMacros.map((m) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: colors[m.color] } }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [m.label, " ", macros?.[m.key], "g"] })] }, m.key))) })) : null] }));
    const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=MealCard.js.map