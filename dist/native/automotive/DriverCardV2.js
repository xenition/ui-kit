"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverCardV2 = DriverCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
function DriverCardV2({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online, onMessage, onCall, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const surface = {
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        padding: tokens.spacing.lg,
        alignItems: 'center',
        gap: tokens.spacing.sm,
        ...(0, elevation_1.shadow)('md', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading driver", style: [surface, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64, height: 64, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] }));
    }
    const statusWord = online === undefined ? undefined : online ? 'Online' : 'Offline';
    const a11y = `Driver ${name}${typeof rating === 'number' ? `, rated ${rating} stars` : ''}${vehicle ? `, ${vehicle}` : ''}${etaLabel ? `, ETA ${etaLabel}` : ''}${statusWord ? `, ${statusWord}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            padding: 4,
                            borderRadius: tokens.radius.full,
                            borderWidth: 2,
                            borderColor: (0, color_1.withAlpha)(online ? colors.success : colors.primary, 0.55),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Avatar, { src: avatarUrl, name: name, size: "xl" }) }), statusWord ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', right: 2, bottom: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: online ? 'success' : 'neutral', variant: "soft", size: "sm", dot: true, children: statusWord }) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap', justifyContent: 'center' }, children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_2.Rating, { value: rating, size: "sm", showValue: true }) : null, typeof tripCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [tripCount.toLocaleString(), " trips"] })) : null] }), vehicle || plate ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap', justifyContent: 'center' }, children: [vehicle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["\uD83D\uDE97 ", vehicle] })) : null, plate ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            borderRadius: tokens.radius.sm,
                            borderWidth: 1,
                            borderColor: colors.border,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.xs,
                            backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.1),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }, children: plate }) })) : null] })) : null, etaLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: etaLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "ETA to pickup" })] })) : null, onMessage || onCall ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, width: '100%' }, children: [onMessage ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "outline", size: "sm", onPress: onMessage, accessibilityLabel: `Message ${name}`, children: "Message" }) })) : null, onCall ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "soft", size: "sm", onPress: onCall, accessibilityLabel: `Call ${name}`, children: "Call" }) })) : null] })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [surface, style], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessible: true, accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: [surface, style], children: body }) }));
}
//# sourceMappingURL=DriverCardV2.js.map