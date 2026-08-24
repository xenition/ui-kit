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
exports.WatchlistRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
/**
 * WatchlistRow, redesigned (v3): an **ultra-dense saved line**. A tiny thumbnail,
 * the title inline, the price pinned right (struck compare-at beneath when it
 * dropped), and a compact ♥ toggle — a single hairline row for a long watchlist.
 * Ended items dim + strike the title. The opposite of v2's card. Same props,
 * token-only.
 */
exports.WatchlistRowV3 = React.forwardRef(function WatchlistRowV3({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, watched = true, ended, onToggleWatch, onClick, className, ...rest }, ref) {
    void condition;
    const interactive = typeof onClick === 'function';
    const dropped = typeof compareAtCents === 'number' && compareAtCents > priceCents;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-watchlist-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${title}, ${(0, commerce_1.formatMoney)(priceCents, currency)}${ended ? ', sold' : ''}`, onClick: onClick, onKeyDown: interactive ? internal_1.activateOnKey : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', ended && 'opacity-60', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded bg-neutral-100 text-base", children: imageUrl ? (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover" }) : '🛍️' }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm text-on-surface', ended && 'text-muted line-through'), children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: (0, commerce_1.formatMoney)(priceCents, currency) }), dropped ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-success", children: ["\u2193 ", (0, commerce_1.formatMoney)(compareAtCents, currency)] })) : null] }), onToggleWatch ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": watched ? 'Unwatch' : 'Watch', "aria-pressed": watched, onClick: (e) => {
                    e.stopPropagation();
                    onToggleWatch(!watched);
                }, className: (0, cn_1.cn)('text-base', watched ? 'text-danger' : 'text-muted'), children: watched ? '♥' : '♡' })) : null] }));
});
//# sourceMappingURL=WatchlistRowV3.js.map