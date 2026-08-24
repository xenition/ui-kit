"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeRowV2 = EpisodeRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * **EpisodeRow — design V2 (resume tile).** A tall, elevated tile: large
 * artwork, an oversized circular play/pause control (a Spinner while
 * buffering), and a prominent resume bar with a "% played" caption underneath.
 * Optimised for a "continue listening" shelf. Same `EpisodeRowProps`;
 * token-pure; a11y-complete.
 */
function EpisodeRowV2({ episode, playing = false, state = 'paused', variant = 'standard', onPlayToggle, onPress, onDownload, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const art = compact ? 56 : 72;
    const buffering = playing && state === 'buffering';
    const isPlaying = playing && state === 'playing';
    const meta = [episode.show, episode.date, episode.duration].filter(Boolean).join('  ·  ');
    const progress = episode.progress != null ? clamp01(episode.progress) : undefined;
    const pct = progress != null ? Math.round(progress * 100) : undefined;
    const artwork = !compact ? (episode.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: episode.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: art, height: art, borderRadius: tokens.radius.md, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: art,
            height: art,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFA7", size: "xl", color: "onAccent" }) }))) : null;
    const playControl = buffering ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "md" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? `Pause ${episode.title}` : `Play ${episode.title}`, accessibilityState: { selected: isPlaying, busy: buffering }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 8, style: ({ pressed }) => ({
            width: 52,
            height: 52,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
            ...(0, elevation_1.shadow)('sm', tokens),
        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "onPrimary" }) }));
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [artwork, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: episode.title }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), onDownload ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Download ${episode.title}`, onPress: onDownload, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2913", size: "lg", color: "muted" }) })) : null, playControl] }), progress != null && progress > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: progress * 100, max: 100, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [pct, "% played"] })] })) : null] }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: episode.title, onPress: () => onPress(episode), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=EpisodeRowV2.js.map