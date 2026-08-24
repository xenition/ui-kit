"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mixer = Mixer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const VolumeFader_1 = require("./VolumeFader");
const types_1 = require("./types");
/**
 * A channel mixer — a UI shell only, no audio routing. Each `MixerChannel`
 * becomes a strip with a `VolumeFader`, a mute toggle, and (in `full`) a solo
 * toggle plus a level meter. Mute / solo are surfaced in the control's a11y
 * `selected` state and its label, never by color alone. Renders an `EmptyState`
 * when there are no channels. Composes `Card`, `VolumeFader`; token-only.
 */
function Mixer({ channels, variant = 'full', title, emptyLabel = 'No channels', onVolumeChange, onToggleMute, onToggleSolo, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (channels.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF9A\uFE0F", size: "2xl", color: "muted", accessibilityLabel: "Mixer" }), title: emptyLabel, style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.md }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : null, channels.map((ch) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(VolumeFader_1.VolumeFader, { label: ch.name, value: ch.volume, muted: ch.muted, onValueChange: (v) => onVolumeChange?.(ch, v) }), variant === 'full' ? (0, jsx_runtime_1.jsx)(Meter, { level: ch.level, muted: ch.muted }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(StripToggle, { label: "M", a11y: `${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`, active: ch.muted === true, tone: colors.warn, onPress: () => onToggleMute?.(ch) }), variant === 'full' ? ((0, jsx_runtime_1.jsx)(StripToggle, { label: "S", a11y: `${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`, active: ch.soloed === true, tone: colors.primary, onPress: () => onToggleSolo?.(ch) })) : null] })] }, ch.id)))] }));
}
function Meter({ level, muted }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const pct = muted ? 0 : (0, types_1.clamp)((level ?? 0) * 100, 0, 100);
    const tone = pct > 85 ? colors.danger : pct > 60 ? colors.warn : colors.success;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Output level ${Math.round(pct)} percent`, style: {
            height: 4,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.border,
            overflow: 'hidden',
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', backgroundColor: tone } }) }));
}
function StripToggle({ label, a11y, active, tone, onPress, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { selected: active }, onPress: onPress, style: ({ pressed }) => ({
            minWidth: 32,
            paddingVertical: 4,
            paddingHorizontal: tokens.spacing.sm,
            alignItems: 'center',
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: active ? tone : colors.border,
            backgroundColor: active ? (0, types_1.withAlpha)(tone, 0.18) : 'transparent',
            opacity: pressed ? 0.8 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: active ? tone : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: label }) }));
}
//# sourceMappingURL=Mixer.js.map