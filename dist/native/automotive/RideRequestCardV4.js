"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideRequestCardV4 = RideRequestCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("../commerce/money");
const fleet_v4_1 = require("./internal/fleet-v4");
/** The stop rail's dot, as a fraction of the spacing scale. */
const DOT_STEP = 0.75;
/**
 * **V4 ride request card** — same props as {@link RideRequestCard} plus five
 * copy hooks.
 *
 * ## Five changes
 *
 * 1. **The two stops are joined by a rail.** The base stacked pickup and
 *    dropoff as two independent rows, so nothing on the card said they were
 *    one journey — which is the single fact a driver reads first.
 * 2. **Accept and decline are not the same weight.** The base drew two equal
 *    buttons side by side; §5 of the design spec is explicit that a declined
 *    choice never competes with the primary one.
 * 3. **The fare is tabular and in the display face**, because it is the number
 *    the decision turns on.
 * 4. **Surge is a labelled chip**, not a tinted fare — a higher price is a
 *    condition, not an error (§35.4).
 * 5. **The rider's rating carries its number**, via `RatingV4 showValue`.
 *
 * **Renders nothing without a `riderName`** (§4.5).
 */
function RideRequestCardV4({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency = 'USD', distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant = 'incoming', acceptLabel = 'Accept', declineLabel = 'Decline', formatSurge, pickupLabel = 'Pickup', dropoffLabel = 'Dropoff', onAccept, onDecline, loading = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.sm }, style], children: [50, 80, 65].map((w) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.typography.scale.sm,
                    width: `${w}%`,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                } }, w))) }));
    }
    if (!riderName)
        return null;
    const compact = variant === 'compact';
    const dot = tokens.spacing.md * DOT_STEP;
    const surging = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const caption = (0, fleet_v4_1.metaLine)([distanceToPickup, tripDuration, scheduledFor]);
    /* One rail joining the two stops — the base drew them as unrelated rows. */
    const stop = (label, value, last) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: dot,
                            height: dot,
                            borderRadius: last ? tokens.radius.sm : tokens.radius.full,
                            backgroundColor: last ? colors.primary : colors.successText,
                        } }), !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flex: 1,
                            width: 1,
                            marginVertical: tokens.spacing.xs,
                            backgroundColor: colors.border,
                        } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, paddingBottom: last ? 0 : tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 2, children: value.address })] })] }, label));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: riderAvatarUrl, name: riderName, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: riderName }), typeof riderRating === 'number' ? ((0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: riderRating, size: "sm", showValue: true })) : null] }), surging ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "warn", variant: "soft", size: "sm", children: (formatSurge ?? ((m) => `${m}× surge`))(surgeMultiplier) })) : null] }), !compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [stop(pickup.label || pickupLabel, pickup, false), stop(dropoff.label || dropoffLabel, dropoff, true)] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: { flex: 1 }, children: caption })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), typeof fareCents === 'number' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "xl", weight: "bold", tone: "onCard", numeric: "tabular", children: (0, money_1.formatMoney)(fareCents, currency) })) : null] }), onAccept || onDecline ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [onAccept ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", onPress: onAccept, accessibilityLabel: acceptLabel, children: acceptLabel })) : null, onDecline ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", size: "md", onPress: onDecline, accessibilityLabel: declineLabel, children: declineLabel })) : null] })) : null] }));
}
//# sourceMappingURL=RideRequestCardV4.js.map