"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentCard = ShipmentCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const CarrierBadge_1 = require("./CarrierBadge");
const internal_1 = require("./internal");
/**
 * Summary card for one shipment: tracking number headline, a glyph + word
 * status badge, an inline `CarrierBadge`, origin→destination, ETA and piece
 * count. Status meaning is text-first (badge label + glyph), with tone as
 * reinforcement only. Tappable when `onPress` is set (button role + label);
 * otherwise a static summary. Loading renders a muted skeleton. All colors are
 * theme tokens.
 */
function ShipmentCard({ trackingNumber, recipient, origin, destination, status, carrier, service, eta, pieces, variant = 'default', loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.SHIPMENT_META[status] ?? internal_1.SHIPMENT_META.draft;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading shipment", style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }) }));
    }
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }, children: trackingNumber }), recipient ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: recipient })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(CarrierBadge_1.CarrierBadge, { carrier: carrier, service: service, size: "sm" }), pieces != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `${pieces} ${pieces === 1 ? 'piece' : 'pieces'}` })) : null] }), variant === 'default' && (origin || destination) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.sm, color: colors.onSurface }, children: origin ?? '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: (0, internal_1.toneColor)(colors, meta.tone) }, children: "\u2192" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, textAlign: 'right', fontSize: tokens.typography.scale.sm, color: colors.onSurface }, children: destination ?? '—' })] })) : null, eta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `ETA · ${eta}` })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Shipment ${trackingNumber}, ${meta.label}`, onPress: onPress, testID: testID, style: ({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "interactive", children: content }) }));
    }
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", testID: testID, style: style, children: content }));
}
//# sourceMappingURL=ShipmentCard.js.map