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
exports.PaymentMethodRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const KIND_GLYPH = {
    card: '💳',
    bank: '🏦',
    wallet: '👛',
};
/**
 * A selectable payment-method row for a wallet / checkout picker: leading glyph,
 * label with a masked `•• last4` and expiry sub-line, an optional "Default"
 * badge, and a trailing selection check. `selected` draws a `border-primary`
 * ring; unselected rows use the `border` token. Becomes a radio-style button
 * when `onClick` is supplied. Token-bound throughout. Web parity of the native
 * `PaymentMethodRow`.
 */
exports.PaymentMethodRow = React.forwardRef(function PaymentMethodRow({ label, kind = 'card', brand: _brand, last4, expiry, icon, isDefault = false, selected = false, onClick, className, ...rest }, ref) {
    const sub = [last4 != null ? `•• ${last4}` : null, expiry != null ? `exp ${expiry}` : null]
        .filter(Boolean)
        .join('  ·  ');
    const interactive = onClick
        ? {
            role: 'radio',
            'aria-checked': selected,
            tabIndex: 0,
            onClick,
            onKeyDown: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onClick();
                }
            },
        }
        : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? label : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border bg-surface p-[var(--xen-space-md)]', selected ? 'border-primary' : 'border-border', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon ?? KIND_GLYPH[kind], color: selected ? 'primary' : 'onSurface', size: "xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: label }), isDefault ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: "Default" }) : null] }), sub.length > 0 ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: sub }) : null] }), selected ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", color: "primary", size: "lg", "aria-label": "Selected" }) : null] }));
});
//# sourceMappingURL=PaymentMethodRow.js.map