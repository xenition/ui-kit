"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideRequestCardV3 = RideRequestCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
function RideRequestCardV3({ riderName, riderAvatarUrl, riderRating, pickup, dropoff, fareCents, currency = 'USD', surgeMultiplier, onAccept, onDecline, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const rowStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading ride request", style: [rowStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 14, borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `Ride request from ${riderName}, ${pickup.address} to ${dropoff.address}${hasSurge ? `, ${surgeMultiplier}x surge` : ''}`, style: [rowStyle, style], children: [(0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: riderAvatarUrl, name: riderName, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: riderName }), typeof riderRating === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u2605 ", riderRating.toFixed(1)] })) : null, hasSurge ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: ["\u26A1", surgeMultiplier, "x"] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [pickup.label, " \u2192 ", dropoff.label] })] }), typeof fareCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: (0, primitives_2.formatMoney)(fareCents, currency) })) : null, onDecline ? (0, jsx_runtime_1.jsx)(IconTap, { glyph: "\u2715", tone: "danger", label: `Decline ride from ${riderName}`, onPress: onDecline }) : null, onAccept ? (0, jsx_runtime_1.jsx)(IconTap, { glyph: "\u2713", tone: "success", label: `Accept ride from ${riderName}`, onPress: onAccept }) : null] }));
}
function IconTap({ glyph, tone, label, onPress }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({
            width: 32,
            height: 32,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, color_1.withAlpha)(colors[tone], 0.14),
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
        }), children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: glyph, size: "sm", color: tone }) }));
}
//# sourceMappingURL=RideRequestCardV3.js.map