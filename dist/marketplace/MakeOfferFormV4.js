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
exports.MakeOfferFormV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const inject_1 = require("../motion/internal/inject");
const card_ground_v4_1 = require("../primitives/internal/card-ground-v4");
const InputV4_1 = require("../primitives/InputV4");
const TextV4_1 = require("../primitives/TextV4");
const commerce_1 = require("../commerce");
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
 *    `spacing['2xl']` (48) tall on `radius.md` with the shared focus halo, from
 *    `primitives/internal/field-v4.ts` — the file that exists so eleven
 *    controls cannot each pick their own height. The base composed the v0
 *    `Input`, so an offer field and a checkout field in the same flow were
 *    different objects.
 * 2. **The rejection is a sentence, not a colour.** The base already wrote the
 *    message — it just wrote it itself, in `text-danger`, in a `<p>` beside a
 *    field whose only link to it was proximity. `InputV4 error` renders it in
 *    `danger-text` (the contrast-corrected slot; `danger` is a *fill* and was
 *    being used as an ink), gives it `role="alert"`, and points the field's
 *    `aria-describedby` at it — so a screen reader gets the recovery copy
 *    attached to the control it is about instead of "invalid".
 * 3. **The panel is a card, on `card`.** Brief rule 4: a card's ground is
 *    `colors.card`, not `colors.surface`. `CardV4` still paints `surface`
 *    itself — it predates the split — so the ground is named here, which is the
 *    same override the dashboard cards make.
 * 4. **The asking price is tabular and goes through `formatMoney`** (rules 1
 *    and 2), like every other amount in these two modules.
 * 5. **The submit is full width.** An offer form has exactly one thing to do,
 *    and §5 asks a block to have one dominant action rather than a
 *    shrink-wrapped button floating at the end of a stack.
 *
 * 6. **One name for the field.** The base drew a visible "Your offer" label and
 *    then set `aria-label="Offer amount"` over it, so the accessible name was a
 *    string the visible label did not contain — WCAG 2.5.3, and a voice-control
 *    user saying "your offer" hit nothing. `InputV4 label` wires the visible
 *    text to the control by `id`, and the override is gone.
 *
 * Presentational: nothing is sent. A valid submit calls
 * `onSubmit(offerCents, message?)`.
 */
exports.MakeOfferFormV4 = React.forwardRef(function MakeOfferFormV4({ listPriceCents, currency = 'USD', minOfferCents, withMessage = false, submitLabel = 'Send offer', loading = false, onSubmit, testId = 'xen-mkt-offer-amount', error, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(card_ground_v4_1.V4_CARD_GROUND_STYLE_ID, card_ground_v4_1.V4_CARD_GROUND_CSS);
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
            ? `Offer must be at least ${(0, commerce_1.formatMoney)(minOfferCents, currency)}`
            : undefined;
    // What is in the box now outranks what the server said a moment ago.
    const shownError = localError ?? (error !== '' ? error : undefined);
    const submit = () => {
        if (!valid || loading || cents == null)
            return;
        onSubmit?.(cents, withMessage && message.trim() ? message.trim() : undefined);
    };
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-offer-form": "", variant: "outlined", padding: "lg", radius: "lg", ...card_ground_v4_1.V4_CARD_GROUND_ATTR, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [typeof listPriceCents === 'number' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: `Asking ${(0, commerce_1.formatMoney)(listPriceCents, currency)}` })) : null, (0, jsx_runtime_1.jsx)(InputV4_1.InputV4, { "data-testid": testId, label: "Your offer", inputMode: "decimal", placeholder: "0.00", value: amount, onChange: (e) => setAmount(e.target.value), error: shownError }), withMessage ? ((0, jsx_runtime_1.jsx)(InputV4_1.InputV4, { "data-testid": "xen-mkt-offer-message", label: "Message (optional)", placeholder: "Add a note to the seller", value: message, onChange: (e) => setMessage(e.target.value) })) : null, (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onClick: submit, disabled: !valid || loading, className: "w-full", children: loading ? 'Sending…' : submitLabel })] }));
});
//# sourceMappingURL=MakeOfferFormV4.js.map