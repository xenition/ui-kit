"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverageItemV3 = CoverageItemV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * CoverageItem, alternate design **V3** — a compact list line. A bare leading
 * glyph (✓ included / ✕ excluded, colored by the success/muted slot but always
 * paired with the glyph and, for excluded, a struck label — never color-alone)
 * runs into the label and, on the right, the limit or an em-dash. No disc, no
 * card; the tightest possible benefits line. Same `CoverageItemProps` (integer
 * cents via `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
function CoverageItemV3({ label, included = true, limitCents, detail, currency = 'USD', formatMoney: format = format_1.formatMoney, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const markColor = included ? colors.successText : colors.muted;
    const limit = included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : '—';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: included ? 'Included' : 'Not included', style: { color: markColor, fontSize: tokens.typography.scale.sm, fontWeight: '700', width: 16, textAlign: 'center' }, children: included ? '✓' : '✕' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            flexShrink: 1,
                            color: included ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '500',
                            textDecorationLine: included ? 'none' : 'line-through',
                        }, children: label }), detail != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: included ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: limit })] }));
}
//# sourceMappingURL=CoverageItemV3.js.map