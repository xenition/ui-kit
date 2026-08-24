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
exports.MortgageCalc = void 0;
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
const parseNum = (s) => {
    const v = parseFloat(s.replace(/[^0-9.]/g, ''));
    return Number.isFinite(v) ? v : 0;
};
/**
 * Web parity of the native `MortgageCalc`: an interactive mortgage estimator —
 * editable down-payment and interest-rate fields over a fixed home price,
 * computing the amortized monthly payment plus the financed loan amount. Fully
 * self-contained (no fetch); reports every recompute through `onChange`. Rate /
 * percent inputs are clamped and parsed defensively, and a zero rate falls back
 * to straight division (no divide-by-zero). All colors come from the `--xen-*`
 * tokens — no literal colors; money uses the shared `formatMoney`.
 */
exports.MortgageCalc = React.forwardRef(function MortgageCalc({ priceCents, currency = 'USD', downPercent = 20, ratePercent = 6.5, termYears = 30, title = 'Monthly payment', onChange, className, ...rest }, ref) {
    const [downPct, setDownPct] = React.useState(String(downPercent));
    const [ratePct, setRatePct] = React.useState(String(ratePercent));
    const down = clampPct(parseNum(downPct));
    const rate = parseNum(ratePct);
    const downCents = Math.round((priceCents * down) / 100);
    const loanCents = Math.max(priceCents - downCents, 0);
    const monthlyCents = monthlyPayment(loanCents, rate, termYears);
    const emit = React.useCallback((nextDownPct, nextRatePct) => {
        const d = Math.round((priceCents * clampPct(nextDownPct)) / 100);
        const loan = Math.max(priceCents - d, 0);
        onChange?.({
            monthlyCents: monthlyPayment(loan, nextRatePct, termYears),
            loanCents: loan,
            downCents: d,
        });
    }, [onChange, priceCents, termYears]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-3 border border-border bg-surface p-[var(--xen-space-lg)]', 'rounded-[var(--xen-radius-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: title }), (0, jsx_runtime_1.jsx)("span", { "aria-label": `Estimated monthly payment ${(0, commerce_1.formatMoney)(monthlyCents, currency)}`, className: "text-3xl font-bold text-on-surface", children: `${(0, commerce_1.formatMoney)(monthlyCents, currency)}/mo` }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Down %" }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { "data-testid": "xen-re-mortgage-down", inputMode: "decimal", value: downPct, onChange: (e) => {
                                    setDownPct(e.target.value);
                                    emit(parseNum(e.target.value), rate);
                                } })] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Rate %" }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { "data-testid": "xen-re-mortgage-rate", inputMode: "decimal", value: ratePct, onChange: (e) => {
                                    setRatePct(e.target.value);
                                    emit(down, parseNum(e.target.value));
                                } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `Loan ${(0, commerce_1.formatMoney)(loanCents, currency)}` }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${termYears} yr · ${(0, commerce_1.formatMoney)(downCents, currency)} down` })] })] }));
});
//# sourceMappingURL=MortgageCalc.js.map