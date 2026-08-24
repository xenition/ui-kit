"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetainerBalance = RetainerBalance;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
function deriveStatus(balanceCents, low) {
    if (balanceCents <= 0)
        return 'depleted';
    if (balanceCents <= low)
        return 'low';
    return 'healthy';
}
/**
 * Trust / retainer balance meter: the current balance carried as integer
 * **cents** and rendered through the shared `formatMoney`, a fill meter against
 * the initial retainer, and a health pill (glyph + word so status never rests on
 * color alone). Status is derived from the balance vs. a low-water threshold
 * unless explicitly overridden. A "Replenish" action surfaces when funds run
 * low. All colors are theme tokens — no literals.
 */
function RetainerBalance({ balanceCents, initialCents, lowThresholdCents = 0, currency = 'USD', status, label, loading = false, variant = 'default', onReplenish, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
    const statusMeta = internal_1.RETAINER_STATUS_META[resolved];
    const fillColor = (0, internal_1.toneColor)(colors, statusMeta.tone);
    const pct = initialCents && initialCents > 0
        ? (0, internal_1.clampPct)(Math.round((Math.max(0, balanceCents) / initialCents) * 100))
        : undefined;
    const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');
    const body = ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm }, style], testID: testID, children: loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading retainer", style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.xs, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale['2xl'], width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, width: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.border } })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label ?? 'Retainer balance' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: (0, internal_1.formatMoney)(balanceCents, currency) }), !compact && initialCents ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["of ", (0, internal_1.formatMoney)(initialCents, currency), " initial"] })) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: statusMeta, size: "sm" })] }), pct != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: pct }, accessibilityLabel: `${statusMeta.label}, ${pct}% remaining`, style: { height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: fillColor } }) })) : null, showReplenish ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onPress: onReplenish, style: { alignSelf: 'flex-start' }, children: "Replenish" })) : null] })) }));
    return body;
}
//# sourceMappingURL=RetainerBalance.js.map