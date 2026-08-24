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
exports.QuoteForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Field_1 = require("../primitives/Field");
const Select_1 = require("../primitives/Select");
const Input_1 = require("../primitives/Input");
const Button_1 = require("../primitives/Button");
const Spinner_1 = require("../primitives/Spinner");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/** Parse a decimal-dollars string into integer cents (guards NaN). */
function toCents(text) {
    const n = Number.parseFloat(text.replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? Math.round(n * 100) : 0;
}
const DEFAULT_DEDUCTIBLES = [50000, 100000, 250000];
/**
 * A compact "get a quote" form: pick an insurance line, enter a coverage
 * amount, choose a deductible, and submit. Controlled via `variant`/
 * `coverageCents`/`deductibleCents` or self-managed from internal state.
 * Coverage is entered in dollars and emitted as integer **cents**, so the value
 * bag never carries a float. Submit is blocked (a no-op) until a line and a
 * positive coverage are set. Composed from the web `Field`/`Select`/`Input`/
 * `Button` primitives — token-only, no literal colors. Web parity of the native
 * `QuoteForm` (`loading` shows an inline `Spinner`, since the web `Button` has
 * no `loading` prop).
 */
exports.QuoteForm = React.forwardRef(function QuoteForm({ variants = ['auto', 'home', 'life', 'health'], deductibleOptions = DEFAULT_DEDUCTIBLES, variant: variantProp, coverageCents: coverageProp, deductibleCents: deductibleProp, currency = 'USD', submitLabel = 'Get quote', loading = false, onChange, onSubmit, className, ...rest }, ref) {
    const lines = variants.length > 0 ? variants : ['auto'];
    const deductibles = deductibleOptions.length > 0 ? deductibleOptions : DEFAULT_DEDUCTIBLES;
    const [variant, setVariant] = React.useState(variantProp);
    const [coverageText, setCoverageText] = React.useState(coverageProp != null ? String(coverageProp / 100) : '');
    const [deductibleCents, setDeductibleCents] = React.useState(deductibleProp ?? deductibles[0] ?? 0);
    const effVariant = variantProp ?? variant;
    const effCoverage = coverageProp != null ? coverageProp : toCents(coverageText);
    const effDeductible = deductibleProp != null ? deductibleProp : deductibleCents;
    const emit = (next) => {
        onChange?.({
            variant: next.variant ?? effVariant ?? lines[0],
            coverageCents: next.coverageCents ?? effCoverage,
            deductibleCents: next.deductibleCents ?? effDeductible,
        });
    };
    const isValid = effVariant != null && effCoverage > 0;
    const submit = (event) => {
        event.preventDefault();
        if (!isValid || loading)
            return;
        onSubmit?.({
            variant: effVariant,
            coverageCents: effCoverage,
            deductibleCents: effDeductible,
        });
    };
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { children: (0, jsx_runtime_1.jsxs)("form", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), onSubmit: submit, ...rest, children: [(0, jsx_runtime_1.jsx)(Field_1.Field, { label: "Insurance type", required: true, htmlFor: "quote-variant", children: (0, jsx_runtime_1.jsxs)(Select_1.Select, { id: "quote-variant", value: effVariant ?? '', "aria-label": "Insurance type", onChange: (event) => {
                            const v = event.target.value;
                            setVariant(v);
                            emit({ variant: v });
                        }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: "Choose a policy type" }), lines.map((v) => ((0, jsx_runtime_1.jsx)("option", { value: v, children: status_1.POLICY_VARIANT[v]?.label ?? v }, v)))] }) }), (0, jsx_runtime_1.jsx)(Field_1.Field, { label: "Coverage amount", required: true, hint: "Enter the benefit amount in dollars", htmlFor: "quote-coverage", children: (0, jsx_runtime_1.jsx)(Input_1.Input, { id: "quote-coverage", inputMode: "decimal", placeholder: "0.00", value: coverageText, "aria-label": "Coverage amount", onChange: (event) => {
                            const t = event.target.value;
                            setCoverageText(t);
                            emit({ coverageCents: toCents(t) });
                        } }) }), (0, jsx_runtime_1.jsx)(Field_1.Field, { label: "Deductible", htmlFor: "quote-deductible", children: (0, jsx_runtime_1.jsx)(Select_1.Select, { id: "quote-deductible", value: String(effDeductible), "aria-label": "Deductible", onChange: (event) => {
                            const c = Number.parseInt(event.target.value, 10) || 0;
                            setDeductibleCents(c);
                            emit({ deductibleCents: c });
                        }, children: deductibles.map((c) => ((0, jsx_runtime_1.jsx)("option", { value: String(c), children: (0, format_1.formatMoney)(c, currency) }, c))) }) }), (0, jsx_runtime_1.jsxs)(Button_1.Button, { type: "submit", variant: "primary", disabled: !isValid || loading, "aria-busy": loading || undefined, children: [loading ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm", className: "mr-2" }) : null, submitLabel] })] }) }));
});
//# sourceMappingURL=QuoteForm.js.map