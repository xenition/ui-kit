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
exports.SatisfactionRating = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Rating_1 = require("../primitives/Rating");
const internal_1 = require("./internal");
const FACE_GLYPHS = ['😠', '🙁', '😐', '🙂', '😀'];
const THUMB_GLYPHS = ['👎', '👍'];
const SIZE_PX = { sm: 20, md: 28, lg: 40 };
/**
 * Customer-satisfaction (CSAT) rating input. In read-only star mode it reuses
 * the `Rating` primitive for a token-colored star row; when `onRate` is supplied
 * it renders tappable glyph `<button>`s (`stars` / emoji `faces` / `thumbs`) —
 * each keyboard-focusable and reporting a 1-based score, grouped as a
 * `radiogroup`. The active glyph is emphasized by size/opacity plus the numeric
 * a11y label, not color alone. Token colors only.
 */
exports.SatisfactionRating = React.forwardRef(function SatisfactionRating({ value = 0, max = 5, variant = 'stars', size = 'md', onRate, readOnly = false, label, className, ...rest }, ref) {
    const total = variant === 'thumbs' ? 2 : Math.max(1, Math.floor(max));
    const current = (0, internal_1.clamp)(Math.round(value), 0, total);
    const interactive = !readOnly && typeof onRate === 'function';
    const glyphPx = SIZE_PX[size] ?? SIZE_PX.md;
    const caption = label ? ((0, jsx_runtime_1.jsx)("span", { className: "mb-1 block text-sm text-muted", children: label })) : null;
    // Read-only star display delegates to the Rating primitive.
    if (!interactive && variant === 'stars') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [caption, (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: current, max: total, size: size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md', showValue: true })] }));
    }
    const glyphFor = (index) => {
        if (variant === 'faces')
            return FACE_GLYPHS[index] ?? '🙂';
        if (variant === 'thumbs')
            return THUMB_GLYPHS[index] ?? '👍';
        return '★';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [caption, (0, jsx_runtime_1.jsx)("div", { role: interactive ? 'radiogroup' : 'img', "aria-label": interactive ? (label ?? 'Rating') : `${current} out of ${total}`, className: "flex items-center gap-1", children: Array.from({ length: total }, (_, i) => {
                    const score = i + 1;
                    const selected = score === current || (variant === 'stars' && score <= current);
                    const cell = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('leading-none', variant === 'stars' && (selected ? 'text-accent' : 'text-muted')), style: { fontSize: glyphPx, opacity: selected ? 1 : 0.35 }, children: glyphFor(i) }));
                    if (!interactive) {
                        return ((0, jsx_runtime_1.jsx)("span", { className: "p-0.5", children: cell }, score));
                    }
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": score === current, "aria-label": `Rate ${score} of ${total}`, onClick: () => onRate?.(score), className: "rounded p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: cell }, score));
                }) })] }));
});
//# sourceMappingURL=SatisfactionRating.js.map