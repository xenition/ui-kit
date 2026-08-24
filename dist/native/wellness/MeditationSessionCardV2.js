"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeditationSessionCardV2 = MeditationSessionCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const CATEGORY_META = {
    breathing: { glyph: '🌬️', label: 'Breathing', color: 'primary' },
    focus: { glyph: '🎯', label: 'Focus', color: 'accent' },
    sleep: { glyph: '🌙', label: 'Sleep', color: 'primary' },
    calm: { glyph: '🍃', label: 'Calm', color: 'success' },
    movement: { glyph: '🧘', label: 'Movement', color: 'warn' },
    'body-scan': { glyph: '🌀', label: 'Body scan', color: 'accent' },
    'loving-kindness': { glyph: '💗', label: 'Loving kindness', color: 'danger' },
};
/**
 * MeditationSessionCard — **full-bleed hero** design (v2). A tall calm cover: a
 * dark neutral base washed with the category accent and a bottom scrim, a
 * category tag pinned top-left (lock top-right), one big centered play control,
 * and the title + a duration/level/teacher meta strip + a resume bar stacked
 * over the scrim. `locked` swaps the play for a lock and an unlock note;
 * `loading` renders a skeleton. Same props as {@link MeditationSessionCardProps};
 * token-only colors (semantic slots, fixed neutral-ramp ink, `withAlpha` tints).
 */
function MeditationSessionCardV2({ title, category, durationMin, level, instructor, description, progress, locked = false, loading = false, startLabel, onStart, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;
    const accent = colors[meta.color];
    // Fixed near-white / near-black from the ramp read the same in light & dark,
    // so text stays legible over the dark hero regardless of scheme.
    const ink = tokens.ramps.neutral[50] ?? colors.onPrimary;
    const base = tokens.ramps.neutral[800] ?? colors.onSurface;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading session", style: [
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "100%", height: 140 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "60%", height: tokens.typography.scale.lg }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "40%", height: tokens.typography.scale.sm })] }));
    }
    const resume = progress != null && progress > 0 && progress < 1;
    const cta = startLabel ?? (resume ? 'Resume' : 'Start');
    const pct = progress != null ? Math.round(Math.min(Math.max(progress, 0), 1) * 100) : 0;
    const metaBits = [
        durationMin != null ? `${durationMin} min` : null,
        level ? cap(level) : null,
        instructor ? instructor : null,
    ].filter(Boolean);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: `${meta.label} session: ${title}${locked ? ', premium' : ''}${resume ? `, ${pct}% complete` : ''}`, style: [{ opacity: enter.opacity, transform: enter.transform }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                borderColor: colors.border,
                borderWidth: 1,
                minHeight: 232,
                backgroundColor: base,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { ...fill, backgroundColor: (0, color_1.withAlpha)(accent, 0.5) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { ...fill, top: '35%', backgroundColor: (0, color_1.withAlpha)(base, 0.66) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: tokens.spacing.md,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingVertical: 4,
                                paddingHorizontal: tokens.spacing.sm,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, color_1.withAlpha)(ink, 0.18),
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: meta.label })] }), locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, accessibilityLabel: "Premium", style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDD12" })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', justifyContent: 'center', paddingVertical: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: locked ? 'Premium, locked' : cta, accessibilityState: { disabled: locked }, disabled: locked || !onStart, onPress: onStart, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({
                                width: 72,
                                height: 72,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, color_1.withAlpha)(ink, 0.95),
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: locked ? 0.55 : pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl, color: accent }, children: locked ? '🔒' : '▶' }) }) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: (0, color_1.withAlpha)(ink, 0.82), fontSize: tokens.typography.scale.sm }, children: description })) : null, metaBits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, color_1.withAlpha)(ink, 0.82), fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: metaBits.join('  ·  ') })) : null, resume ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        height: 4,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: (0, color_1.withAlpha)(ink, 0.25),
                                        overflow: 'hidden',
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', backgroundColor: accent, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: (0, color_1.withAlpha)(ink, 0.82), fontSize: tokens.typography.scale.xs }, children: [pct, "% complete"] })] })) : null, locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', marginTop: tokens.spacing.xs }, children: "\uD83D\uDD12 Unlock with a membership" })) : null] })] }) }));
}
const fill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
function cap(s) {
    return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
//# sourceMappingURL=MeditationSessionCardV2.js.map