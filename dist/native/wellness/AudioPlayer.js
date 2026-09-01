"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayer = AudioPlayer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const GlassPanel_1 = require("../primitives/GlassPanel");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
function fmt(sec) {
    if (sec == null || !Number.isFinite(sec) || sec < 0)
        return '0:00';
    const s = Math.floor(sec);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r < 10 ? '0' : ''}${r}`;
}
/**
 * AudioPlayer — a frosted "glass" transport for a meditation/soundscape track.
 * A `GlassPanel` ground (the kit's translucent surface) carries a gradient cover
 * tile, the title/teacher, a progress track, and a gradient play/pause button.
 * `variant='full'` expands to a large cover with skip controls. Only the cover
 * and the play button are colored — everything else stays calm on the glass;
 * every color is a token, adapts light + dark, and restyles from the seed.
 */
function AudioPlayer({ title, subtitle, coverGlyph = '🎧', isPlaying = false, position = 0, duration = 0, variant = 'bar', onPlayPause, onSkipBack, onSkipForward, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const pct = duration > 0 ? Math.max(0, Math.min(1, position / duration)) : 0;
    const a11y = `${title}${subtitle ? ', ' + subtitle : ''}, ${isPlaying ? 'playing' : 'paused'}`;
    const Track = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 4, borderRadius: 2, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.14) }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct * 100}%`, height: 4, borderRadius: 2, backgroundColor: colors.primary } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: fmt(position) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: fmt(duration) })] })] }));
    const PlayButton = ({ size }) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', onPress: onPlayPause, style: ({ pressed }) => ({ borderRadius: size / 2, opacity: pressed ? 0.9 : 1 }), children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: { width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: isPlaying ? '⏸' : '▶', size: size * 0.42, style: { color: (0, calm_1.calmInk)(r) } }) }) }));
    const Cover = ({ dim }) => ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: { width: dim, height: dim, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: coverGlyph, size: dim * 0.42, style: { color: (0, calm_1.calmInk)(r) } }) }));
    if (variant === 'full') {
        return ((0, jsx_runtime_1.jsxs)(GlassPanel_1.GlassPanel, { intensity: "regular", accessibilityLabel: a11y, style: [{ padding: tokens.spacing.lg, borderRadius: tokens.radius.lg, alignItems: 'center', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(Cover, { dim: 168 }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: title }), subtitle ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: subtitle }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'stretch' }, children: Track }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xl }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Skip back", onPress: onSkipBack, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u23EE", size: "xl", style: { color: colors.onSurface } }) }), (0, jsx_runtime_1.jsx)(PlayButton, { size: 72 }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Skip forward", onPress: onSkipForward, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u23ED", size: "xl", style: { color: colors.onSurface } }) })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(GlassPanel_1.GlassPanel, { intensity: "regular", accessibilityLabel: a11y, style: [{ padding: tokens.spacing.md, borderRadius: tokens.radius.lg, gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Cover, { dim: 52 }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: subtitle })) : null] }), (0, jsx_runtime_1.jsx)(PlayButton, { size: 44 })] }), Track] }));
}
//# sourceMappingURL=AudioPlayer.js.map