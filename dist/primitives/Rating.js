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
exports.Rating = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const SIZE_CLASS = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
};
const STAR = '★'; // ★
/**
 * A ★ rating row — the "Stars" widget the templates hand-rolled, promoted to a
 * token-only primitive. Draws `max` glyphs: filled (the `accent` slot) up to
 * the rounded `value`, empty (the `muted` slot) after. Announced as one
 * `role="img"` with an aria-label (`"{value} out of {max} stars"` or a custom
 * `label`); the glyphs are decorative. An optional trailing numeric value.
 */
exports.Rating = React.forwardRef(function Rating({ value, max = 5, size = 'md', showValue = false, label, className, ...rest }, ref) {
    const total = Math.max(0, Math.floor(max));
    const filled = Math.max(0, Math.min(total, Math.round(value)));
    const ariaLabel = label ?? `${value} out of ${total} stars`;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "img", "aria-label": ariaLabel, "data-xen-rating": size, className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)]', SIZE_CLASS[size], className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-flex leading-none tracking-[0.1em]", children: Array.from({ length: total }, (_, i) => ((0, jsx_runtime_1.jsx)("span", { className: i < filled ? 'text-accent' : 'text-muted', children: STAR }, i))) }), showValue ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "font-heading text-sm font-semibold text-on-surface", children: value })) : null] }));
});
//# sourceMappingURL=Rating.js.map