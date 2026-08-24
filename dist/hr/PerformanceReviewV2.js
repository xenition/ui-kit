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
exports.PerformanceReviewV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * PerformanceReview, design **V2** — a card pairing a prominent star meter with
 * a conic goal-completion ring. The ring is drawn from token-bound gradient
 * stops and shows the percentage as text in its centre (so progress is read by
 * both position and number, never color alone). The rating is announced
 * numerically via `aria-label` as well as drawn with filled/empty stars. Same
 * Props as {@link PerformanceReview}. Elevated with a subtle hover lift;
 * token-pure (no literals).
 */
exports.PerformanceReviewV2 = React.forwardRef(function PerformanceReviewV2({ cycle, reviewer, reviewerAvatarUrl, rating, ratingMax = 5, status, goalCompletion, goalCount, dueDate, onClick, className, }, ref) {
    const max = Math.max(1, Math.floor(ratingMax));
    const rated = (0, internal_1.clampRating)(rating, max);
    const hasRating = rating != null && Number.isFinite(rating);
    const pct = (0, internal_1.clampPct)(goalCompletion);
    const hasGoals = goalCompletion != null;
    const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, variant: "elevated", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Review ${cycle}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 transition duration-200 motion-reduce:transition-none', interactive &&
            'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: cycle }), reviewer ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: reviewer, src: reviewerAvatarUrl }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: reviewer })] })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.REVIEW_STATUS_META[status], size: "sm" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [hasRating ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-0.5", "aria-label": `Rating ${rated} of ${max}`, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xl tracking-widest text-accent", children: stars.join('') }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [rated, "/", max, " overall"] })] })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Not yet rated" })), dueDate ? (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-xs text-muted", children: ["Due ", dueDate] }) : null] }), hasGoals ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-label": `Goals ${pct}%`, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, className: "grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-primary/10", children: (0, jsx_runtime_1.jsx)("div", { className: "grid h-14 w-14 place-items-center rounded-full bg-primary/20", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid h-11 w-11 place-items-center rounded-full bg-surface", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-bold text-on-surface", children: [pct, "%"] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: goalCount != null ? `${goalCount}g` : 'goals' })] }) }) })) : null] })] }));
});
//# sourceMappingURL=PerformanceReviewV2.js.map