"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleCardV3 = VehicleCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Status → semantic tone + spelled-out word + glyph (never color alone). */
const STATUS = {
    available: { tone: 'success', word: 'Available', glyph: '●' },
    'in-use': { tone: 'primary', word: 'In use', glyph: '▶' },
    maintenance: { tone: 'warn', word: 'Maintenance', glyph: '🔧' },
    offline: { tone: 'muted', word: 'Offline', glyph: '○' },
};
function VehicleCardV3({ name, plate, vehicleClass, color, year, status = 'available', onPress, loading = false, style, }) {
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
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading vehicle", style: [rowStyle, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 14, borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } }) }));
    }
    const s = STATUS[status] ?? STATUS.available;
    const toneColor = colors[s.tone] ?? colors.muted;
    const subtitleParts = [year ? String(year) : null, color, vehicleClass].filter(Boolean);
    const a11y = `Vehicle ${name}${plate ? `, plate ${plate}` : ''}, ${s.word}`;
    const Container = onPress ? react_native_1.Pressable : react_native_1.View;
    return ((0, jsx_runtime_1.jsxs)(Container, { accessible: true, accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: a11y, onPress: onPress, style: onPress ? ({ pressed }) => [rowStyle, style, { opacity: pressed ? 0.92 : 1 }] : [rowStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg }, children: "\uD83D\uDE97" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), plate ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }, children: plate })) : null] }), subtitleParts.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitleParts.join(' · ') })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: toneColor }, children: s.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: s.word })] })] }));
}
//# sourceMappingURL=VehicleCardV3.js.map