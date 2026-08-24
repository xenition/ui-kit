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
exports.ListingCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const ConditionBadge_1 = require("./ConditionBadge");
const internal_1 = require("./internal");
/**
 * ListingCard, redesigned (v2): a **full-bleed featured card**. The photo fills
 * the tile; the watch ♥ floats top-right, the condition badge top-left, and the
 * title/subtitle/price sit on a gradient scrim at the bottom. Elevated,
 * hover-lift. Same props as {@link ListingCard}, token-only.
 */
exports.ListingCardV2 = React.forwardRef(function ListingCardV2({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, subtitle, watched, onToggleWatch, variant, loading = false, onClick, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const onSale = typeof compareAtCents === 'number' && compareAtCents > priceCents;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-listing-card": "", "aria-label": "Loading listing", className: (0, cn_1.cn)('h-56 animate-pulse rounded-lg bg-neutral-100', className), ...rest }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-listing-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${title}, ${(0, commerce_1.formatMoney)(priceCents, currency)}`, onClick: onClick, onKeyDown: interactive ? internal_1.activateOnKey : undefined, className: (0, cn_1.cn)('relative flex h-56 flex-col justify-end overflow-hidden rounded-lg bg-neutral-100 shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "absolute inset-0 h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center text-4xl", children: "\uD83D\uDECD\uFE0F" })), (0, jsx_runtime_1.jsx)("div", { className: "absolute left-2 top-2", children: condition ? (0, jsx_runtime_1.jsx)(ConditionBadge_1.ConditionBadge, { condition: condition }) : null }), onToggleWatch ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": watched ? 'Unwatch' : 'Watch', "aria-pressed": !!watched, onClick: (e) => {
                    e.stopPropagation();
                    onToggleWatch(!watched);
                }, className: "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-base", children: (0, jsx_runtime_1.jsx)("span", { className: watched ? 'text-danger' : 'text-muted', children: watched ? '♥' : '♡' }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-gradient-to-t from-neutral-900/70 to-transparent p-3 pt-8", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-neutral-50", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-neutral-200", children: subtitle }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex items-baseline gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-neutral-50", children: (0, commerce_1.formatMoney)(priceCents, currency) }), onSale ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-neutral-300 line-through", children: (0, commerce_1.formatMoney)(compareAtCents, currency) })) : null] })] })] }));
});
//# sourceMappingURL=ListingCardV2.js.map