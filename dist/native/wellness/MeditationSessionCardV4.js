"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeditationSessionCardV4 = MeditationSessionCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
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
 * MeditationSessionCardV4 — the "calm" restyle of {@link MeditationSessionCard}.
 * Same props, defaults, labels, a11y and behavior; only the surface changes: a
 * clean neutral card whose one spot of color is a gradient cover tile carrying
 * the category glyph in near-white ink, and a slim gradient resume fill. The
 * Start/Resume CTA, locked note, and loading skeleton are preserved.
 */
function MeditationSessionCardV4({ title, category, durationMin, level, instructor, description, progress, locked = false, loading = false, startLabel, onStart, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;
    const containerStyle = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading session", style: [containerStyle, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "40%", height: tokens.typography.scale.sm }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "80%", height: tokens.typography.scale.lg }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "60%", height: tokens.typography.scale.sm })] }));
    }
    const resume = progress != null && progress > 0 && progress < 1;
    const cta = startLabel ?? (resume ? 'Resume' : 'Start');
    const pct = progress != null ? Math.round(Math.min(Math.max(progress, 0), 1) * 100) : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} session: ${title}${locked ? ', premium' : ''}${resume ? `, ${pct}% complete` : ''}`, style: [containerStyle, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                            width: 56,
                            height: 56,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: 24, style: { color: (0, calm_1.calmInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.mutedText,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '700',
                                    letterSpacing: 1,
                                    textTransform: 'uppercase',
                                }, children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title })] }), locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, accessibilityLabel: "Premium", style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDD12" })) : null] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: description })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg }, children: [durationMin != null ? (0, jsx_runtime_1.jsx)(Meta, { label: "Duration", value: `${durationMin} min` }) : null, level ? (0, jsx_runtime_1.jsx)(Meta, { label: "Level", value: cap(level) }) : null, instructor ? (0, jsx_runtime_1.jsx)(Meta, { label: "Teacher", value: instructor }) : null] }), resume ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: 6,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1),
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), start: { x: 0, y: 0 }, end: { x: 1, y: 0 }, style: { width: `${pct}%`, height: 6, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: [pct, "% complete"] })] })) : null, locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "\uD83D\uDD12 Unlock with a membership" })) : onStart ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onStart, children: cta })) : null] }));
}
function Meta({ label, value }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: value })] }));
}
function cap(s) {
    return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
//# sourceMappingURL=MeditationSessionCardV4.js.map