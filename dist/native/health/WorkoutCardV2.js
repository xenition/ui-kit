"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutCardV2 = WorkoutCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
/** Resolve a fill semantic key to its contrast-safe `*Text` sibling when one exists. */
function textTone(colors, key) {
    return colors[`${key}Text`] ?? colors[key];
}
const META = {
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
 * WorkoutCard — **hero** design (v2). A large discipline glyph on a tinted disc
 * anchors the card, with a tag badge, title, and an emphasized stat pair. The
 * primary action is a circular **start FAB** floating in the bottom-right;
 * completed workouts replace it with a `success` chip. Same props as
 * {@link WorkoutCardProps}; token-only colors.
 */
function WorkoutCardV2({ title, variant, durationMin, calories, description, completed = false, startLabel = 'Start', onStart, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = META[variant];
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const tint = colors[meta.color];
    const showFab = !completed && !!onStart;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: `${meta.label} workout: ${title}${completed ? ', completed' : ''}`, style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                {
                    ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.lg,
                    paddingBottom: showFab ? tokens.spacing['2xl'] : tokens.spacing.lg,
                    gap: tokens.spacing.md,
                    overflow: 'hidden',
                },
                style,
            ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 64,
                                height: 64,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, color_1.withAlpha)(tint, 0.12),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.color, variant: "soft", size: "sm", children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: title })] })] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xl }, children: [durationMin != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: textTone(colors, meta.color), fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: durationMin }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "minutes" })] })) : null, calories != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: calories }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "kcal" })] })) : null] }), completed ? ((0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: "success", variant: "soft", children: ["\u2713 ", 'Completed'] })) : null, showFab ? ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                        position: 'absolute',
                        right: tokens.spacing.lg,
                        bottom: tokens.spacing.lg,
                        transform: [{ scale: press.scale }],
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${startLabel} ${title}`, onPress: onStart, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({
                            width: 52,
                            height: 52,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: pressed ? 0.85 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onPrimary, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: "\u25B6" }) }) })) : null] }) }));
}
//# sourceMappingURL=WorkoutCardV2.js.map