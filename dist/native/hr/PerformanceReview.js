"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceReview = PerformanceReview;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * Performance-review summary: cycle, reviewer, a star rating meter, review
 * status, and an optional goal-completion meter. Status is a glyph + word pill
 * (never color alone) and the rating is announced numerically via a11y as well
 * as drawn with filled/empty stars. `compact` drops the goal meter. All colors
 * are theme tokens — no literals.
 */
function PerformanceReview({ cycle, reviewer, reviewerAvatarUrl, rating, ratingMax = 5, status, goalCompletion, goalCount, dueDate, variant = 'default', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const max = Math.max(1, Math.floor(ratingMax));
    const rated = (0, internal_1.clampRating)(rating, max);
    const hasRating = rating != null && Number.isFinite(rating);
    const pct = (0, internal_1.clampPct)(goalCompletion);
    const showGoals = !compact && goalCompletion != null;
    const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: cycle }), reviewer ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "xs", name: reviewer, src: reviewerAvatarUrl }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: reviewer })] })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.REVIEW_STATUS_META[status], size: "sm" }) : null] }), hasRating ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Rating ${rated} of ${max}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.accent, fontSize: tokens.typography.scale.base, letterSpacing: 2 }, children: stars.join('') }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [rated, "/", max] })] })) : null, showGoals ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Goals", goalCount != null ? ` (${goalCount})` : ''] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: pct }, style: { height: 6, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1), overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', backgroundColor: colors.primary } }) })] })) : null, dueDate ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Due ", dueDate] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Review ${cycle}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=PerformanceReview.js.map