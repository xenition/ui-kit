"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingSummaryV4 = RatingSummaryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const menu_v4_1 = require("./internal/menu-v4");
/** The scale when nothing else names one. */
const FALLBACK_MAX = 5;
/** The distribution bar's height. `xs` — a rule, not a block. */
function barHeight(spacing) {
    return spacing.xs;
}
/**
 * **V4 rating summary** — same props as {@link RatingSummary} plus `maxStars`,
 * `formatCount` and `formatStars`.
 *
 * ## Five changes
 *
 * 1. **The scale is no longer hard-coded to 5.** The name said "out of 5"
 *    while the bucket labels were derived from `distribution.length`, so a
 *    10-bucket distribution announced the wrong scale beside ten rows of
 *    correct ones. `maxStars` names it, defaulting to the distribution's own
 *    length.
 * 2. **The bars are exposed.** They were drawn `View`s with no role and no
 *    value, so the shape of the distribution — the whole reason the detailed
 *    variant exists — reached only the eye. Each bucket is a `progressbar`
 *    with its count as the value.
 * 3. **A bucket says "5 stars", not "5".** A naked digit in a 16px column
 *    announces as a number with no unit.
 * 4. **Every figure is tabular.** The average, the bucket labels and the
 *    counts stack in fixed-width columns and were set proportionally, so the
 *    column of counts did not line up with itself.
 * 5. **The track survives dark mode and the average drops to a real weight.**
 *    The track was `tokens.ramps.neutral[200]`, which native copies without
 *    inverting, and the average was `fontWeight: '800'` — a step off the end
 *    of the kit's scale, which stops at bold.
 */
function RatingSummaryV4({ average, count, distribution, variant = 'compact', emptyLabel = 'No ratings yet', maxStars, formatCount, formatStars, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const buckets = distribution ?? [];
    const scale = maxStars ?? (buckets.length > 0 ? buckets.length : FALLBACK_MAX);
    const countWords = formatCount ?? ((n) => `${n} ${n === 1 ? 'rating' : 'ratings'}`);
    const starWords = formatStars ?? ((n) => `${n} ${n === 1 ? 'star' : 'stars'}`);
    if (count <= 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: emptyLabel, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: 0, max: scale, size: "sm", label: emptyLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel })] }));
    }
    const stars = (0, tone_v4_1.ratingParts)({ value: average, max: scale, count });
    const name = stars.label;
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", weight: "bold", tone: "onSurface", style: menu_v4_1.TABULAR, children: stars.text ?? average.toFixed(1) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: average, max: scale, size: "md", label: stars.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", style: menu_v4_1.TABULAR, children: countWords(count) })] })] }));
    if (variant !== 'detailed' || buckets.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: style, children: header }));
    }
    const maxBucket = Math.max(1, ...buckets);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: header }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: buckets.map((bucket, index) => {
                    // The first entry is the highest star, which is the order the base
                    // documents and every review UI draws.
                    const star = buckets.length - index;
                    const value = Number.isFinite(bucket) ? Math.max(0, bucket) : 0;
                    const fraction = Math.max(0, Math.min(1, value / maxBucket));
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: (0, menu_v4_1.spokenLine)([starWords(star), countWords(value)]), accessibilityValue: { min: 0, max: maxBucket, now: value }, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "right", style: [{ width: tokens.spacing.md }, menu_v4_1.TABULAR], children: star }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    flex: 1,
                                    height: barHeight(tokens.spacing),
                                    borderRadius: tokens.radius.full,
                                    overflow: 'hidden',
                                    backgroundColor: (0, menu_v4_1.placeholderGround)(theme),
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: `${fraction * 100}%`,
                                        height: '100%',
                                        backgroundColor: colors.accent,
                                    } }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: [{ width: tokens.spacing.xl }, menu_v4_1.TABULAR], children: value })] }, star));
                }) })] }));
}
//# sourceMappingURL=RatingSummaryV4.js.map