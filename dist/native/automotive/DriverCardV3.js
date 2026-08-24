"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverCardV3 = DriverCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
function DriverCardV3({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online, onCall, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const rowStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading driver", style: [rowStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 14, borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] }));
    }
    const statusWord = online === undefined ? undefined : online ? 'Online' : 'Offline';
    const a11y = `Driver ${name}${typeof rating === 'number' ? `, rated ${rating} stars` : ''}${vehicle ? `, ${vehicle}` : ''}${typeof tripCount === 'number' ? `, ${tripCount} trips` : ''}${etaLabel ? `, ETA ${etaLabel}` : ''}${statusWord ? `, ${statusWord}` : ''}`;
    const Container = onPress ? react_native_1.Pressable : react_native_1.View;
    return ((0, jsx_runtime_1.jsxs)(Container, { accessible: true, accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: a11y, onPress: onPress, style: onPress ? ({ pressed }) => [rowStyle, style, { opacity: pressed ? 0.92 : 1 }] : [rowStyle, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: avatarUrl, name: name, size: "sm" }), statusWord ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            right: -1,
                            bottom: -1,
                            width: 10,
                            height: 10,
                            borderRadius: tokens.radius.full,
                            backgroundColor: online ? colors.success : colors.muted,
                            borderWidth: 1.5,
                            borderColor: colors.surface,
                        } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u2605 ", rating.toFixed(1)] })) : null] }), plate ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 1 }, children: plate })) : null] }), etaLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: etaLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "ETA" })] })) : null, onCall ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Call ${name}`, onPress: onCall, style: ({ pressed }) => ({
                    width: 32,
                    height: 32,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.6 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\uD83D\uDCDE", size: "sm" }) })) : null] }));
}
//# sourceMappingURL=DriverCardV3.js.map