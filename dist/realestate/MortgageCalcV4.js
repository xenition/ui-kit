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
exports.MortgageCalcV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
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
 * MortgageCalc — **V4** "listing" design (web parity of the native V4). The
 * editorial, price-forward take on the estimator: the computed **monthly
 * payment as a big numeral** up top, then soft-primary sliders for down-payment
 * and interest rate over a fixed home price, and a small principal-vs-interest
 * breakdown bar beneath. Same props/behavior as {@link MortgageCalcProps} — the
 * compute logic and `onChange` estimate are preserved; a zero rate falls back to
 * straight division (no divide-by-zero). All colors from `--xen-*` token classes
 * (no literals); money uses the shared `formatMoney`.
 */
exports.MortgageCalcV4 = React.forwardRef(function MortgageCalcV4({ priceCents, currency = 'USD', downPercent = 20, ratePercent = 6.5, termYears = 30, title = 'Monthly payment', onChange, className, ...rest }, ref) {
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: title }), (0, jsx_runtime_1.jsxs)("span", { "aria-label": `Estimated monthly payment ${(0, commerce_1.formatMoney)(monthlyCents, currency)}`, className: "text-4xl font-bold leading-none text-on-surface", children: [`${(0, commerce_1.formatMoney)(monthlyCents, currency)}`, (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-muted", children: "/mo" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex justify-between text-sm text-muted", children: [(0, jsx_runtime_1.jsx)("span", { children: "Down payment" }), (0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-on-surface", children: `${Math.round(down)}%` })] }), (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: down, min: 0, max: 100, step: 1, onChange: (v) => {
                            const next = clampPct(v);
                            setDown(next);
                            emit(next, rate);
                        } })] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex justify-between text-sm text-muted", children: [(0, jsx_runtime_1.jsx)("span", { children: "Interest rate" }), (0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-on-surface", children: `${rate.toFixed(2)}%` })] }), (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: rate, min: 0, max: 15, step: 0.05, onChange: (v) => {
                            setRate(v);
                            emit(down, v);
                        } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-2 overflow-hidden rounded-full bg-primary/10", role: "img", "aria-label": `Principal ${principalPct} percent of total paid, interest ${100 - principalPct} percent`, children: (0, jsx_runtime_1.jsx)("div", { className: "h-full bg-primary", style: { width: `${principalPct}%` } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { children: `Principal ${(0, commerce_1.formatMoney)(loanCents, currency)}` }), (0, jsx_runtime_1.jsx)("span", { children: `Interest ${(0, commerce_1.formatMoney)(interestCents, currency)}` })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `Loan ${(0, commerce_1.formatMoney)(loanCents, currency)}` }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${termYears} yr · ${(0, commerce_1.formatMoney)(downCents, currency)} down` })] })] }));
});
//# sourceMappingURL=MortgageCalcV4.js.map