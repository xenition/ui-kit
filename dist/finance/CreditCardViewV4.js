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
exports.CreditCardViewV4 = exports.CARD_BRAND_LABEL = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ledger_v4_1 = require("./internal/ledger-v4");
const mask_1 = require("./internal/mask");
/**
 * The network's word — the base's own table, exported so the payment-method
 * row spells a network the same way the card face does. Nothing in this module
 * had a shared home for it, and `PaymentMethodRow` consequently printed no
 * network at all.
 */
exports.CARD_BRAND_LABEL = {
    visa: 'VISA',
    mastercard: 'Mastercard',
    amex: 'AMEX',
    generic: 'CARD',
};
/**
 * The face, as a **guaranteed pair**: a fill and the ink the compiler measured
 * against that fill.
 *
 * The base's `dark` variant paired `from-[var(--xen-neutral-700)]
 * to-[var(--xen-neutral-900)]` with `text-on-surface`, a token guaranteed
 * against `surface` and nothing else. In the light scheme `on-surface` is
 * near-black and the fill is near-black; in the dark scheme the web output
 * mirrors the neutral ramp, so the fill goes light at the same moment
 * `on-surface` does. Either way the number, the holder and the expiry sat near
 * 1:1 — the card was illegible in both schemes, in both directions.
 *
 * `dark` is now the **inverse** pair, `on-surface` over `surface` — a face that
 * is dark on a light page and light on a dark one, and whose ink is the other
 * half of a pair the compiler already checked.
 *
 * The gradient survives, but it can no longer break the promise: the far stop
 * is the fill mixed 16% toward its **own paired ink**, which is M3's state-layer
 * move applied to a surface. A ramp step is a different colour with no
 * relationship to the ink drawn on it; a 16% mix cannot outrun the contrast
 * that was measured at 0%.
 */
const FACE = {
    primary: 'bg-gradient-to-br from-[var(--xen-primary)] to-[color-mix(in_srgb,var(--xen-on-primary)_16%,var(--xen-primary))] text-on-primary',
    accent: 'bg-gradient-to-br from-[var(--xen-accent)] to-[color-mix(in_srgb,var(--xen-on-accent)_16%,var(--xen-accent))] text-on-accent',
    dark: 'bg-gradient-to-br from-[var(--xen-on-surface)] to-[color-mix(in_srgb,var(--xen-surface)_16%,var(--xen-on-surface))] text-surface',
};
/**
 * **V4 credit-card face** — the web twin of the native `CreditCardViewV4`,
 * same props as {@link CreditCardView} plus `holderLabel`, `expiryLabel` and
 * `brandLabels`.
 *
 * ## Four changes
 *
 * 1. **The face is legible in both schemes** — see {@link FACE}.
 * 2. **The card is not a picture.** `role="img"` is children-presentational,
 *    so it pruned the number, the holder and the expiry from the accessibility
 *    tree and announced only "VISA card ending 4242" — the *fallback* for an
 *    unreadable face was closed at the same time as the face became
 *    unreadable. It is a named group now, and its content is read.
 * 3. **The chip stops being `warn`.** A status colour was spent on a piece of
 *    decoration, next to money whose colours mean something. It is drawn from
 *    the face's own ink instead, so it works on all three variants and means
 *    nothing anywhere.
 * 4. **The caption hierarchy is type, not `opacity: 0.8`.** The captions were
 *    the *same colour* as the values under them, dimmed by an invented alpha —
 *    which is the one gesture M3 reserves for disabled content. They are a
 *    step smaller and a weight lighter, and both sit at full strength.
 */
exports.CreditCardViewV4 = React.forwardRef(function CreditCardViewV4({ holder, number, expiry, brand = 'generic', variant = 'primary', holderLabel = 'Card holder', expiryLabel = 'Expires', brandLabels, className, ...rest }, ref) {
    const brandLabel = brandLabels?.[brand] ?? exports.CARD_BRAND_LABEL[brand];
    const masked = (0, mask_1.maskCardNumber)(number);
    // The base's own name, kept — it is the right length for a group, and the
    // number, holder and expiry are read from the content now rather than
    // having to be crammed into it.
    const last4 = number.replace(/\D+/g, '').slice(-4) || 'unknown';
    const upperHolder = holder.toUpperCase();
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": `${brandLabel} card ending ${last4}`, className: (0, cn_1.cn)('flex flex-col justify-between rounded-[var(--xen-radius-lg)] p-lg', 'min-h-[calc(var(--xen-space-2xl)*4)]', FACE[variant], className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", 
                        // The face's own ink at a low alpha: decoration that reads on all
                        // three variants and carries no status.
                        className: "h-lg w-xl rounded-[var(--xen-radius-sm)] bg-[color-mix(in_srgb,currentColor_35%,transparent)]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold tracking-widest", children: brandLabel })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-semibold tracking-widest', ledger_v4_1.TABULAR_CLASS), children: masked }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-medium uppercase tracking-wide", children: holderLabel }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold", children: upperHolder })] }), expiry != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 text-right", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-medium uppercase tracking-wide", children: expiryLabel }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm font-bold', ledger_v4_1.TABULAR_CLASS), children: expiry })] })) : null] })] }));
});
//# sourceMappingURL=CreditCardViewV4.js.map