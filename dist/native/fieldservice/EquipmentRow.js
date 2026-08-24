"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentRow = EquipmentRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const EQUIPMENT_STATUS = {
    operational: { label: 'Operational', glyph: '✓', tone: 'success', slot: 'success' },
    maintenance: { label: 'Maintenance', glyph: '⚙', tone: 'warn', slot: 'warn' },
    down: { label: 'Down', glyph: '✕', tone: 'danger', slot: 'danger' },
    retired: { label: 'Retired', glyph: '⏻', tone: 'neutral', slot: 'muted' },
};
/**
 * One line in an equipment / asset register: a tinted status glyph disc, a
 * name/tag stack, meta (location, next service), and a status pill. The status
 * is conveyed redundantly (glyph + label + a color that traces to a
 * `SemanticColors` slot: operational → success, down → danger) so it is never
 * color-alone. Becomes a button only when `onPress` is supplied. No literals.
 */
function EquipmentRow({ name, assetTag, status, glyph = '🚜', nextService, location, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = EQUIPMENT_STATUS[status] ?? EQUIPMENT_STATUS.operational;
    const tint = sd.slot === 'muted' ? colors.muted : colors[sd.slot];
    const meta = [location, nextService != null ? `Service ${nextService}` : null]
        .filter((v) => v != null)
        .join(' · ');
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, accessibilityLabel: "Equipment" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: assetTag }), meta !== '' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", meta] })) : null] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${assetTag}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=EquipmentRow.js.map