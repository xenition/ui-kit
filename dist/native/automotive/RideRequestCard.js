"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideRequestCard = RideRequestCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
function formatMoney(cents, currency) {
    try {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
    }
    catch {
        return `$${(cents / 100).toFixed(2)}`;
    }
}
/**
 * An inbound ride request for a driver to accept or decline — rider identity and
 * rating, the pickup→drop-off route, an optional fare estimate, plus trip
 * distance/duration and an optional surge badge. Data + `onAccept`/`onDecline`
 * only; nothing fetches. Endpoints are marked with text-labelled glyphs (not
 * color alone) and the surge state is spelled out. Colors come from semantic
 * tokens and `withAlpha` tints — no literal colors. `variant="scheduled"` swaps
 * the header for a scheduled-time line; `variant="compact"` tightens spacing.
 */
function RideRequestCard({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency = 'USD', distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant = 'incoming', onAccept, onDecline, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const scheduled = variant === 'scheduled';
    const pad = compact ? tokens.spacing.md : tokens.spacing.lg;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading ride request", style: [
                {
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    padding: pad,
                    gap: tokens.spacing.sm,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 18, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] }));
    }
    const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const stopRow = (glyph, tone, stop) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 22,
                    height: 22,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors[tone], 0.18),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[tone], fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: stop.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: stop.address })] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `Ride request from ${riderName}, pickup ${pickup.address}, drop off ${dropoff.address}${hasSurge ? `, ${surgeMultiplier}x surge` : ''}`, style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: pad,
                gap: compact ? tokens.spacing.sm : tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: riderAvatarUrl, name: riderName, size: compact ? 'sm' : 'md' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: riderName }), typeof riderRating === 'number' ? ((0, jsx_runtime_1.jsx)(primitives_2.Rating, { value: riderRating, size: "sm", showValue: true })) : null] }), hasSurge ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "warn", variant: "soft", children: `${surgeMultiplier}x surge` })) : null] }), scheduled && scheduledFor ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    gap: tokens.spacing.xs,
                    alignItems: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    borderRadius: tokens.radius.sm,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDDD3\uFE0F" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["Scheduled for ", scheduledFor] })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [stopRow('A', 'primary', pickup), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginLeft: 10, width: 1, height: tokens.spacing.sm, backgroundColor: colors.border } }), stopRow('B', 'success', dropoff)] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, alignItems: 'center' }, children: [typeof fareCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: formatMoney(fareCents, currency) })) : null, distanceToPickup ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", distanceToPickup, " away"] })) : null, tripDuration ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u23F1 ", tripDuration, " trip"] })) : null] }), onAccept || onDecline ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onDecline ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "outline", tone: "danger", onPress: onDecline, accessibilityLabel: `Decline ride from ${riderName}`, children: "Decline" }) })) : null, onAccept ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "primary", tone: "success", onPress: onAccept, accessibilityLabel: `Accept ride from ${riderName}`, children: "Accept" }) })) : null] })) : null] }));
}
//# sourceMappingURL=RideRequestCard.js.map