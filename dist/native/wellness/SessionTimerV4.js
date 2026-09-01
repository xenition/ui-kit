"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionTimerV4 = SessionTimerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
function fmt(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
}
/**
 * SessionTimerV4 — the "calm" restyle of {@link SessionTimer}. Same props,
 * defaults, labels, a11y and behavior (`onToggle`/`onReset`, the `Complete`
 * state, the clamped remaining/total); only the surface changes: a clean neutral
 * card with a large mm:ss readout, a slim gradient progress bar showing elapsed,
 * a gradient play/pause button, and a reset control.
 */
function SessionTimerV4({ totalSec, remainingSec, running = false, phaseLabel, 
// tone retained for parity; the calm ground is single-hue.
tone = 'primary', onToggle, onReset, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    void tone;
    const total = Math.max(0, totalSec);
    const remaining = Math.min(Math.max(remainingSec, 0), total || remainingSec);
    const elapsed = Math.max(0, total - remaining);
    const complete = total > 0 && remaining <= 0;
    const pct = total > 0 ? Math.max(0, Math.min(1, elapsed / total)) * 100 : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Session timer, ${fmt(remaining)} remaining${phaseLabel ? `, ${phaseLabel}` : ''}${complete ? ', complete' : running ? ', running' : ', paused'}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                alignItems: 'center',
            },
            style,
        ], children: [phaseLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.mutedText,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                }, children: phaseLabel })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: complete ? colors.success : colors.onSurface,
                    fontSize: tokens.typography.scale['3xl'],
                    fontWeight: '800',
                    fontFamily: tokens.typography.fontHeading,
                }, children: fmt(remaining) }), total > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: '100%',
                    height: 6,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1),
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), start: { x: 0, y: 0 }, end: { x: 1, y: 0 }, style: { width: `${pct}%`, height: 6, borderRadius: tokens.radius.full } }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [complete ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "\u2713 Complete" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: running }, accessibilityLabel: running ? 'Pause' : 'Play', onPress: () => onToggle?.(!running), style: ({ pressed }) => ({ borderRadius: tokens.radius.full, opacity: pressed ? 0.9 : 1 }), children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                                width: 56,
                                height: 56,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                            }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: running ? '⏸' : '▶', size: tokens.typography.scale.lg, style: { color: (0, calm_1.calmInk)(r) } }) }) })), onReset ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Reset", onPress: onReset, style: ({ pressed }) => ({
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.08),
                            borderWidth: 1,
                            borderColor: colors.border,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: pressed ? 0.75 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u21BA", size: tokens.typography.scale.base, style: { color: colors.onSurface } }) })) : null] })] }));
}
//# sourceMappingURL=SessionTimerV4.js.map