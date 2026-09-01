"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenityGridV4 = AmenityGridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * AmenityGrid — **V4** "listing" design. The image-forward, editorial take on the
 * amenity grid: each amenity is a soft-primary tinted glyph disc above an airy
 * label, wrapping responsively into a clean grid. ONE accent = primary; unavailable
 * amenities read muted with a struck label and a dashed disc. Same props/behavior
 * as {@link AmenityGridProps}; `columns` sets the layout width and an empty list
 * degrades to the shared `EmptyState`. Token-only colors via `useXenitionTheme()`;
 * each tile carries an a11y label.
 */
function AmenityGridV4({ amenities, columns = 2, emptyLabel = 'No amenities listed', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (amenities.length === 0) {
        return (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: emptyLabel, description: "Amenity details will appear here.", style: style });
    }
    const cols = Math.max(1, columns);
    const basis = `${100 / cols}%`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: [{ flexDirection: 'row', flexWrap: 'wrap', margin: -tokens.spacing.xs }, style], children: amenities.map((a, i) => {
            const available = a.available !== false;
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: basis, padding: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${a.label}, ${available ? 'available' : 'not available'}`, style: {
                        alignItems: 'center',
                        gap: tokens.spacing.sm,
                        borderRadius: tokens.radius.lg,
                        borderWidth: 1,
                        borderColor: colors.border,
                        backgroundColor: colors.surface,
                        paddingVertical: tokens.spacing.md,
                        paddingHorizontal: tokens.spacing.sm,
                        opacity: available ? 1 : 0.6,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 44,
                                height: 44,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: available ? (0, color_1.withAlpha)(colors.primary, 0.1) : 'transparent',
                                borderWidth: available ? 0 : 1,
                                borderColor: colors.border,
                                borderStyle: available ? 'solid' : 'dashed',
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: available ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.base }, children: a.glyph ?? (available ? '✓' : '—') }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                color: available ? colors.onSurface : colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '500',
                                textAlign: 'center',
                                textDecorationLine: available ? 'none' : 'line-through',
                            }, children: a.label })] }) }, `${a.label}-${i}`));
        }) }));
}
//# sourceMappingURL=AmenityGridV4.js.map