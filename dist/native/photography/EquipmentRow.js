"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentRow = EquipmentRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const STATUS = {
    available: { label: 'Available', tone: 'success' },
    'in-use': { label: 'In use', tone: 'warn' },
    maintenance: { label: 'Maintenance', tone: 'primary' },
    unavailable: { label: 'Unavailable', tone: 'danger' },
};
/**
 * A gear-inventory row — an icon slot, the item name, an optional category /
 * serial meta line, and an availability `Badge`. Status is a labelled badge
 * (never color alone). Composes `Icon` and `Badge`; optional `onPress` exposes
 * the row as a `button`. Token-only colors.
 */
function EquipmentRow({ name, category, glyph = '📷', status = 'available', meta, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const s = STATUS[status];
    const metaBits = [];
    if (category)
        metaBits.push(category);
    if (meta)
        metaBits.push(meta);
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", color: "onSurface" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), metaBits.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaBits.join(' · ') })) : null] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: s.tone, variant: "soft", size: "sm", children: s.label })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${s.label}`, onPress: onPress, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: inner });
}
//# sourceMappingURL=EquipmentRow.js.map