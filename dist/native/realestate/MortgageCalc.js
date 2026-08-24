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
exports.MortgageCalc = MortgageCalc;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
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
 * Interactive mortgage estimator — editable down-payment and interest-rate
 * fields over a fixed home price, computing the amortized monthly payment plus
 * the financed loan amount. Fully self-contained (no fetch); reports every
 * recompute through `onChange`. Rate/percent inputs are clamped and parsed
 * defensively, and a zero rate falls back to straight division. Token-only
 * colors; the money display uses the shared `formatMoney`.
 */
function MortgageCalc({ priceCents, currency = 'USD', downPercent = 20, ratePercent = 6.5, termYears = 30, title = 'Monthly payment', onChange, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
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
        onChange?.({ monthlyCents: monthlyPayment(loan, nextRatePct, termYears), loanCents: loan, downCents: d });
    }, [onChange, priceCents, termYears]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `Estimated monthly payment ${(0, primitives_1.formatMoney)(monthlyCents, currency)}`, style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: `${(0, primitives_1.formatMoney)(monthlyCents, currency)}/mo` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Input, { label: "Down %", testID: "xen-re-mortgage-down", keyboardType: "numeric", value: downPct, containerStyle: { flex: 1 }, onChangeText: (t) => {
                            setDownPct(t);
                            emit(parseNum(t), rate);
                        } }), (0, jsx_runtime_1.jsx)(primitives_1.Input, { label: "Rate %", testID: "xen-re-mortgage-rate", keyboardType: "numeric", value: ratePct, containerStyle: { flex: 1 }, onChangeText: (t) => {
                            setRatePct(t);
                            emit(down, parseNum(t));
                        } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `Loan ${(0, primitives_1.formatMoney)(loanCents, currency)}` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${termYears} yr · ${(0, primitives_1.formatMoney)(downCents, currency)} down` })] })] }));
}
//# sourceMappingURL=MortgageCalc.js.map