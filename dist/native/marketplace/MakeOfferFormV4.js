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
exports.MakeOfferFormV4 = MakeOfferFormV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const InputV4_1 = require("../primitives/InputV4");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("../commerce/money");
/**
 * Parse a currency string ("1,250.50") into integer cents, or null.
 *
 * Unchanged from the base, deliberately. It is the one piece of this component
 * that is not presentation, `MakeOfferForm.parseCents` is not exported, and a
 * V4 may not edit its base — so it is duplicated rather than shared, and the
 * duplication is noted here so the next reader does not think one of them
 * drifted.
 */
function parseCents(raw) {
    const cleaned = raw.replace(/[^0-9.]/g, '');
    if (cleaned === '' || cleaned === '.')
        return null;
    const value = Number.parseFloat(cleaned);
    if (!Number.isFinite(value) || value <= 0)
        return null;
    return Math.round(value * 100);
}
/**
 * **V4 make-an-offer form** — the one place in `marketplace` where the user is
 * typing rather than choosing, so it is the one place the field metric and the
 * error exception both land.
 *
 * What changes against the base:
 *
 * 1. **The V4 field metric, from the primitive that owns it.** `InputV4` is
 *    `spacing['2xl']` (48) tall on `radius.md` with the shared focus halo — the
 *    metric `primitives/internal/field-v4.ts` exists to decide once so eleven
 *    controls cannot each pick their own height. The base composed the v0
 *    `Input`, so an offer field and a checkout field in the same flow were
 *    different objects.
 * 2. **The rejection is a sentence, not a colour.** The base already wrote the
 *    message — it just wrote it itself, in `colors.danger`, in a `Text` beside
 *    a field whose only link to it was proximity. `InputV4 error` renders it in
 *    the contrast-corrected `dangerText` slot (`danger` is a *fill* and was
 *    being used as an ink) and announces it, so the recovery copy is attached
 *    to the control it is about instead of "invalid".
 * 3. **The panel is a card, on `card`.** Brief rule 4: a card's ground is
 *    `colors.card`, not `colors.surface`. `CardV4` still paints `surface`
 *    itself — it predates the split — so the ground is named here, which is the
 *    same override the dashboard cards make.
 * 4. **The asking price is tabular and goes through `formatMoney`** (rules 1
 *    and 2), like every other amount in these two modules.
 * 5. **The submit is full width.** An offer form has exactly one thing to do,
 *    and §5 asks a block to have one dominant action rather than a
 *    shrink-wrapped button floating at the end of a stack.
 * 6. **One name for the field.** The base drew a visible "Your offer" label and
 *    then set `accessibilityLabel="Offer amount"` over it, so the spoken name
 *    was a string the visible label did not contain — WCAG 2.5.3, and a
 *    voice-control user saying "your offer" hit nothing. `InputV4 label` is the
 *    name, and the override is gone.
 *
 * Presentational: nothing is sent. A valid submit calls
 * `onSubmit(offerCents, message?)`.
 */
function MakeOfferFormV4({ listPriceCents, currency = 'USD', minOfferCents, withMessage = false, submitLabel = 'Send offer', loading = false, onSubmit, testID = 'xen-mkt-offer-amount', error, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [amount, setAmount] = React.useState('');
    const [message, setMessage] = React.useState('');
    const cents = parseCents(amount);
    const belowMin = cents != null && typeof minOfferCents === 'number' && cents < minOfferCents;
    const valid = cents != null && !belowMin;
    // The words. Below-minimum is spelled out with the actual figure, because
    // "too low" is not a recovery instruction and "at least $40.00" is.
    const localError = amount.length > 0 && cents == null
        ? 'Enter a valid amount'
        : belowMin && typeof minOfferCents === 'number'
            ? `Offer must be at least ${(0, money_1.formatMoney)(minOfferCents, currency)}`
            : undefined;
    // What is in the box now outranks what the server said a moment ago.
    const shownError = localError ?? (error !== '' ? error : undefined);
    const submit = () => {
        if (!valid || loading || cents == null)
            return;
        onSubmit?.(cents, withMessage && message.trim() ? message.trim() : undefined);
    };
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", padding: "lg", radius: "lg", style: [
            // Rule 4: a card's ground is `card`, not `surface`.
            { backgroundColor: colors.card, gap: tokens.spacing.md },
            style,
        ], children: [typeof listPriceCents === 'number' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: `Asking ${(0, money_1.formatMoney)(listPriceCents, currency)}` })) : null, (0, jsx_runtime_1.jsx)(InputV4_1.InputV4, { testID: testID, label: "Your offer", keyboardType: "numeric", placeholder: "0.00", value: amount, onChangeText: setAmount, error: shownError }), withMessage ? ((0, jsx_runtime_1.jsx)(InputV4_1.InputV4, { testID: "xen-mkt-offer-message", label: "Message (optional)", placeholder: "Add a note to the seller", value: message, onChangeText: setMessage, multiline: true })) : null, (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onPress: submit, disabled: !valid || loading, loading: loading, children: submitLabel })] }));
}
//# sourceMappingURL=MakeOfferFormV4.js.map