"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayer = AudioPlayer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * A themed **audio player UI shell** — a card/row surface for a single track
 * with **no playback dependency**. Drive a real player (e.g. `expo-av`'s
 * `Audio.Sound`) from the emitted intents: `onPlayToggle(next)`,
 * `onSeek(seconds)`, `onPrev`, `onNext`. Renders artwork, title/artist, a
 * `Slider` seek bar with time labels, and transport controls whose play/pause
 * label reflects `state`. Token-only — no literal hex.
 */
function AudioPlayer({ track, state = 'paused', position = 0, duration, variant = 'card', onPlayToggle, onSeek, onPrev, onNext, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const isPlaying = state === 'playing';
    const isBuffering = state === 'buffering';
    const total = duration ?? track.duration;
    const seekMax = total && total > 0 ? total : 1;
    const compact = variant === 'compact';
    const expanded = variant === 'expanded';
    const art = expanded ? 88 : compact ? 44 : 64;
    const meta = [track.artist, track.album].filter(Boolean).join(' · ');
    const playControl = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', justifyContent: 'center', width: 44, height: 44 }, children: isBuffering ? ((0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', accessibilityState: { selected: isPlaying }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 8, style: ({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
            }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "onPrimary" }) })) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: track.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: art, height: art, borderRadius: tokens.radius.md, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: art,
                            height: art,
                            borderRadius: tokens.radius.md,
                            backgroundColor: colors.accent,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "xl", color: "onAccent" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: track.title }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null] }), expanded && onPrev ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous", onPress: onPrev, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23EE", size: "lg", color: "onSurface" }) })) : null, playControl, expanded && onNext ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", onPress: onNext, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "lg", color: "onSurface" }) })) : null] }), !compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, onValueChange: onSeek }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(total) })] })] })) : null] }));
}
//# sourceMappingURL=AudioPlayer.js.map