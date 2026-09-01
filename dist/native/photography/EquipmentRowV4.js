"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentRowV4 = EquipmentRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const STATUS = {
    available: { label: 'Available', tone: 'success', glyph: '✅' },
    'in-use': { label: 'In use', tone: 'warn', glyph: '🎬' },
    maintenance: { label: 'Maintenance', tone: 'primary', glyph: '🛠' },
    unavailable: { label: 'Unavailable', tone: 'danger', glyph: '⛔' },
};
/**
 * EquipmentRow — **V4** "studio" design (native parity of the web V4). The matted
 * take on a gear-inventory row: an elevated clean-surface row whose leading
 * `glyph` (default 📷) floats inside a thin neutral **mat**, a bold gear name, a
 * muted `category` line, the `meta` (qty / serial) as a small soft-primary chip,
 * and a trailing availability `Badge` carrying glyph + token tone + label (never
 * color alone). Identical props/behavior to {@link EquipmentRowProps}; optional
 * `onPress` exposes the row as a `button`. Token-only colors via
 * `useXenitionTheme()`.
 */
function EquipmentRowV4({ name, category, glyph = '📷', status = 'available', meta, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const s = STATUS[status];
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: tokens.ramps.neutral[100],
                    borderWidth: 1,
                    borderColor: colors.border,
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", color: "onSurface" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), category || meta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }, children: [category ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: category })) : null, meta ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    paddingHorizontal: tokens.spacing.sm,
                                    paddingVertical: 2,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: meta }) })) : null] })) : null] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: s.tone, variant: "soft", size: "sm", children: `${s.glyph} ${s.label}` })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${s.label}`, onPress: onPress, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: inner });
}
//# sourceMappingURL=EquipmentRowV4.js.map