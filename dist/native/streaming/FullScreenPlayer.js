"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullScreenPlayer = FullScreenPlayer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const media_1 = require("../media");
const WaveformScrubber_1 = require("./WaveformScrubber");
const CastButton_1 = require("./CastButton");
const GradientSurface_1 = require("./internal/GradientSurface");
const spotlight_1 = require("./internal/spotlight");
const types_1 = require("./types");
/**
 * FullScreenPlayer — the **V4 "spotlight"** peak moment (native). The immersive,
 * artwork-forward full-screen now-playing surface: a full brand-gradient ground,
 * a big centered cover in a frosted frame, title/artist in near-white ink, an
 * on-gradient scrubber (linear `Slider`, or a {@link WaveformScrubber} when
 * `peaks` are given), a large near-white round play control framed by prev/next,
 * and secondary glassy tiles (favorite / queue / cast). Token-only colors via
 * `useXenitionTheme()` + `spotlight*(tokens.ramps)` on `GradientSurface` — no
 * literals; dark-mode safe.
 */
function FullScreenPlayer({ track, state = 'paused', position = 0, duration, peaks, onPlayToggle, onSeek, onPrev, onNext, onClose, favorite, onFavorite, onQueue, onCast, casting, style, }) {
    const { tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, spotlight_1.spotlightInk)(r);
    const inkSoft = (0, spotlight_1.spotlightInkSoft)(r);
    const tile = (0, spotlight_1.spotlightTile)(r);
    const border = (0, spotlight_1.spotlightBorder)(r);
    const isPlaying = state === 'playing';
    const total = duration ?? track.duration;
    const seekMax = total && total > 0 ? total : 1;
    const frac = (0, types_1.clamp01)(seekMax > 0 ? position / seekMax : 0);
    const artItem = {
        url: track.artworkUrl ?? '',
        alt: track.album ? `${track.title} — ${track.album}` : track.title,
        width: 1,
        height: 1,
    };
    const glassTile = {
        height: 44,
        minWidth: 44,
        paddingHorizontal: tokens.spacing.md,
        borderRadius: tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tile,
        borderWidth: 1,
        borderColor: border,
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, spotlight_1.spotlightGradient)(r), style: {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.xl,
                gap: tokens.spacing.xl,
                overflow: 'hidden',
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [onClose ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Close player", onPress: onClose, hitSlop: 8, style: ({ pressed }) => [glassTile, { width: 44, minWidth: 44, opacity: pressed ? 0.8 : 1 }], children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2304", size: "lg", color: "onPrimary" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, height: 44 } })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                textAlign: 'center',
                                color: inkSoft,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '600',
                                letterSpacing: 0.5,
                            }, children: track.album ?? 'Now playing' }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, height: 44 } })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        alignSelf: 'center',
                        width: '80%',
                        padding: tokens.spacing.md,
                        borderRadius: tokens.radius.lg,
                        backgroundColor: tile,
                        borderWidth: 1,
                        borderColor: border,
                        overflow: 'hidden',
                    }, children: track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', borderRadius: tokens.radius.md, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(media_1.MediaFigure, { item: artItem, reserveAspect: true }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['3xl'] }, children: "\u266A" }) })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.xl * 1.15, fontWeight: '800' }, children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.base }, children: track.artist })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [peaks ? ((0, jsx_runtime_1.jsx)(WaveformScrubber_1.WaveformScrubber, { peaks: peaks, progress: frac, onSeek: onSeek ? (f) => onSeek(f * seekMax) : undefined })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: tile, borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, onValueChange: onSeek }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(total) })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xl }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous", disabled: !onPrev, onPress: onPrev, hitSlop: 10, style: ({ pressed }) => ({ opacity: !onPrev ? 0.4 : pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23EE", size: "2xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', accessibilityState: { selected: isPlaying }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 12, style: ({ pressed }) => ({
                                width: 76,
                                height: 76,
                                borderRadius: tokens.radius.full,
                                backgroundColor: ink,
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: !onPlayToggle ? 0.5 : pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "2xl", color: "primary" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", disabled: !onNext, onPress: onNext, hitSlop: 10, style: ({ pressed }) => ({ opacity: !onNext ? 0.4 : pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "2xl", color: "onPrimary" }) })] }), onFavorite || onQueue || onCast ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.md }, children: [onFavorite ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: favorite ? 'Remove from favorites' : 'Add to favorites', accessibilityState: { selected: !!favorite }, onPress: () => onFavorite(!favorite), hitSlop: 8, style: ({ pressed }) => [
                                glassTile,
                                { backgroundColor: favorite ? (0, spotlight_1.spotlightTile)(r, 0.3) : tile, opacity: pressed ? 0.8 : 1 },
                            ], children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: favorite ? '♥' : '♡', size: "lg", color: "onPrimary" }) })) : null, onQueue ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Open queue", onPress: onQueue, hitSlop: 8, style: ({ pressed }) => [glassTile, { opacity: pressed ? 0.8 : 1 }], children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2630", size: "lg", color: "onPrimary" }) })) : null, onCast ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: glassTile, children: (0, jsx_runtime_1.jsx)(CastButton_1.CastButton, { connected: casting, onPress: onCast }) })) : null] })) : null] }) }));
}
//# sourceMappingURL=FullScreenPlayer.js.map