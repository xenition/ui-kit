"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioSummaryV3 = PortfolioSummaryV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
/** Same cycled palette DonutChart uses, so the bar segments match a donut view. */
const PALETTE = ['primary', 'accent', 'success', 'warn', 'danger'];
/** Change → contrast-safe TEXT slot (gains `successText`, losses `dangerText`). */
function changeToneTextKey(delta) {
    const safe = Number.isFinite(delta) ? delta : 0;
    if (safe > 0)
        return 'successText';
    if (safe < 0)
        return 'dangerText';
    return 'muted';
}
/**
 * PortfolioSummary, redesigned (v3): a **minimal, total-first** block. The total
 * leads big through {@link MoneyAmount} (integer cents — no drift) with an inline
 * ▲/▼ change, then a single compact **stacked allocation bar** replaces the
 * donut, with a small dot legend beneath. No card, no chart deps — a lean
 * header. Distinct at a glance from v1's donut card and v2's hero band. Same
 * props; an empty or all-zero allocation simply hides the bar.
 */
function PortfolioSummaryV3({ totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const textTone = changeToneTextKey(changePct ?? changeCents ?? 0);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading portfolio", style: { height: 56, borderRadius: tokens.radius.md, backgroundColor: colors.border, opacity: 0.5 } }) }));
    }
    const allocTotal = allocations.reduce((sum, a) => sum + Math.max(a.value, 0), 0);
    const hasChange = changeCents != null || changePct != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Total balance" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: totalCents, currency: currency, tone: "neutral", size: "xl" }), hasChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[textTone], fontSize: tokens.typography.scale.sm }, children: (0, format_1.changeGlyph)(changePct ?? changeCents ?? 0) }), changeCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: changeCents, currency: currency, tone: textTone === 'muted' ? 'neutral' : textTone === 'successText' ? 'income' : 'expense', size: "sm", signDisplay: "always" })) : null, changePct != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct))}`, style: { color: colors[textTone], fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatPct)(changePct) })) : null] })) : null] })] }), allocations.length > 0 && allocTotal > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Allocation across ${allocations.length} assets`, style: { flexDirection: 'row', height: 10, borderRadius: tokens.radius.full, overflow: 'hidden', backgroundColor: tokens.ramps.neutral[100] }, children: allocations.map((a, i) => {
                            const swatch = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
                            const share = Math.max(a.value, 0) / allocTotal;
                            if (share <= 0)
                                return null;
                            return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: share, backgroundColor: colors[swatch] } }, `${a.label}-${i}`);
                        }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }, children: allocations.map((a, i) => {
                            const swatch = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
                            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: colors[swatch] } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: a.label })] }, `${a.label}-${i}`));
                        }) })] })) : null] }));
}
//# sourceMappingURL=PortfolioSummaryV3.js.map