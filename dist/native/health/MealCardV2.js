"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealCardV2 = MealCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
const MEAL_META = {
    breakfast: { glyph: '🍳', label: 'Breakfast', tint: 'warn' },
    lunch: { glyph: '🥗', label: 'Lunch', tint: 'success' },
    dinner: { glyph: '🍽️', label: 'Dinner', tint: 'primary' },
    snack: { glyph: '🍎', label: 'Snack', tint: 'accent' },
};
const MACRO_META = [
    { key: 'protein', label: 'P', tone: 'primary' },
    { key: 'carbs', label: 'C', tone: 'warn' },
    { key: 'fat', label: 'F', tone: 'accent' },
];
/**
 * MealCard — **image-hero** design (v2). A tall tinted hero banner (standing in
 * for a dish photo) carries the meal glyph large and centered, with the meal
 * tag top-left and a calories chip top-right; macro chips (P/C/F) overlay the
 * bottom of the hero. The dish name sits below. Same props as
 * {@link MealCardProps}; token-only colors.
 */
function MealCardV2({ name, variant, calories, macros, time, onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = MEAL_META[variant];
    const heroTint = colors[meta.tint];
    const shownMacros = MACRO_META.filter((m) => macros?.[m.key] != null);
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    height: 116,
                    backgroundColor: (0, color_1.withAlpha)(heroTint, 0.14),
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: 44 }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", size: "sm", children: meta.label }) }), calories != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "solid", size: "sm", children: `${calories} kcal` }) })) : null, shownMacros.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            bottom: tokens.spacing.sm,
                            left: tokens.spacing.sm,
                            flexDirection: 'row',
                            gap: tokens.spacing.xs,
                        }, children: shownMacros.map((m) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: m.tone, variant: "soft", size: "sm", children: `${m.label} ${macros?.[m.key]}g` }, m.key))) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: 2 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flex: 1 }, children: name }), time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time })) : null] }) })] }));
    const a11y = `${meta.label}: ${name}${calories != null ? `, ${calories} calories` : ''}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: a11y, style: { opacity: enter.opacity, transform: enter.transform }, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }) }));
}
//# sourceMappingURL=MealCardV2.js.map