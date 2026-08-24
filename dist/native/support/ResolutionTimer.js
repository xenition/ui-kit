"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolutionTimer = ResolutionTimer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SLABadge_1 = require("./SLABadge");
const internal_1 = require("./internal");
function toMs(value, fallback) {
    if (value === undefined)
        return fallback;
    if (typeof value === 'number')
        return value;
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? fallback : parsed;
}
/**
 * A resolution/SLA countdown. Given a signed `remainingSeconds` (or a `dueAt` +
 * `now` pair) it renders the formatted time left / overdue and derives the SLA
 * state — `breached` once time is up, `at-risk` under the configurable
 * threshold, else `on-track` — surfaced through the glyph+text `SLABadge` so the
 * state is never color-only. Pure/presentational (no internal ticking); the app
 * re-renders with a fresh value. Token colors only.
 */
function ResolutionTimer({ remainingSeconds, dueAt, now, atRiskThresholdSeconds = 900, label = 'Time to resolution', state, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const remaining = typeof remainingSeconds === 'number' && Number.isFinite(remainingSeconds)
        ? remainingSeconds
        : (toMs(dueAt, Date.now()) - toMs(now, Date.now())) / 1000;
    const derived = state ??
        (remaining <= 0 ? 'breached' : remaining <= Math.max(0, atRiskThresholdSeconds) ? 'at-risk' : 'on-track');
    const overdue = remaining < 0;
    const timeText = (0, internal_1.formatDuration)(Math.abs(remaining));
    const prefix = overdue ? '-' : '';
    const hint = overdue ? 'over' : 'left';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "timer", accessibilityLabel: `${label}: ${overdue ? 'overdue by ' : ''}${timeText} ${overdue ? '' : 'remaining'}`, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: derived === 'breached' ? colors.danger : derived === 'at-risk' ? colors.warn : colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                            fontVariant: ['tabular-nums'],
                        }, children: [prefix, timeText] }), (0, jsx_runtime_1.jsx)(SLABadge_1.SLABadge, { state: derived, hint: hint, size: "sm" })] })] }));
}
//# sourceMappingURL=ResolutionTimer.js.map