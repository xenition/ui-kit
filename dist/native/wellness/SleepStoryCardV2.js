"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepStoryCardV2 = SleepStoryCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const STORY_META = {
    nature: { glyph: '🌲', label: 'Nature', color: 'success' },
    fiction: { glyph: '📖', label: 'Fiction', color: 'primary' },
    asmr: { glyph: '🎧', label: 'ASMR', color: 'accent' },
    music: { glyph: '🎵', label: 'Music', color: 'accent' },
    travel: { glyph: '✈️', label: 'Travel', color: 'primary' },
    meditation: { glyph: '🌙', label: 'Meditation', color: 'primary' },
};
/**
 * SleepStoryCard — **dark cover hero** design (v2). A tall night-time cover: a
 * dark neutral base washed with the category accent and a bottom scrim, the
 * category tag pinned top-left (lock top-right), a big centered play/pause
 * overlay, and the title + narrator/length line over the scrim. `playing` flips
 * the control glyph and a11y label (state, not color alone); `locked` shows a
 * lock; `loading` renders a skeleton. Same props as {@link SleepStoryCardProps};
 * token-only colors.
 */
function SleepStoryCardV2({ title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const meta = STORY_META[category] ?? STORY_META.nature;
    const accent = colors[meta.color];
    const ink = tokens.ramps.neutral[50] ?? colors.onPrimary;
    const base = tokens.ramps.neutral[900] ?? colors.onSurface;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading story", style: [
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "100%", height: 150 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "60%", height: tokens.typography.scale.lg }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "40%", height: tokens.typography.scale.sm })] }));
    }
    const metaLine = [narrator, durationMin != null ? `${durationMin} min` : null].filter(Boolean).join(' · ') || description || '';
    const control = locked ? '🔒' : playing ? '⏸' : '▶';
    const controlLabel = locked ? 'Locked' : playing ? 'Pause' : 'Play';
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: `${meta.label} sleep story: ${title}${playing ? ', playing' : ''}${locked ? ', premium' : ''}`, style: [{ opacity: enter.opacity, transform: enter.transform }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                borderColor: colors.border,
                borderWidth: 1,
                minHeight: 220,
                backgroundColor: base,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { ...fill, backgroundColor: (0, color_1.withAlpha)(accent, 0.45) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { ...fill, top: '40%', backgroundColor: (0, color_1.withAlpha)(base, 0.72) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
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
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: meta.label })] }), locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, accessibilityLabel: "Premium", style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDD12" })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', justifyContent: 'center', paddingVertical: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: controlLabel, accessibilityState: { selected: playing, disabled: locked }, disabled: locked || !onPlay, onPress: onPlay, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({
                                width: 72,
                                height: 72,
                                borderRadius: tokens.radius.full,
                                backgroundColor: playing ? accent : (0, color_1.withAlpha)(ink, 0.95),
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: locked ? 0.55 : pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl, color: playing ? colors.onPrimary : accent }, children: control }) }) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: title }), metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: (0, color_1.withAlpha)(ink, 0.82), fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: metaLine })) : null] })] }) }));
}
const fill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
//# sourceMappingURL=SleepStoryCardV2.js.map