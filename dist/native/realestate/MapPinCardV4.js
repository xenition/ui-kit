"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapPinCardV4 = MapPinCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * MapPinCard — **V4** "listing" design. The image-forward, editorial take on the
 * location preview: a rounded elevated frame with a subtle soft-primary gradient
 * "ground" (no faux grid clutter) and a single primary pill pin marking the spot.
 * STATIC and dependency-free — it imports no `react-native-maps` / `MapView`, so it
 * renders in any environment; wire a real map behind `onPress`. Same props/behavior
 * as {@link MapPinCardProps}: `address` + `caption` in a floating card overlay,
 * `pin` position clamped to the frame. Token-only colors via `useXenitionTheme()`;
 * a11y-labelled.
 */
function MapPinCardV4({ address, caption, pin = { x: 0.5, y: 0.5 }, height = 160, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const x = clamp01(pin.x);
    const y = clamp01(pin.y);
    const frame = ((0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: [(0, color_1.withAlpha)(colors.primary, 0.14), colors.surface], style: [
            {
                height,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                overflow: 'hidden',
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-re-map-pin", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, transform: [{ translateX: -60 }, { translateY: -34 }], width: 120, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 4,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.primary,
                            borderWidth: 1,
                            borderColor: colors.onPrimary,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs }, children: "\uD83D\uDCCD" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: address })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 2, height: 8, backgroundColor: colors.primary } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: tokens.spacing.sm,
                    right: tokens.spacing.sm,
                    bottom: tokens.spacing.sm,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: address }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: caption })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: `Map showing ${address}`, children: frame }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Open map for ${address}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: frame }));
}
//# sourceMappingURL=MapPinCardV4.js.map