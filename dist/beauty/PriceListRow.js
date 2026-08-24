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
exports.PriceListRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * One line of a printed-style salon price list: a left label (+ optional note)
 * and a right-aligned price. `fromPrice` prefixes "from"; `compareAtCents`
 * strikes through the original (via the shared {@link PriceTag}); `durationMin`
 * adds a small sub-line. The `section` variant is a subdued header (bold label,
 * no price). Prices are integer cents via {@link formatMoney}. Token-only colors.
 */
exports.PriceListRow = React.forwardRef(function PriceListRow({ label, priceCents, currency = 'USD', fromPrice = false, note, durationMin, compareAtCents, variant = 'default', formatMoney: format = commerce_1.formatMoney, className, ...rest }, ref) {
    if (variant === 'section') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-price-list-row": "section", role: "heading", "aria-level": 3, "aria-label": label, className: (0, cn_1.cn)('border-b border-border py-[var(--xen-space-sm)]', className), ...rest, children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-extrabold uppercase tracking-widest text-muted", children: label }) }));
    }
    const hasPrice = typeof priceCents === 'number';
    const hasCompare = typeof compareAtCents === 'number' && hasPrice && compareAtCents > priceCents;
    const priceText = hasPrice ? `${fromPrice ? 'from ' : ''}${format(priceCents, currency)}` : '—';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-price-list-row": "", "aria-label": `${label}${hasPrice ? `, ${priceText}` : ''}${durationMin != null ? `, ${durationMin} minutes` : ''}`, className: (0, cn_1.cn)('flex items-start gap-[var(--xen-space-md)] border-b border-border py-[var(--xen-space-sm)] text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: label }), note ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: note }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [hasPrice ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [fromPrice ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "from" }) : null, (0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: hasCompare ? compareAtCents : undefined, formatMoney: format, size: "sm" })] })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: "\u2014" })), durationMin != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [durationMin, " min"] })) : null] })] }));
});
//# sourceMappingURL=PriceListRow.js.map