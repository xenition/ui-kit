"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepStoryCardV4 = SleepStoryCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const Icon_1 = require("../primitives/Icon");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
const STORY_META = {
    nature: { glyph: '🌲', label: 'Nature', color: 'success' },
    fiction: { glyph: '📖', label: 'Fiction', color: 'primary' },
    asmr: { glyph: '🎧', label: 'ASMR', color: 'accent' },
    music: { glyph: '🎵', label: 'Music', color: 'accent' },
    travel: { glyph: '✈️', label: 'Travel', color: 'primary' },
    meditation: { glyph: '🌙', label: 'Meditation', color: 'primary' },
};
/**
 * SleepStoryCardV4 — the "calm" restyle of {@link SleepStoryCard}. Same props,
 * defaults, labels, a11y and behavior; only the surface changes: a clean neutral
 * row card with a gradient cover tile (category glyph in near-white ink) and a
 * round gradient play/pause button. `playing` swaps the glyph and its a11y label;
 * `locked` and `loading` are preserved.
 */
function SleepStoryCardV4({ title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const meta = STORY_META[category] ?? STORY_META.nature;
    const containerStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading story", style: [containerStyle, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 56, height: 56 }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "70%", height: tokens.typography.scale.base }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "45%", height: tokens.typography.scale.sm })] })] }));
    }
    const control = locked ? '🔒' : playing ? '⏸' : '▶';
    const controlLabel = locked ? 'Locked' : playing ? 'Pause' : 'Play';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} sleep story: ${title}`, style: [containerStyle, style], children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
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
                        }, children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: [narrator, durationMin != null ? `${durationMin} min` : null].filter(Boolean).join(' · ') ||
                            description ||
                            '' })] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: playing, disabled: locked }, accessibilityLabel: controlLabel, disabled: locked || !onPlay, onPress: onPlay, style: ({ pressed }) => ({ borderRadius: tokens.radius.full, opacity: locked ? 0.5 : pressed ? 0.85 : 1 }), children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                        width: 44,
                        height: 44,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: control, size: tokens.typography.scale.base, style: { color: (0, calm_1.calmInk)(r) } }) }) })] }));
}
//# sourceMappingURL=SleepStoryCardV4.js.map