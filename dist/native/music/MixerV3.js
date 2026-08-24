"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixerV3 = MixerV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * Mixer, redesigned (v3): a **compact list of horizontal fader rows** — one
 * tight line per channel with the name, an inline `Slider`, a live read-out and
 * a mute pill (plus solo in `full`). No card chrome, hairline dividers only.
 * Mute / solo surface in each control's a11y `selected` state and label, never
 * by color alone. Renders an `EmptyState` when there are no channels. Built for
 * dense side panels. Token-only tints. Distinct at a glance from v1. Same props.
 */
function MixerV3({ channels, variant = 'full', title, emptyLabel = 'No channels', onVolumeChange, onToggleMute, onToggleSolo, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (channels.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF9A\uFE0F", size: "lg", color: "muted", accessibilityLabel: "Mixer" }), title: emptyLabel, style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: 0 }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                    marginBottom: tokens.spacing.xs,
                }, children: title })) : null, channels.map((ch, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: colors.border,
                    opacity: ch.muted ? 0.6 : 1,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { width: 64, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ch.muted ? `${ch.name} (m)` : ch.name }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: (0, types_1.clamp)(ch.volume, 0, 100), min: 0, max: 100, onValueChange: (v) => onVolumeChange?.(ch, v) }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 28, textAlign: 'right', color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: Math.round((0, types_1.clamp)(ch.volume, 0, 100)) }), (0, jsx_runtime_1.jsx)(RowPill, { label: "M", a11y: `${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`, active: ch.muted === true, tone: colors.warn, onPress: () => onToggleMute?.(ch) }), variant === 'full' ? ((0, jsx_runtime_1.jsx)(RowPill, { label: "S", a11y: `${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`, active: ch.soloed === true, tone: colors.primary, onPress: () => onToggleSolo?.(ch) })) : null] }, ch.id)))] }));
}
function RowPill({ label, a11y, active, tone, onPress, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { selected: active }, onPress: onPress, style: ({ pressed }) => ({
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: active ? tone : colors.border,
            backgroundColor: active ? (0, types_1.withAlpha)(tone, 0.2) : 'transparent',
            opacity: pressed ? 0.8 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: active ? tone : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: label }) }));
}
//# sourceMappingURL=MixerV3.js.map