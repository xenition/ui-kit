"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverageItemV2 = CoverageItemV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * CoverageItem, alternate design **V2** — a standalone card. An included /
 * excluded pill (glyph + text + color, never color-alone) sits top-right of the
 * coverage label and detail; the limit lives in its own tinted block below so
 * the benefit ceiling is easy to scan. Excluded coverage dims and strikes the
 * label and shows "Not covered". Same `CoverageItemProps` (integer cents via
 * `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
function CoverageItemV2({ label, included = true, limitCents, detail, currency = 'USD', formatMoney: format = format_1.formatMoney, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const limit = included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : null;
    return ((0, jsx_runtime_1.jsx)(primitives_2.Card, { variant: "elevated", padding: "md", radius: "md", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                                        color: included ? colors.onSurface : colors.muted,
                                        fontSize: tokens.typography.scale.base,
                                        fontWeight: '700',
                                        textDecorationLine: included ? 'none' : 'line-through',
                                    }, children: label }), detail != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail })) : null] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: included ? 'success' : 'neutral', variant: "soft", size: "sm", children: included ? '✓ Included' : '✕ Excluded' })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.sm,
                        backgroundColor: included ? (0, format_1.withAlpha)(colors.success, 0.08) : (0, format_1.withAlpha)(colors.muted, 0.08),
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: included ? 'Coverage limit' : 'Status' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: included ? colors.onSurface : colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '700',
                            }, children: included ? limit ?? 'No limit' : 'Not covered' })] })] }) }));
}
//# sourceMappingURL=CoverageItemV2.js.map