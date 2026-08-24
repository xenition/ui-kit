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
exports.PerformanceReview = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * Performance-review summary: cycle, reviewer, a star rating meter, review
 * status, and an optional goal-completion meter (the shared `Progress`
 * primitive). Status is a glyph + word pill (never color alone) and the rating
 * is announced numerically via `aria-label` as well as drawn with filled/empty
 * stars. `compact` drops the goal meter. All colors are `--xen-*` token classes
 * — no literals. `forwardRef` to the root `<div>`.
 */
exports.PerformanceReview = React.forwardRef(function PerformanceReview({ cycle, reviewer, reviewerAvatarUrl, rating, ratingMax = 5, status, goalCompletion, goalCount, dueDate, variant = 'default', onClick, className, }, ref) {
    const compact = variant === 'compact';
    const max = Math.max(1, Math.floor(ratingMax));
    const rated = (0, internal_1.clampRating)(rating, max);
    const hasRating = rating != null && Number.isFinite(rating);
    const pct = (0, internal_1.clampPct)(goalCompletion);
    const showGoals = !compact && goalCompletion != null;
    const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Review ${cycle}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-3', interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: cycle }), reviewer ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: reviewer, src: reviewerAvatarUrl }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: reviewer })] })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.REVIEW_STATUS_META[status], size: "sm" }) : null] }), hasRating ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", "aria-label": `Rating ${rated} of ${max}`, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "tracking-widest text-accent", children: stars.join('') }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [rated, "/", max] })] })) : null, showGoals ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Goals", goalCount != null ? ` (${goalCount})` : ''] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, max: 100, size: "sm" })] })) : null, dueDate ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["Due ", dueDate] }) : null] }));
});
//# sourceMappingURL=PerformanceReview.js.map