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
exports.SatisfactionRatingV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * SatisfactionRating, redesigned (v3): a **tight inline scale**. Small glyphs pack
 * on one line with the caption trailing — a compact CSAT read-out for a row. The
 * chosen score is filled + bolded (never color alone). The opposite of v2's big
 * tiles. Same props, token-only.
 */
exports.SatisfactionRatingV3 = React.forwardRef(function SatisfactionRatingV3({ value = 0, max = 5, variant = 'stars', size, onRate, readOnly = false, label, className, ...rest }, ref) {
    void size;
    const count = variant === 'thumbs' ? 2 : max;
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphFor = (i) => {
        if (variant === 'thumbs')
            return i === 0 ? '👎' : '👍';
        if (variant === 'faces')
            return i < value ? '🙂' : '·';
        return i < value ? '★' : '☆';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-satisfaction-rating": "", role: interactive ? 'radiogroup' : 'img', "aria-label": label ?? `Rated ${value} of ${count}`, className: (0, cn_1.cn)('inline-flex items-center gap-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-0.5", children: Array.from({ length: count }).map((_, i) => {
                    const score = i + 1;
                    const selected = value === score;
                    const glyph = glyphFor(i);
                    const cls = (0, cn_1.cn)('text-base', i < value ? 'text-warn' : 'text-muted', selected && 'font-bold');
                    if (!interactive)
                        return (0, jsx_runtime_1.jsx)("span", { className: cls, children: glyph }, i);
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `Rate ${score}`, onClick: () => onRate?.(score), className: (0, cn_1.cn)(cls, 'hover:opacity-70'), children: glyph }, i));
                }) }), label ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: label }) : null] }));
});
//# sourceMappingURL=SatisfactionRatingV3.js.map