"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceReviewV2 = PerformanceReviewV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * PerformanceReview, design **V2** — a card pairing a prominent star meter with
 * a circular goal-completion ring. The ring is a four-arc gauge whose lit
 * segments track the percentage, with the number in its centre (so progress is
 * read by both position and text, never color alone). Rating is announced
 * numerically via a11y as well as drawn. Same Props as {@link PerformanceReview}.
 * Elevated + mount-fade, token-pure.
 */
function PerformanceReviewV2({ cycle, reviewer, reviewerAvatarUrl, rating, ratingMax = 5, status, goalCompletion, goalCount, dueDate, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const max = Math.max(1, Math.floor(ratingMax));
    const rated = (0, internal_1.clampRating)(rating, max);
    const hasRating = rating != null && Number.isFinite(rating);
    const pct = (0, internal_1.clampPct)(goalCompletion);
    const hasGoals = goalCompletion != null;
    const stars = Array.from({ length: max }, (_, i) => (i < Math.round(rated) ? '★' : '☆'));
    // Four-arc ring: each border side lights once its threshold is passed.
    const track = (0, color_1.withAlpha)(colors.onSurface, 0.12);
    const lit = colors.primary;
    const arc = (threshold) => (pct >= threshold ? lit : track);
    const card = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                opacity: enter.opacity,
                transform: enter.transform,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: cycle }), reviewer ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "xs", name: reviewer, src: reviewerAvatarUrl }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: reviewer })] })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.REVIEW_STATUS_META[status], size: "sm" }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [hasRating ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Rating ${rated} of ${max}`, style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.accent, fontSize: tokens.typography.scale.xl, letterSpacing: 3 }, children: stars.join('') }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [rated, "/", max, " overall"] })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Not yet rated" })), dueDate ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Due ", dueDate] }) : null] }), hasGoals ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: `Goals ${pct}%`, accessibilityValue: { min: 0, max: 100, now: pct }, style: {
                            width: 72,
                            height: 72,
                            borderRadius: tokens.radius.full,
                            borderWidth: 6,
                            borderTopColor: arc(76),
                            borderRightColor: arc(1),
                            borderBottomColor: arc(26),
                            borderLeftColor: arc(51),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [pct, "%"] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: goalCount != null ? `${goalCount} goals` : 'goals' })] })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Review ${cycle}`, onPress: onPress, testID: testID, children: card }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: card });
}
//# sourceMappingURL=PerformanceReviewV2.js.map