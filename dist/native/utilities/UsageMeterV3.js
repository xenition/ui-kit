"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageMeterV3 = UsageMeterV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * UsageMeter, redesigned (v3): a **slim inline bar**. A one-line header pairs the
 * utility glyph + label on the left with a right-aligned percent, then a single
 * thin `Progress` track carries the fill; a tiny used / allowance caption sits
 * under it. No card, no ring — the most compact of the three, for stacking many
 * meters in a list. The fill tone escalates by threshold and is echoed in the
 * percent text so status is never color-alone; a zero / absent allowance is
 * guarded. Same props, `formatUsage` quantities, token-pure.
 */
function UsageMeterV3({ kind, used, allowance = 0, unit, decimals = 0, period, warnAt = 0.8, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading usage", style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: tokens.typography.scale.sm,
                        width: '40%',
                        borderRadius: tokens.radius.sm,
                        backgroundColor: colors.border,
                    } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.border } })] }));
    }
    const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
    const cap = Number.isFinite(allowance) ? Math.max(0, allowance) : 0;
    const hasCap = cap > 0;
    const ratio = hasCap ? (0, format_1.clamp)(safeUsed / cap, 0, 1.5) : 0;
    const pct = Math.round(ratio * 100);
    const tone = !hasCap ? 'primary' : ratio >= 1 ? 'danger' : ratio >= warnAt ? 'warn' : 'primary';
    const toneColor = tone === 'warn' ? colors.accent : colors[tone];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "sm", accessibilityLabel: `${kd.label} usage` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: kd.label }), period != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", period] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }), hasCap ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: toneColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, format_1.formatPct)(pct) })) : null] }), hasCap ? (0, jsx_runtime_1.jsx)(primitives_2.Progress, { value: Math.min(pct, 100), max: 100, tone: tone }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: hasCap
                    ? `${(0, format_1.formatUsage)(safeUsed, u, decimals)} of ${(0, format_1.formatUsage)(cap, u, decimals)}`
                    : (0, format_1.formatUsage)(safeUsed, u, decimals) })] }));
}
//# sourceMappingURL=UsageMeterV3.js.map