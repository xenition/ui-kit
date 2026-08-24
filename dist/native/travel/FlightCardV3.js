"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightCardV3 = FlightCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
function FlightCardV3({ airline, flightNumber, from, to, duration, stops = 0, priceCents, currency = 'USD', variant = 'default', onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const compact = variant === 'compact';
    const stopLabel = stops <= 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;
    const perforation = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 }, children: Array.from({ length: 7 }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: 4,
                height: 4,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.border,
            } }, i))) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: compact ? tokens.spacing.md : tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.base }, children: "\u2708" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: airline })] }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Loading flight\u2026" })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: from.code }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: from.time })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingBottom: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: duration }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm }, children: "\u2192" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: stopLabel })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: to.code }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: to.time })] })] }))] }), perforation, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: compact ? 92 : 104,
                    padding: compact ? tokens.spacing.md : tokens.spacing.lg,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    gap: tokens.spacing.xs,
                }, children: [flightNumber ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: flightNumber })) : null, typeof priceCents === 'number' && !loading ? ((0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, size: compact ? 'sm' : 'md' })) : null] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${airline} ${from.code} to ${to.code}, ${duration}, ${stopLabel}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=FlightCardV3.js.map