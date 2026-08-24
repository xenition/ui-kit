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
exports.ShippingOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A selectable shipping/delivery method row — method name, price ("Free" at
 * zero), an ETA line, and a radio indicator. Rendered as a real `<button
 * role="radio">`: `selected` drives an accent ring, a filled radio dot, and
 * `aria-checked` (never color alone); `disabled` dims it and blocks selection.
 * Reuses `Icon` and the shared `formatMoney`; token-only colors.
 */
exports.ShippingOption = React.forwardRef(function ShippingOption({ label, priceCents, currency = 'USD', eta, glyph, selected = false, disabled = false, onSelect, className, ...rest }, ref) {
    const priceText = priceCents === undefined ? undefined : priceCents === 0 ? 'Free' : (0, commerce_1.formatMoney)(priceCents, currency);
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", role: "radio", "aria-checked": selected, "aria-label": `${label}${priceText ? `, ${priceText}` : ''}${eta ? `, ${eta}` : ''}`, disabled: disabled || !onSelect, onClick: onSelect, className: (0, cn_1.cn)('flex w-full items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'disabled:pointer-events-none disabled:opacity-50', selected ? 'border-primary bg-primary-50' : 'border-border bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] border-2', selected ? 'border-primary' : 'border-border'), children: selected ? (0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-2.5 rounded-[var(--xen-radius-full)] bg-primary" }) : null }), glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "lg", color: selected ? 'primary' : 'muted' }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: label }), eta ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: eta }) : null] }), priceText ? (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: priceText }) : null] }));
});
//# sourceMappingURL=ShippingOption.js.map