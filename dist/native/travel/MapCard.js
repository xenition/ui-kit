"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapCard = MapCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * A location preview — a STATIC, dependency-free styled placeholder, NOT a live
 * map. It draws a token-tinted frame with faux grid lines and a single pin
 * marker; there is intentionally no `react-native-maps`/`MapView` import, so it
 * renders in any environment. Wire a real map behind `onPress` when needed.
 * Token-only colors.
 */
function MapCard({ label, caption, pin = { x: 0.5, y: 0.5 }, height = 160, appearance = 'classic', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const x = clamp01(pin.x);
    const y = clamp01(pin.y);
    const frame = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                height,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { ...StyleSheetAbsolute }, children: [[0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, top: `${f * 100}%`, height: 1, backgroundColor: colors.border } }, `h-${f}`))), [0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, bottom: 0, left: `${f * 100}%`, width: 1, backgroundColor: colors.border } }, `v-${f}`)))] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-map-pin", style: {
                    position: 'absolute',
                    left: `${x * 100}%`,
                    top: `${y * 100}%`,
                    marginLeft: -10,
                    marginTop: -20,
                    alignItems: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
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
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: caption })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: `Map showing ${label}`, children: frame }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Open map for ${label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: frame }));
}
/** Inlined absolute-fill (avoids a StyleSheet import for one rule). */
const StyleSheetAbsolute = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
//# sourceMappingURL=MapCard.js.map