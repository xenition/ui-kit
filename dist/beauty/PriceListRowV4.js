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
exports.PriceListRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * **V4 price list row** — the web twin of the native `PriceListRowV4`, same
 * props as {@link PriceListRow} plus `fromLabel`, `formatDuration` and `last`.
 *
 * ## Four changes
 *
 * 1. **The compare-at price is finally drawn.** The base has carried
 *    `compareAtCents` since it was written and never rendered it. It is now an
 *    `<s>` — semantically "no longer accurate", which is exactly what it is —
 *    labelled `Was …`, and a compare-at that is not higher than the price is
 *    refused rather than drawn.
 * 2. **Prices are tabular.** A price list is *the* column-of-money component;
 *    with proportional figures it has no edge to scan down.
 * 3. **A real dotted leader** joins the service to its price, so the eye can
 *    travel across the row.
 * 4. **The `section` variant is a real heading**, announced as one.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
exports.PriceListRowV4 = React.forwardRef(function PriceListRowV4({ label, priceCents, currency = 'USD', fromPrice = false, note, durationMin, compareAtCents: compareAt, variant = 'default', formatMoney = money_1.formatMoney, fromLabel = 'from', formatDuration, last = false, className, ...rest }, ref) {
    if (!label)
        return null;
    if (variant === 'section') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("h3", { className: "pb-xs pt-md text-sm font-bold text-muted-text", children: label }) }));
    }
    const hasPrice = typeof priceCents === 'number' && Number.isFinite(priceCents);
    const price = hasPrice ? formatMoney(priceCents, currency) : null;
    const wasCents = (0, salon_v4_1.compareAtCents)(priceCents, compareAt);
    const was = wasCents != null ? formatMoney(wasCents, currency) : null;
    const duration = typeof durationMin === 'number'
        ? (formatDuration ?? ((m) => `${m} min`))(durationMin)
        : null;
    const caption = (0, salon_v4_1.metaLine)([duration, note]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-price-list-row": "", className: (0, cn_1.cn)('flex items-baseline gap-sm py-sm', !last && 'border-b border-border', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex shrink flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: label }), caption ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: caption })) : null] }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "min-w-lg flex-1 translate-y-[-2px] border-b border-dotted border-border" }), price ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex shrink-0 items-baseline gap-xs", children: [was ? ((0, jsx_runtime_1.jsx)("s", { "aria-label": `Was ${was}`, className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: was })) : null, fromPrice ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: fromLabel }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface [font-variant-numeric:tabular-nums]", children: price })] })) : null] }));
});
//# sourceMappingURL=PriceListRowV4.js.map