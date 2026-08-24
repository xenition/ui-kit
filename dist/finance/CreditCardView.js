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
exports.CreditCardView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const mask_1 = require("./internal/mask");
const BRAND_LABEL = {
    visa: 'VISA',
    mastercard: 'Mastercard',
    amex: 'AMEX',
    generic: 'CARD',
};
// Two-stop diagonal gradients painted from **theme ramp tokens** (CSS custom
// properties) — never literal brand colors.
const GRADIENT = {
    primary: 'bg-gradient-to-br from-[var(--xen-primary)] to-[var(--xen-primary-700)]',
    accent: 'bg-gradient-to-br from-[var(--xen-accent)] to-[var(--xen-accent-700)]',
    dark: 'bg-gradient-to-br from-[var(--xen-neutral-700)] to-[var(--xen-neutral-900)]',
};
// On the saturated fill the ramp's on-color token reads best.
const INK = {
    primary: 'text-on-primary',
    accent: 'text-on-accent',
    dark: 'text-on-surface',
};
/**
 * A realistic card face: a token-gradient background (`--xen-*` ramp vars, no
 * literal hex), the masked number in a tabular row, and a holder / expiry /
 * network footer. `variant` picks the ramp (`primary` / `accent` / `dark`); the
 * number is masked to the last four via {@link maskCardNumber}. Foreground text
 * uses the ramp's on-color token so it stays legible on the fill. Web parity of
 * the native `CreditCardView`.
 */
exports.CreditCardView = React.forwardRef(function CreditCardView({ holder, number, expiry, brand = 'generic', variant = 'primary', className, ...rest }, ref) {
    const last4 = number.replace(/\D+/g, '').slice(-4) || 'unknown';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": `${BRAND_LABEL[brand]} card ending ${last4}`, className: (0, cn_1.cn)('flex min-h-[190px] flex-col justify-between rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]', GRADIENT[variant], INK[variant], className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-7 w-10 rounded-[var(--xen-radius-sm)] bg-warn opacity-90" }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold tracking-widest", children: BRAND_LABEL[brand] })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-semibold tracking-[0.15em] tabular-nums", children: (0, mask_1.maskCardNumber)(number) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs opacity-80", children: "CARD HOLDER" }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold", children: holder.toUpperCase() })] }), expiry != null ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs opacity-80", children: "EXPIRES" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold", children: expiry })] })) : null] })] }));
});
//# sourceMappingURL=CreditCardView.js.map