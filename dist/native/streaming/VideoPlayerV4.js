"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPlayerV4 = VideoPlayerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const LiveBadge_1 = require("./LiveBadge");
const CastButton_1 = require("./CastButton");
const GradientSurface_1 = require("./internal/GradientSurface");
const spotlight_1 = require("./internal/spotlight");
const color_1 = require("../primitives/internal/color");
const types_1 = require("./types");
/**
 * VideoPlayer — **V4** "spotlight" design. The video surface shell: a
 * brand-gradient poster/backdrop sits behind the (placeholder) video frame —
 * the V4 signature — with a big centered round **primary** play control and a
 * bottom control bar (scrubber + time labels + cast/fullscreen glyphs) on a
 * subtle scrim. A `posterUrl` overlays the gradient when given. Controls-only,
 * no playback engine: drive a real player from `onPlayToggle(next)`,
 * `onSeek(seconds)`, `onFullscreen`, `onCast`. Same props/behavior as
 * {@link VideoPlayerProps} (buffering swaps play for a `Spinner`); token-only
 * colors via `useXenitionTheme()` — no literal hex.
 */
function VideoPlayerV4({ posterUrl, title, state = 'paused', position = 0, duration, live = false, viewers, aspectRatio = 16 / 9, variant = 'inline', showControls = true, onPlayToggle, onSeek, onFullscreen, onCast, casting, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const isPlaying = state === 'playing';
    const isBuffering = state === 'buffering';
    const seekMax = duration && duration > 0 ? duration : 1;
    const showSeek = variant !== 'minimal' && !live && duration != null;
    const ink = r.primary[50];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                width: '100%',
                aspectRatio,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                justifyContent: 'center',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, spotlight_1.spotlightGlow)(r), style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } }), posterUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: posterUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } })) : null, showControls ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: (0, color_1.withAlpha)(r.neutral[900], 0.3),
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
                                    color: ink,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '600',
                                }, children: title })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', justifyContent: 'center' }, children: isBuffering ? ((0, jsx_runtime_1.jsx)(primitives_1.Spinner, {})) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', accessibilityState: { selected: isPlaying }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 12, style: ({ pressed }) => ({
                                width: 72,
                                height: 72,
                                borderRadius: tokens.radius.full,
                                backgroundColor: colors.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: r.neutral[900],
                                shadowOpacity: 0.3,
                                shadowRadius: 10,
                                shadowOffset: { width: 0, height: 4 },
                                elevation: 4,
                                opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "2xl", color: "onPrimary" }) })) }), variant !== 'minimal' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: tokens.spacing.sm,
                            right: tokens.spacing.sm,
                            bottom: tokens.spacing.sm,
                            gap: tokens.spacing.xs,
                        }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs }, children: live ? 'LIVE' : (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: showSeek ? ((0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, onValueChange: onSeek })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            height: 4,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: colors.border,
                                        } })) }), !live ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(duration) })) : null, onCast ? ((0, jsx_runtime_1.jsx)(CastButton_1.CastButton, { connected: casting, onPress: onCast, size: "sm" })) : null, onFullscreen ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Fullscreen", onPress: onFullscreen, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2922", size: "base", color: "onSurface", style: { color: ink } }) })) : null] }) })) : null] })) : null] }));
}
//# sourceMappingURL=VideoPlayerV4.js.map