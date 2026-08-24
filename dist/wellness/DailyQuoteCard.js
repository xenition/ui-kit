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
exports.DailyQuoteCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const TONE_KEY = {
    primary: 'primary',
    accent: 'accent',
    success: 'success',
};
/**
 * A daily inspiration card (web parity of the native block): a tinted quote
 * mark, the quote and author, an optional category eyebrow, and favorite / share
 * controls as real `<button>`s. `favorited` flips the heart glyph and its
 * `aria-pressed` (state, not color alone); `loading` renders a skeleton and a
 * missing quote shows an empty note. Token-only colors.
 */
exports.DailyQuoteCard = React.forwardRef(function DailyQuoteCard({ quote, author, category, tone = 'primary', favorited = false, loading = false, onFavorite, onShare, emptyLabel = 'No quote today.', className, }, ref) {
    const slot = TONE_KEY[tone] ?? 'primary';
    const shell = (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-daily-quote-card": "", "aria-busy": "true", "aria-label": "Loading quote", className: shell, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "90%", height: 20 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "75%", height: 20 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "40%", height: 14 })] }));
    }
    if (!quote) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-daily-quote-card": "", "aria-label": emptyLabel, className: (0, cn_1.cn)(shell, 'items-center'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl", children: "\uD83D\uDD4A\uFE0F" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-daily-quote-card": "", "aria-label": `Quote${author ? ` by ${author}` : ''}: ${quote}`, className: shell, children: [category ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold uppercase tracking-wide', _tokens_1.SLOT_TEXT[slot]), children: category })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-2xl leading-none opacity-50', _tokens_1.SLOT_TEXT[slot]), children: "\u201C" }), (0, jsx_runtime_1.jsx)("p", { className: "flex-1 text-lg font-semibold leading-relaxed text-on-surface", children: quote })] }), author ? (0, jsx_runtime_1.jsxs)("p", { className: "text-sm italic text-muted", children: ["\u2014 ", author] }) : null, onFavorite || onShare ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-md)]", children: [onFavorite ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": favorited, "aria-label": favorited ? 'Remove from favorites' : 'Add to favorites', onClick: () => onFavorite(!favorited), className: (0, cn_1.cn)('text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', favorited ? 'text-danger' : 'text-muted'), children: favorited ? '♥' : '♡' })) : null, onShare ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Share quote", onClick: onShare, className: "text-lg text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "\u2197" })) : null] })) : null] }));
});
//# sourceMappingURL=DailyQuoteCard.js.map