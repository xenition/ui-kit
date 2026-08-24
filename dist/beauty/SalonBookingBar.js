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
exports.SalonBookingBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A sticky salon booking bar for the bottom of a service/stylist screen: a
 * two-line summary (service + price on the left, detail beneath) and a dominant
 * "Book now" CTA. With no `serviceName` it shows an empty prompt and disables
 * the CTA; `loading` shows a spinner and disables the CTA (web `Button` has no
 * `loading` prop). Prices are integer cents via {@link formatMoney}. Token-only
 * colors.
 */
exports.SalonBookingBar = React.forwardRef(function SalonBookingBar({ serviceName, totalCents, currency = 'USD', detail, formatMoney: format = commerce_1.formatMoney, ctaLabel = 'Book now', disabled = false, loading = false, emptyLabel = 'Select a service to book', onBook, className, ...rest }, ref) {
    const hasSelection = !!serviceName;
    const priceText = totalCents != null ? format(totalCents, currency) : undefined;
    const isDisabled = disabled || loading || !hasSelection;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-salon-booking-bar": "", "aria-label": hasSelection
            ? `${serviceName}${priceText ? `, ${priceText}` : ''}${detail ? `, ${detail}` : ''}`
            : emptyLabel, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] border-t border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: hasSelection ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: serviceName }), priceText ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-extrabold text-primary", children: priceText })) : null] }), detail ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: detail }) : null] })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel })) }), (0, jsx_runtime_1.jsxs)(primitives_1.Button, { variant: "primary", disabled: isDisabled, onClick: onBook, className: "gap-[var(--xen-space-xs)]", children: [loading ? (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" }) : null, ctaLabel] })] }));
});
//# sourceMappingURL=SalonBookingBar.js.map