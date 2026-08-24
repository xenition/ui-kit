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
exports.RatingBreakdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** Normalize either input shape into a `[1★..5★]` count tuple. */
function toTuple(counts) {
    const get = (star) => {
        const raw = Array.isArray(counts)
            ? counts[star - 1]
            : counts[star];
        return typeof raw === 'number' && raw > 0 ? raw : 0;
    };
    return [get(1), get(2), get(3), get(4), get(5)];
}
/**
 * A review-score distribution — a summary header (average + total count) over
 * five proportional bars, one per star level (5★ at the top). Accepts counts as
 * an ordered array or a `{1..5}` map, derives the average when not supplied, and
 * guards every lookup and the divide-by-zero empty case. Presentational, data
 * only. Each bar is announced via its `aria-label`. Reuses `Rating`; token-only
 * colors with a token-tinted bar track.
 */
exports.RatingBreakdown = React.forwardRef(function RatingBreakdown({ counts, average, hideSummary = false, className, ...rest }, ref) {
    const tuple = toTuple(counts);
    const total = tuple.reduce((a, b) => a + b, 0);
    const derivedAvg = total > 0 ? tuple.reduce((sum, count, i) => sum + count * (i + 1), 0) / total : 0;
    const avg = typeof average === 'number' ? average : derivedAvg;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [hideSummary ? null : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-surface", children: avg.toFixed(1) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: avg, size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${total.toLocaleString()} ${total === 1 ? 'rating' : 'ratings'}` })] })] })), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [5, 4, 3, 2, 1].map((star) => {
                    const count = tuple[star - 1] ?? 0;
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return ((0, jsx_runtime_1.jsxs)("div", { "aria-label": `${star} stars, ${count} ${count === 1 ? 'rating' : 'ratings'}`, className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-4 text-right text-xs text-muted", children: star }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 flex-1 overflow-hidden rounded-[var(--xen-radius-full)] bg-neutral-200", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-[var(--xen-radius-full)] bg-accent", style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: "w-8 text-right text-xs text-muted", children: count })] }, star));
                }) })] }));
});
//# sourceMappingURL=RatingBreakdown.js.map