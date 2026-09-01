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
exports.StylistCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const RatingV4_1 = require("../primitives/RatingV4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * **V4 stylist card** — the web twin of the native `StylistCardV4`, same props
 * as {@link StylistCard} plus four hooks.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number and its count** — a stylist list is
 *    exactly where a client compares 4.9 against 4.6.
 * 2. **Fully booked disables the CTA.** The base showed the chip and left
 *    "Book" live, so a client could tap through to a stylist with no slots.
 * 3. **The specialty chips are capped and wrap** — seven of them pushed the
 *    price off the row, and §7 says chips wrap and are never clipped.
 * 4. **The from-price is tabular** with its prefix as a separate muted
 *    element.
 * 5. **The skeleton is opaque**, and an interactive card is a real `<button>`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
exports.StylistCardV4 = React.forwardRef(function StylistCardV4({ name, role, specialties = [], avatarUrl, rating, reviewCount, priceFromCents, currency = 'USD', formatMoney = money_1.formatMoney, availability, fullyBooked = false, variant = 'detailed', loading = false, bookLabel = 'Book', fullyBookedLabel = 'Fully booked', fromLabel = 'from', formatReviewCount, maxSpecialties = 3, onBook, onClick, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, className: (0, cn_1.cn)('flex gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-12 w-12 rounded-full', salon_v4_1.SKELETON_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-4 w-1/2', salon_v4_1.SKELETON_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-3 w-3/4', salon_v4_1.SKELETON_CLASS) })] })] }));
    }
    if (!name)
        return null;
    const compact = variant === 'compact';
    const chips = specialties.filter(Boolean).slice(0, Math.max(0, maxSpecialties));
    const price = typeof priceFromCents === 'number' && Number.isFinite(priceFromCents)
        ? formatMoney(priceFromCents, currency)
        : null;
    const reviews = typeof reviewCount === 'number'
        ? (formatReviewCount ?? ((n) => `${n.toLocaleString()} reviews`))(reviewCount)
        : null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: compact ? 'sm' : 'md' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-base font-bold text-on-card", children: name }), role ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: role }) : null, typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true }), reviews ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: reviews })) : null] })) : null] }), fullyBooked ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", children: fullyBookedLabel })) : availability ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "success", variant: "soft", size: "sm", children: availability })) : null] }), !compact && chips.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-sm flex flex-wrap gap-xs", children: chips.map((s) => ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "outline", size: "sm", children: s }, s))) })) : null, price || onBook ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex items-center justify-between gap-sm", children: [price ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: fromLabel }), (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]", children: price })] })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex-1" })), onBook ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", 
                        // Fully booked DISABLES the CTA.
                        disabled: fullyBooked, onClick: onBook, "aria-label": `${bookLabel}, ${name}`, children: bookLabel })) : null] })) : null] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-stylist-card": "", className: className, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-stylist-card": "", className: (0, cn_1.cn)('p-0', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, salon_v4_1.metaLine)([
                name,
                role,
                typeof rating === 'number' ? `rated ${rating}` : null,
                reviews,
                fullyBooked ? fullyBookedLabel : availability,
            ]), "data-xen-v4-chrome": "on-surface", className: "flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left", children: body }) }));
});
//# sourceMappingURL=StylistCardV4.js.map