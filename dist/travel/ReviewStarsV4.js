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
exports.ReviewStarsV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Rating_1 = require("../primitives/Rating");
/**
 * ReviewStars — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on an aggregate review: the average sits large in
 * near-white ink on a brand-gradient rating badge (the signature V4 touch), the
 * star row and count ride beside it, and the optional per-star distribution is
 * drawn as thin token proportion bars. Bar widths are guarded against a zero
 * total. Same props/behavior as {@link ReviewStarsProps}; all colors from
 * `--xen-*` token classes (no literal colors). Pass `compact` for a single-line
 * layout that hides the distribution.
 */
exports.ReviewStarsV4 = React.forwardRef(function ReviewStarsV4({ average, total, distribution = [], summary, compact = false, className, ...rest }, ref) {
    const maxCount = distribution.reduce((m, b) => Math.max(m, b.count), 0);
    const subline = [summary, typeof total === 'number' ? `${total} reviews` : undefined]
        .filter(Boolean)
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-review-stars": "", "aria-label": `${average} out of 5${typeof total === 'number' ? `, ${total} reviews` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-400 to-primary-600 text-2xl font-extrabold text-primary-50", children: average.toFixed(1) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[2px]", children: [(0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: average, size: "sm" }), subline ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: subline }) : null] })] }), !compact && distribution.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: distribution.map((b, i) => {
                    const pct = maxCount > 0 ? Math.round((b.count / maxCount) * 100) : 0;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-4 text-xs text-muted", children: b.stars }), (0, jsx_runtime_1.jsx)("div", { className: "h-[6px] flex-1 overflow-hidden rounded-full bg-border", children: (0, jsx_runtime_1.jsx)("div", { style: { width: `${pct}%` }, className: "h-[6px] rounded-full bg-gradient-to-r from-primary-400 to-primary-600" }) }), (0, jsx_runtime_1.jsx)("span", { className: "w-8 text-right text-xs text-muted", children: b.count })] }, `${b.stars}-${i}`));
                }) })) : null] }));
});
//# sourceMappingURL=ReviewStarsV4.js.map