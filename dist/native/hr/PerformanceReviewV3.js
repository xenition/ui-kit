"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceReviewV3 = PerformanceReviewV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
/**
 * PerformanceReview, design **V3** — a compact single row. Cycle + reviewer on
 * the left, a condensed star meter and goal percentage on the right, and the
 * review status carried by a leading tone glyph + word (never color alone).
 * Rating is still announced numerically via a11y. Same Props as
 * {@link PerformanceReview}; the goal ring/bar is dropped for density.
 * Press-scales on tap; token-pure.
 */
function PerformanceReviewV3({ cycle, reviewer, rating, ratingMax = 5, status, goalCompletion, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const max = Math.max(1, Math.floor(ratingMax));
    const rated = (0, internal_1.clampRating)(rating, max);
    const hasRating = rating != null && Number.isFinite(rating);
    const hasGoals = goalCompletion != null;
    const pct = (0, internal_1.clampPct)(goalCompletion);
    const statusMeta = status ? internal_1.REVIEW_STATUS_META[status] : undefined;
    const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                transform: [{ scale: press.scale }],
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: cycle }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }, children: [statusMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityLabel: statusMeta.label, style: { color: (0, internal_1.toneColor)(colors, statusMeta.tone), fontSize: tokens.typography.scale.xs }, children: [statusMeta.glyph, " ", statusMeta.label] })) : null, reviewer ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", reviewer] }) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [hasRating ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Rating ${rated} of ${max}`, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.accent, fontSize: tokens.typography.scale.sm, letterSpacing: 1 }, children: stars.join('') }) })) : null, hasGoals ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [pct, "% goals"] })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Review ${cycle}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, testID: testID, children: row }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: row });
}
//# sourceMappingURL=PerformanceReviewV3.js.map