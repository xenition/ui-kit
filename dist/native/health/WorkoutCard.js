"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutCard = WorkoutCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
/** Resolve a fill semantic key to its contrast-safe `*Text` sibling when one exists. */
function textTone(colors, key) {
    return colors[`${key}Text`] ?? colors[key];
}
const WORKOUT_META = {
    strength: { glyph: '🏋️', label: 'Strength', color: 'primary' },
    cardio: { glyph: '❤️', label: 'Cardio', color: 'danger' },
    yoga: { glyph: '🧘', label: 'Yoga', color: 'accent' },
    cycling: { glyph: '🚴', label: 'Cycling', color: 'primary' },
    running: { glyph: '🏃', label: 'Running', color: 'warn' },
    swimming: { glyph: '🏊', label: 'Swimming', color: 'accent' },
    hiit: { glyph: '🔥', label: 'HIIT', color: 'danger' },
    walking: { glyph: '🚶', label: 'Walking', color: 'success' },
};
/**
 * A workout summary card: discipline icon + tag, title, a duration / calories
 * stat strip, and a single dominant "Start" action. Completed workouts swap the
 * CTA for a `success` "Completed" note. The `variant` sets the icon and accent
 * tone. `appearance` selects the surface treatment (classic by default). Token-only colors.
 */
function WorkoutCard({ title, variant, durationMin, calories, description, completed = false, startLabel = 'Start', onStart, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = WORKOUT_META[variant];
    const enter = (0, motion_1.useEnter)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} workout: ${title}${completed ? ', completed' : ''}`, style: [
                {
                    ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: textTone(colors, meta.color), fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title })] })] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xl }, children: [durationMin != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Duration" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: [durationMin, " min"] })] })) : null, calories != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Calories" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: [calories, " kcal"] })] })) : null] }), completed ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.successText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "\u2713 Completed" })) : onStart ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onStart, children: startLabel })) : null] }) }));
}
//# sourceMappingURL=WorkoutCard.js.map