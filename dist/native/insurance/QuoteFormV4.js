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
exports.QuoteFormV4 = QuoteFormV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const FieldV4_1 = require("../primitives/FieldV4");
const InputV4_1 = require("../primitives/InputV4");
const SelectV4_1 = require("../primitives/SelectV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const money_1 = require("../../commerce/money");
const tone_v4_1 = require("./internal/tone-v4");
const DEFAULT_DEDUCTIBLES = [50000, 100000, 250000];
/**
 * Parse a typed amount into integer **cents**, honouring the locale's
 * separators. `null` when the text is not an amount at all — which the base had
 * no way to say, because it returned `0` for both "nothing typed yet" and
 * "this is not a number".
 *
 * The base did `Number.parseFloat(text.replace(/[^0-9.]/g, ''))`. In every
 * locale that groups with a dot and decimalises with a comma — most of Europe,
 * most of Latin America — a user typing `1000,50` had the comma stripped and
 * the digits run together, so `1000,50` became `100050` and the form submitted
 * a request for **$100,050 of cover** while the field read `1000,50`. A user
 * typing `1.000,50` fared worse still.
 *
 * The rule here is positional rather than locale-table-driven, because it has
 * to be right for a user who types the wrong separator too: whichever of `.`
 * and `,` appears **last** is the decimal point, unless it is followed by
 * exactly three digits and is the only separator of its kind, in which case it
 * is a thousands group. The locale only decides the tie when a single
 * separator has one or two digits after it and could be either.
 */
function parseAmountToCents(text, locale) {
    const cleaned = text.replace(/[^\d.,-]/g, '');
    // Something was typed and none of it was a digit: not an amount.
    if (!/\d/.test(cleaned))
        return text.trim() === '' ? 0 : null;
    const lastDot = cleaned.lastIndexOf('.');
    const lastComma = cleaned.lastIndexOf(',');
    const cut = Math.max(lastDot, lastComma);
    let whole = cleaned;
    let fraction = '';
    if (cut >= 0) {
        const tail = cleaned.slice(cut + 1);
        const separator = cleaned[cut];
        const only = (separator === '.' ? lastComma : lastDot) === -1;
        const occurrences = cleaned.split(separator).length - 1;
        // Three trailing digits behind the only separator of its kind is a group,
        // not a fraction: `1.000` is a thousand, not one and a tenth.
        const grouping = only && occurrences >= 1 && tail.length === 3 && !isDecimalMark(separator, locale);
        if (!grouping && tail.length > 0 && tail.length <= 2) {
            whole = cleaned.slice(0, cut);
            fraction = tail;
        }
        else if (!grouping && tail.length > 2) {
            whole = cleaned.slice(0, cut);
            fraction = tail.slice(0, 2);
        }
    }
    const negative = whole.startsWith('-');
    const digits = whole.replace(/\D/g, '');
    const units = digits === '' ? 0 : Number.parseInt(digits, 10);
    const cents = units * 100 + Number.parseInt(fraction.padEnd(2, '0') || '0', 10);
    // A negative amount of cover is not a small amount of cover.
    return negative ? null : cents;
}
/** Whether this locale writes its decimal point with the given mark. */
function isDecimalMark(mark, locale) {
    const formatted = new Intl.NumberFormat(locale).format(1.1);
    return formatted.includes(mark);
}
/** Render cents back into the text the input shows. */
function centsToText(cents, locale) {
    const value = (Number.isFinite(cents) ? cents : 0) / 100;
    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 2,
        useGrouping: false,
    }).format(value);
}
/**
 * **V4 quote form** — same props as {@link QuoteForm} plus `formatMoney`,
 * `locale` and `invalidAmountLabel`.
 *
 * ## Four changes
 *
 * 1. **`1000,50` no longer asks for $100,050 of cover.** `toCents` stripped
 *    everything but digits and dots and then `parseFloat`ed the remains, so a
 *    comma-decimal locale had its separator deleted and its digits
 *    concatenated. The parser is separator-aware now — see
 *    {@link parseAmountToCents} — and, where the base read anything
 *    unparseable as a silent `0`, it rejects and the field says so with
 *    `invalidAmountLabel`. It stays inside this file rather than moving to a
 *    shared pure module, so both twins land without a third file appearing
 *    under either of them mid-flight.
 * 2. **A prefill that arrives from a fetch reaches the field.** `coverageCents`
 *    seeded `React.useState` and was never read again, so the visible input
 *    kept the old text while `effCoverage` submitted the new number: the screen
 *    showed one figure and the request carried another. The text follows the
 *    controlled prop.
 * 3. **The deductible labels come from the module's money home.** They were
 *    built inline as `(c / 100).toLocaleString(undefined, { style: 'currency',
 *    currency })` — a second, private spelling of money in a module whose whole
 *    contract is that every amount goes through one formatter. With
 *    `currency="JPY"` that label and the `deductibleCents` payload beside it
 *    disagreed by 100×, and no `formatMoney` override existed to correct it.
 *    There is one now, and a `locale` for the default.
 * 4. **Every control clears 44** and the form is built from the V4 field line,
 *    so its focus ring, its error ink and its press layer are the ones the rest
 *    of the kit uses rather than the base primitives' own.
 *
 * The field labels stay English on both twins. They are not in the shared prop
 * table, and a `labels` bag on one twin only would be the parity break this
 * line exists to avoid.
 */
function QuoteFormV4({ variants = ['auto', 'home', 'life', 'health'], deductibleOptions = DEFAULT_DEDUCTIBLES, variant: variantProp, coverageCents: coverageProp, deductibleCents: deductibleProp, currency = 'USD', submitLabel = 'Get quote', loading = false, locale, invalidAmountLabel = 'Enter an amount, for example 25,000', formatMoney: format, onChange, onSubmit, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const lines = variants.length > 0 ? variants : ['auto'];
    const deductibles = deductibleOptions.length > 0 ? deductibleOptions : DEFAULT_DEDUCTIBLES;
    const money = React.useMemo(() => format ?? ((cents, code) => (0, money_1.formatMoney)(cents, code, locale)), [format, locale]);
    const [variant, setVariant] = React.useState(variantProp);
    const [coverageText, setCoverageText] = React.useState(coverageProp != null ? centsToText(coverageProp, locale) : '');
    const [deductibleCents, setDeductibleCents] = React.useState(deductibleProp ?? deductibles[0] ?? 0);
    const effVariant = variantProp ?? variant;
    const typed = parseAmountToCents(coverageText, locale);
    // Only a rejection the user can see: an empty field is not yet an error.
    const amountInvalid = coverageProp == null && coverageText.trim() !== '' && typed == null;
    const effCoverage = coverageProp != null ? coverageProp : (typed ?? 0);
    const effDeductible = deductibleProp != null ? deductibleProp : deductibleCents;
    /*
      Change 2. Only re-seeds when the controlled value actually differs from what
      the field currently parses to, so a user mid-keystroke is not fighting the
      effect: typing `12.` parses to 1200, matches, and the text is left alone.
    */
    React.useEffect(() => {
        if (coverageProp == null)
            return;
        setCoverageText((current) => parseAmountToCents(current, locale) === coverageProp
            ? current
            : centsToText(coverageProp, locale));
    }, [coverageProp, locale]);
    const emit = React.useCallback((next) => {
        onChange?.({
            variant: next.variant ?? effVariant ?? lines[0],
            coverageCents: next.coverageCents ?? effCoverage,
            deductibleCents: next.deductibleCents ?? effDeductible,
        });
    }, [onChange, effVariant, effCoverage, effDeductible, lines]);
    const variantOptions = lines.map((v) => ({
        value: v,
        label: tone_v4_1.POLICY_LINE_V4[v]?.label ?? v,
    }));
    const deductibleSelectOptions = deductibles.map((c) => ({
        value: String(c),
        label: money(c, currency),
    }));
    const valid = effVariant != null && !amountInvalid && effCoverage > 0;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const submit = () => {
        if (!valid || loading || effVariant == null)
            return;
        onSubmit?.({
            variant: effVariant,
            coverageCents: effCoverage,
            deductibleCents: effDeductible,
        });
    };
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(FieldV4_1.FieldV4, { label: "Insurance type", required: true, children: (0, jsx_runtime_1.jsx)(SelectV4_1.SelectV4, { options: variantOptions, value: effVariant, placeholder: "Choose a policy type", accessibilityLabel: "Insurance type", onValueChange: (v) => {
                            setVariant(v);
                            emit({ variant: v });
                        } }) }), (0, jsx_runtime_1.jsx)(FieldV4_1.FieldV4, { label: "Coverage amount", required: true, hint: "Enter the benefit amount", error: amountInvalid ? invalidAmountLabel : undefined, children: (0, jsx_runtime_1.jsx)(InputV4_1.InputV4, { keyboardType: "numeric", placeholder: "0.00", value: coverageText, invalid: amountInvalid, accessibilityLabel: "Coverage amount", style: { minHeight: tap }, onChangeText: (t) => {
                            setCoverageText(t);
                            emit({ coverageCents: parseAmountToCents(t, locale) ?? 0 });
                        } }) }), (0, jsx_runtime_1.jsx)(FieldV4_1.FieldV4, { label: "Deductible", children: (0, jsx_runtime_1.jsx)(SelectV4_1.SelectV4, { options: deductibleSelectOptions, value: String(effDeductible), accessibilityLabel: "Deductible", onValueChange: (v) => {
                            const c = Number.parseInt(v, 10) || 0;
                            setDeductibleCents(c);
                            emit({ deductibleCents: c });
                        } }) }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onPress: submit, disabled: !valid, loading: loading, accessibilityLabel: submitLabel, style: { minHeight: tap }, children: submitLabel })] }) }));
}
//# sourceMappingURL=QuoteFormV4.js.map