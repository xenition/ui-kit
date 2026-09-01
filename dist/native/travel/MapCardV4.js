"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapCardV4 = MapCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * MapCard — **V4** "journey" design. The boarding-pass take on a location
 * preview: a decorative accent→primary "horizon" gradient ground stands in for
 * the map tiles (the signature V4 touch), the pin sits inside a frosted glass
 * tile with near-white ink, and the label/caption ride a matching frosted card
 * so the place name stays legible on the saturated ground. It remains a STATIC,
 * dependency-free placeholder — there is intentionally no `react-native-maps`
 * import, so it renders in any environment. Wire a real map behind `onPress`
 * when needed. Same props/behavior as {@link MapCardProps}; token-only colors
 * via `useXenitionTheme()`.
 */
function MapCardV4({ label, caption, pin = { x: 0.5, y: 0.5 }, height = 160, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const x = clamp01(pin.x);
    const y = clamp01(pin.y);
    const frame = ((0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyHorizon)(r), style: [
            {
                height,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: StyleSheetAbsolute, children: [[0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, top: `${f * 100}%`, height: 1, backgroundColor: (0, journey_1.journeyBorder)(r, 0.2) } }, `h-${f}`))), [0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, bottom: 0, left: `${f * 100}%`, width: 1, backgroundColor: (0, journey_1.journeyBorder)(r, 0.2) } }, `v-${f}`)))] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-map-pin", style: {
                    position: 'absolute',
                    left: `${x * 100}%`,
                    top: `${y * 100}%`,
                    marginLeft: -14,
                    marginTop: -14,
                    width: 28,
                    height: 28,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, journey_1.journeyTile)(r),
                    borderWidth: 1,
                    borderColor: (0, journey_1.journeyBorder)(r),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDCCD" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: tokens.spacing.sm,
                    right: tokens.spacing.sm,
                    bottom: tokens.spacing.sm,
                    backgroundColor: (0, journey_1.journeyTile)(r),
                    borderWidth: 1,
                    borderColor: (0, journey_1.journeyBorder)(r),
                    borderRadius: tokens.radius.sm,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: (0, journey_1.journeyInkSoft)(r), fontSize: tokens.typography.scale.xs }, children: caption })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: `Map showing ${label}`, children: frame }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Open map for ${label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: frame }));
}
/** Inlined absolute-fill (avoids a StyleSheet import for one rule). */
const StyleSheetAbsolute = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
//# sourceMappingURL=MapCardV4.js.map