"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MortgageCalcV4 = MortgageCalcV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Standard amortized monthly payment. Guards a zero rate (straight division). */
function monthlyPayment(loanCents, annualRatePct, termYears) {
    const n = Math.max(termYears, 1) * 12;
    const r = annualRatePct / 100 / 12;
    if (r <= 0)
        return Math.round(loanCents / n);
    const factor = Math.pow(1 + r, n);
    return Math.round((loanCents * r * factor) / (factor - 1));
}
const clampPct = (n) => (n < 0 ? 0 : n > 100 ? 100 : n);
/**
 * MortgageCalc — **V4** "listing" design. The editorial, price-forward take on
 * the estimator: the computed **monthly payment as a big numeral** up top, then
 * soft-primary sliders for down-payment and interest rate over a fixed home
 * price, and a small principal-vs-interest breakdown bar beneath. Same
 * props/behavior as {@link MortgageCalcProps} — the compute logic and `onChange`
 * estimate are preserved; a zero rate falls back to straight division. Token-only
 * colors via `useXenitionTheme()`; the money display uses the shared `formatMoney`.
 */
function MortgageCalcV4({ priceCents, currency = 'USD', downPercent = 20, ratePercent = 6.5, termYears = 30, title = 'Monthly payment', onChange, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const [down, setDown] = React.useState(clampPct(downPercent));
    const [rate, setRate] = React.useState(ratePercent);
    const downCents = Math.round((priceCents * down) / 100);
    const loanCents = Math.max(priceCents - downCents, 0);
    const monthlyCents = monthlyPayment(loanCents, rate, termYears);
    // Principal-vs-interest split over the life of the loan, for the breakdown bar.
    const totalPaidCents = monthlyCents * Math.max(termYears, 1) * 12;
    const interestCents = Math.max(totalPaidCents - loanCents, 0);
    const principalPct = totalPaidCents > 0 ? Math.round((loanCents / totalPaidCents) * 100) : 0;
    const emit = React.useCallback((nextDownPct, nextRatePct) => {
        const d = Math.round((priceCents * clampPct(nextDownPct)) / 100);
        const loan = Math.max(priceCents - d, 0);
        const estimate = {
            monthlyCents: monthlyPayment(loan, nextRatePct, termYears),
            loanCents: loan,
            downCents: d,
        };
        onChange?.(estimate);
    }, [onChange, priceCents, termYears]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityLabel: `Estimated monthly payment ${(0, primitives_1.formatMoney)(monthlyCents, currency)}`, style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: [(0, primitives_1.formatMoney)(monthlyCents, currency), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: "/mo" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Down payment" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: `${Math.round(down)}%` })] }), (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: down, min: 0, max: 100, step: 1, onValueChange: (v) => {
                            const next = clampPct(v);
                            setDown(next);
                            emit(next, rate);
                        } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Interest rate" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: `${rate.toFixed(2)}%` })] }), (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: rate, min: 0, max: 15, step: 0.05, onValueChange: (v) => {
                            setRate(v);
                            emit(down, v);
                        } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Principal ${principalPct} percent of total paid, interest ${100 - principalPct} percent`, style: {
                            flexDirection: 'row',
                            height: 8,
                            borderRadius: tokens.radius.full,
                            overflow: 'hidden',
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${principalPct}%`, height: '100%', backgroundColor: colors.primary } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `Principal ${(0, primitives_1.formatMoney)(loanCents, currency)}` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `Interest ${(0, primitives_1.formatMoney)(interestCents, currency)}` })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `Loan ${(0, primitives_1.formatMoney)(loanCents, currency)}` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${termYears} yr · ${(0, primitives_1.formatMoney)(downCents, currency)} down` })] })] }));
}
//# sourceMappingURL=MortgageCalcV4.js.map