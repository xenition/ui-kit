"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolutionTimerV4 = ResolutionTimerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SLABadgeV4_1 = require("./SLABadgeV4");
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
 * ResolutionTimer — **V4** "calm console" design (native twin, drop-in for
 * {@link ResolutionTimerProps}). A calm timer card: a big monospaced-feel
 * numeral (via `formatDuration`, `tabular-nums`) showing time left / overdue, a
 * soft-tint state pill (the V4 {@link SLABadgeV4}), and — when a target is
 * derivable — a subtle token progress hint that fills toward the deadline. State
 * is derived exactly as the base — `breached` once time is up, `at-risk` under
 * the configurable threshold, else `on-track` — and surfaced by glyph + color
 * (never color-only). Same props/behavior as the base; token-only colors via
 * `useXenitionTheme()` — no literal hex. Presentational (no internal ticking).
 */
function ResolutionTimerV4({ remainingSeconds, dueAt, now, atRiskThresholdSeconds = 900, label = 'Time to resolution', state, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const remaining = typeof remainingSeconds === 'number' && Number.isFinite(remainingSeconds)
        ? remainingSeconds
        : (toMs(dueAt, Date.now()) - toMs(now, Date.now())) / 1000;
    const threshold = Math.max(0, atRiskThresholdSeconds);
    const derived = state ?? (remaining <= 0 ? 'breached' : remaining <= threshold ? 'at-risk' : 'on-track');
    const overdue = remaining < 0;
    const timeText = (0, internal_1.formatDuration)(Math.abs(remaining));
    const prefix = overdue ? '-' : '';
    const hint = overdue ? 'over' : 'left';
    const numeralColor = derived === 'breached' ? colors.danger : derived === 'at-risk' ? colors.warn : colors.onSurface;
    const barColor = derived === 'breached' ? colors.danger : derived === 'at-risk' ? colors.warn : colors.primary;
    // Subtle progress hint toward the at-risk threshold window: empty when
    // comfortably on-track, filling as the deadline nears, full once breached.
    const progress = overdue ? 1 : threshold > 0 ? (0, internal_1.clamp)(1 - remaining / threshold, 0, 1) : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "timer", accessibilityLabel: `${label}: ${overdue ? 'overdue by ' : ''}${timeText} ${overdue ? '' : 'remaining'}`, style: [
            {
                gap: tokens.spacing.sm,
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                padding: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 2,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: numeralColor,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '700',
                            fontVariant: ['tabular-nums'],
                        }, children: [prefix, timeText] }), (0, jsx_runtime_1.jsx)(SLABadgeV4_1.SLABadgeV4, { state: derived, hint: hint, size: "sm" })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 6,
                    width: '100%',
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1),
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: '100%',
                        width: `${Math.round(progress * 100)}%`,
                        borderRadius: tokens.radius.full,
                        backgroundColor: barColor,
                    } }) })] }));
}
//# sourceMappingURL=ResolutionTimerV4.js.map