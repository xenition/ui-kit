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
exports.RatingSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Rating_1 = require("../primitives/Rating");
/**
 * Aggregate rating block — a large average, a `Rating` star row, and the total
 * count. In `detailed` mode with a `distribution` it also draws a five-row bar
 * chart (5★→1★) using token-tinted fills. When `count` is 0 it shows a muted
 * empty label instead. Bar widths are guarded against a zero denominator. Web
 * parity of the native `RatingSummary`; token-only.
 */
exports.RatingSummary = React.forwardRef(function RatingSummary({ average, count, distribution, variant = 'compact', emptyLabel = 'No ratings yet', className, ...rest }, ref) {
    if (count <= 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: 0, size: "sm" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel })] }));
    }
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-3xl font-extrabold text-on-surface", children: average.toFixed(1) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: average, size: "md" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: [count, " ", count === 1 ? 'rating' : 'ratings'] })] })] }));
    const a11yLabel = `${average.toFixed(1)} out of 5, ${count} ratings`;
    if (variant !== 'detailed' || !distribution || distribution.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11yLabel, className: className, ...rest, children: header }));
    }
    const maxBucket = Math.max(1, ...distribution);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11yLabel, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [header, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: distribution.map((bucket, i) => {
                    const stars = distribution.length - i; // first entry = highest star
                    const pct = Math.max(0, Math.min(1, bucket / maxBucket));
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-4 text-right text-xs text-muted", children: stars }), (0, jsx_runtime_1.jsx)("span", { className: "h-2 flex-1 overflow-hidden rounded-full bg-neutral-200", children: (0, jsx_runtime_1.jsx)("span", { className: "block h-full bg-accent", style: { width: `${pct * 100}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: "w-8 text-xs text-muted tabular-nums", children: bucket })] }, stars));
                }) })] }));
});
//# sourceMappingURL=RatingSummary.js.map