"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleCardV2 = VehicleCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
/** Status → semantic tone + spelled-out word + glyph (never color alone). */
const STATUS = {
    available: { tone: 'success', word: 'Available', glyph: '●' },
    'in-use': { tone: 'primary', word: 'In use', glyph: '▶' },
    maintenance: { tone: 'warn', word: 'Maintenance', glyph: '🔧' },
    offline: { tone: 'muted', word: 'Offline', glyph: '○' },
};
function VehicleCardV2({ name, plate, vehicleClass, color, year, status = 'available', specs, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const surface = {
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.surface,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
        ...(0, elevation_1.shadow)('md', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading vehicle", style: [surface, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 72, borderRadius: tokens.radius.lg, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } })] }));
    }
    const s = STATUS[status] ?? STATUS.available;
    const toneColor = colors[s.tone] ?? colors.muted;
    const subtitleParts = [year ? String(year) : null, color, vehicleClass].filter(Boolean);
    const specList = Array.isArray(specs) ? specs : [];
    const a11y = `Vehicle ${name}${plate ? `, plate ${plate}` : ''}, ${s.word}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 72,
                            height: 72,
                            borderRadius: tokens.radius.lg,
                            backgroundColor: (0, color_1.withAlpha)(toneColor, 0.12),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['3xl'] }, children: "\uD83D\uDE97" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: name }), subtitleParts.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitleParts.join(' · ') })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', marginTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: (s.tone === 'muted' ? 'neutral' : s.tone), variant: "soft", size: "sm", dot: true, children: `${s.glyph} ${s.word}` }) })] })] }), plate ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.sm,
                        borderWidth: 1.5,
                        borderColor: colors.border,
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.md,
                        backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.1),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800', letterSpacing: 3 }, children: plate }) }) })) : null, specList.length ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: specList.map((spec, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08),
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.sm,
                        minWidth: 64,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: spec.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: spec.value })] }, `${spec.label}-${i}`))) })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [surface, style], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessible: true, accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => [surface, style, { opacity: pressed ? 0.92 : 1 }], children: body }));
}
//# sourceMappingURL=VehicleCardV2.js.map