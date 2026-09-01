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
exports.TransferFormV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const FieldV4_1 = require("../primitives/FieldV4");
const InputV4_1 = require("../primitives/InputV4");
const SelectV4_1 = require("../primitives/SelectV4");
const field_v4_1 = require("../primitives/internal/field-v4");
const ledger_v4_1 = require("./internal/ledger-v4");
/** The placeholder inside an empty account picker. */
const SELECT_PLACEHOLDER = 'Select account';
/** The placeholder inside the note field. */
const NOTE_PLACEHOLDER = "What's this for?";
/**
 * The currency's glyph, from `Intl` rather than from a prop the caller has to
 * keep in step with the code the money is actually in.
 */
function symbolOf(currency) {
    try {
        const parts = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).formatToParts(0);
        return parts.find((part) => part.type === 'currency')?.value ?? currency;
    }
    catch {
        // An unknown code is the caller's bug, not a reason to blank the screen.
        return currency;
    }
}
/** Digits and at most one dot, with at most two decimals — as typed. */
function sanitizeAmount(raw) {
    const cleaned = raw.replace(/[^0-9.]/g, '');
    const dot = cleaned.indexOf('.');
    if (dot === -1)
        return cleaned;
    return cleaned.slice(0, dot + 1) + cleaned.slice(dot + 1).replace(/\./g, '').slice(0, 2);
}
/**
 * Major-unit text → integer cents, **without a float**.
 *
 * The base did `Math.round(value * 100)` on a parsed float, in a module whose
 * barrel promises "money is always carried as integer cents … so printed
 * values never drift": `0.145 * 100` is `14.499999999999998`. The digits are
 * already there in the string, so the conversion is a shift, not an
 * arithmetic.
 */
function centsFromText(text) {
    const cleaned = sanitizeAmount(text);
    if (cleaned === '' || cleaned === '.')
        return 0;
    const dot = cleaned.indexOf('.');
    const whole = dot === -1 ? cleaned : cleaned.slice(0, dot);
    const frac = dot === -1 ? '' : cleaned.slice(dot + 1);
    const minor = `${frac}00`.slice(0, 2);
    const parsed = Number.parseInt(`${whole === '' ? '0' : whole}${minor}`, 10);
    return Number.isFinite(parsed) ? parsed : 0;
}
/** Integer cents → major-unit text, by the same shift in reverse. */
function textFromCents(cents) {
    const safe = Math.abs(Number.isFinite(cents) ? Math.trunc(cents) : 0);
    return `${Math.trunc(safe / 100)}.${String(safe % 100).padStart(2, '0')}`;
}
/**
 * **V4 transfer form** — the web twin of the native `TransferFormV4`, same
 * props as {@link TransferForm} plus `currency`, `fieldLabels` and
 * `errorLabel`.
 *
 * ## Five changes
 *
 * 1. **It works when it is dropped in.** Every value prop is optional with a
 *    default, the component held no state, and `onChange` was optional — so
 *    used the way its own barrel documents, the selects never moved, the
 *    amount field never accepted a digit, and `canSubmit`, which requires
 *    `amountCents > 0`, could never become true. The submit button was
 *    **permanently disabled**. It now holds the four values itself when
 *    `onChange` is absent; the controlled path is unchanged.
 * 2. **Money stops round-tripping through a float** — see
 *    {@link centsFromText}.
 * 3. **A typed `0` is not an empty field.** `value={amountCents === 0 ? null
 *    : amountCents / 100}` fed the zero straight back as "cleared", so typing
 *    the `0` of `0.50` wiped the box under the user's fingers and the amount
 *    could not be entered at all. The text the user typed is what the field
 *    shows.
 * 4. **`currency` replaces the loose `currencySymbol`** — see the prop.
 * 5. **The validation line reaches the control.** It was a `<p role="alert">`
 *    floating between two fields, related to the invalid select by proximity
 *    only. `FieldV4` gives it an id, points the select's `aria-describedby` at
 *    it, marks the select invalid and leads it with a glyph, so the state has
 *    a shape as well as a hue.
 */
exports.TransferFormV4 = React.forwardRef(function TransferFormV4({ accounts, fromAccountId = '', toAccountId = '', amountCents = 0, note = '', currencySymbol, currency = 'USD', fieldLabels, errorLabel = 'Choose two different accounts.', onChange, onSubmit, submitLabel = 'Transfer', loading = false, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    }, []);
    const ids = React.useId();
    const fromId = `${ids}-from`;
    const toId = `${ids}-to`;
    const amountId = `${ids}-amount`;
    const noteId = `${ids}-note`;
    // A caller who listens is driving; a caller who does not gets a form that
    // works on its own.
    const controlled = onChange != null;
    const [own, setOwn] = React.useState({
        fromAccountId,
        toAccountId,
        amountCents,
        note,
    });
    const values = controlled
        ? { fromAccountId, toAccountId, amountCents, note }
        : own;
    // The buffer is what the field shows, so a trailing "." or a leading "0"
    // survives being typed.
    const [amountText, setAmountText] = React.useState(() => amountCents > 0 ? textFromCents(amountCents) : '');
    React.useEffect(() => {
        if (controlled && amountCents !== centsFromText(amountText)) {
            setAmountText(amountCents > 0 ? textFromCents(amountCents) : '');
        }
        // Only an incoming value re-seeds the buffer; the buffer re-seeding
        // itself is the loop that wiped the field.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlled, amountCents]);
    const commit = (patch) => {
        const next = { ...values, ...patch };
        if (controlled)
            onChange?.(next);
        else
            setOwn(next);
    };
    const sameAccount = values.fromAccountId !== '' && values.fromAccountId === values.toAccountId;
    const canSubmit = values.fromAccountId !== '' &&
        values.toAccountId !== '' &&
        !sameAccount &&
        values.amountCents > 0;
    const symbol = currencySymbol ?? symbolOf(currency);
    const labels = {
        from: fieldLabels?.from ?? 'From',
        to: fieldLabels?.to ?? 'To',
        amount: fieldLabels?.amount ?? 'Amount',
        note: fieldLabels?.note ?? 'Note',
    };
    const options = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: SELECT_PLACEHOLDER }), accounts.map((account) => ((0, jsx_runtime_1.jsx)("option", { value: account.id, children: account.label }, account.id)))] }));
    return ((0, jsx_runtime_1.jsxs)("form", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md', className), onSubmit: (event) => {
            event.preventDefault();
            if (canSubmit && !loading)
                onSubmit?.({ ...values });
        }, ...rest, children: [(0, jsx_runtime_1.jsx)(FieldV4_1.FieldV4, { label: labels.from, htmlFor: fromId, children: (0, jsx_runtime_1.jsx)(SelectV4_1.SelectV4, { id: fromId, value: values.fromAccountId, onChange: (event) => commit({ fromAccountId: event.target.value }), children: options }) }), (0, jsx_runtime_1.jsx)(FieldV4_1.FieldV4, { label: labels.to, htmlFor: toId, error: sameAccount ? errorLabel : undefined, children: (0, jsx_runtime_1.jsx)(SelectV4_1.SelectV4, { id: toId, value: values.toAccountId, invalid: sameAccount, onChange: (event) => commit({ toAccountId: event.target.value }), children: options }) }), (0, jsx_runtime_1.jsx)(FieldV4_1.FieldV4, { label: labels.amount, htmlFor: amountId, children: (0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-shell": "", style: (0, field_v4_1.fieldRingVars)(false), className: (0, cn_1.cn)(field_v4_1.FIELD_V4_SHELL, (0, field_v4_1.fieldBorderClass)(false), 'flex items-center gap-sm py-sm'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base font-semibold text-muted-text", children: symbol }), (0, jsx_runtime_1.jsx)("input", { id: amountId, type: "text", inputMode: "decimal", placeholder: "0.00", value: amountText, onChange: (event) => {
                                const next = sanitizeAmount(event.target.value);
                                setAmountText(next);
                                commit({ amountCents: centsFromText(next) });
                            }, className: (0, cn_1.cn)('min-w-0 flex-1 border-0 bg-transparent text-right text-base text-on-surface', 'outline-none placeholder:text-muted-text', ledger_v4_1.TABULAR_CLASS) })] }) }), (0, jsx_runtime_1.jsx)(FieldV4_1.FieldV4, { label: labels.note, htmlFor: noteId, children: (0, jsx_runtime_1.jsx)(InputV4_1.InputV4, { id: noteId, value: values.note, placeholder: NOTE_PLACEHOLDER, onChange: (event) => commit({ note: event.target.value }) }) }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { type: "submit", variant: "primary", disabled: !canSubmit || loading, children: submitLabel })] }));
});
//# sourceMappingURL=TransferFormV4.js.map