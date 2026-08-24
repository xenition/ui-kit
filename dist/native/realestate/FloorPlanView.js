"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorPlanView = FloorPlanView;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * A schematic floor plan — a STATIC, dependency-free styled placeholder built
 * from plain `View` rectangles positioned as fractions of the frame. No image,
 * SVG, or native dependency; it renders anywhere. Rooms in, nothing fetches;
 * an empty `rooms` array shows a labelled placeholder. Token-only colors
 * (rooms tinted with the `border` fill and `onSurface` labels).
 */
function FloorPlanView({ title = 'Floor plan', rooms = [], height = 200, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: onPress ? 'button' : 'image', accessibilityLabel: `${title}${rooms.length ? `, ${rooms.length} rooms` : ', schematic'}`, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    overflow: 'hidden',
                }, children: rooms.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Floor plan unavailable" }) })) : (rooms.map((room, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: `${clamp01(room.x) * 100}%`,
                        top: `${clamp01(room.y) * 100}%`,
                        width: `${clamp01(room.w) * 100}%`,
                        height: `${clamp01(room.h) * 100}%`,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        backgroundColor: colors.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: tokens.spacing.xs,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: room.label }) }, `${room.label}-${i}`)))) })] }));
}
//# sourceMappingURL=FloorPlanView.js.map