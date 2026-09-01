"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelehealthCallBarV4 = TelehealthCallBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Call lifecycle state → glyph + label + token tone (never color alone). */
const STATE_META = {
    idle: { label: 'Ready to connect', glyph: '📹', tone: 'muted' },
    connecting: { label: 'Connecting…', glyph: '⏳', tone: 'primary' },
    active: { label: 'In call', glyph: '🟢', tone: 'success' },
    ended: { label: 'Call ended', glyph: '⏹', tone: 'muted' },
};
function RoundControl({ glyph, label, bg, fg, onPress }) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bg,
            opacity: pressed ? 0.8 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: fg, fontSize: 20 }, children: glyph }) }));
}
/**
 * TelehealthCallBar — **V4** "clinic" design. A calm, persistent call bar on an
 * elevated rounded surface with a soft shadow. Shows the participant's identity
 * and a labelled connection-state marker (glyph + label + token tone, never
 * color alone) for each `state`: `idle` / `connecting` / `active` / `ended`.
 * While `idle` a "Join call" CTA is shown; while `active` the standard round
 * controls appear (mute, camera, and a `danger`-token labelled End-call
 * button), each a ≥44px tap target. Mute/camera state is shown by a glyph swap
 * + tint. Identical props/behavior to {@link TelehealthCallBarProps}. Token-only
 * colors via `useXenitionTheme()`. Informational UI only — not a medical device.
 */
function TelehealthCallBarV4({ participantName, participantAvatar, state = 'idle', elapsed, muted = false, cameraOff = false, onJoin, onToggleMute, onToggleCamera, onEnd, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const isActive = state === 'active';
    const isIdle = state === 'idle';
    const toneColor = colors[meta.tone];
    const shell = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Telehealth call with ${participantName}, ${meta.label}${isActive && elapsed ? `, ${elapsed}` : ''}`, style: [shell, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: participantAvatar, name: participantName, size: "md", status: isActive ? 'online' : undefined }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: participantName }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "xs", style: { color: toneColor } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: toneColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: meta.label }), isActive && elapsed ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: ['  ·  ', elapsed] })) : null] })] }), isIdle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Join call", onPress: onJoin, style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    minHeight: 44,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.lg,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.85 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDCDE" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "Join call" })] })) : state === 'ended' ? null : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(RoundControl, { glyph: muted ? '🔇' : '🎙', label: muted ? 'Unmute microphone' : 'Mute microphone', bg: muted ? (0, color_1.withAlpha)(colors.danger, 0.16) : (0, color_1.withAlpha)(colors.primary, 0.1), fg: muted ? colors.danger : colors.onSurface, onPress: () => onToggleMute?.(!muted) }), (0, jsx_runtime_1.jsx)(RoundControl, { glyph: cameraOff ? '📷' : '📹', label: cameraOff ? 'Turn camera on' : 'Turn camera off', bg: cameraOff ? (0, color_1.withAlpha)(colors.danger, 0.16) : (0, color_1.withAlpha)(colors.primary, 0.1), fg: cameraOff ? colors.danger : colors.onSurface, onPress: () => onToggleCamera?.(!cameraOff) }), (0, jsx_runtime_1.jsx)(RoundControl, { glyph: "\uD83D\uDCF5", label: "End call", bg: colors.danger, fg: colors.onDanger, onPress: onEnd })] }))] }));
}
//# sourceMappingURL=TelehealthCallBarV4.js.map