"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealCardV3 = MealCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const MEAL_META = {
    breakfast: { glyph: '🍳', label: 'Breakfast' },
    lunch: { glyph: '🥗', label: 'Lunch' },
    dinner: { glyph: '🍽️', label: 'Dinner' },
    snack: { glyph: '🍎', label: 'Snack' },
};
const MACRO_META = [
    { key: 'protein', label: 'Protein', tone: 'primary' },
    { key: 'carbs', label: 'Carbs', tone: 'warn' },
    { key: 'fat', label: 'Fat', tone: 'accent' },
];
/** Resolve a fill semantic key to its contrast-safe `*Text` sibling when one exists. */
function textTone(colors, key) {
    return colors[`${key}Text`] ?? colors[key];
}
/**
 * MealCard — **dense macro-bar line** design (v3). A tight two-row entry: glyph,
 * dish name, and calories value-first on the top line; a single stacked
 * proportional macro bar (protein / carbs / fat, by grams) with `Ng` counts
 * beneath. Ideal for long food logs. Same props as {@link MealCardProps};
 * token-only colors.
 */
function MealCardV3({ name, variant, calories, macros, time, onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = MEAL_META[variant];
    const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
    const total = shownMacros.reduce((sum, m) => sum + Math.max(macros?.[m.key] ?? 0, 0), 0);
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
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
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flex: 1 }, children: name }), calories != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: [calories, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '400' }, children: " kcal" })] })) : time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time })) : null] }), shownMacros.length && total > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Macros: ${shownMacros.map((m) => `${m.label} ${macros?.[m.key]}g`).join(', ')}`, style: {
                            flexDirection: 'row',
                            height: 6,
                            borderRadius: tokens.radius.full,
                            overflow: 'hidden',
                            backgroundColor: colors.border,
                        }, children: shownMacros.map((m) => {
                            const grams = Math.max(macros?.[m.key] ?? 0, 0);
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: grams / total, backgroundColor: colors[m.tone] } }, m.key));
                        }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: shownMacros.map((m) => ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: textTone(colors, m.tone), fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [m.label, " ", macros?.[m.key], "g"] }, m.key))) })] })) : null] }));
    const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: a11y, style: { opacity: enter.opacity, transform: enter.transform }, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }) }));
}
//# sourceMappingURL=MealCardV3.js.map