"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeRowV3 = EpisodeRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * **EpisodeRow — design V3 (dense playlist line).** A single flat, borderless
 * line: a small leading play/pause glyph that turns into an equalizer marker
 * while the row is playing, the title and inline meta in the middle, and the
 * duration trailing right — with a hairline resume underline for `progress`.
 * Built for long, scannable playlist-style lists. Same `EpisodeRowProps`;
 * token-pure; a11y-complete.
 */
function EpisodeRowV3({ episode, playing = false, state = 'paused', variant = 'standard', onPlayToggle, onPress, onDownload, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const buffering = playing && state === 'buffering';
    const isPlaying = playing && state === 'playing';
    const meta = [episode.show, episode.date].filter(Boolean).join('  ·  ');
    const progress = episode.progress != null ? clamp01(episode.progress) : undefined;
    // Leading marker: buffering → dotted, playing → equalizer, else → play/paused glyph.
    const markerGlyph = buffering ? '◌' : isPlaying ? '≣' : '▶';
    const marker = ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? `Pause ${episode.title}` : `Play ${episode.title}`, accessibilityState: { selected: isPlaying, busy: buffering }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 10, style: ({ pressed }) => ({
            width: 28,
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: !onPlayToggle ? 0.5 : pressed ? 0.6 : 1,
        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: markerGlyph, size: "sm", color: isPlaying ? 'primary' : 'muted' }) }));
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: 4,
                backgroundColor: 'transparent',
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [marker, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: isPlaying ? colors.primaryText : colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: isPlaying ? '700' : '600',
                                }, children: episode.title }), !compact && meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), onDownload ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Download ${episode.title}`, onPress: onDownload, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2913", size: "base", color: "muted" }) })) : null, episode.duration ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: episode.duration })) : null] }), progress != null && progress > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 2,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.border,
                    marginLeft: 28 + tokens.spacing.sm,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: 2,
                        width: `${progress * 100}%`,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                    } }) })) : null] }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: episode.title, onPress: () => onPress(episode), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=EpisodeRowV3.js.map