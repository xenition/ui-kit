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
exports.RatingSummaryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ProgressV4_1 = require("../primitives/ProgressV4");
const RatingV4_1 = require("../primitives/RatingV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const menu_v4_1 = require("./internal/menu-v4");
function defaultCount(count) {
    return count === 1 ? '1 rating' : `${count} ratings`;
}
function defaultStars(stars) {
    return stars === 1 ? '1 star' : `${stars} stars`;
}
/**
 * **V4 rating summary** — the web twin of the native `RatingSummaryV4`, same
 * props as {@link RatingSummary} plus `maxStars`, `formatCount` and
 * `formatStars`.
 *
 * ## Five changes
 *
 * 1. **The scale is not hard-coded to five.** The name said "out of 5" while
 *    the bucket rows counted down from `distribution.length`, so a 10-bucket
 *    distribution drew ten bars under a five-star claim.
 * 2. **The distribution bars are exposed.** They were a `span` with a width —
 *    invisible to a reader, which meant the *shape* of the ratings, the thing
 *    the detailed variant exists to show, was sighted-only. Each row is now a
 *    real `progressbar` with its own name.
 * 3. **A bucket says "5 stars", not "5".** A naked digit in a column announces
 *    as a number with no unit and no meaning.
 * 4. **The name lands on an element with a role.** `aria-label` on a role-less
 *    `div` is ignored outright, so the average and the count — the two figures
 *    the block is made of — reached nobody.
 * 5. **Tokens.** `font-extrabold` is off the kit's weight scale, which stops
 *    at bold; `bg-neutral-200` is a ramp step that inverts under
 *    `[data-theme="dark"]`, so the empty half of every bar went near-white on
 *    a dark page; and `text-muted` is a fill being used as ink.
 */
exports.RatingSummaryV4 = React.forwardRef(function RatingSummaryV4({ average, count, distribution, variant = 'compact', maxStars, formatCount = defaultCount, formatStars = defaultStars, emptyLabel = 'No ratings yet', className, ...rest }, ref) {
    const scale = maxStars ?? (distribution && distribution.length > 0 ? distribution.length : 5);
    if (count <= 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": emptyLabel, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: 0, max: scale, size: "sm", label: emptyLabel }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: emptyLabel })] }));
    }
    const rated = (0, tone_v4_1.ratingParts)({ value: average, max: scale, count });
    const countText = formatCount(count);
    const label = (0, menu_v4_1.spokenLine)([`${average.toFixed(1)} out of ${scale}`, countText]);
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading text-3xl font-bold text-on-card', menu_v4_1.TABULAR_CLASS), children: average.toFixed(1) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: average, max: scale, size: "md", label: rated.label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-muted-text', menu_v4_1.TABULAR_CLASS), children: countText })] })] }));
    if (variant !== 'detailed' || !distribution || distribution.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "group", "aria-label": label, className: className, ...rest, children: header }));
    }
    const maxBucket = Math.max(1, ...distribution);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": label, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [header, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-xs", children: distribution.map((bucket, i) => {
                    const stars = distribution.length - i; // first entry = highest star
                    const starWord = formatStars(stars);
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('w-md text-right text-xs text-muted-text', menu_v4_1.TABULAR_CLASS), children: stars }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: bucket, max: maxBucket, tone: "primary", size: "sm", "aria-label": (0, menu_v4_1.spokenLine)([starWord, formatCount(bucket)]), className: "flex-1" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-xl text-right text-xs text-muted-text', menu_v4_1.TABULAR_CLASS), "aria-hidden": "true", children: bucket })] }, stars));
                }) })] }));
});
//# sourceMappingURL=RatingSummaryV4.js.map