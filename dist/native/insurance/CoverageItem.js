"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverageItem = CoverageItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * One coverage line in a benefits breakdown: an included/excluded marker
 * (glyph + color, never color alone), the coverage label with optional detail,
 * and a right-aligned limit. Included reads `success`, excluded reads `muted` —
 * both slots trace to `SemanticColors`. Limit is integer cents via
 * `formatMoney`; when omitted the line shows "—" rather than a fabricated value.
 */
function CoverageItem({ label, included = true, limitCents, detail, currency = 'USD', formatMoney: format = format_1.formatMoney, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const markColor = included ? colors.success : colors.muted;
    const glyph = included ? '✓' : '✕';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 28,
                    height: 28,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(markColor, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: glyph, size: "sm", accessibilityLabel: included ? 'Included' : 'Not included' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: included ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                            textDecorationLine: included ? 'none' : 'line-through',
                        }, children: label }), detail != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : '—' })] }));
}
//# sourceMappingURL=CoverageItem.js.map