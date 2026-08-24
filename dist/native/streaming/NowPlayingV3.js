"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NowPlayingV3 = NowPlayingV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const media_1 = require("../media");
const WaveformScrubber_1 = require("./WaveformScrubber");
const CastButton_1 = require("./CastButton");
const types_1 = require("./types");
/**
 * **NowPlaying — design V3 (minimalist centred).** Everything centred on a bare
 * surface with generous air: a modest rounded artwork, large centred
 * title/artist, one full-width slider, and a lightweight in-line transport row
 * (no filled play disc — the play/pause is a large glyph). The play control's
 * accessible label reflects `state`. Same `NowPlayingProps`; token-pure;
 * a11y-complete.
 */
function NowPlayingV3({ track, state = 'paused', position = 0, duration, peaks, variant = 'full', onPlayToggle, onSeek, onPrev, onNext, onCast, casting, style, }) {
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { alignItems: 'center', gap: compact ? tokens.spacing.lg : tokens.spacing['2xl'], paddingVertical: tokens.spacing.lg },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: compact ? '45%' : '58%', borderRadius: tokens.radius.lg, overflow: 'hidden' }, children: track.artworkUrl ? ((0, jsx_runtime_1.jsx)(media_1.MediaFigure, { item: artItem, reserveAspect: true })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: '100%',
                        aspectRatio: 1,
                        backgroundColor: colors.accent,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "3xl", color: "onAccent" }) })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, alignItems: 'center', paddingHorizontal: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '800',
                            textAlign: 'center',
                        }, children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.base, textAlign: 'center' }, children: track.artist })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.lg }, children: [peaks ? ((0, jsx_runtime_1.jsx)(WaveformScrubber_1.WaveformScrubber, { peaks: peaks, progress: frac, onSeek: onSeek ? (f) => onSeek(f * seekMax) : undefined })) : ((0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, onValueChange: onSeek })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(total) })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing['2xl'],
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous", disabled: !onPrev, onPress: onPrev, hitSlop: 12, style: ({ pressed }) => ({ opacity: !onPrev ? 0.4 : pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23EE", size: "2xl", color: "onSurface" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', accessibilityState: { selected: isPlaying, busy: isBuffering }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 16, style: ({ pressed }) => ({ opacity: !onPlayToggle ? 0.5 : pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isBuffering ? '◌' : isPlaying ? '❙❙' : '▶', size: "3xl", color: "primary" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", disabled: !onNext, onPress: onNext, hitSlop: 12, style: ({ pressed }) => ({ opacity: !onNext ? 0.4 : pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "2xl", color: "onSurface" }) })] }), onCast ? (0, jsx_runtime_1.jsx)(CastButton_1.CastButton, { variant: "labeled", connected: casting, onPress: onCast }) : null] }));
}
//# sourceMappingURL=NowPlayingV3.js.map