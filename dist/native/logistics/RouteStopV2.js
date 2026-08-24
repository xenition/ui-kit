"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteStopV2 = RouteStopV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
/**
 * RouteStop, alternate design **V2** — a *numbered node card*. Where the classic
 * is a bare rail row, V2 is a shadowed card: a big tone-filled numbered node
 * hangs on the left edge, the address is the headline, the delivery window sits
 * in its own pill, and a status glyph + word chip plus a package count anchor
 * the footer. `connected` still draws a rail down to the next card. Completed
 * fills the node and marks it `✓`; status is always glyph + word (tone
 * reinforces only). Springs on press; fades in. Same props. No literal colors.
 */
function RouteStopV2({ sequence, address, recipient, status, eta, packages, connected = true, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.STOP_META[status] ?? internal_1.STOP_META.pending;
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    const done = status === 'completed';
    const enter = (0, motion_1.useEnter)({ translateY: 6 });
    const press = (0, motion_1.usePressScale)();
    const cardStyle = [
        {
            flex: 1,
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            padding: tokens.spacing.md,
            gap: tokens.spacing.sm,
            ...(0, elevation_1.shadow)('sm', tokens),
        },
    ];
    const node = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 36,
                    height: 36,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: done ? accent : (0, color_1.withAlpha)(accent, 0.14),
                    borderWidth: done ? 0 : 2,
                    borderColor: accent,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', color: done ? colors.surface : accent }, children: done ? '✓' : sequence }) }), connected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 2, flex: 1, marginTop: tokens.spacing.xs, minHeight: tokens.spacing.md, backgroundColor: colors.border } })) : null] }));
    const card = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: cardStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { flex: 1, fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }, children: address }), eta ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: tokens.ramps.neutral[100],
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: colors.onSurface }, children: eta }) })) : null] }), recipient ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: recipient })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '700', color: accent }, children: meta.label })] }), packages != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `${packages} ${packages === 1 ? 'pkg' : 'pkgs'}` })) : null] })] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [node, card] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [enter, { transform: [...enter.transform, { scale: press.scale }] }], children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Stop ${sequence}, ${address}, ${meta.label}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, testID: testID, style: style, children: body }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { accessibilityLabel: `Stop ${sequence}, ${address}, ${meta.label}`, testID: testID, style: [enter, style], children: body }));
}
//# sourceMappingURL=RouteStopV2.js.map