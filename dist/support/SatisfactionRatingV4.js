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
exports.SatisfactionRatingV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];
// V4 sizes run a touch larger for the calm, legible console read.
const SIZE_PX = { sm: 24, md: 34, lg: 48 };
/**
 * SatisfactionRating — **V4** "calm console" design (web parity of the native
 * V4). A big, legible CSAT read: a large numeral (`value / total`) paired with a
 * row of glyphs — filled = **primary** (`warn` for the low-score faces/thumbs
 * caution), empty = muted, emphasis by size + opacity + the numeric a11y label
 * (never color alone). Interactive glyphs are ≥44px `radio` buttons; read-only
 * renders a static `img`. Same props/behavior as {@link SatisfactionRatingProps};
 * all colors from `--xen-*` token classes (no literal hex).
 */
exports.SatisfactionRatingV4 = React.forwardRef(function SatisfactionRatingV4({ value = 0, max = 5, variant = 'stars', size = 'md', onRate, readOnly = false, label, className, ...rest }, ref) {
    const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
    const current = (0, internal_1.clamp)(Math.round(value), 0, total);
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphPx = SIZE_PX[size] ?? SIZE_PX.md;
    const glyphFor = (index) => {
        if (variant === 'faces')
            return FACE_GLYPHS[index] ?? '🙂';
        if (variant === 'thumbs')
            return THUMB_GLYPHS[index] ?? '👍';
        return '★';
    };
    // A low CSAT (bottom half of the scale) leans on the warn slot as a calm
    // caution; otherwise filled reads as primary.
    const filledCls = current > 0 && current <= Math.ceil(total / 2) ? 'text-warn' : 'text-primary';
    const caption = label ? ((0, jsx_runtime_1.jsx)("span", { className: "mb-1 block text-sm text-muted", children: label })) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [caption, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: "flex items-baseline gap-0.5 font-heading font-bold leading-none", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl', current > 0 ? 'text-on-surface' : 'text-muted'), children: current }), (0, jsx_runtime_1.jsxs)("span", { className: "text-base text-muted", children: ["/ ", total] })] }), (0, jsx_runtime_1.jsx)("div", { role: interactive ? 'radiogroup' : 'img', "aria-label": interactive ? (label ?? 'Rating') : `${current} out of ${total}`, className: "flex items-center gap-1", children: Array.from({ length: total }, (_, i) => {
                            const score = i + 1;
                            const selected = score === current || (variant === 'stars' && score <= current);
                            const cell = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('leading-none', variant === 'stars' && (selected ? filledCls : 'text-muted')), style: { fontSize: glyphPx, opacity: selected ? 1 : 0.35 }, children: glyphFor(i) }));
                            if (!interactive) {
                                return ((0, jsx_runtime_1.jsx)("span", { className: "p-0.5", children: cell }, score));
                            }
                            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": score === current, "aria-label": `Rate ${score} of ${total}`, onClick: () => onRate?.(score), className: "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--xen-radius-md)] p-0.5 hover:bg-on-surface/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: cell }, score));
                        }) })] })] }));
});
//# sourceMappingURL=SatisfactionRatingV4.js.map