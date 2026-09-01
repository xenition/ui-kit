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
exports.DailyQuoteCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * DailyQuoteCardV4 — the "calm" restyle of {@link DailyQuoteCard}. Same props,
 * defaults, labels, a11y and behavior; the whole card becomes a soft gradient
 * ground: the quote in near-white ink (`text-on-primary`), the author/category
 * eyebrow in the softer ink (`text-primary-100`), and favorite/share as frosted
 * (`bg-primary-500`) round icon buttons. `favorited` flips the heart glyph and
 * its `aria-pressed` (state, not color alone); `loading` shows frosted skeleton
 * bars and a missing quote shows the empty note. The `tone` prop is retained for
 * parity; the calm ground is single-hue. Token-only colors.
 */
exports.DailyQuoteCardV4 = React.forwardRef(function DailyQuoteCardV4({ quote, author, category, 
// tone retained in the public props for parity; the calm ground is single-hue.
tone = 'primary', favorited = false, loading = false, onFavorite, onShare, emptyLabel = 'No quote today.', className, ...rest }, ref) {
    void tone;
    const ground = 'flex flex-col gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-700 p-[var(--xen-space-lg)]';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-daily-quote-card": "", "aria-busy": "true", "aria-label": "Loading quote", className: (0, cn_1.cn)(ground, className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-5 w-[90%] rounded-[var(--xen-radius-sm)] bg-primary-500" }), (0, jsx_runtime_1.jsx)("div", { className: "h-5 w-[75%] rounded-[var(--xen-radius-sm)] bg-primary-500" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-[40%] rounded-[var(--xen-radius-sm)] bg-primary-500" })] }));
    }
    if (!quote) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-daily-quote-card": "", "aria-label": emptyLabel, className: (0, cn_1.cn)(ground, 'items-center'), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl", children: "\uD83D\uDD4A\uFE0F" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-primary-100", children: emptyLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-daily-quote-card": "", "aria-label": `Quote${author ? ` by ${author}` : ''}: ${quote}`, className: (0, cn_1.cn)(ground, className), ...rest, children: [category ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-primary-100", children: category })) : null, (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold leading-relaxed text-on-primary", children: `“${quote}”` }), author ? (0, jsx_runtime_1.jsxs)("p", { className: "text-sm italic text-primary-100", children: ["\u2014 ", author] }) : null, onFavorite || onShare ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onFavorite ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": favorited, "aria-label": favorited ? 'Remove from favorites' : 'Add to favorites', onClick: () => onFavorite(!favorited), className: "flex h-11 w-11 items-center justify-center rounded-full bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: favorited ? '♥' : '♡', size: "lg", color: "onPrimary" }) })) : null, onShare ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Share quote", onClick: onShare, className: "flex h-11 w-11 items-center justify-center rounded-full bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2197", size: "lg", color: "onPrimary" }) })) : null] })) : null] }));
});
//# sourceMappingURL=DailyQuoteCardV4.js.map