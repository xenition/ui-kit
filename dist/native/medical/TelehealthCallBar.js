"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelehealthCallBar = TelehealthCallBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** Token-derived translucent tint (no literal hex; mirrors GlassPanel). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const STATE_META = {
    idle: { label: 'Ready to connect', glyph: '📹' },
    connecting: { label: 'Connecting…', glyph: '⏳' },
    active: { label: 'In call', glyph: '🟢' },
    ended: { label: 'Call ended', glyph: '⏹' },
};
function RoundControl({ glyph, label, bg, fg, onPress }) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({
            width: 48,
            height: 48,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bg,
            opacity: pressed ? 0.8 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: fg, fontSize: 20 }, children: glyph }) }));
}
/**
 * A persistent telehealth call bar: the participant's identity, a connection
 * status line (idle / connecting / active / ended), an elapsed timer, and the
 * standard round controls (mute, camera, end) plus a "Join call" CTA while
 * idle. Mute/camera state is shown by glyph swap + tint, not color alone.
 * Informational UI only — not a medical device. Token-only colors.
 */
function TelehealthCallBar({ participantName, participantAvatar, state = 'idle', elapsed, muted = false, cameraOff = false, onJoin, onToggleMute, onToggleCamera, onEnd, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const isActive = state === 'active';
    const isIdle = state === 'idle';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Telehealth call with ${participantName}, ${meta.label}${isActive && elapsed ? `, ${elapsed}` : ''}`, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: participantAvatar, name: participantName, size: "md", status: isActive ? 'online' : undefined }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: participantName }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [meta.glyph, " ", meta.label, isActive && elapsed ? `  ·  ${elapsed}` : ''] })] }), isIdle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Join call", onPress: onJoin, style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.lg,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.success,
                    opacity: pressed ? 0.85 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDCDE" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSuccess, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "Join call" })] })) : state === 'ended' ? null : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(RoundControl, { glyph: muted ? '🔇' : '🎙', label: muted ? 'Unmute microphone' : 'Mute microphone', bg: muted ? withAlpha(colors.danger, 0.16) : withAlpha(colors.onSurface, 0.08), fg: muted ? colors.danger : colors.onSurface, onPress: () => onToggleMute?.(!muted) }), (0, jsx_runtime_1.jsx)(RoundControl, { glyph: cameraOff ? '📷' : '📹', label: cameraOff ? 'Turn camera on' : 'Turn camera off', bg: cameraOff ? withAlpha(colors.danger, 0.16) : withAlpha(colors.onSurface, 0.08), fg: cameraOff ? colors.danger : colors.onSurface, onPress: () => onToggleCamera?.(!cameraOff) }), (0, jsx_runtime_1.jsx)(RoundControl, { glyph: "\uD83D\uDCF5", label: "End call", bg: colors.danger, fg: colors.onDanger, onPress: onEnd })] }))] }));
}
//# sourceMappingURL=TelehealthCallBar.js.map