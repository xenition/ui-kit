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
exports.QuoteFormV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const FieldV4_1 = require("../primitives/FieldV4");
const SelectV4_1 = require("../primitives/SelectV4");
const InputV4_1 = require("../primitives/InputV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const SpinnerV4_1 = require("../primitives/SpinnerV4");
const money_1 = require("../commerce/money");
const status_1 = require("./internal/status");
const tone_v4_1 = require("./internal/tone-v4");
const DEFAULT_DEDUCTIBLES = [50000, 100000, 250000];
/** What this locale writes between the units and the cents. */
function decimalMark(locale) {
    const parts = new Intl.NumberFormat(locale).formatToParts(1.1);
    return parts.find((part) => part.type === 'decimal')?.value ?? '.';
}
/**
 * Read a typed amount as integer cents.
 *
 * The base stripped everything but digits and dots and `parseFloat`ed what was
 * left, so `1000,50` — how most of Europe writes a thousand and a half —
 * became `100050`, and the form submitted a quote for **$100,050** against a
 * field reading `1000,50`. Off by a hundred, silently, on the number the
 * premium is priced from.
 *
 * The rule here is the one every payment field ends up at: the **last**
 * separator is the decimal mark when both kinds appear, because grouping never
 * follows the decimal; a lone separator with exactly three digits behind it is
 * grouping unless it is this locale's own decimal mark; anything else is the
 * decimal mark. That reads `1,000.50`, `1.000,50`, `1000,50` and `1,000` the
 * way the person typing them meant them.
 */
function parseAmountCents(text, locale) {
    const trimmed = text.trim();
    if (trimmed === '')
        return { cents: 0, valid: true };
    const negative = trimmed.startsWith('-');
    const kept = [];
    for (const char of trimmed) {
        if ((char >= '0' && char <= '9') || char === '.' || char === ',')
            kept.push(char);
    }
    const cleaned = kept.join('');
    if (!/[0-9]/.test(cleaned))
        return { cents: 0, valid: false };
    const lastDot = cleaned.lastIndexOf('.');
    const lastComma = cleaned.lastIndexOf(',');
    const lastMark = Math.max(lastDot, lastComma);
    let whole = cleaned;
    let fraction = '';
    if (lastMark >= 0) {
        const bothKinds = lastDot >= 0 && lastComma >= 0;
        const mark = lastDot > lastComma ? '.' : ',';
        const tail = cleaned.slice(lastMark + 1);
        const onlyOne = cleaned.split(mark).length === 2;
        const isDecimal = bothKinds || (onlyOne && (tail.length !== 3 || mark === decimalMark(locale)));
        if (isDecimal) {
            whole = cleaned.slice(0, lastMark);
            fraction = tail;
        }
    }
    const digits = `${whole.replace(/[.,]/g, '')}.${fraction.replace(/[.,]/g, '')}`;
    const value = Number.parseFloat(digits);
    if (!Number.isFinite(value))
        return { cents: 0, valid: false };
    return { cents: Math.round(value * 100) * (negative ? -1 : 1), valid: true };
}
/**
 * **V4 quote form** — same props as {@link QuoteForm} plus `formatMoney`,
 * `locale` and `invalidAmountLabel`.
 *
 * ## Four changes
 *
 * 1. **`1000,50` no longer quotes $100,050.** `toCents` stripped everything
 *    but digits and dots and `parseFloat`ed the remainder, so a comma decimal
 *    mark — the majority of the world — multiplied the coverage by a hundred,
 *    and the form submitted that number while the field on screen still read
 *    `1000,50`. The parse is now separator-aware and takes the caller's
 *    `locale`; text that is not an amount is reported rather than silently
 *    read as `0`.
 * 2. **A prefill that arrives after mount reaches the field.** `coverageCents`
 *    seeded `useState` once and was never read again, so a quote fetched into
 *    a controlled form left the input showing the old text while submitting
 *    the new number — the two most important values on the screen disagreeing
 *    with nobody able to see it. The displayed text is now derived: the
 *    typist's own keystrokes while they agree with the prop, the prop's value
 *    the moment it does not.
 * 3. **A blocked submit says why.** The button went `disabled` with no message
 *    — the base's own comment called it "a no-op" — so a user who typed a
 *    coverage the parse rejected saw a dead button and no reason. The field
 *    now carries the error, and the button's `aria-describedby` points at it.
 * 4. **The controls clear 44 and focus with `ring-ring`.** Nothing in the
 *    module cleared the tap floor, and the ring was `ring-primary-300` — a
 *    ramp step that ignores the seed and mirrors under `[data-theme="dark"]`.
 */
exports.QuoteFormV4 = React.forwardRef(function QuoteFormV4({ variants = ['auto', 'home', 'life', 'health'], deductibleOptions = DEFAULT_DEDUCTIBLES, variant: variantProp, coverageCents: coverageProp, deductibleCents: deductibleProp, currency = 'USD', submitLabel = 'Get quote', loading = false, formatMoney: format, locale, invalidAmountLabel = 'Enter an amount, for example 25,000', onChange, onSubmit, className, ...rest }, ref) {
    const lines = variants.length > 0 ? variants : ['auto'];
    const deductibles = deductibleOptions.length > 0 ? deductibleOptions : DEFAULT_DEDUCTIBLES;
    const money = format ?? ((cents, code) => (0, money_1.formatMoney)(cents, code ?? currency, locale));
    const [variant, setVariant] = React.useState(variantProp);
    const [coverageText, setCoverageText] = React.useState(coverageProp != null ? String(coverageProp / 100) : '');
    const [deductibleCents, setDeductibleCents] = React.useState(deductibleProp ?? deductibles[0] ?? 0);
    const errorId = React.useId();
    const typed = parseAmountCents(coverageText, locale);
    // Derived, not synced: the typist's own text while it still means what the
    // prop says, and the prop the instant a fetch moves it somewhere else.
    const displayText = coverageProp != null && coverageProp !== typed.cents
        ? String(coverageProp / 100)
        : coverageText;
    const effVariant = variantProp ?? variant;
    const effCoverage = coverageProp != null ? coverageProp : typed.cents;
    const effDeductible = deductibleProp != null ? deductibleProp : deductibleCents;
    const emit = (next) => {
        onChange?.({
            variant: next.variant ?? effVariant ?? lines[0],
            coverageCents: next.coverageCents ?? effCoverage,
            deductibleCents: next.deductibleCents ?? effDeductible,
        });
    };
    const amountError = !typed.valid && coverageProp == null ? invalidAmountLabel : undefined;
    const isValid = effVariant != null && effCoverage > 0 && amountError == null;
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
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { children: (0, jsx_runtime_1.jsxs)("form", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), onSubmit: submit, ...rest, children: [(0, jsx_runtime_1.jsx)(FieldV4_1.FieldV4, { label: "Insurance type", required: true, htmlFor: "quote-variant", children: (0, jsx_runtime_1.jsxs)(SelectV4_1.SelectV4, { id: "quote-variant", value: effVariant ?? '', className: tone_v4_1.MIN_TAP_CLASS, onChange: (event) => {
                            const value = event.target.value;
                            setVariant(value);
                            emit({ variant: value });
                        }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: "Choose a policy type" }), lines.map((line) => ((0, jsx_runtime_1.jsx)("option", { value: line, children: status_1.POLICY_VARIANT[line]?.label ?? line }, line)))] }) }), (0, jsx_runtime_1.jsx)(FieldV4_1.FieldV4, { label: "Coverage amount", required: true, error: amountError, hint: "Enter the benefit amount in dollars", htmlFor: "quote-coverage", children: (0, jsx_runtime_1.jsx)(InputV4_1.InputV4, { id: "quote-coverage", inputMode: "decimal", placeholder: "0.00", value: displayText, invalid: amountError != null, "aria-describedby": amountError != null ? errorId : undefined, className: tone_v4_1.MIN_TAP_CLASS, onChange: (event) => {
                            const text = event.target.value;
                            setCoverageText(text);
                            emit({ coverageCents: parseAmountCents(text, locale).cents });
                        } }) }), (0, jsx_runtime_1.jsx)(FieldV4_1.FieldV4, { label: "Deductible", htmlFor: "quote-deductible", children: (0, jsx_runtime_1.jsx)(SelectV4_1.SelectV4, { id: "quote-deductible", value: String(effDeductible), className: tone_v4_1.MIN_TAP_CLASS, onChange: (event) => {
                            const cents = Number.parseInt(event.target.value, 10) || 0;
                            setDeductibleCents(cents);
                            emit({ deductibleCents: cents });
                        }, children: deductibles.map((cents) => ((0, jsx_runtime_1.jsx)("option", { value: String(cents), children: money(cents, currency) }, cents))) }) }), amountError != null ? ((0, jsx_runtime_1.jsx)("p", { id: errorId, className: "text-xs font-semibold text-danger-text", children: amountError })) : null, (0, jsx_runtime_1.jsxs)(ButtonV4_1.ButtonV4, { type: "submit", variant: "primary", disabled: !isValid || loading, "aria-busy": loading || undefined, "aria-describedby": amountError != null ? errorId : undefined, className: tone_v4_1.MIN_TAP_CLASS, children: [loading ? (0, jsx_runtime_1.jsx)(SpinnerV4_1.SpinnerV4, { size: "sm", className: "mr-xs" }) : null, submitLabel] })] }) }));
});
//# sourceMappingURL=QuoteFormV4.js.map