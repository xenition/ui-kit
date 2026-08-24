"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageMeterV2 = UsageMeterV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const charts_1 = require("../charts");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * UsageMeter, redesigned (v2): a **big gauge ring**. A large `ProgressRing`
 * centers the period's usage as a percent of allowance, escalating its arc color
 * by threshold (under `warnAt` → primary, over → accent, at/over cap → danger);
 * the utility line and the used / allowance figures stack centered beneath it,
 * with a redundant escalation caption so status is never color-alone. A zero /
 * absent allowance is guarded (no divide-by-zero) and shows the raw usage in the
 * ring instead. Distinct at a glance from v1's inline bar and v3's slim bar. Same
 * props, `formatUsage` quantities, token-pure.
 */
function UsageMeterV2({ kind, used, allowance = 0, unit, decimals = 0, period, warnAt = 0.8, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_2.Card, { style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading usage", style: { alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 140, height: 140, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: tokens.typography.scale.base,
                            width: '50%',
                            borderRadius: tokens.radius.sm,
                            backgroundColor: colors.border,
                        } })] }) }));
    }
    const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
    const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
    const hasCap = cap > 0;
    const ratio = hasCap ? (0, format_1.clamp)(safeUsed / cap, 0, 1.5) : 0;
    const pct = Math.round(ratio * 100);
    const ringColor = !hasCap
        ? 'primary'
        : ratio >= 1
            ? 'danger'
            : ratio >= warnAt
                ? 'accent'
                : 'primary';
    const toneColor = colors[ringColor];
    return ((0, jsx_runtime_1.jsx)(primitives_2.Card, { style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: hasCap ? Math.min(pct, 100) : 0, max: 100, size: 140, strokeWidth: 14, color: ringColor, showPercent: false, label: hasCap ? (0, format_1.formatPct)(pct) : (0, format_1.formatUsage)(safeUsed, u, decimals), accessibilityLabel: hasCap ? `${kd.label} usage, ${(0, format_1.formatPct)(pct)} of allowance` : `${kd.label} usage, ${(0, format_1.formatUsage)(safeUsed, u, decimals)}` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "base", accessibilityLabel: `${kd.label} usage` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: kd.label })] }), period != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: period })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: [(0, format_1.formatUsage)(safeUsed, u, decimals), hasCap ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted }, children: [" of ", (0, format_1.formatUsage)(cap, u, decimals)] })) : null] }), hasCap ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: toneColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ratio >= 1 ? `Over allowance · ${(0, format_1.formatPct)(pct)}` : `${(0, format_1.formatPct)(pct)} of allowance` })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No allowance set" }))] })] }) }));
}
//# sourceMappingURL=UsageMeterV2.js.map