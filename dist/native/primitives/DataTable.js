"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = DataTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Input_1 = require("./Input");
const Pagination_1 = require("./Pagination");
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
 * Sortable, searchable, paginated data table — the native mirror of the web
 * `DataTable`. RN has no `<table>`, so the layout is View/Text rows with
 * `flex: 1` columns (as the native `Table`); tap a `sortable` header to toggle
 * asc → desc → none, the search box filters across accessors, and it composes
 * the native `Pagination`. Client-side, token-bound, no literal colors. For a
 * full create/edit/delete screen use `CrudTable`.
 */
function DataTable({ columns, rows, pageSize = 10, searchable = false, getRowKey, onRowClick, empty = (0, jsx_runtime_1.jsx)(DefaultEmptyState, {}), style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [sort, setSort] = React.useState(null);
    const [query, setQuery] = React.useState('');
    const [page, setPage] = React.useState(1);
    const accessorFor = React.useCallback((col) => col.accessor ?? ((row) => row[col.key]), []);
    const filtered = React.useMemo(() => {
        if (!searchable || !query.trim())
            return rows;
        const q = query.toLowerCase();
        return rows.filter((r) => columns.some((c) => String(accessorFor(c)(r) ?? '').toLowerCase().includes(q)));
    }, [rows, query, searchable, columns, accessorFor]);
    const sorted = React.useMemo(() => {
        if (!sort)
            return filtered;
        const col = columns.find((c) => c.key === sort.key);
        if (!col)
            return filtered;
        const acc = accessorFor(col);
        const copy = [...filtered].sort((a, b) => {
            const av = acc(a);
            const bv = acc(b);
            if (av < bv)
                return -1;
            if (av > bv)
                return 1;
            return 0;
        });
        return sort.dir === 'asc' ? copy : copy.reverse();
    }, [filtered, sort, columns, accessorFor]);
    const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
    const current = Math.min(page, pageCount);
    const pageRows = sorted.slice((current - 1) * pageSize, current * pageSize);
    const toggleSort = (key) => setSort((s) => s && s.key === key ? (s.dir === 'asc' ? { key, dir: 'desc' } : null) : { key, dir: 'asc' });
    const cell = {
        flex: 1,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [searchable ? ((0, jsx_runtime_1.jsx)(Input_1.Input, { value: query, onChangeText: (t) => {
                    setQuery(t);
                    setPage(1);
                }, placeholder: "Search\u2026", accessibilityLabel: "Search" })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            backgroundColor: colors.surface,
                            borderBottomWidth: 1,
                            borderColor: colors.border,
                        }, children: columns.map((c) => {
                            const active = sort?.key === c.key;
                            const indicator = active ? (sort?.dir === 'asc' ? '▲' : '▼') : '⇅';
                            const headerNode = typeof c.header === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.muted,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '500',
                                }, children: c.header })) : (c.header);
                            const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [headerNode, c.sortable ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: indicator })) : null] }));
                            return c.sortable ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: active }, onPress: () => toggleSort(c.key), style: cell, children: inner }, c.key)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell, children: inner }, c.key));
                        }) }), pageRows.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.xl, paddingHorizontal: tokens.spacing.md }, children: typeof empty === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                textAlign: 'center',
                            }, children: empty })) : (empty) })) : (pageRows.map((row, i) => {
                        const rowNode = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: columns.map((c) => {
                                const content = c.render
                                    ? c.render(row)
                                    : String(accessorFor(c)(row) ?? '');
                                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell, children: typeof content === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: content })) : (content) }, c.key));
                            }) }));
                        const rowStyle = {
                            borderBottomWidth: i === pageRows.length - 1 ? 0 : 1,
                            borderColor: colors.border,
                        };
                        return onRowClick ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", onPress: () => onRowClick(row), style: rowStyle, children: rowNode }, getRowKey ? getRowKey(row, i) : String(i))) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: rowNode }, getRowKey ? getRowKey(row, i) : String(i)));
                    }))] }), pageCount > 1 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'flex-end' }, children: (0, jsx_runtime_1.jsx)(Pagination_1.Pagination, { page: current, pageCount: pageCount, onPageChange: setPage }) })) : null] }));
}
//# sourceMappingURL=DataTable.js.map