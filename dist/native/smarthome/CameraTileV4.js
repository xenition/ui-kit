"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraTileV4 = CameraTileV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * CameraTile — **V4** "ambient" design. The immersive take on a feed tile: a
 * **dark, rounded video frame** (drawn on the `onSurface` token so it reads as a
 * screen in both light and dark, with an `onSurface`-alpha scrim behind the
 * overlays — no literal colors) fills the tile, a **live pulse dot** rides beside
 * the "LIVE"/"OFFLINE" chip when streaming, and a `REC` chip appears while
 * recording. The camera name + timestamp sit in a scrim overlay along the bottom
 * of the frame rather than a separate bar, so the framing stays clean and
 * immersive. Status is always text, never color alone. Pressing opens the stream
 * via `onPress`. Same props/behavior as {@link CameraTileProps}; token-only
 * colors via `useXenitionTheme()` + `withAlpha`.
 */
function CameraTileV4({ name, online = false, recording = false, timestamp, previewHeight = 140, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name} camera, ${online ? 'online' : 'offline'}`, onPress: onPress, style: ({ pressed }) => [
            {
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.onSurface,
                opacity: pressed ? 0.9 : 1,
            },
            style,
        ], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                height: previewHeight,
                backgroundColor: colors.onSurface,
                alignItems: 'center',
                justifyContent: 'center',
            }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: online ? '📹' : '🚫', color: "onPrimary", size: "3xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        position: 'absolute',
                        top: tokens.spacing.xs,
                        left: tokens.spacing.xs,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                    }, children: [online ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.success } })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: online ? 'success' : 'danger', variant: "solid", size: "sm", dot: true, children: online ? 'LIVE' : 'OFFLINE' }), recording && online ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "danger", variant: "solid", size: "sm", children: "REC" })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.sm,
                        backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.6),
                        paddingHorizontal: tokens.spacing.sm,
                        paddingVertical: tokens.spacing.xs,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.surface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), timestamp != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, opacity: 0.8, fontSize: tokens.typography.scale.xs }, children: timestamp })) : null] })] }) }));
}
//# sourceMappingURL=CameraTileV4.js.map