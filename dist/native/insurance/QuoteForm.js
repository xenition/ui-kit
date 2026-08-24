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
exports.QuoteForm = QuoteForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
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
 * positive coverage are set. Composed from the native `Field`/`Select`/`Input`/
 * `Button` primitives — token-only, no literal colors.
 */
function QuoteForm({ variants = ['auto', 'home', 'life', 'health'], deductibleOptions = DEFAULT_DEDUCTIBLES, variant: variantProp, coverageCents: coverageProp, deductibleCents: deductibleProp, currency = 'USD', submitLabel = 'Get quote', loading = false, onChange, onSubmit, style, }) {
    const { tokens } = (0, primitives_1.useXenitionTheme)();
    const lines = variants.length > 0 ? variants : ['auto'];
    const deductibles = deductibleOptions.length > 0 ? deductibleOptions : DEFAULT_DEDUCTIBLES;
    const [variant, setVariant] = React.useState(variantProp);
    const [coverageText, setCoverageText] = React.useState(coverageProp != null ? String(coverageProp / 100) : '');
    const [deductibleCents, setDeductibleCents] = React.useState(deductibleProp ?? deductibles[0] ?? 0);
    const effVariant = variantProp ?? variant;
    const effCoverage = coverageProp != null ? coverageProp : toCents(coverageText);
    const effDeductible = deductibleProp != null ? deductibleProp : deductibleCents;
    const emit = React.useCallback((next) => {
        onChange?.({
            variant: next.variant ?? effVariant ?? lines[0],
            coverageCents: next.coverageCents ?? effCoverage,
            deductibleCents: next.deductibleCents ?? effDeductible,
        });
    }, [onChange, effVariant, effCoverage, effDeductible, lines]);
    const variantOptions = lines.map((v) => ({
        value: v,
        label: status_1.POLICY_VARIANT[v]?.label ?? v,
    }));
    const deductibleSelectOptions = deductibles.map((c) => ({
        value: String(c),
        label: (c / 100).toLocaleString(undefined, { style: 'currency', currency }),
    }));
    const isValid = effVariant != null && effCoverage > 0;
    const submit = () => {
        if (!isValid || loading)
            return;
        onSubmit?.({
            variant: effVariant,
            coverageCents: effCoverage,
            deductibleCents: effDeductible,
        });
    };
    return ((0, jsx_runtime_1.jsx)(primitives_2.Card, { style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Field, { label: "Insurance type", required: true, children: (0, jsx_runtime_1.jsx)(primitives_2.Select, { options: variantOptions, value: effVariant, placeholder: "Choose a policy type", onValueChange: (v) => {
                            setVariant(v);
                            emit({ variant: v });
                        } }) }), (0, jsx_runtime_1.jsx)(primitives_2.Field, { label: "Coverage amount", required: true, hint: "Enter the benefit amount in dollars", children: (0, jsx_runtime_1.jsx)(primitives_2.Input, { keyboardType: "numeric", placeholder: "0.00", value: coverageText, accessibilityLabel: "Coverage amount", onChangeText: (t) => {
                            setCoverageText(t);
                            emit({ coverageCents: toCents(t) });
                        } }) }), (0, jsx_runtime_1.jsx)(primitives_2.Field, { label: "Deductible", children: (0, jsx_runtime_1.jsx)(primitives_2.Select, { options: deductibleSelectOptions, value: String(effDeductible), onValueChange: (v) => {
                            const c = Number.parseInt(v, 10) || 0;
                            setDeductibleCents(c);
                            emit({ deductibleCents: c });
                        } }) }), (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "primary", onPress: submit, disabled: !isValid, loading: loading, children: submitLabel })] }) }));
}
//# sourceMappingURL=QuoteForm.js.map