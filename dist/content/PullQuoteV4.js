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
exports.PullQuoteV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const reading_v4_1 = require("./internal/reading-v4");
const CONTAINER = {
    bordered: 'border-l-[3px] border-accent pl-md py-xs',
    block: 'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-lg',
    large: 'py-lg text-center',
};
/**
 * **V4 pull quote** — the web twin of the native `PullQuoteV4`, same props as
 * {@link PullQuote} plus `formatQuote`.
 *
 * ## Two changes
 *
 * 1. **The quote is read once.** The base put an `aria-label` duplicating the
 *    quote onto a `<figure>` that then rendered the same words in a
 *    `<blockquote>`. Because a native label *replaces* its subtree and a web
 *    one is announced *beside* it, the same props read the quote a different
 *    number of times per platform — twice on web, once on native. The label is
 *    gone; `formatQuote` is the deliberate way back to a single spoken line,
 *    and it hides the subtree when used.
 * 2. **The attribution takes `mutedText`**, the contrast-corrected ink slot,
 *    where the base inked it with the `muted` fill.
 */
exports.PullQuoteV4 = React.forwardRef(function PullQuoteV4({ quote, attribution, variant = 'bordered', formatQuote, className, ...rest }, ref) {
    if (!quote)
        return null;
    const large = variant === 'large';
    const spoken = formatQuote?.(quote, attribution);
    return ((0, jsx_runtime_1.jsxs)("figure", { ref: ref, "aria-label": spoken, className: (0, cn_1.cn)(CONTAINER[variant], className), ...rest, children: [(0, jsx_runtime_1.jsx)("blockquote", { "aria-hidden": spoken != null || undefined, className: (0, cn_1.cn)('text-on-surface', large ? 'text-2xl font-bold leading-snug' : 'text-xl font-medium italic leading-snug'), children: `“${quote}”` }), attribution ? ((0, jsx_runtime_1.jsx)("figcaption", { "aria-hidden": spoken != null || undefined, className: (0, cn_1.cn)('mt-sm text-sm font-semibold', reading_v4_1.TONE_INK.muted, large && 'text-center'), children: `— ${attribution}` })) : null] }));
});
//# sourceMappingURL=PullQuoteV4.js.map