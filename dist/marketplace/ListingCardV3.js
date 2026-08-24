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
exports.ListingCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const ConditionBadge_1 = require("./ConditionBadge");
const internal_1 = require("./internal");
/**
 * ListingCard, redesigned (v3): a **dense list row**. A small square thumbnail,
 * the title over a subtitle·condition meta line, the price (with a struck
 * compare-at) pinned right, and a compact watch ♥ — hairline-bordered for long
 * catalog lists. The opposite of v2's featured tile. Same props, token-only.
 */
exports.ListingCardV3 = React.forwardRef(function ListingCardV3({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, subtitle, watched, onToggleWatch, variant, loading = false, onClick, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const onSale = typeof compareAtCents === 'number' && compareAtCents > priceCents;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-listing-card": "", "aria-label": "Loading listing", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 w-12 animate-pulse rounded-md bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-listing-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${title}, ${(0, commerce_1.formatMoney)(priceCents, currency)}`, onClick: onClick, onKeyDown: interactive ? internal_1.activateOnKey : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl", children: imageUrl ? (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover" }) : '🛍️' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: subtitle }) : null, condition ? (0, jsx_runtime_1.jsx)(ConditionBadge_1.ConditionBadge, { condition: condition, size: "sm" }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-on-surface", children: (0, commerce_1.formatMoney)(priceCents, currency) }), onSale ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted line-through", children: (0, commerce_1.formatMoney)(compareAtCents, currency) })) : null] }), onToggleWatch ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": watched ? 'Unwatch' : 'Watch', "aria-pressed": !!watched, onClick: (e) => {
                            e.stopPropagation();
                            onToggleWatch(!watched);
                        }, className: (0, cn_1.cn)('text-lg', watched ? 'text-danger' : 'text-muted'), children: watched ? '♥' : '♡' })) : null] })] }));
});
//# sourceMappingURL=ListingCardV3.js.map