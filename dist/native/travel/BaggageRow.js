"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaggageRow = BaggageRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const KIND = {
    personal: { glyph: '👜', label: 'Personal item' },
    cabin: { glyph: '🧳', label: 'Cabin bag' },
    checked: { glyph: '🧳', label: 'Checked bag' },
};
/**
 * A single baggage-allowance line — a kind glyph, the title, the allowance
 * detail, and a trailing status: an "Included" badge or a fare add-on price.
 * `included` drives both the badge text and the announcement (never
 * color-alone). Token-only colors.
 */
function BaggageRow({ kind = 'cabin', label, allowance, included = false, priceCents, currency = 'USD', appearance = 'classic', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const meta = KIND[kind];
    const title = label ?? meta.label;
    // 'classic' keeps the historical borderless row byte-for-byte; any other
    // appearance opts into a standalone surface with matching padding + radius.
    const surface = appearance === 'classic' ? null : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const trailing = included ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: "Included" })) : typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, size: "sm" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Not available" }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${title}${allowance ? `, ${allowance}` : ''}, ${included ? 'included' : 'extra'}`, style: [
            surface,
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            surface
                ? { paddingHorizontal: tokens.spacing.md, borderRadius: tokens.radius.md }
                : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, color: colors.onSurface }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), allowance ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: allowance })) : null] }), trailing] }));
}
//# sourceMappingURL=BaggageRow.js.map