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
exports.ProductRecommendationV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * **V4 product recommendation** — the web twin of the native
 * `ProductRecommendationV4`, same props as {@link ProductRecommendation} plus
 * `addedLabel`, `soldOutLabel` and `reasonLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number** — this is a shelf where a shopper
 *    compares two products, and five glyphs is not a number.
 * 2. **Sold out `disabled`s the button** rather than only greying a live one.
 * 3. **The reason is labelled.** "Because you booked a keratin treatment" read
 *    as a second description; it is the whole point of a recommendation.
 * 4. **The thumbnail has a fixed ratio and a `muted` ground**, so a shelf does
 *    not reflow as images arrive.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
exports.ProductRecommendationV4 = React.forwardRef(function ProductRecommendationV4({ name, priceCents, currency = 'USD', brand, rating, imageUrl, reason, added = false, soldOut = false, formatMoney = money_1.formatMoney, addLabel = 'Add', addedLabel = 'Added', soldOutLabel = 'Sold out', reasonLabel = 'Why this', onAdd, onClick, className, ...rest }, ref) {
    if (!name)
        return null;
    const price = formatMoney(priceCents, currency);
    const cta = soldOut ? soldOutLabel : added ? addedLabel : addLabel;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: "aspect-square w-20 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-muted", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", loading: "lazy", className: "h-full w-full object-cover" })) : null }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [brand ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: brand }) : null, (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-base font-bold text-on-card", children: name }), typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true }) : null, (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-lg font-bold text-on-card [font-variant-numeric:tabular-nums]", children: price })] }), soldOut ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", children: soldOutLabel })) : null] }), reason ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-sm flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: reasonLabel }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-card", children: reason })] })) : null, onAdd ? ((0, jsx_runtime_1.jsxs)(ButtonV4_1.ButtonV4, { variant: added ? 'secondary' : 'primary', size: "sm", 
                // Sold out DISABLES the control. The base dimmed it and left it live.
                disabled: soldOut, onClick: onAdd, "aria-label": `${cta}, ${name}`, className: "mt-md w-full gap-xs", children: [added ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm" }) : null, cta] })) : null] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-product-recommendation": "", className: (0, cn_1.cn)(soldOut && 'opacity-[0.38]', className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-product-recommendation": "", className: (0, cn_1.cn)('p-0', soldOut && 'opacity-[0.38]', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, salon_v4_1.metaLine)([brand, name, price, soldOut ? soldOutLabel : null]), "data-xen-v4-chrome": "on-surface", className: "flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left", children: body }) }));
});
//# sourceMappingURL=ProductRecommendationV4.js.map