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
exports.RideRequestCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const RatingV4_1 = require("../primitives/RatingV4");
const money_1 = require("../commerce/money");
const fleet_v4_1 = require("./internal/fleet-v4");
/**
 * **V4 ride request card** — the web twin of the native `RideRequestCardV4`,
 * same props as {@link RideRequestCard} plus five copy hooks.
 *
 * ## Five changes
 *
 * 1. **The two stops are joined by a rail.** The base stacked pickup and
 *    dropoff as two independent rows, so nothing said they were one journey —
 *    the single fact a driver reads first.
 * 2. **Accept and decline are not the same weight.** §5 is explicit that a
 *    declined choice never competes with the primary one; the base drew two
 *    equal buttons side by side.
 * 3. **The fare is tabular and in the display face.**
 * 4. **Surge is a labelled chip**, not a tinted fare.
 * 5. **The rider's rating carries its number.**
 *
 * **Renders nothing without a `riderName`** (§4.5).
 */
exports.RideRequestCardV4 = React.forwardRef(function RideRequestCardV4({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency = 'USD', distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant = 'incoming', acceptLabel = 'Accept', declineLabel = 'Decline', formatSurge, pickupLabel = 'Pickup', dropoffLabel = 'Dropoff', onAccept, onDecline, loading = false, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [50, 80, 65].map((w) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-3', fleet_v4_1.SKELETON_CLASS), style: { width: `${w}%` } }, w))) }));
    }
    if (!riderName)
        return null;
    const compact = variant === 'compact';
    const surging = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const caption = (0, fleet_v4_1.metaLine)([distanceToPickup, tripDuration, scheduledFor]);
    /* One rail joining the two stops — the base drew them as unrelated rows. */
    const stop = (label, value, last) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { "aria-hidden": true, className: "flex shrink-0 flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-3 w-3', last ? 'rounded-[var(--xen-radius-sm)] bg-primary' : 'rounded-full bg-success') }), !last ? (0, jsx_runtime_1.jsx)("span", { className: "my-xs w-px flex-1 bg-border" }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col', !last && 'pb-sm'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-card", children: value.address })] })] }, label));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-ride-request": variant, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: riderAvatarUrl, name: riderName, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-base font-bold text-on-card", children: riderName }), typeof riderRating === 'number' ? ((0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: riderRating, size: "sm", showValue: true })) : null] }), surging ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "warn", variant: "soft", size: "sm", children: (formatSurge ?? ((m) => `${m}× surge`))(surgeMultiplier) })) : null] }), !compact ? ((0, jsx_runtime_1.jsxs)("ul", { className: "flex flex-col", children: [stop(pickup.label || pickupLabel, pickup, false), stop(dropoff.label || dropoffLabel, dropoff, true)] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 text-xs text-muted-text", children: caption }), typeof fareCents === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "font-heading text-xl font-bold text-on-card [font-variant-numeric:tabular-nums]", children: (0, money_1.formatMoney)(fareCents, currency) })) : null] }), onAccept || onDecline ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [onAccept ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", onClick: onAccept, "aria-label": acceptLabel, children: acceptLabel })) : null, onDecline ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", size: "md", onClick: onDecline, "aria-label": declineLabel, children: declineLabel })) : null] })) : null] }));
});
//# sourceMappingURL=RideRequestCardV4.js.map