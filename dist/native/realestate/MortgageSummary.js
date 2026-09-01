"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MortgageSummary = MortgageSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const listing_1 = require("./internal/listing");
/** Near-white opacity step per tone — keeps every fill token-derived and legible on the gradient. */
const TONE_ALPHA = {
    primary: 1,
    accent: 0.7,
    warn: 0.45,
    success: 0.25,
};
/**
 * MortgageSummary — a brand-gradient mortgage-results hero for the real-estate V4
 * "listing" line. A big near-white monthly payment numeral sits on the brand
 * gradient (`listingGradient`); the `breakdown` renders as a single stacked bar
 * of near-white opacity steps plus frosted legend tiles, and the down/rate/term
 * lines read as frosted chips. Presentational — shaped data only, nothing fetches
 * or computes amortization. Money is integer cents via `formatMoney`. Token-only
 * colors via `useXenitionTheme()` + the listing ramp helpers, dark-mode safe.
 */
function MortgageSummary({ monthlyCents, currency = 'USD', breakdown, downLabel, rateLabel, termLabel, style, }) {
    const { tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, listing_1.listingInk)(r);
    const inkSoft = (0, listing_1.listingInkSoft)(r);
    const monthly = Math.max(0, Math.trunc(monthlyCents || 0));
    const segments = (breakdown ?? []).filter((b) => Math.trunc(b.cents || 0) > 0);
    const total = segments.reduce((sum, b) => sum + Math.trunc(b.cents), 0);
    const fillFor = (tone) => (0, color_1.withAlpha)(r.primary[50], TONE_ALPHA[tone]);
    const chips = [];
    if (downLabel)
        chips.push(downLabel);
    if (rateLabel)
        chips.push(rateLabel);
    if (termLabel)
        chips.push(termLabel);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, listing_1.listingGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Estimated monthly payment" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { allowFontScaling: false, accessibilityLabel: `Estimated monthly payment ${(0, primitives_1.formatMoney)(monthly, currency)} per month`, style: { color: ink, fontSize: tokens.typography.scale['3xl'] * 1.15, fontWeight: '800', letterSpacing: -1 }, children: [`${(0, primitives_1.formatMoney)(monthly, currency)}`, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: "/mo" })] })] }), segments.length > 0 && total > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: "Payment breakdown", style: {
                                flexDirection: 'row',
                                height: 12,
                                borderRadius: tokens.radius.full,
                                overflow: 'hidden',
                                backgroundColor: (0, listing_1.listingTile)(r),
                            }, children: segments.map((b) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${(Math.trunc(b.cents) / total) * 100}%`, backgroundColor: fillFor(b.tone ?? 'primary') } }, b.label))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: segments.map((b) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexBasis: '47%',
                                    flexGrow: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: tokens.spacing.sm,
                                    paddingHorizontal: tokens.spacing.md,
                                    paddingVertical: tokens.spacing.sm,
                                    borderRadius: tokens.radius.md,
                                    backgroundColor: (0, listing_1.listingTile)(r),
                                    borderWidth: 1,
                                    borderColor: (0, listing_1.listingBorder)(r),
                                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 12, height: 12, borderRadius: tokens.radius.full, backgroundColor: fillFor(b.tone ?? 'primary') } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: b.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, primitives_1.formatMoney)(Math.trunc(b.cents), currency) })] })] }, b.label))) })] })) : null, chips.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: chips.map((c) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, listing_1.listingTile)(r),
                            borderWidth: 1,
                            borderColor: (0, listing_1.listingBorder)(r),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: c }) }, c))) })) : null] }) }));
}
//# sourceMappingURL=MortgageSummary.js.map