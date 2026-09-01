"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparisonTableV4 = ComparisonTableV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const LABEL_WIDTH = 140;
const CELL_WIDTH = 96;
/**
 * ComparisonTable — **V4** "showcase" design (native mirror of the web V4). A
 * clean bordered feature-comparison matrix in a horizontal `ScrollView`: plan
 * `columns` across the top × feature `rows` down the side. ✓ = success glyph,
 * ✗ = muted glyph (never color alone), text cells pass through, and the
 * highlighted/recommended column gets a soft-primary tint plus a soft-primary
 * chip. Same props/behavior as {@link ComparisonTableProps}; token-only colors,
 * no literals.
 */
function ComparisonTableV4({ columns, rows, featureLabel = '', highlightLabel = 'Recommended', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const highlightTint = (0, color_1.withAlpha)(colors.primary, 0.08);
    const renderValue = (value) => {
        if (value === true) {
            return (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontWeight: '700' }, children: "\u2713" });
        }
        if (value === false) {
            return (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '700' }, children: "\u2717" });
        }
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: value }));
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-comparison", style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: colors.card,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            backgroundColor: tokens.ramps.neutral[50],
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: LABEL_WIDTH, padding: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: '800',
                                        letterSpacing: -0.2,
                                    }, children: featureLabel }) }), columns.map((column, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    width: CELL_WIDTH,
                                    padding: tokens.spacing.md,
                                    alignItems: 'center',
                                    gap: tokens.spacing.xs,
                                    backgroundColor: column.highlight ? highlightTint : 'transparent',
                                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: column.highlight ? colors.primary : colors.onSurface,
                                            fontSize: tokens.typography.scale.sm,
                                            fontWeight: '800',
                                            letterSpacing: -0.2,
                                            textAlign: 'center',
                                        }, children: column.name }), column.highlight ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                                            borderRadius: tokens.radius.full,
                                            paddingHorizontal: tokens.spacing.xs,
                                            paddingVertical: 1,
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: tokens.ramps.primary[700],
                                                fontSize: tokens.typography.scale.xs,
                                                fontWeight: '600',
                                            }, children: highlightLabel }) })) : null] }, i)))] }), rows.map((row, r) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            borderBottomWidth: r < rows.length - 1 ? 1 : 0,
                            borderBottomColor: colors.border,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: LABEL_WIDTH, padding: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: '500',
                                    }, children: row.label }) }), columns.map((column, c) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: CELL_WIDTH,
                                    padding: tokens.spacing.md,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: column.highlight ? highlightTint : 'transparent',
                                }, children: renderValue(row.values[c] ?? false) }, c)))] }, r)))] }) }) }));
}
//# sourceMappingURL=ComparisonTableV4.js.map