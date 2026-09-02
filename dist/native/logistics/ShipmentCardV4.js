"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentCardV4 = ShipmentCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const CarrierBadge_1 = require("./CarrierBadge");
const internal_1 = require("./internal");
/**
 * ShipmentCard — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a shipment: an elevated rounded card with a
 * soft shadow, the tracking-number headline, a labelled glyph + word status
 * badge (never color alone), a soft-primary meta strip carrying the
 * `CarrierBadge` + piece count, an origin→destination lane, and an ETA line.
 * Tappable when `onPress` is set. Honors the base `variant` — `default` (card)
 * and `compact` (a dense single row). Token-only colors via `useXenitionTheme()`.
 */
function ShipmentCardV4({ trackingNumber, recipient, origin, destination, status, carrier, service, eta, pieces, variant = 'default', loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.SHIPMENT_META[status] ?? internal_1.SHIPMENT_META.draft;
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading shipment", style: [shell, { padding: tokens.spacing.lg, gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 18, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 32, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const a11y = `Shipment ${trackingNumber}, ${meta.label}`;
    const badge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` }));
    // ── compact: dense single row ──
    if (variant === 'compact') {
        const compact = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 36, height: 36, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDE9A" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }, children: trackingNumber }), recipient ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: recipient }) : null] }), badge] }));
        if (onPress) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, { padding: tokens.spacing.sm, opacity: pressed ? 0.9 : 1 }, style], children: compact }));
        }
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, { padding: tokens.spacing.sm }, style], children: compact });
    }
    const full = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.lg, fontWeight: '700', color: colors.onSurface, fontVariant: ['tabular-nums'] }, children: trackingNumber }), recipient ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: recipient }) : null] }), badge] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.sm, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(CarrierBadge_1.CarrierBadge, { carrier: carrier, service: service, size: "sm" }), pieces != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `${pieces} ${pieces === 1 ? 'piece' : 'pieces'}` })) : null] }), origin || destination ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: origin ?? '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: (0, internal_1.toneColor)(colors, meta.tone) }, children: "\u2192" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, textAlign: 'right', fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: destination ?? '—' })] })) : null, eta ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `ETA · ${eta}` }) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, { padding: tokens.spacing.lg, opacity: pressed ? 0.9 : 1 }, style], children: full }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, { padding: tokens.spacing.lg }, style], children: full });
}
//# sourceMappingURL=ShipmentCardV4.js.map