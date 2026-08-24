"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NowPlayingV2 = NowPlayingV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const media_1 = require("../media");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const WaveformScrubber_1 = require("./WaveformScrubber");
const CastButton_1 = require("./CastButton");
const types_1 = require("./types");
/**
 * **NowPlaying — design V2 (artwork-forward).** Edge-to-edge hero artwork
 * anchors the screen; the title/artist sit on a dark, token-derived scrim
 * overlaid on the art, and the scrubber + transport live on an elevated
 * control card that floats over the lower edge. The main control's accessible
 * label reflects `state`. Same `NowPlayingProps`; token-pure; a11y-complete.
 */
function NowPlayingV2({ track, state = 'paused', position = 0, duration, peaks, variant = 'full', onPlayToggle, onSeek, onPrev, onNext, onCast, casting, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const isPlaying = state === 'playing';
    const isBuffering = state === 'buffering';
    const total = duration ?? track.duration;
    const seekMax = total && total > 0 ? total : 1;
    const frac = seekMax > 0 ? Math.min(1, Math.max(0, position / seekMax)) : 0;
    const compact = variant === 'compact';
    const artItem = {
        url: track.artworkUrl ?? '',
        alt: track.album ? `${track.title} — ${track.album}` : track.title,
        width: 1,
        height: 1,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.surface }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', aspectRatio: compact ? 16 / 10 : 1 }, children: [track.artworkUrl ? ((0, jsx_runtime_1.jsx)(media_1.MediaFigure, { item: artItem, reserveAspect: true })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: '100%',
                            height: '100%',
                            backgroundColor: colors.accent,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "3xl", color: "onAccent" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            paddingTop: tokens.spacing.xl,
                            paddingBottom: tokens.spacing.lg,
                            paddingHorizontal: tokens.spacing.lg,
                            backgroundColor: (0, color_1.withAlpha)(tokens.ramps.neutral[900] ?? colors.onSurface, 0.42),
                            gap: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onAccent, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onAccent, fontSize: tokens.typography.scale.base }, children: track.artist })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    margin: tokens.spacing.md,
                    marginTop: -tokens.spacing.lg,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.lg,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: colors.surface,
                    ...(0, elevation_1.shadow)('lg', tokens),
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [peaks ? ((0, jsx_runtime_1.jsx)(WaveformScrubber_1.WaveformScrubber, { peaks: peaks, progress: frac, onSeek: onSeek ? (f) => onSeek(f * seekMax) : undefined })) : ((0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, onValueChange: onSeek })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(total) })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: tokens.spacing.xl,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous", disabled: !onPrev, onPress: onPrev, hitSlop: 10, style: ({ pressed }) => ({ opacity: !onPrev ? 0.4 : pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23EE", size: "2xl", color: "onSurface" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', accessibilityState: { selected: isPlaying, busy: isBuffering }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 12, style: ({ pressed }) => ({
                                    width: 76,
                                    height: 76,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: colors.primary,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                                    ...(0, elevation_1.shadow)('md', tokens),
                                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isBuffering ? '◌' : isPlaying ? '❙❙' : '▶', size: "2xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", disabled: !onNext, onPress: onNext, hitSlop: 10, style: ({ pressed }) => ({ opacity: !onNext ? 0.4 : pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "2xl", color: "onSurface" }) })] }), onCast ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(CastButton_1.CastButton, { variant: "labeled", connected: casting, onPress: onCast }) })) : null] })] }));
}
//# sourceMappingURL=NowPlayingV2.js.map