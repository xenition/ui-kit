"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentCardV2 = ShipmentCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CarrierBadge_1 = require("./CarrierBadge");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
/**
 * ShipmentCard, alternate design **V2** — an *elevated hero card*. Where the
 * classic card is a flat outlined summary, V2 floats on a soft shadow, leads
 * with a carrier badge + a bold status pill on one header line, then dedicates a
 * full-width tinted "route strip" to origin → destination with the tone-glyph as
 * the arrow, and closes with a prominent ETA footer. It fades/rises in on mount
 * and springs on press. Status is glyph + word (tone only reinforces). Loading
 * and every prop behave exactly as the classic. No literal colors.
 */
function ShipmentCardV2({ trackingNumber, recipient, origin, destination, status, carrier, service, eta, pieces, variant = 'default', loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.SHIPMENT_META[status] ?? internal_1.SHIPMENT_META.draft;
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const press = (0, motion_1.usePressScale)();
    const containerStyle = [
        {
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            padding: tokens.spacing.md,
            gap: tokens.spacing.sm,
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityLabel: "Loading shipment", style: [containerStyle, enter], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 18, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 40, width: '100%', borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(CarrierBadge_1.CarrierBadge, { carrier: carrier, service: service, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '700', color: accent }, children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.lg, fontWeight: '700', color: colors.onSurface }, children: trackingNumber }), recipient ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: recipient })) : null] }), variant === 'default' && (origin || destination) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(accent, 0.08),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: origin ?? '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, color: accent }, children: "\u2192" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, textAlign: 'right', fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: destination ?? '—' })] })) : null, eta || pieces != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [eta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: `ETA · ${eta}` })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), pieces != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `${pieces} ${pieces === 1 ? 'piece' : 'pieces'}` })) : null] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [enter, { transform: [...enter.transform, { scale: press.scale }] }], children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Shipment ${trackingNumber}, ${meta.label}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, testID: testID, style: containerStyle, children: content }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { testID: testID, style: [containerStyle, enter], children: content }));
}
//# sourceMappingURL=ShipmentCardV2.js.map