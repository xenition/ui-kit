"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionTimer = SessionTimer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const TONE_KEY = {
    primary: 'primary',
    accent: 'accent',
    success: 'success',
};
function fmt(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
}
/**
 * A meditation session countdown: a large mm:ss readout, an elapsed progress
 * bar, a play / pause toggle, and an optional reset. When `remainingSec` hits 0
 * it shows a "Complete" state instead of the toggle. Play state drives the
 * toggle glyph and its a11y label (state, not color alone). Guards a
 * non-positive `totalSec`. Token-only colors (semantic slots + a `withAlpha`
 * tint).
 */
function SessionTimer({ totalSec, remainingSec, running = false, phaseLabel, tone = 'primary', onToggle, onReset, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = colors[TONE_KEY[tone] ?? 'primary'];
    const total = Math.max(0, totalSec);
    const remaining = Math.min(Math.max(remainingSec, 0), total || remainingSec);
    const elapsed = Math.max(0, total - remaining);
    const complete = total > 0 && remaining <= 0;
    const progressTone = tone === 'accent' ? 'primary' : tone;
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
        ], children: [phaseLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: phaseLabel })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: complete ? colors.success : colors.onSurface,
                    fontSize: tokens.typography.scale['3xl'],
                    fontWeight: '800',
                    fontFamily: tokens.typography.fontHeading,
                }, children: fmt(remaining) }), total > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: elapsed, max: total, tone: progressTone, size: "sm" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [complete ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "\u2713 Complete" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: running }, accessibilityLabel: running ? 'Pause' : 'Play', onPress: () => onToggle?.(!running), style: ({ pressed }) => ({
                            width: 56,
                            height: 56,
                            borderRadius: tokens.radius.full,
                            backgroundColor: accent,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: pressed ? 0.8 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg, color: colors.onPrimary }, children: running ? '⏸' : '▶' }) })), onReset ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Reset", onPress: onReset, style: ({ pressed }) => ({
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.14),
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: pressed ? 0.75 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, color: colors.onSurface }, children: "\u21BA" }) })) : null] })] }));
}
//# sourceMappingURL=SessionTimer.js.map