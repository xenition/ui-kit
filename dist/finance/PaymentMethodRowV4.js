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
exports.PaymentMethodRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const Icon_1 = require("../primitives/Icon");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const ledger_v4_1 = require("./internal/ledger-v4");
const mask_1 = require("./internal/mask");
const CreditCardViewV4_1 = require("./CreditCardViewV4");
const KIND_GLYPH = {
    card: '💳',
    bank: '🏦',
    wallet: '👛',
};
/** The word for the selected state — it was carried by a ✓ and a ring alone. */
const SELECTED_LABEL = 'Selected';
/**
 * **V4 payment-method row** — the web twin of the native
 * `PaymentMethodRowV4`, same props as {@link PaymentMethodRow} plus
 * `defaultLabel` and `brandLabels`.
 *
 * ## Five changes
 *
 * 1. **`brand` is rendered.** It is accepted, documented as affecting the
 *    glyph, and destructured into a dead binding — so a Visa row and an Amex
 *    row were the same 💳 and the only way to tell a wallet's two cards apart
 *    was the last four. The network is printed, from the same table the card
 *    face uses.
 * 2. **The last four are masked by the module's own masker.** It built
 *    `` `•• ${last4}` `` by concatenation, two files away from
 *    `maskAccountNumber`, so a caller who passed the full number got the full
 *    number on screen.
 * 3. **"Default" stops being `success`.** A preferred payment method is an
 *    identity, not a healthy state, and the green badge sat in a module where
 *    green means income. It is the neutral identity chip.
 * 4. **It is a real `<button>` with a radio role and a name that carries the
 *    row.** The base put `role="radio"` and a hand-written Enter/Space handler
 *    on a `div` and named it `label` alone — so the masked number, the expiry
 *    and the "Default" badge were all pruned, and the selected ✓ reached
 *    nobody.
 * 5. **Press is a state layer, focus is `ring-ring`, and the row clears 44.**
 */
exports.PaymentMethodRowV4 = React.forwardRef(function PaymentMethodRowV4({ label, kind = 'card', brand, last4, expiry, icon, isDefault = false, selected = false, defaultLabel = 'Default', brandLabels, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const brandLabel = kind === 'card' && brand != null
        ? (brandLabels?.[brand] ?? CreditCardViewV4_1.CARD_BRAND_LABEL[brand])
        : undefined;
    const masked = last4 != null ? (0, mask_1.maskAccountNumber)(last4) : undefined;
    const expiryText = expiry != null ? `exp ${expiry}` : undefined;
    const sub = (0, tone_v4_1.metaLine)([masked, expiryText]);
    const name = (0, ledger_v4_1.spokenLine)([
        label,
        brandLabel,
        masked,
        expiryText,
        isDefault ? defaultLabel : undefined,
        selected ? SELECTED_LABEL : undefined,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { "aria-hidden": "true", glyph: icon ?? KIND_GLYPH[kind], color: selected ? 'primary' : 'onSurface', size: "xl" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: label }), brandLabel != null ? (
                            // A network is an identity: a word, in the neutral chip, never a
                            // status colour.
                            (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...ledger_v4_1.BADGE_V4, tone: ledger_v4_1.IDENTITY_TONE, "aria-hidden": "true", children: brandLabel })) : null, isDefault ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...ledger_v4_1.BADGE_V4, tone: ledger_v4_1.IDENTITY_TONE, "aria-hidden": "true", children: defaultLabel })) : null] }), sub !== '' ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: sub }) : null] }), selected ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { "aria-hidden": "true", glyph: "\u2713", color: "primary", size: "lg" })) : null] }));
    const shell = (0, cn_1.cn)('flex w-full items-center gap-md rounded-[var(--xen-radius-md)] border p-md', selected ? 'border-primary bg-selected text-on-selected' : 'border-border bg-surface', chrome_v4_1.MIN_TAP_CLASS);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full', className), ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": name, onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(selected ? 'var(--xen-selected)' : 'var(--xen-surface)', selected ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'), className: (0, cn_1.cn)(shell, 'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: shell, children: body })) }));
});
//# sourceMappingURL=PaymentMethodRowV4.js.map