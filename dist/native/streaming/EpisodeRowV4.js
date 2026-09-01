"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeRowV4 = EpisodeRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * EpisodeRow — **V4** "spotlight" design. The artwork-forward episode row/card:
 * a rounded artwork thumb, title + show · date · duration meta, a resume bar
 * (soft-`primary` track + `primary` fill), and a big round **primary** play
 * affordance (the one accent, filled with an `onPrimary` glyph). The surface
 * stays clean — the gradient is reserved for the artwork-hero moments. Same
 * props/behavior as {@link EpisodeRowProps}; token-only colors via
 * `useXenitionTheme()`. Two variants (`standard` / `compact`).
 */
function EpisodeRowV4({ episode, playing = false, state = 'paused', variant = 'standard', onPlayToggle, onPress, onDownload, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const art = 56;
    const buffering = playing && state === 'buffering';
    const isPlaying = playing && state === 'playing';
    const meta = [episode.show, episode.date, episode.duration].filter(Boolean).join('  ·  ');
    const progress = episode.progress != null ? clamp01(episode.progress) : undefined;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [!compact ? (episode.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: episode.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: art, height: art, borderRadius: tokens.radius.md, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: art,
                            height: art,
                            borderRadius: tokens.radius.md,
                            backgroundColor: colors.accent,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFA7", size: "lg", color: "onAccent" }) }))) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: compact ? 1 : 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: episode.title }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), onDownload ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Download ${episode.title}`, onPress: onDownload, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2913", size: "lg", color: "muted" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? `Pause ${episode.title}` : `Play ${episode.title}`, accessibilityState: { selected: isPlaying, busy: buffering }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 8, style: ({ pressed }) => ({
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: buffering ? '◌' : isPlaying ? '❙❙' : '▶', size: "sm", color: "onPrimary" }) })] }), progress != null && progress > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: Math.round(progress * 100) }, style: {
                    height: 4,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.18),
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: 4,
                        width: `${progress * 100}%`,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                    } }) })) : null] }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: episode.title, onPress: () => onPress(episode), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=EpisodeRowV4.js.map