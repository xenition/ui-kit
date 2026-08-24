"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteStopV3 = RouteStopV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * RouteStop, alternate design **V3** — a *dense single line*. A small
 * tone-outlined sequence chip, the address (with a muted recipient/pkg meta
 * segment beneath), then the status glyph + word and the window right-aligned —
 * one compact row with a bottom divider, tuned for a long manifest list. No
 * rail, no card: the inverse of V2's node card. Completed marks the chip `✓`;
 * status stays glyph + word (tone reinforces). Same props. No literal colors.
 */
function RouteStopV3({ sequence, address, recipient, status, eta, packages, connected: _connected = true, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.STOP_META[status] ?? internal_1.STOP_META.pending;
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    const done = status === 'completed';
    const metaLine = [recipient, packages != null ? `${packages} pkg` : null].filter(Boolean).join('  ·  ');
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.xs,
            borderBottomWidth: 1,
            borderColor: colors.border,
            backgroundColor: 'transparent',
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 24,
                    height: 24,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: done ? accent : 'transparent',
                    borderWidth: done ? 0 : 1,
                    borderColor: accent,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, fontWeight: '700', color: done ? colors.surface : accent }, children: done ? '✓' : sequence }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: address }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }, children: meta.label }), metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `· ${metaLine}` })) : null] })] }), eta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: eta })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Stop ${sequence}, ${address}, ${meta.label}`, onPress: onPress, testID: testID, style: ({ pressed }) => [containerStyle, { backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.04) : 'transparent' }], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: containerStyle, children: inner }));
}
//# sourceMappingURL=RouteStopV3.js.map