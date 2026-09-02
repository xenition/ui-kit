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
exports.PerformanceReviewV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const StatusPillV4_1 = require("./StatusPillV4");
const workforce_v4_1 = require("./workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/** The meter's spoken name. The base's `aria-label` said "Rating" too. */
const RATING_NAME = 'Rating';
/** The goal meter's default caption, which is also its spoken name. */
const GOALS_NAME = 'Goals';
/**
 * **V4 performance review** — the web twin of the native
 * `PerformanceReviewV4`, same props as {@link PerformanceReview} plus
 * `formatRating`, `goalsLabel`, `formatDue` and `testID`.
 *
 * ## Six changes
 *
 * 1. **4.5 no longer draws as a perfect score.** The star row used
 *    `Math.round(rated)` while the text beside it printed the raw value, so
 *    `rating={4.5}` drew **five** filled stars next to the words "4.5/5" — the
 *    drawing said one thing about somebody's performance review and the
 *    numeral said another. `ratingParts()` floors the drawn marks; a drawn
 *    mark claims a whole point.
 * 2. **`ratingMax={NaN}` no longer renders "NaN/NaN".** An API field that
 *    parsed badly walked through `Math.max(1, Math.floor(NaN))` unchanged and
 *    reached both the visible string and the `aria-label`.
 * 3. **The rating is a real meter.** It was an `aria-label` on a bare
 *    `<span>` — a `generic` element, which ARIA forbids naming, so every
 *    browser dropped the label and the reader got the raw star glyphs. Native
 *    meanwhile marked the same thing `accessibilityRole="text"`. Two twins
 *    announcing two different things, neither of them a `progressbar`.
 * 4. **The goal meter survives.** Inside a `role="button"` card a
 *    `progressbar`'s value is presentational and is dropped, so a review at
 *    40% goal completion announced no percentage at all. The card is a plain
 *    container now and the meters are siblings of its activation.
 * 5. **The card is one accessible name.** `Review H1 2026` replaced the
 *    subtree — the reviewer, the status and the due date were never spoken.
 * 6. **The reviewer avatar is the same size on both twins** (`xs`, which is
 *    what a mark beside an `xs` caption should be); web drew `sm` and native
 *    drew `xs`.
 */
exports.PerformanceReviewV4 = React.forwardRef(function PerformanceReviewV4({ cycle, reviewer, reviewerAvatarUrl, rating, ratingMax = 5, status, goalCompletion, goalCount, dueDate, variant = 'default', onClick, formatRating, goalsLabel = GOALS_NAME, formatDue, testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const compact = variant === 'compact';
    const hasRating = rating != null && Number.isFinite(rating);
    const parts = (0, workforce_v4_1.ratingParts)(rating ?? 0, ratingMax);
    const ratingText = (formatRating ?? ((p) => `${p.value}/${p.max}`))(parts);
    const pct = (0, tone_v4_1.clampPercent)(goalCompletion);
    const showGoals = !compact && pct != null;
    const statusMeta = status ? internal_1.REVIEW_STATUS_META[status] : undefined;
    const interactive = onClick != null;
    const goalsCaption = `${goalsLabel}${goalCount != null ? ` (${goalCount})` : ''}`;
    const due = dueDate ? (formatDue ?? ((d) => `Due ${d}`))(dueDate) : undefined;
    // Floored, so a drawn mark always claims a whole point. The fraction lives
    // in the numeral, which is what a low-vision reader actually compares.
    const stars = Array.from({ length: parts.max }, (_, i) => (i < parts.filled ? '★' : '☆'));
    const summary = ((0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-card", children: cycle }), reviewer ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "xs", name: reviewer, src: reviewerAvatarUrl, alt: "" }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: reviewer })] })) : null] }));
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-sm", children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([
                            'Review',
                            cycle,
                            reviewer,
                            statusMeta?.label,
                            due,
                        ]), onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-start gap-sm rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-start gap-sm", children: summary })), statusMeta ? ((0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", "aria-hidden": interactive || undefined })) : null] }), hasRating ? ((0, jsx_runtime_1.jsxs)("span", { role: "progressbar", "aria-label": RATING_NAME, "aria-valuemin": 0, "aria-valuemax": parts.max, "aria-valuenow": parts.value, "aria-valuetext": ratingText, className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "tracking-widest text-accent-text", children: stars.join('') }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold text-muted-text', tone_v4_1.TABULAR_CLASS), children: ratingText })] })) : null, showGoals ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: goalsCaption }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold text-muted-text', tone_v4_1.TABULAR_CLASS), children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, max: 100, size: "sm", "aria-label": goalsCaption })] })) : null, due ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: due }) : null] }));
});
//# sourceMappingURL=PerformanceReviewV4.js.map