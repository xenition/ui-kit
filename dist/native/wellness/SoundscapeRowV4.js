"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundscapeRowV4 = SoundscapeRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
const SOUND_META = {
    rain: { glyph: '🌧️', label: 'Rain' },
    ocean: { glyph: '🌊', label: 'Ocean' },
    forest: { glyph: '🌲', label: 'Forest' },
    fire: { glyph: '🔥', label: 'Fireplace' },
    wind: { glyph: '🍃', label: 'Wind' },
    stream: { glyph: '🏞️', label: 'Stream' },
    thunder: { glyph: '⛈️', label: 'Thunder' },
    'white-noise': { glyph: '📻', label: 'White noise' },
};
/**
 * SoundscapeRowV4 — the calm redesign of {@link SoundscapeRow}. Same props,
 * defaults, toggle a11y state/label, and volume slider (shown only while playing
 * with `onVolumeChange`). Only the visuals change: a clean row with a gradient
 * icon badge and a round gradient play/pause toggle as the calm accents.
 */
function SoundscapeRowV4({ variant, name, playing = false, volume = 0.5, onToggle, onVolumeChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const meta = SOUND_META[variant] ?? SOUND_META.rain;
    const displayName = name ?? meta.label;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg, color: (0, calm_1.calmInk)(r) }, children: meta.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: displayName }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: playing }, accessibilityLabel: `${playing ? 'Stop' : 'Play'} ${displayName}`, onPress: () => onToggle?.(!playing), style: ({ pressed }) => ({ borderRadius: tokens.radius.full, opacity: pressed ? 0.75 : 1 }), children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                                width: 44,
                                height: 44,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, color: (0, calm_1.calmInk)(r) }, children: playing ? '⏸' : '▶' }) }) })] }), playing && onVolumeChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDD09" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: volume, min: 0, max: 1, step: 0.05, onValueChange: onVolumeChange }) })] })) : null] }));
}
//# sourceMappingURL=SoundscapeRowV4.js.map