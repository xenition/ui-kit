"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparisonTable = ComparisonTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const LABEL_WIDTH = 140;
const CELL_WIDTH = 96;
/**
 * Feature-comparison matrix — the native mirror of the web `ComparisonTable`.
 * Plan `columns` across the top × feature `rows` down the side, with
 * check/dash/text cells and an optional highlighted recommended column.
 *
 * Native layout choice: rather than the base `Table` primitive, this is a
 * hand-built token-styled matrix wrapped in a horizontal `ScrollView` so the
 * true grid survives on phones — the sticky-ish feature label column keeps a
 * fixed width while the plan columns scroll horizontally when they overflow.
 * Token-only.
 */
function ComparisonTable({ columns, rows, featureLabel = '', highlightLabel = 'Recommended', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const renderValue = (value) => {
        if (value === true) {
            return (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontWeight: '700' }, children: "\u2713" });
        }
        if (value === false) {
            return (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '700' }, children: "\u2013" });
        }
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: value }));
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-comparison", style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
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
                                        fontWeight: '600',
                                    }, children: featureLabel }) }), columns.map((column, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    width: CELL_WIDTH,
                                    padding: tokens.spacing.md,
                                    alignItems: 'center',
                                    gap: tokens.spacing.xs,
                                    backgroundColor: column.highlight ? tokens.ramps.primary[50] : 'transparent',
                                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: column.highlight ? colors.primary : colors.onSurface,
                                            fontSize: tokens.typography.scale.sm,
                                            fontWeight: '600',
                                            textAlign: 'center',
                                        }, children: column.name }), column.highlight ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            backgroundColor: colors.primary,
                                            borderRadius: tokens.radius.full,
                                            paddingHorizontal: tokens.spacing.xs,
                                            paddingVertical: 1,
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: colors.onPrimary,
                                                fontSize: tokens.typography.scale.xs,
                                                fontWeight: '500',
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
                                    backgroundColor: column.highlight ? tokens.ramps.primary[50] : 'transparent',
                                }, children: renderValue(row.values[c] ?? false) }, c)))] }, r)))] }) }) }));
}
//# sourceMappingURL=ComparisonTable.js.map