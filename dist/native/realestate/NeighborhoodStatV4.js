"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeighborhoodStatV4 = NeighborhoodStatV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
function inferTrend(delta) {
    if (typeof delta === 'number') {
        if (delta > 0)
            return 'up';
        if (delta < 0)
            return 'down';
    }
    return 'flat';
}
const TREND_ARROW = {
    up: '▲',
    down: '▼',
    flat: '→',
};
/**
 * NeighborhoodStat — **V4** "listing" design. The editorial take on a single
 * neighborhood metric: an optional glyph in a soft-primary disc, a **big value
 * numeral** with its label, and an above/below-average trend indicator (arrow +
 * delta, tinted `success` up / `danger` down / `muted` flat). Same
 * props/behavior as {@link NeighborhoodStatProps} — the value/label/suffix/
 * caption and the delta tone/arrow logic are preserved. Token-only colors via
 * `useXenitionTheme()`.
 */
function NeighborhoodStatV4({ label, value, delta, trend, suffix, glyph, caption, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const resolvedTrend = trend ?? inferTrend(delta);
    const trendColor = resolvedTrend === 'up' ? colors.success : resolvedTrend === 'down' ? colors.danger : colors.muted;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                padding: tokens.spacing.lg,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 48,
                    height: 48,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale['2xl'] }, children: glyph }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: value }), suffix != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, paddingBottom: 2 }, children: suffix })) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: trendColor, fontSize: tokens.typography.scale.xs }, children: TREND_ARROW[resolvedTrend] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: trendColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: String(delta) })] })) : null, caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            marginTop: tokens.spacing.xs,
                        }, children: caption })) : null] })] }));
}
//# sourceMappingURL=NeighborhoodStatV4.js.map