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
exports.PerformanceReviewV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * PerformanceReview, design **V3** — a compact single row. Cycle + reviewer on
 * the left with the review status carried by a leading tone glyph + word (never
 * color alone), and a condensed star meter and goal percentage pinned right.
 * The rating is still announced numerically via `aria-label`. Same Props as
 * {@link PerformanceReview}; the goal ring/bar is dropped for density, on a
 * borderless divider row. Token-pure.
 */
exports.PerformanceReviewV3 = React.forwardRef(function PerformanceReviewV3({ cycle, reviewer, rating, ratingMax = 5, status, goalCompletion, onClick, className, }, ref) {
    const max = Math.max(1, Math.floor(ratingMax));
    const rated = (0, internal_1.clampRating)(rating, max);
    const hasRating = rating != null && Number.isFinite(rating);
    const hasGoals = goalCompletion != null;
    const pct = (0, internal_1.clampPct)(goalCompletion);
    const statusMeta = status ? internal_1.REVIEW_STATUS_META[status] : undefined;
    const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Review ${cycle}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border bg-surface px-2 py-2 transition-colors motion-reduce:transition-none', interactive &&
            'cursor-pointer hover:bg-neutral-100 active:scale-[.99] motion-reduce:active:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: cycle }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [statusMeta ? ((0, jsx_runtime_1.jsxs)("span", { "aria-label": statusMeta.label, className: (0, cn_1.cn)('text-xs font-semibold', internal_1.TONE_TEXT_CLASS[statusMeta.tone]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: statusMeta.glyph }), " ", statusMeta.label] })) : null, reviewer ? (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted", children: ["\u00B7 ", reviewer] }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [hasRating ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": `Rating ${rated} of ${max}`, className: "text-sm tracking-wide text-accent", children: stars.join('') })) : null, hasGoals ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [pct, "% goals"] }) : null] })] }));
});
//# sourceMappingURL=PerformanceReviewV3.js.map