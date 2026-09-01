"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorPlanViewV4 = FloorPlanViewV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const ABSOLUTE_FILL = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
/**
 * FloorPlanView — **V4** "listing" design. The image-forward, editorial take on
 * the schematic plan: a rounded elevated frame with a soft-primary gradient
 * "ground", the `title` shown as an active level tab, rooms drawn as soft-primary
 * tinted token rectangles, and a room-count area caption. STATIC and
 * dependency-free — no image, SVG, or native map dep; it renders anywhere. Same
 * props/behavior as {@link FloorPlanViewProps}; an empty `rooms` array shows a
 * labelled placeholder. Token-only colors via `useXenitionTheme()`; the frame
 * carries an a11y label.
 */
function FloorPlanViewV4({ title = 'Floor plan', rooms = [], height = 200, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: onPress ? 'button' : 'image', accessibilityLabel: `${title}${rooms.length ? `, ${rooms.length} rooms` : ', schematic'}`, style: [
            {
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.sm,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: tokens.spacing.xs, paddingTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.md,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }) }) }), (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: [(0, color_1.withAlpha)(colors.primary, 0.14), colors.surface], style: {
                    height,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    overflow: 'hidden',
                }, children: rooms.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { ...ABSOLUTE_FILL, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Floor plan unavailable" }) })) : (rooms.map((room, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: `${clamp01(room.x) * 100}%`,
                        top: `${clamp01(room.y) * 100}%`,
                        width: `${clamp01(room.w) * 100}%`,
                        height: `${clamp01(room.h) * 100}%`,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                        borderRadius: tokens.radius.sm,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: tokens.spacing.xs,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: room.label }) }, `${room.label}-${i}`)))) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { paddingHorizontal: tokens.spacing.xs, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: rooms.length ? `${rooms.length} rooms` : 'Schematic' })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=FloorPlanViewV4.js.map