"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenityRow = AmenityRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A property's amenities — either inline chips (`wrap`) or a stacked list.
 * Unavailable amenities are muted, struck, and carry a `✕` (available carry a
 * `✓`), so availability never depends on color alone. Renders an empty hint
 * when the list is empty. Token-only colors.
 */
function AmenityRow({ amenities, variant = 'wrap', style }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (amenities.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No amenities listed." }));
    }
    if (variant === 'list') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: amenities.map((a, i) => {
                const available = a.available !== false;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${a.label}, ${available ? 'available' : 'unavailable'}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: available ? colors.success : colors.muted, fontSize: tokens.typography.scale.sm }, children: available ? '✓' : '✕' }), a.glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: a.glyph })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: available ? colors.onSurface : colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                textDecorationLine: available ? 'none' : 'line-through',
                            }, children: a.label })] }, `${a.label}-${i}`));
            }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: amenities.map((a, i) => {
            const available = a.available !== false;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${a.label}, ${available ? 'available' : 'unavailable'}`, style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.full,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    opacity: available ? 1 : 0.6,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: a.glyph ?? (available ? '✓' : '✕') }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: available ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            textDecorationLine: available ? 'none' : 'line-through',
                        }, children: a.label })] }, `${a.label}-${i}`));
        }) }));
}
//# sourceMappingURL=AmenityRow.js.map