"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepStoryCard = SleepStoryCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STORY_META = {
    nature: { glyph: '🌲', label: 'Nature', color: 'success' },
    fiction: { glyph: '📖', label: 'Fiction', color: 'primary' },
    asmr: { glyph: '🎧', label: 'ASMR', color: 'accent' },
    music: { glyph: '🎵', label: 'Music', color: 'accent' },
    travel: { glyph: '✈️', label: 'Travel', color: 'primary' },
    meditation: { glyph: '🌙', label: 'Meditation', color: 'primary' },
};
/**
 * A sleep-story tile: a soft category-tinted cover, title + narrator + length,
 * and a round play / pause control. `playing` flips the control glyph and its
 * a11y label (state, not color alone); `locked` shows a premium lock; `loading`
 * renders a skeleton. Token-only colors (semantic slots + a `withAlpha` tint).
 */
function SleepStoryCard({ title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STORY_META[category] ?? STORY_META.nature;
    const accent = colors[meta.color];
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} sleep story: ${title}`, style: [containerStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 56,
                    height: 56,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [narrator, durationMin != null ? `${durationMin} min` : null].filter(Boolean).join(' · ') ||
                            description ||
                            '' })] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: playing, disabled: locked }, accessibilityLabel: controlLabel, disabled: locked || !onPlay, onPress: onPlay, style: ({ pressed }) => ({
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    backgroundColor: playing ? accent : (0, color_1.withAlpha)(accent, 0.16),
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: locked ? 0.5 : pressed ? 0.75 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, color: playing ? colors.onPrimary : accent }, children: control }) })] }));
}
//# sourceMappingURL=SleepStoryCard.js.map