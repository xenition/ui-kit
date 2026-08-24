"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightCard = FlightCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
/**
 * A single bookable flight itinerary — carrier, the origin→destination route
 * with departure/arrival times, duration, stop count, and an optional fare.
 * Data + `onPress` only; nothing fetches. Token-only colors via
 * `useXenitionTheme()`. Pass `loading` for a placeholder recap and
 * `variant="compact"` for a denser list row.
 */
function FlightCard({ airline, flightNumber, from, to, duration, stops = 0, priceCents, currency = 'USD', variant = 'default', appearance = 'classic', onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const compact = variant === 'compact';
    const stopLabel = stops <= 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                gap: compact ? tokens.spacing.sm : tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                padding: compact ? tokens.spacing.md : tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: airline }), flightNumber ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: flightNumber })) : null] }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Loading flight\u2026" })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: from.code }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: from.time })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: duration }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, alignSelf: 'stretch', backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: stopLabel })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: to.code }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: to.time })] })] })), typeof priceCents === 'number' && !loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(primitives_2.PriceTag, { cents: priceCents, currency: currency, size: compact ? 'sm' : 'md' }) })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${airline} ${from.code} to ${to.code}, ${duration}, ${stopLabel}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=FlightCard.js.map