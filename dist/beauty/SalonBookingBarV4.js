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
exports.SalonBookingBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AuthStickyFooterV4_1 = require("../primitives/AuthStickyFooterV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * **V4 salon booking bar** — the web twin of the native `SalonBookingBarV4`,
 * same props as {@link SalonBookingBar} plus `safeArea`.
 *
 * ## Four changes
 *
 * 1. **It clears the safe-area inset**, via `AuthStickyFooterV4` — the same
 *    band every other pinned CTA in the kit uses, and it also pins and stacks
 *    correctly, which the base's plain bar did not.
 * 2. **The price stops being `text-primary` at `font-weight: 800`.** A fill
 *    slot used as ink, at a weight the scale does not have.
 * 3. **The CTA is the §5 shape** — the one loud thing in the band.
 * 4. **The empty state is announced copy**, not a disabled button alone.
 */
exports.SalonBookingBarV4 = React.forwardRef(function SalonBookingBarV4({ serviceName, totalCents, currency = 'USD', detail, formatMoney = money_1.formatMoney, ctaLabel = 'Book now', disabled = false, loading = false, emptyLabel = 'Select a service to book', safeArea = true, onBook, className, ...rest }, ref) {
    const hasSelection = Boolean(serviceName);
    const price = typeof totalCents === 'number' && Number.isFinite(totalCents)
        ? formatMoney(totalCents, currency)
        : null;
    const blocked = disabled || loading || !hasSelection;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-salon-booking-bar": "", ...rest, children: (0, jsx_runtime_1.jsx)(AuthStickyFooterV4_1.AuthStickyFooterV4, { safeArea: safeArea, className: className, children: (0, jsx_runtime_1.jsxs)("div", { "aria-label": hasSelection ? (0, salon_v4_1.metaLine)([serviceName, price, detail]) : emptyLabel, className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: hasSelection ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-base font-bold text-on-surface", children: serviceName }), price ? ((0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-surface [font-variant-numeric:tabular-nums]", children: price })) : null] }), detail ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: detail })) : null] })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: emptyLabel })) }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", disabled: blocked, "aria-busy": loading || undefined, onClick: onBook, "aria-label": ctaLabel, className: (0, cn_1.cn)('shrink-0'), style: { borderRadius: 'var(--xen-radius-full)' }, children: ctaLabel })] }) }) }));
});
//# sourceMappingURL=SalonBookingBarV4.js.map