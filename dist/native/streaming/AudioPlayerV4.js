"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayerV4 = AudioPlayerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const spotlight_1 = require("./internal/spotlight");
const types_1 = require("./types");
/**
 * AudioPlayer — **V4** "spotlight" design. A compact audio transport card:
 * small artwork, title/artist, a clean soft-primary scrubber with time labels,
 * and big round **primary** transport controls (play/pause framed by prev/next
 * in `expanded`). The artwork sits on a subtle brand-gradient glow — the V4
 * signature — kept light so the card stays a clean surface. Same props/behavior
 * as {@link AudioPlayerProps} (buffering swaps play for a `Spinner`); drive a
 * real player from `onPlayToggle(next)`, `onSeek(seconds)`, `onPrev`, `onNext`.
 * Token-only colors via `useXenitionTheme()` — no literal hex.
 */
function AudioPlayerV4({ track, state = 'paused', position = 0, duration, variant = 'card', onPlayToggle, onSeek, onPrev, onNext, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
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
                shadowColor: colors.onSurface,
                shadowOpacity: 0.18,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                elevation: 2,
                opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
            }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "onPrimary" }) })) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, spotlight_1.spotlightGlow)(r), style: {
                            width: art,
                            height: art,
                            borderRadius: tokens.radius.md,
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: track.artworkUrl ? tokens.spacing.xs : 0,
                        }, children: track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: track.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: '100%', height: '100%', borderRadius: tokens.radius.sm } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, spotlight_1.spotlightInk)(r), fontSize: tokens.typography.scale.xl }, children: "\u266A" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: track.title }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null] }), expanded && onPrev ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous", onPress: onPrev, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23EE", size: "lg", color: "onSurface" }) })) : null, playControl, expanded && onNext ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", onPress: onNext, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "lg", color: "onSurface" }) })) : null] }), !compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, onValueChange: onSeek }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(total) })] })] })) : null] }));
}
//# sourceMappingURL=AudioPlayerV4.js.map