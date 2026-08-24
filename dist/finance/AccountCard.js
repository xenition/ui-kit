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
exports.AccountCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const MoneyAmount_1 = require("./MoneyAmount");
const mask_1 = require("./internal/mask");
const pressable_1 = require("./internal/pressable");
const VARIANT_META = {
    checking: { border: 'border-primary', icon: 'primary', glyph: '🏦', label: 'Checking' },
    savings: { border: 'border-success', icon: 'success', glyph: '🐖', label: 'Savings' },
    // `Icon` has no `accent` slot, so the accent tint rides the disc border while
    // the glyph falls back to `primary` — still fully token-bound.
    credit: { border: 'border-accent', icon: 'primary', glyph: '💳', label: 'Credit' },
};
/**
 * A single account tile: a tinted variant glyph + name/type header over the
 * balance. `variant` selects the accent border token (`checking` → primary,
 * `savings` → success, `credit` → accent) and a default glyph; the balance is
 * integer cents rendered through {@link MoneyAmount} (neutral tone, so a
 * positive balance is not colored "income" green). Token-bound throughout. Web
 * parity of the native `AccountCard`.
 */
exports.AccountCard = React.forwardRef(function AccountCard({ name, variant, balanceCents, currency = 'USD', accountNumber, icon, onClick, className, ...rest }, ref) {
    const meta = VARIANT_META[variant];
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "aria-label": interactive ? `${name}, ${meta.label} account` : undefined, className: (0, cn_1.cn)(interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-md)] border bg-surface', meta.border), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon ?? meta.glyph, color: meta.icon, size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: accountNumber != null ? (0, mask_1.maskAccountNumber)(accountNumber) : meta.label })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Balance" }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: balanceCents, currency: currency, tone: "neutral", size: "lg" })] })] }));
});
//# sourceMappingURL=AccountCard.js.map