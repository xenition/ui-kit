"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = Table;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
function DefaultEmptyState() {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    textAlign: 'center',
                }, children: "Nothing here yet" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: "Rows will appear once data is added." })] }));
}
/**
 * Themed data table — the native mirror of the web `Table`. Row/column layout
 * built from View/Text (RN has no <table>); token-bound borders and text. No
 * literal colors.
 */
function Table({ columns, rows, getRowKey, empty = (0, jsx_runtime_1.jsx)(DefaultEmptyState, {}), style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cell = {
        flex: 1,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    backgroundColor: colors.surface,
                    borderBottomWidth: 1,
                    borderColor: colors.border,
                }, children: columns.map((c) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell, children: typeof c.header === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: c.header })) : (c.header) }, c.key))) }), rows.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.xl, paddingHorizontal: tokens.spacing.md }, children: typeof empty === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.muted,
                        fontSize: tokens.typography.scale.sm,
                        textAlign: 'center',
                    }, children: empty })) : (empty) })) : (rows.map((row, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    borderBottomWidth: i === rows.length - 1 ? 0 : 1,
                    borderColor: colors.border,
                }, children: columns.map((c) => {
                    const content = c.render ? c.render(row) : String(row[c.key] ?? '');
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell, children: typeof content === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: content })) : (content) }, c.key));
                }) }, getRowKey ? getRowKey(row, i) : String(i)))))] }));
}
//# sourceMappingURL=Table.js.map