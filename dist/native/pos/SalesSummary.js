"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesSummary = SalesSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
const GradientSurface_1 = require("./internal/GradientSurface");
const register_1 = require("./internal/register");
/**
 * SalesSummary — the POS V4 "register" daily/shift **sales hero**. A confident
 * brand gradient (`registerGradient`) carries the `period` label, the **big
 * near-white gross numeral** (integer cents via `formatMoney`), and an optional
 * signed `deltaPct` pill vs the prior period. Transactions, net, and refunds read
 * as frosted glass stat tiles; `topItems` render as a compact frosted list. Every
 * color derives from the brand ramp via `useXenitionTheme()` — no literals, light
 * + dark safe.
 */
function SalesSummary({ grossCents, currency = 'USD', transactions, period = 'Today', netCents, refundsCents, topItems, deltaPct, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, register_1.registerInk)(r);
    const inkSoft = (0, register_1.registerInkSoft)(r);
    const gross = Math.max(0, Math.trunc(grossCents || 0));
    const hasDelta = typeof deltaPct === 'number' && Number.isFinite(deltaPct);
    const deltaUp = hasDelta && deltaPct >= 0;
    const items = topItems ?? [];
    const Stat = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: (0, register_1.registerTile)(r),
            borderWidth: 1,
            borderColor: (0, register_1.registerBorder)(r),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: value })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, register_1.registerGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: period }), hasDelta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${deltaUp ? 'Up' : 'Down'} ${Math.abs(deltaPct)} percent vs prior period`, style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.xs,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, register_1.registerTile)(r),
                                borderWidth: 1,
                                borderColor: (0, register_1.registerBorder)(r),
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: deltaUp ? '▲' : '▼' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: `${Math.abs(deltaPct)}%` })] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600', marginTop: tokens.spacing.md }, children: "Gross sales" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `Gross sales ${(0, internal_1.formatMoney)(gross, currency)}`, allowFontScaling: false, style: {
                        color: ink,
                        fontSize: tokens.typography.scale['3xl'] * 1.3,
                        fontWeight: '800',
                        letterSpacing: -1,
                        marginTop: 2,
                    }, children: (0, internal_1.formatMoney)(gross, currency) }), typeof transactions === 'number' || typeof netCents === 'number' || typeof refundsCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }, children: [typeof transactions === 'number' ? (0, jsx_runtime_1.jsx)(Stat, { label: "Transactions", value: String(Math.max(0, Math.trunc(transactions))) }) : null, typeof netCents === 'number' ? (0, jsx_runtime_1.jsx)(Stat, { label: "Net", value: (0, internal_1.formatMoney)(Math.trunc(netCents), currency) }) : null, typeof refundsCents === 'number' ? (0, jsx_runtime_1.jsx)(Stat, { label: "Refunds", value: (0, internal_1.formatMoney)(Math.max(0, Math.trunc(refundsCents)), currency) }) : null] })) : null, items.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        marginTop: tokens.spacing.lg,
                        padding: tokens.spacing.md,
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, register_1.registerTile)(r),
                        borderWidth: 1,
                        borderColor: (0, register_1.registerBorder)(r),
                        gap: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Top items" }), items.map((it, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, minWidth: 0, color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: it.name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: `×${Math.max(0, Math.trunc(it.count))}` })] }, `${it.name}-${i}`)))] })) : null] }) }));
}
//# sourceMappingURL=SalesSummary.js.map