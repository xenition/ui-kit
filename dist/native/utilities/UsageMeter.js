"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageMeter = UsageMeter;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * A consumption gauge for one utility: current usage against an optional
 * allowance, drawn with the token-bound `Progress` bar. The fill tone escalates
 * by threshold (under `warnAt` → primary, over → warn, at/over cap → danger) and
 * the same escalation is echoed in a text percentage, so status is never
 * color-alone. Quantities run through `formatUsage` (fixed decimals, no `NaN`
 * leak) and a zero/absent allowance is guarded to avoid divide-by-zero. Every
 * color traces to a token.
 */
function UsageMeter({ kind, used, allowance = 0, unit, decimals = 0, period, warnAt = 0.8, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_2.Card, { style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading usage", style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: tokens.typography.scale.base,
                            width: '60%',
                            borderRadius: tokens.radius.sm,
                            backgroundColor: colors.border,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, borderRadius: tokens.radius.full, backgroundColor: colors.border } })] }) }));
    }
    const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
    const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
    const hasCap = cap > 0;
    const ratio = hasCap ? (0, format_1.clamp)(safeUsed / cap, 0, 1.5) : 0;
    const pct = Math.round(ratio * 100);
    const tone = !hasCap
        ? 'primary'
        : ratio >= 1
            ? 'danger'
            : ratio >= warnAt
                ? 'warn'
                : 'primary';
    const toneColor = tone === 'warn' ? colors.accent : colors[tone];
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "lg", accessibilityLabel: `${kd.label} usage` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: kd.label }), period != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: period })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: (0, format_1.formatUsage)(safeUsed, u, decimals) }), hasCap ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["of ", (0, format_1.formatUsage)(cap, u, decimals)] })) : null] })] }), hasCap ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Progress, { value: Math.min(pct, 100), max: 100, tone: tone }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: toneColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ratio >= 1 ? `Over allowance · ${(0, format_1.formatPct)(pct)}` : `${(0, format_1.formatPct)(pct)} of allowance` })] })) : null] }));
}
//# sourceMappingURL=UsageMeter.js.map