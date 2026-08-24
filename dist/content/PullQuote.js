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
exports.PullQuote = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CONTAINER = {
    bordered: 'border-l-[3px] border-accent pl-[var(--xen-space-md)] py-[var(--xen-space-xs)]',
    block: 'border border-border bg-surface rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
    large: 'py-[var(--xen-space-lg)] text-center',
};
/**
 * A pull quote / block quote for long-form articles — the visually emphasized
 * excerpt lifted out of the body. Web (React DOM) mirror of the native
 * `PullQuote`. Three token-bound variants: a `bordered` left-rule quote, a
 * filled `block` card, and an oversized centered `large` display quote.
 * Rendered as a semantic `<figure><blockquote>`; all colors from `--xen-*`.
 */
exports.PullQuote = React.forwardRef(function PullQuote({ quote, attribution, variant = 'bordered', className, ...rest }, ref) {
    const large = variant === 'large';
    return ((0, jsx_runtime_1.jsxs)("figure", { ref: ref, "aria-label": `Quote: ${quote}${attribution ? `, ${attribution}` : ''}`, className: (0, cn_1.cn)(CONTAINER[variant], className), ...rest, children: [(0, jsx_runtime_1.jsx)("blockquote", { className: (0, cn_1.cn)('text-on-surface', large ? 'text-2xl font-bold leading-snug' : 'text-xl font-medium italic leading-snug'), children: `“${quote}”` }), attribution ? ((0, jsx_runtime_1.jsx)("figcaption", { className: (0, cn_1.cn)('mt-[var(--xen-space-sm)] text-sm font-semibold text-muted', large && 'text-center'), children: `— ${attribution}` })) : null] }));
});
//# sourceMappingURL=PullQuote.js.map