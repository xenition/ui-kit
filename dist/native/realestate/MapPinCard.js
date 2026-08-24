"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPinCard = MapPinCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const ABSOLUTE_FILL = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
/**
 * A location preview for a listing — a STATIC, dependency-free styled
 * placeholder, NOT a live map. It intentionally imports no `react-native-maps`
 * / `MapView`, so it renders in any environment: a token-tinted frame with faux
 * grid lines standing in for tiles and a single pin marker. Wire a real map
 * behind `onPress`. Data + callback only; token-only colors; a11y-labelled.
 */
function MapPinCard({ address, caption, pin = { x: 0.5, y: 0.5 }, height = 160, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const x = clamp01(pin.x);
    const y = clamp01(pin.y);
    const frame = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                height,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: ABSOLUTE_FILL, children: [[0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, top: `${f * 100}%`, height: 1, backgroundColor: colors.border } }, `h-${f}`))), [0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, bottom: 0, left: `${f * 100}%`, width: 1, backgroundColor: colors.border } }, `v-${f}`)))] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-re-map-pin", style: { position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, marginLeft: -10, marginTop: -20, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 20,
                            height: 20,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.primary,
                            borderWidth: 2,
                            borderColor: colors.onPrimary,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 2, height: 8, backgroundColor: colors.primary } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: tokens.spacing.sm,
                    right: tokens.spacing.sm,
                    bottom: tokens.spacing.sm,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.sm,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: address }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: caption })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: `Map showing ${address}`, children: frame }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Open map for ${address}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: frame }));
}
//# sourceMappingURL=MapPinCard.js.map