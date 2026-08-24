"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteStop = RouteStop;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * One stop on a delivery route: a numbered sequence marker joined by a
 * connector rail, the address + recipient, an ETA/window and a package count.
 * The stop status is carried by a glyph + word chip (tone as reinforcement),
 * and the marker fills with the status tone once the stop is completed. All
 * colors are theme tokens.
 */
function RouteStop({ sequence, address, recipient, status, eta, packages, connected = true, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.STOP_META[status] ?? internal_1.STOP_META.pending;
    const accent = (0, internal_1.toneColor)(colors, meta.tone);
    const done = status === 'completed';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Stop ${sequence}, ${address}, ${meta.label}`, disabled: !onPress, onPress: onPress, testID: testID, style: [{ flexDirection: 'row', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 28,
                            height: 28,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: done ? accent : 'transparent',
                            borderWidth: done ? 0 : 2,
                            borderColor: accent,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, fontWeight: '700', color: done ? colors.surface : accent }, children: done ? '✓' : sequence }) }), connected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 2, flex: 1, marginTop: 2, minHeight: tokens.spacing.md, backgroundColor: colors.border } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, paddingBottom: connected ? tokens.spacing.md : 0, gap: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }, children: address }), eta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: eta })) : null] }), recipient ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: recipient })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }, children: meta.label }), packages != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: `· ${packages} pkg` })) : null] })] })] }));
}
//# sourceMappingURL=RouteStop.js.map