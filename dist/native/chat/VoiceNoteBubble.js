"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceNoteBubble = VoiceNoteBubble;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const DEFAULT_WAVE = [0.3, 0.6, 0.9, 0.5, 0.7, 1, 0.4, 0.8, 0.5, 0.6, 0.35, 0.7, 0.9, 0.5, 0.3];
function fmt(sec) {
    const s = Math.max(0, Math.round(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, '0')}`;
}
/**
 * Voice-message bubble — a play/pause control, a waveform whose fill reflects
 * `progress`, and a duration readout, wrapped in the primitive `ChatBubble` so
 * it shares alignment and theming with text messages. Colors adapt to the
 * `me`/`them` side (onPrimary vs. onSurface). No literal colors.
 */
function VoiceNoteBubble({ side = 'them', durationSec, playing = false, progress = 0, waveform, meta, onPlayToggle, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const me = side === 'me';
    const fg = me ? colors.onPrimary : colors.onSurface;
    const bars = waveform && waveform.length > 0 ? waveform : DEFAULT_WAVE;
    const clamped = Math.min(1, Math.max(0, progress));
    return ((0, jsx_runtime_1.jsx)(primitives_1.ChatBubble, { side: side, meta: meta, style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Voice message, ${fmt(durationSec)}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, minWidth: 160 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: playing }, accessibilityLabel: playing ? 'Pause voice message' : 'Play voice message', onPress: onPlayToggle, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: fg, fontSize: tokens.typography.scale.lg }, children: playing ? '⏸' : '▶' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 2, flex: 1, height: 24 }, children: bars.map((h, i) => {
                        const filled = i / bars.length <= clamped;
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                flex: 1,
                                height: Math.max(3, h * 24),
                                borderRadius: tokens.radius.full,
                                backgroundColor: fg,
                                opacity: filled ? 1 : 0.4,
                            } }, i));
                    }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.xs, opacity: 0.9 }, children: fmt(durationSec) })] }) }));
}
//# sourceMappingURL=VoiceNoteBubble.js.map