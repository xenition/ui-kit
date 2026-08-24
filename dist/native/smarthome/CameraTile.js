"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraTile = CameraTile;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A camera feed tile — a token-surface preview area (the kit ships no image
 * decoder, so an offline/placeholder frame is drawn with a `muted` glyph) topped
 * by status {@link Badge}s: a "LIVE" (success) / "OFFLINE" (danger) chip and a
 * "REC" chip when recording. Status is always text, never color alone. The name
 * and timestamp sit in a footer bar. Pressing opens the stream via `onPress`.
 * No literal colors.
 */
function CameraTile({ name, online = false, recording = false, timestamp, previewHeight = 140, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name} camera, ${online ? 'online' : 'offline'}`, onPress: onPress, style: ({ pressed }) => [
            {
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                opacity: pressed ? 0.9 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    height: previewHeight,
                    backgroundColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: online ? '📹' : '🚫', color: "muted", size: "3xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.xs, left: tokens.spacing.xs, flexDirection: 'row', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: online ? 'success' : 'danger', variant: "solid", size: "sm", dot: true, children: online ? 'LIVE' : 'OFFLINE' }), recording && online ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "danger", variant: "solid", size: "sm", children: "REC" })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), timestamp != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timestamp })) : null] })] }));
}
//# sourceMappingURL=CameraTile.js.map