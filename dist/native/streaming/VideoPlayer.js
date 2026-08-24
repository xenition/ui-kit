"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPlayer = VideoPlayer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const LiveBadge_1 = require("./LiveBadge");
const CastButton_1 = require("./CastButton");
const types_1 = require("./types");
/**
 * A themed **video player UI shell** — controls overlay only, with **no
 * playback dependency**. Wrap a real player (e.g. `expo-av`'s `<Video>`) behind
 * this and drive it from the emitted intents: `onPlayToggle(next)`,
 * `onSeek(seconds)`, `onFullscreen`, `onCast`. It renders a poster frame, a
 * dark scrim, a center play/pause (or buffering spinner) control, and a bottom
 * bar with time labels + a `Slider` seek bar. The center control's accessible
 * label reflects `state` ("Play" / "Pause"). Every color resolves from
 * `SemanticColors` / neutral ramp tokens — no literal hex.
 */
function VideoPlayer({ posterUrl, title, state = 'paused', position = 0, duration, live = false, viewers, aspectRatio = 16 / 9, variant = 'inline', showControls = true, onPlayToggle, onSeek, onFullscreen, onCast, casting, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const isPlaying = state === 'playing';
    const isBuffering = state === 'buffering';
    const seekMax = duration && duration > 0 ? duration : 1;
    const showSeek = variant !== 'minimal' && !live && duration != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                width: '100%',
                aspectRatio,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: tokens.ramps.neutral[900],
                justifyContent: 'center',
            },
            style,
        ], children: [posterUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: posterUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } })) : null, showControls ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: tokens.ramps.neutral[900],
                            opacity: 0.35,
                        } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: tokens.spacing.sm,
                            left: tokens.spacing.sm,
                            right: tokens.spacing.sm,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                        }, children: [live ? (0, jsx_runtime_1.jsx)(LiveBadge_1.LiveBadge, { viewers: viewers }) : null, title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    flex: 1,
                                    color: tokens.ramps.neutral[50],
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '600',
                                }, children: title })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', justifyContent: 'center' }, children: isBuffering ? ((0, jsx_runtime_1.jsx)(primitives_1.Spinner, {})) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', accessibilityState: { selected: isPlaying }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 12, style: ({ pressed }) => ({
                                width: 64,
                                height: 64,
                                borderRadius: tokens.radius.full,
                                backgroundColor: colors.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "xl", color: "onPrimary" }) })) }), variant !== 'minimal' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: tokens.spacing.sm,
                            right: tokens.spacing.sm,
                            bottom: tokens.spacing.sm,
                            gap: tokens.spacing.xs,
                        }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tokens.ramps.neutral[50], fontSize: tokens.typography.scale.xs }, children: live ? 'LIVE' : (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: showSeek ? ((0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, onValueChange: onSeek })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            height: 4,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: colors.border,
                                        } })) }), !live ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tokens.ramps.neutral[50], fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(duration) })) : null, onCast ? ((0, jsx_runtime_1.jsx)(CastButton_1.CastButton, { connected: casting, onPress: onCast, size: "sm" })) : null, onFullscreen ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Fullscreen", onPress: onFullscreen, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2922", size: "base", color: "onSurface", style: { color: tokens.ramps.neutral[50] } }) })) : null] }) })) : null] })) : null] }));
}
//# sourceMappingURL=VideoPlayer.js.map