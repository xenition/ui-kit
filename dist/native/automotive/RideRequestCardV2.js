"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideRequestCardV2 = RideRequestCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
function RideRequestCardV2({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency = 'USD', distanceToPickup, tripDuration, scheduledFor, surgeMultiplier, variant = 'incoming', onAccept, onDecline, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const compact = variant === 'compact';
    const scheduled = variant === 'scheduled';
    const pad = compact ? tokens.spacing.md : tokens.spacing.lg;
    const surface = {
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        padding: pad,
        ...(0, elevation_1.shadow)('lg', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading ride request", style: [surface, { gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 20, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] }));
    }
    const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const timelineRow = (glyph, tone, stop, last) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: 28 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 28,
                            height: 28,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors[tone], 0.16),
                            borderWidth: 2,
                            borderColor: colors[tone],
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[tone], fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: glyph }) }), !last ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, minHeight: tokens.spacing.md, width: 2, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.4) } }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, paddingBottom: last ? 0 : tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: stop.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: stop.address })] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessible: true, accessibilityLabel: `Ride request from ${riderName}, pickup ${pickup.address}, drop off ${dropoff.address}${hasSurge ? `, ${surgeMultiplier}x surge` : ''}`, style: [surface, { gap: compact ? tokens.spacing.sm : tokens.spacing.md, opacity: enter.opacity, transform: enter.transform }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            padding: 3,
                            borderRadius: tokens.radius.full,
                            borderWidth: 2,
                            borderColor: (0, color_1.withAlpha)(colors.primary, 0.5),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: riderAvatarUrl, name: riderName, size: compact ? 'md' : 'lg' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: riderName }), typeof riderRating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_2.Rating, { value: riderRating, size: "sm", showValue: true }) : null] }), hasSurge ? (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "warn", variant: "soft", children: `⚡ ${surgeMultiplier}x surge` }) : null] }), scheduled && scheduledFor ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    gap: tokens.spacing.xs,
                    alignItems: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\uD83D\uDDD3\uFE0F", size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: ["Scheduled for ", scheduledFor] })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [timelineRow('A', 'primary', pickup, false), timelineRow('B', 'success', dropoff, true)] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: [typeof fareCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            backgroundColor: (0, color_1.withAlpha)(colors.success, 0.12),
                            borderRadius: tokens.radius.md,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: (0, primitives_2.formatMoney)(fareCents, currency) }) })) : null, distanceToPickup ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", distanceToPickup, " away"] }) : null, tripDuration ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u23F1 ", tripDuration, " trip"] }) : null] }), onAccept || onDecline ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onDecline ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "outline", tone: "danger", onPress: onDecline, accessibilityLabel: `Decline ride from ${riderName}`, children: "Decline" }) })) : null, onAccept ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "primary", tone: "success", onPress: onAccept, accessibilityLabel: `Accept ride from ${riderName}`, children: "Accept" }) })) : null] })) : null] }));
}
//# sourceMappingURL=RideRequestCardV2.js.map