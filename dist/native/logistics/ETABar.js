"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETABar = ETABar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
const ETA_META = {
    'on-time': { glyph: '⏱', label: 'On time', tone: 'success' },
    ahead: { glyph: '⚡', label: 'Ahead', tone: 'primary' },
    delayed: { glyph: '⏳', label: 'Delayed', tone: 'warn' },
    arrived: { glyph: '✓', label: 'Arrived', tone: 'success' },
};
/**
 * A horizontal journey/ETA progress bar for a shipment or vehicle: a token
 * fill sized to `progress`, with an origin→destination label row and a
 * glyph + word punctuality status. Exposes an `adjustable`-free `progressbar`
 * role with `accessibilityValue` so the completion is announced, not inferred
 * from the fill color. No literal colors — the fill and track come from theme
 * tokens.
 */
function ETABar({ progress, status = 'on-time', eta, origin, destination, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = (0, internal_1.clampPct)(progress);
    const meta = ETA_META[status];
    const fill = (0, internal_1.toneColor)(colors, meta.tone);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: loading ? 'ETA loading' : `${meta.label}${eta ? `, ETA ${eta}` : ''}, ${pct}% complete`, accessibilityValue: loading ? undefined : { min: 0, max: 100, now: pct }, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: fill }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: fill, fontWeight: '700' }, children: meta.label })] }), eta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.onSurface, fontWeight: '600' }, children: eta })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 8,
                    borderRadius: tokens.radius.full,
                    backgroundColor: tokens.ramps.neutral[100],
                    overflow: 'hidden',
                }, children: !loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: `${pct}%`,
                        height: '100%',
                        borderRadius: tokens.radius.full,
                        backgroundColor: fill,
                    } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '40%', height: '100%', borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] } })) }), origin || destination ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted, flex: 1 }, children: origin ?? '' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted, flex: 1, textAlign: 'right' }, children: destination ?? '' })] })) : null] }));
}
//# sourceMappingURL=ETABar.js.map