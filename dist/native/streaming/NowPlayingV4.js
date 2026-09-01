"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NowPlayingV4 = NowPlayingV4;
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
 * NowPlaying — **V4** "spotlight" design. The artwork-forward take on the
 * now-playing surface: the hero cover sits on a brand-gradient glow backdrop
 * (the signature immersive touch), with a big round primary play control framed
 * by prev/next. Same scrubber (linear `Slider`, or a {@link WaveformScrubber}
 * when `peaks` are given), time labels, and optional cast button. Same
 * props/behavior as {@link NowPlayingProps}; token-only colors via
 * `useXenitionTheme()`. `variant="compact"` tightens the layout.
 */
function NowPlayingV4({ track, state = 'paused', position = 0, duration, peaks, variant = 'full', onPlayToggle, onSeek, onPrev, onNext, onCast, casting, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const isPlaying = state === 'playing';
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
            {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                padding: compact ? tokens.spacing.md : tokens.spacing.lg,
                gap: compact ? tokens.spacing.md : tokens.spacing.xl,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, spotlight_1.spotlightGlow)(r), style: {
                    alignSelf: 'center',
                    width: compact ? '68%' : '88%',
                    padding: compact ? tokens.spacing.md : tokens.spacing.lg,
                    borderRadius: tokens.radius.lg,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', borderRadius: tokens.radius.md, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(media_1.MediaFigure, { item: artItem, reserveAspect: true }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, spotlight_1.spotlightInk)(r), fontSize: tokens.typography.scale['3xl'] }, children: "\u266A" }) })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: track.artist })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [peaks ? ((0, jsx_runtime_1.jsx)(WaveformScrubber_1.WaveformScrubber, { peaks: peaks, progress: frac, onSeek: onSeek ? (f) => onSeek(f * seekMax) : undefined })) : ((0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: Math.min(position, seekMax), min: 0, max: seekMax, onValueChange: onSeek })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(position) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(total) })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xl }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous", disabled: !onPrev, onPress: onPrev, hitSlop: 10, style: ({ pressed }) => ({ opacity: !onPrev ? 0.4 : pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23EE", size: "2xl", color: "onSurface" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', accessibilityState: { selected: isPlaying }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 12, style: ({ pressed }) => ({
                            width: 72,
                            height: 72,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "2xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", disabled: !onNext, onPress: onNext, hitSlop: 10, style: ({ pressed }) => ({ opacity: !onNext ? 0.4 : pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "2xl", color: "onSurface" }) })] }), onCast ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(CastButton_1.CastButton, { variant: "labeled", connected: casting, onPress: onCast }) })) : null] }));
}
//# sourceMappingURL=NowPlayingV4.js.map