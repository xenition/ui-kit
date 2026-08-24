"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenityGrid = AmenityGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A wrapping grid of property amenities — each a token-styled tile with an
 * optional glyph, a check/dash availability marker, and a struck label when the
 * amenity is not offered. Presentational only (data in, nothing fetches);
 * degrades to the shared `EmptyState` when `amenities` is empty. `columns`
 * controls the layout width. Token-only colors and a11y labels per tile.
 */
function AmenityGrid({ amenities, columns = 2, emptyLabel = 'No amenities listed', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (amenities.length === 0) {
        return (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: emptyLabel, description: "Amenity details will appear here.", style: style });
    }
    const cols = Math.max(1, columns);
    const basis = `${100 / cols}%`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: [{ flexDirection: 'row', flexWrap: 'wrap', margin: -tokens.spacing.xs }, style], children: amenities.map((a, i) => {
            const available = a.available !== false;
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: basis, padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${a.label}, ${available ? 'available' : 'not available'}`, style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.sm,
                        borderRadius: tokens.radius.md,
                        borderWidth: 1,
                        borderColor: colors.border,
                        backgroundColor: colors.surface,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        opacity: available ? 1 : 0.6,
                    }, children: [a.glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: a.glyph, size: "base", color: available ? 'onSurface' : 'muted' }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: available ? '✓' : '—', size: "sm", color: available ? 'success' : 'muted' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                color: available ? colors.onSurface : colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                textDecorationLine: available ? 'none' : 'line-through',
                            }, children: a.label })] }) }, `${a.label}-${i}`));
        }) }));
}
//# sourceMappingURL=AmenityGrid.js.map