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
exports.SatisfactionRatingV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const FACES = ['😠', '😕', '😐', '🙂', '😄'];
/**
 * SatisfactionRating, redesigned (v2): a **big face/emoji picker**. Large tappable
 * tiles — expressive faces (or 👍/👎 for `thumbs`, ★ for `stars`) — where the
 * chosen one fills primary. A bolder CSAT prompt than v1. Same props, token-only.
 */
exports.SatisfactionRatingV2 = React.forwardRef(function SatisfactionRatingV2({ value = 0, max = 5, variant = 'stars', size, onRate, readOnly = false, label, className, ...rest }, ref) {
    void size;
    const count = variant === 'thumbs' ? 2 : max;
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphFor = (i) => {
        if (variant === 'thumbs')
            return i === 0 ? '👎' : '👍';
        if (variant === 'faces')
            return FACES[Math.min(FACES.length - 1, Math.round((i / Math.max(1, count - 1)) * (FACES.length - 1)))] ?? '🙂';
        return i < value ? '★' : '☆';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-satisfaction-rating": "", role: interactive ? 'radiogroup' : 'img', "aria-label": label ?? `Rated ${value} of ${count}`, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [label ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-on-surface", children: label }) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: Array.from({ length: count }).map((_, i) => {
                    const score = i + 1;
                    const selected = value === score;
                    const glyph = glyphFor(i);
                    const cls = (0, cn_1.cn)('flex h-12 w-12 items-center justify-center rounded-lg text-2xl transition-colors', selected ? 'bg-primary/15 ring-2 ring-primary' : 'bg-neutral-100');
                    if (!interactive)
                        return (0, jsx_runtime_1.jsx)("span", { className: cls, children: glyph }, i);
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `Rate ${score}`, onClick: () => onRate?.(score), className: (0, cn_1.cn)(cls, 'hover:opacity-90'), children: glyph }, i));
                }) })] }));
});
//# sourceMappingURL=SatisfactionRatingV2.js.map