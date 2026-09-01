"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaggageRowV4 = BaggageRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
const KIND = {
    personal: { glyph: '👜', label: 'Personal item' },
    cabin: { glyph: '🧳', label: 'Cabin bag' },
    checked: { glyph: '🧳', label: 'Checked bag' },
};
/**
 * BaggageRow — **V4** "journey" design. The boarding-pass take on a
 * baggage-allowance line: the baggage-kind glyph sits in a small brand-gradient
 * disc (the signature V4 touch), followed by the title and the allowance detail,
 * then a trailing status — an "Included" success badge when the allowance is in
 * the fare, otherwise the fare add-on price via `PriceTag` (or a muted "Not
 * available"). `included` drives both the badge text and the announcement, so
 * meaning never rides on color alone. Same props/behavior as
 * {@link BaggageRowProps}; token-only colors via `useXenitionTheme()`.
 */
function BaggageRowV4({ kind = 'cabin', label, allowance, included = false, priceCents, currency = 'USD', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const meta = KIND[kind];
    const title = label ?? meta.label;
    const trailing = included ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: "Included" })) : typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, size: "sm" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Not available" }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${title}${allowance ? `, ${allowance}` : ''}, ${included ? 'included' : 'extra'}`, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                    width: 48,
                    height: 48,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.lg }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), allowance ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: allowance })) : null] }), trailing] }));
}
//# sourceMappingURL=BaggageRowV4.js.map