"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostBreakdown = CostBreakdown;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const TONE_CYCLE = ['primary', 'accent', 'success', 'warn', 'danger'];
/**
 * Where the bill goes — the clean, trust-first breakdown card: the title + the
 * summed total (integer cents via `formatMoney`), a single horizontal stacked
 * bar whose segments are widthed by each slice's share, and a legend listing a
 * tone dot, the label, the amount, and its `formatPct` share. Color-coding is
 * meaningful here — each slice carries a soft, semantic tone. Token-only colors.
 */
function CostBreakdown({ title = 'Cost breakdown', slices, currency = 'USD', formatMoney: format = format_1.formatMoney, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const items = slices.map((s, i) => ({
        label: s.label,
        amount: Math.max(0, Math.trunc(s.amountCents || 0)),
        tone: (s.tone ?? TONE_CYCLE[i % TONE_CYCLE.length]),
    }));
    const total = items.reduce((sum, s) => sum + s.amount, 0);
    const share = (amount) => (total > 0 ? (amount / total) * 100 : 0);
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, style], accessibilityLabel: `${title}, total ${format(total, currency)}`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: "Total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: format(total, currency) })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    flexDirection: 'row',
                    height: 12,
                    borderRadius: tokens.radius.full,
                    overflow: 'hidden',
                    marginTop: tokens.spacing.lg,
                    backgroundColor: colors.muted,
                }, children: items.map((s, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${share(s.amount)}%`, height: '100%', backgroundColor: colors[s.tone] } }, `${s.label}-${i}`))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.lg, gap: tokens.spacing.md }, children: items.map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${s.label}, ${format(s.amount, currency)}, ${(0, format_1.formatPct)(share(s.amount))}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors[s.tone] } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, numberOfLines: 1, children: s.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: (0, format_1.formatPct)(share(s.amount)) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', minWidth: 64, textAlign: 'right' }, children: format(s.amount, currency) })] }, `${s.label}-${i}`))) })] }));
}
//# sourceMappingURL=CostBreakdown.js.map