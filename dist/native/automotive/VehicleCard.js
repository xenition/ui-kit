"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleCard = VehicleCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Status → semantic tone + spelled-out word (never color alone). */
const STATUS = {
    available: { tone: 'success', word: 'Available', glyph: '●' },
    'in-use': { tone: 'primary', word: 'In use', glyph: '▶' },
    maintenance: { tone: 'warn', word: 'Maintenance', glyph: '🔧' },
    offline: { tone: 'muted', word: 'Offline', glyph: '○' },
};
/**
 * A fleet vehicle summary — make/model, plate, class, color, year, an
 * operational status, and optional spec chips. The status is shown with a glyph
 * plus a spelled-out word and an a11y label, so meaning never rests on color.
 * Data + `onPress` only; nothing fetches. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `variant="compact"` renders a denser
 * list row. Spec indexing is guarded against a missing array.
 */
function VehicleCard({ name, plate, vehicleClass, color, year, status = 'available', specs, variant = 'default', onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const pad = compact ? tokens.spacing.md : tokens.spacing.lg;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading vehicle", style: [
                {
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    padding: pad,
                    gap: tokens.spacing.sm,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 18, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] }));
    }
    const s = STATUS[status] ?? STATUS.available;
    const subtitleParts = [year ? String(year) : null, color, vehicleClass].filter(Boolean);
    const specList = Array.isArray(specs) ? specs : [];
    const a11y = `Vehicle ${name}${plate ? `, plate ${plate}` : ''}, ${s.word}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: compact ? tokens.spacing.sm : tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: ["\uD83D\uDE97 ", name] }), subtitleParts.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitleParts.join(' · ') })) : null] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: (s.tone === 'muted' ? 'neutral' : s.tone), variant: "soft", size: "sm", dot: true, children: s.word })] }), plate ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.sm,
                        borderWidth: 1,
                        borderColor: colors.border,
                        paddingVertical: 2,
                        paddingHorizontal: tokens.spacing.sm,
                        backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.1),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800', letterSpacing: 2 }, children: plate }) }) })) : null, specList.length && !compact ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: specList.map((spec, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.sm,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08),
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: spec.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: spec.value })] }, `${spec.label}-${i}`))) })) : null] }));
    const containerStyle = {
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        padding: pad,
    };
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [containerStyle, style], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessible: true, accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => [containerStyle, style, { opacity: pressed ? 0.92 : 1 }], children: body }));
}
//# sourceMappingURL=VehicleCard.js.map