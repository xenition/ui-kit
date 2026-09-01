"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MixerV4 = MixerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const VolumeFaderV4_1 = require("./VolumeFaderV4");
const types_1 = require("./types");
/**
 * Mixer — **V4** "session" design. The tactile DAW take on a channel mixer: each
 * `MixerChannel` becomes a rounded control surface (`colors.surface` +
 * `colors.border`) housing a `VolumeFaderV4`, a mute toggle, and (in `full`) a
 * solo toggle plus a token-well level meter. Every strip keeps its **channel
 * accent** — cycled through the module's semantic slots via `padAccentKey` and
 * resolved through `colors[accentKey]` (never a literal). Armed / mute / solo
 * states light with a soft-token fill *and* a glyph/label marker (never color
 * alone), surfaced in the a11y `selected` state + label. Honors both `variant`s
 * (`full` / `compact`), identical props/behavior to {@link MixerProps}. Renders
 * an `EmptyState` when there are no channels. Token-only colors via
 * `useXenitionTheme()`.
 */
function MixerV4({ channels, variant = 'full', title, emptyLabel = 'No channels', onVolumeChange, onToggleMute, onToggleSolo, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (channels.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF9A\uFE0F", size: "2xl", color: "muted", accessibilityLabel: "Mixer" }), title: emptyLabel, style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.md }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : null, channels.map((ch, index) => {
                // The channel accent — cycled through the module's semantic slots, then
                // resolved through the theme so it always traces to a token color.
                const accentKey = (0, types_1.padAccentKey)(index);
                const accent = colors[accentKey];
                const armed = ch.armed === true;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        gap: tokens.spacing.xs,
                        padding: tokens.spacing.sm,
                        borderRadius: tokens.radius.md,
                        borderWidth: 1,
                        borderColor: armed ? accent : colors.border,
                        backgroundColor: colors.surface,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: accent } }), armed ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u25CF", size: "xs", color: "danger", accessibilityLabel: "Record armed" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "ARM" })] })) : null] }), (0, jsx_runtime_1.jsx)(VolumeFaderV4_1.VolumeFaderV4, { label: ch.name, value: ch.volume, muted: ch.muted, onValueChange: (v) => onVolumeChange?.(ch, v) }), variant === 'full' ? (0, jsx_runtime_1.jsx)(Meter, { level: ch.level, muted: ch.muted, accent: accent }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(StripToggle, { label: "M", glyph: "\uD83D\uDD07", a11y: `${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`, active: ch.muted === true, tone: colors.warn, onPress: () => onToggleMute?.(ch) }), variant === 'full' ? ((0, jsx_runtime_1.jsx)(StripToggle, { label: "S", glyph: "\u25CE", a11y: `${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`, active: ch.soloed === true, tone: accent, onPress: () => onToggleSolo?.(ch) })) : null] })] }, ch.id));
            })] }));
}
function Meter({ level, muted, accent, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const pct = muted ? 0 : (0, types_1.clamp)((level ?? 0) * 100, 0, 100);
    // The channel accent tints the meter fill; overloads still warn/danger.
    const tone = pct > 85 ? colors.danger : pct > 60 ? colors.warn : accent;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Output level ${Math.round(pct)} percent`, style: {
            height: 4,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, types_1.withAlpha)(colors.primary, 0.15),
            overflow: 'hidden',
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', backgroundColor: tone } }) }));
}
function StripToggle({ label, glyph, a11y, active, tone, onPress, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { selected: active }, onPress: onPress, style: ({ pressed }) => ({
            minWidth: 44,
            minHeight: 44,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            paddingVertical: 4,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.sm,
            borderWidth: 1,
            borderColor: active ? tone : colors.border,
            backgroundColor: active ? (0, types_1.withAlpha)(tone, 0.18) : 'transparent',
            opacity: pressed ? 0.8 : 1,
        }), children: [active ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs }, children: glyph }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: active ? tone : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: label })] }));
}
//# sourceMappingURL=MixerV4.js.map