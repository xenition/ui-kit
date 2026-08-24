"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutCardV3 = WorkoutCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
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
 * WorkoutCard — **compact row** design (v3). A tinted glyph square leads, then
 * the title with its discipline label and an inline `duration · kcal` stat
 * strip, and a trailing start chip (or a `success` check when completed). Reads
 * as one line in a list. Same props as {@link WorkoutCardProps}; token-only.
 */
function WorkoutCardV3({ title, variant, durationMin, calories, description, completed = false, startLabel = 'Start', onStart, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = META[variant];
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const tint = colors[meta.color];
    const stats = [];
    if (durationMin != null)
        stats.push(`${durationMin} min`);
    if (calories != null)
        stats.push(`${calories} kcal`);
    const showStart = !completed && !!onStart;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: `${meta.label} workout: ${title}${completed ? ', completed' : ''}`, style: { opacity: enter.opacity, transform: [...enter.transform, { scale: showStart ? press.scale : 1 }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                {
                    ...(appearance !== 'classic'
                        ? { ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens), borderRadius: tokens.radius.md }
                        : null),
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    minHeight: 60,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 44,
                        height: 44,
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, color_1.withAlpha)(tint, 0.12),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: textTone(colors, meta.color), fontWeight: '700' }, children: meta.label }), stats.length ? `  ·  ${stats.join('  ·  ')}` : description ? `  ·  ${description}` : ''] })] }), completed ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.successText, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: "\u2713" })) : showStart ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${startLabel} ${title}`, onPress: onStart, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.md,
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                        opacity: pressed ? 0.7 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: startLabel }) })) : null] }) }));
}
//# sourceMappingURL=WorkoutCardV3.js.map