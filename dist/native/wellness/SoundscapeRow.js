"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundscapeRow = SoundscapeRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const SOUND_META = {
    rain: { glyph: '🌧️', label: 'Rain', color: 'primary' },
    ocean: { glyph: '🌊', label: 'Ocean', color: 'primary' },
    forest: { glyph: '🌲', label: 'Forest', color: 'success' },
    fire: { glyph: '🔥', label: 'Fireplace', color: 'danger' },
    wind: { glyph: '🍃', label: 'Wind', color: 'accent' },
    stream: { glyph: '🏞️', label: 'Stream', color: 'success' },
    thunder: { glyph: '⛈️', label: 'Thunder', color: 'accent' },
    'white-noise': { glyph: '📻', label: 'White noise', color: 'muted' },
};
/**
 * A soundscape mixer row: icon + name, a round play / pause toggle, and an
 * optional volume slider that appears only while playing. `playing` fills the
 * toggle and updates its a11y state + label (state, not color alone). Token-only
 * colors (semantic slots + a `withAlpha` tint).
 */
function SoundscapeRow({ variant, name, playing = false, volume = 0.5, onToggle, onVolumeChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SOUND_META[variant] ?? SOUND_META.rain;
    const accent = colors[meta.color];
    const displayName = name ?? meta.label;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: playing ? accent : colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: displayName }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: playing }, accessibilityLabel: `${playing ? 'Stop' : 'Play'} ${displayName}`, onPress: () => onToggle?.(!playing), style: ({ pressed }) => ({
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radius.full,
                            backgroundColor: playing ? accent : (0, color_1.withAlpha)(accent, 0.16),
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: pressed ? 0.75 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, color: playing ? colors.onPrimary : accent }, children: playing ? '⏸' : '▶' }) })] }), playing && onVolumeChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDD09" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: volume, min: 0, max: 1, step: 0.05, onValueChange: onVolumeChange }) })] })) : null] }));
}
//# sourceMappingURL=SoundscapeRow.js.map