"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenityRowV4 = AmenityRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * AmenityRow — **V4** "journey" design. The boarding-pass take on a property's
 * amenities: each amenity leads with a small brand-gradient glyph disc (the
 * signature V4 touch), the name, and a trailing availability indicator — a `✓`
 * in the success tone when offered, a muted `✕` (with the label struck) when
 * not, so availability never rides on color alone. Honors `variant` — `list`
 * stacks one disc-led row each; `wrap` lays the discs out as inline chips.
 * Renders an empty hint when the list is empty. Same props/behavior as
 * {@link AmenityRowProps}; token-only colors via `useXenitionTheme()`.
 */
function AmenityRowV4({ amenities, variant = 'wrap', style }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    if (amenities.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No amenities listed." }));
    }
    if (variant === 'list') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: amenities.map((a, i) => {
                const available = a.available !== false;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${a.label}, ${available ? 'available' : 'unavailable'}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                opacity: available ? 1 : 0.6,
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.sm }, children: a.glyph ?? (available ? '✓' : '✕') }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                flex: 1,
                                color: available ? colors.onSurface : colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                textDecorationLine: available ? 'none' : 'line-through',
                            }, children: a.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: available ? colors.successText : colors.muted, fontSize: tokens.typography.scale.sm }, children: available ? '✓' : '✕' })] }, `${a.label}-${i}`));
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
                    paddingLeft: tokens.spacing.xs,
                    paddingRight: tokens.spacing.sm,
                    opacity: available ? 1 : 0.6,
                }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.xs }, children: a.glyph ?? (available ? '✓' : '✕') }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: available ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            textDecorationLine: available ? 'none' : 'line-through',
                        }, children: a.label })] }, `${a.label}-${i}`));
        }) }));
}
//# sourceMappingURL=AmenityRowV4.js.map