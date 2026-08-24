"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeditationSessionCard = MeditationSessionCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
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
 * A meditation session summary card: category icon + tag, title, a
 * duration / level / instructor meta strip, an optional resume progress bar,
 * and a single dominant start action. `locked` swaps the CTA for a premium
 * note; `loading` renders a skeleton. `category` sets the icon and accent tone.
 * Token-only colors (semantic slots + a `withAlpha` tint).
 */
function MeditationSessionCard({ title, category, durationMin, level, instructor, description, progress, locked = false, loading = false, startLabel, onStart, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;
    const accent = colors[meta.color];
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} session: ${title}${locked ? ', premium' : ''}${resume ? `, ${pct}% complete` : ''}`, style: [containerStyle, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.14),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: accent,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                }, children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title })] }), locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, accessibilityLabel: "Premium", style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDD12" })) : null] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg }, children: [durationMin != null ? ((0, jsx_runtime_1.jsx)(Meta, { label: "Duration", value: `${durationMin} min` })) : null, level ? (0, jsx_runtime_1.jsx)(Meta, { label: "Level", value: cap(level) }) : null, instructor ? (0, jsx_runtime_1.jsx)(Meta, { label: "Teacher", value: instructor }) : null] }), resume ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: "primary", size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [pct, "% complete"] })] })) : null, locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "\uD83D\uDD12 Unlock with a membership" })) : onStart ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onStart, children: cta })) : null] }));
}
function Meta({ label, value }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: value })] }));
}
function cap(s) {
    return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
//# sourceMappingURL=MeditationSessionCard.js.map