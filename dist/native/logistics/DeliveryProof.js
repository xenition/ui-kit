"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryProof = DeliveryProof;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
const OUTCOME_META = {
    delivered: { glyph: '✓', label: 'Delivered', slot: 'success' },
    attempted: { glyph: '⏳', label: 'Attempted', slot: 'warn' },
    refused: { glyph: '✕', label: 'Refused', slot: 'danger' },
};
/**
 * Proof-of-delivery card: a captured-media placeholder (the kit ships no image
 * component, so a token-tinted panel stands in for the signature/photo), the
 * recipient, timestamp, drop location and an outcome carried by a glyph + word.
 * Tappable when `onPress` is set. Empty (`hasMedia={false}`) and loading states
 * supported. All colors are theme tokens.
 */
function DeliveryProof({ kind, outcome = 'delivered', recipient, time, location, note, hasMedia = true, loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const proof = internal_1.PROOF_META[kind] ?? internal_1.PROOF_META.signature;
    const oc = OUTCOME_META[outcome];
    const ocColor = colors[oc.slot];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading proof of delivery", style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 72, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }) }));
    }
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: hasMedia ? `${proof.label} captured` : `No ${proof.label.toLowerCase()} captured`, style: {
                    height: 76,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    backgroundColor: tokens.ramps.neutral[100],
                    borderWidth: hasMedia ? 0 : 1,
                    borderColor: colors.border,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl, color: hasMedia ? (0, internal_1.toneColor)(colors, proof.tone) : colors.muted }, children: proof.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: hasMedia ? proof.label : `No ${proof.label.toLowerCase()}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: ocColor }, children: oc.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', color: ocColor }, children: oc.label }), recipient ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.sm, color: colors.onSurface }, children: `· ${recipient}` })) : null] }), location || time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: [location, time].filter(Boolean).join(' · ') })) : null, note ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { fontSize: tokens.typography.scale.xs, color: colors.onSurface }, children: note })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Proof of delivery, ${oc.label}`, onPress: onPress, testID: testID, style: ({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "interactive", children: body }) }));
    }
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", testID: testID, style: style, children: body }));
}
//# sourceMappingURL=DeliveryProof.js.map