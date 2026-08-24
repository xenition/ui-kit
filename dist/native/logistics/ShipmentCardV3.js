"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentCardV3 = ShipmentCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * ShipmentCard, alternate design **V3** — a *dense list line*. Borderless and
 * single-row: a leading status-glyph chip, then a two-line stack (tracking
 * number + inline carrier glyph, then a muted `origin → destination · ETA`
 * meta line), with the status word right-aligned. Built to repeat tightly in a
 * shipments list — the inverse of V2's elevated card. Status stays glyph + word
 * (tone reinforces only). Same props; loading renders a slim skeleton line.
 */
function ShipmentCardV3({ trackingNumber, recipient, origin, destination, status, carrier = 'generic', service, eta, pieces, loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.SHIPMENT_META[status] ?? internal_1.SHIPMENT_META.draft;
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    const carrierMeta = internal_1.CARRIER_META[carrier] ?? internal_1.CARRIER_META.generic;
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.xs,
            borderBottomWidth: 1,
            borderColor: colors.border,
            backgroundColor: 'transparent',
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading shipment", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 26, height: 26, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    const meta2 = [
        origin || destination ? `${origin ?? '—'} → ${destination ?? '—'}` : null,
        recipient,
        eta ? `ETA ${eta}` : null,
        pieces != null ? `${pieces} pc` : null,
        service,
    ]
        .filter(Boolean)
        .join('  ·  ');
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 26,
                    height: 26,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: carrierMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }, children: trackingNumber })] }), meta2 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: meta2 })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '700', color: accent }, children: meta.label })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Shipment ${trackingNumber}, ${meta.label}`, onPress: onPress, testID: testID, style: ({ pressed }) => [containerStyle, { backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.04) : 'transparent' }], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: containerStyle, children: inner }));
}
//# sourceMappingURL=ShipmentCardV3.js.map