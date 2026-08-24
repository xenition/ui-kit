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
exports.WatchlistRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const ConditionBadge_1 = require("./ConditionBadge");
const internal_1 = require("./internal");
/**
 * A row in a saved / watchlist screen — thumbnail, title, price (with optional
 * compare-at drop), a condition chip, and a ♥ watch toggle. The toggle is a real
 * `<button>` outside the row's press target, so un-watching never also
 * navigates. Presentational: shaped data + callbacks only. `ended` dims the row
 * and shows a "Sold" badge (state via text + tone, not color alone). Reuses
 * `PriceTag`, `Badge`, and `ConditionBadge`; token-only colors.
 */
exports.WatchlistRow = React.forwardRef(function WatchlistRow({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, watched = true, ended = false, onToggleWatch, onClick, className, ...rest }, ref) {
    const interactive = onClick != null;
    const content = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 items-center gap-[var(--xen-space-md)]', ended && 'opacity-60'), children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100", children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-16 w-16 object-cover", loading: "lazy" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "No photo" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-base font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [condition ? (0, jsx_runtime_1.jsx)(ConditionBadge_1.ConditionBadge, { condition: condition, size: "sm" }) : null, ended ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: "Sold" }) : null] })] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [interactive ? ((0, jsx_runtime_1.jsx)("div", { role: "button", tabIndex: 0, onClick: onClick, onKeyDown: internal_1.activateOnKey, "aria-label": title, className: "flex flex-1 cursor-pointer items-center rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: content })) : (content), onToggleWatch != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": watched ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`, "aria-pressed": watched, onClick: (e) => {
                    e.stopPropagation();
                    onToggleWatch(!watched);
                }, className: (0, cn_1.cn)('p-[var(--xen-space-xs)] text-lg leading-none', watched ? 'text-danger' : 'text-muted'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: watched ? '♥' : '♡' }) })) : null] }));
});
//# sourceMappingURL=WatchlistRow.js.map