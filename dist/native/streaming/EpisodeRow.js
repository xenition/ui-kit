"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeRow = EpisodeRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * A podcast / video episode row — artwork, title, show · date · duration meta,
 * an optional resume {@link Progress} bar (from `episode.progress`), and a
 * play/pause control whose accessible label reflects the `playing` state.
 * `onPress(episode)` opens details. Two variants (`standard` / `compact`).
 * Token-only — no literal hex.
 */
function EpisodeRow({ episode, playing = false, state = 'paused', variant = 'standard', onPlayToggle, onPress, onDownload, style, }) {
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
                padding: tokens.spacing.sm,
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
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: buffering ? '◌' : isPlaying ? '❙❙' : '▶', size: "sm", color: "onPrimary" }) })] }), progress != null && progress > 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: progress * 100, max: 100, size: "sm" })) : null] }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: episode.title, onPress: () => onPress(episode), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=EpisodeRow.js.map