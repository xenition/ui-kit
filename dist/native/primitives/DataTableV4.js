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
exports.DataTableV4 = DataTableV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const v4_data_1 = require("../../primitives/internal/v4-data");
const Input_1 = require("./Input");
const Pagination_1 = require("./Pagination");
const state_v4_1 = require("./internal/state-v4");
/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
function DefaultEmptyState() {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    textAlign: 'center',
                }, children: "Nothing here yet" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: "Rows will appear once data is added." })] }));
}
/**
 * **V4 data table** — same props as {@link DataTable}, a different design line.
 *
 * It inherits everything `TableV4` establishes — one rule instead of `n`, a
 * scheme-derived zebra, right-aligned tabular numerals for quantity columns, a
 * steady row height — and answers the two questions a *sortable, paginated*
 * table adds, both of which the base leaves the reader to work out:
 *
 * 1. **Which column is the table sorted by?** The base marks it with a caret
 *    the same weight and colour as the eleven other carets on the row. V4
 *    promotes the active header itself to `onSurface` at full weight and
 *    leaves the inactive ones muted, so the sort order is legible from the
 *    header block at a glance rather than by hunting for a triangle (§33 —
 *    important information understandable through emphasis).
 * 2. **What am I looking at, out of how many?** A quiet `1–10 of 47` sits
 *    opposite the pager. It is derived from data the component already has, so
 *    it costs no prop, and it is the difference between "page 2" and "page 2
 *    of a filtered set of 47" — §37, make system status visible.
 *
 * That range line **only appears when it has something to say**: when the
 * table is paginated, or when a search has narrowed it. On a nine-row
 * unfiltered table it would be reading a number back to someone who can see
 * all nine, which is exactly the container §11 refuses to let exist.
 *
 * **No depth on any row.** A tapped row tints — twice the zebra, so it reads
 * as *this one* against banded neighbours — and does not lift. Depth marks a
 * layer; a row is not a layer, and a row that lifts is §8's "cards inside
 * cards" with a different name.
 */
function DataTableV4({ columns, rows, pageSize = 10, searchable = false, getRowKey, onRowClick, empty = (0, jsx_runtime_1.jsx)(DefaultEmptyState, {}), style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
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
    // Alignment follows the rows actually on screen, using the same accessor the
    // sort and the search read — so a column stays aligned across pages.
    const numeric = React.useMemo(() => {
        const set = new Set();
        columns.forEach((c) => {
            if (c.render)
                return;
            if ((0, v4_data_1.isNumericColumn)(pageRows.map((r) => String(accessorFor(c)(r) ?? ''))))
                set.add(c.key);
        });
        return set;
    }, [columns, pageRows, accessorFor]);
    const rule = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, v4_data_1.RULE_MIX);
    const zebra = (0, v4_depth_1.mixToken)(colors.surface, colors.onSurface, v4_data_1.ZEBRA_MIX);
    const pressed = (0, state_v4_1.pressFill)(theme);
    const rowHeight = tokens.spacing.xl + tokens.spacing.xs;
    // A row-actions column takes the width its buttons need; a data column
    // takes an equal share of what is left. Giving both `flex: 1` is how a
    // four-column table ends up spending a quarter of its width on two ghost
    // buttons while the data it exists to show gets squeezed.
    const control = React.useCallback((c) => (0, v4_data_1.isControlColumn)(c.header, c.render !== undefined), []);
    const cell = (isNumeric, isControl) => ({
        flexGrow: isControl ? 0 : 1,
        flexShrink: 0,
        flexBasis: 'auto',
        justifyContent: 'center',
        alignItems: isNumeric || isControl ? 'flex-end' : 'flex-start',
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
    });
    const numeralStyle = { fontVariant: ['tabular-nums'], textAlign: 'right' };
    const first = (current - 1) * pageSize + 1;
    const last = (current - 1) * pageSize + pageRows.length;
    // Say it only when it says something: a nine-row unfiltered table does not
    // need to be told it is showing nine rows.
    const showRange = pageRows.length > 0 && (pageCount > 1 || sorted.length !== rows.length);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [searchable ? ((0, jsx_runtime_1.jsx)(Input_1.Input, { value: query, onChangeText: (t) => {
                    setQuery(t);
                    setPage(1);
                }, placeholder: "Search\u2026", accessibilityLabel: "Search" })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            minHeight: rowHeight,
                            borderBottomWidth: 1,
                            borderColor: rule,
                        }, children: columns.map((c) => {
                            const active = sort?.key === c.key;
                            const isNumeric = numeric.has(c.key);
                            const isControl = control(c);
                            const headerNode = typeof c.header === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                                    {
                                        // The active column is promoted, not decorated: the sort
                                        // reads off the header block instead of off a triangle.
                                        color: active ? colors.onSurface : colors.mutedText,
                                        fontSize: tokens.typography.scale.xs,
                                        fontFamily: tokens.typography.fontBody,
                                        fontWeight: active ? '700' : '600',
                                    },
                                    isNumeric ? numeralStyle : null,
                                ], children: c.header })) : (c.header);
                            const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [isNumeric ? null : headerNode, c.sortable ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: active ? colors.onSurface : colors.mutedText,
                                            fontSize: tokens.typography.scale.xs,
                                        }, children: active ? (sort?.dir === 'asc' ? '↑' : '↓') : '⇅' })) : null, isNumeric ? headerNode : null] }));
                            return c.sortable ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: active }, onPress: () => toggleSort(c.key), style: cell(isNumeric, isControl), children: inner }, c.key)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell(isNumeric, isControl), children: inner }, c.key));
                        }) }), pageRows.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.xl, paddingHorizontal: tokens.spacing.md }, children: typeof empty === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.mutedText,
                                fontSize: tokens.typography.scale.sm,
                                textAlign: 'center',
                            }, children: empty })) : (empty) })) : (pageRows.map((row, i) => {
                        const band = i % 2 === 1 ? zebra : colors.surface;
                        const cells = columns.map((c) => {
                            const isNumeric = numeric.has(c.key);
                            const content = c.render ? c.render(row) : String(accessorFor(c)(row) ?? '');
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell(isNumeric, control(c)), children: typeof content === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                                        {
                                            color: colors.onSurface,
                                            fontSize: tokens.typography.scale.sm,
                                            fontFamily: tokens.typography.fontBody,
                                        },
                                        isNumeric ? numeralStyle : null,
                                    ], children: content })) : (content) }, c.key));
                        });
                        const key = getRowKey ? getRowKey(row, i) : String(i);
                        return onRowClick ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", onPress: () => onRowClick(row), 
                            // A press tints; it never lifts. Depth marks a layer, and a row
                            // is not one.
                            style: ({ pressed: down }) => ({
                                flexDirection: 'row',
                                minHeight: rowHeight,
                                backgroundColor: down ? pressed : band,
                            }), children: cells }, key)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', minHeight: rowHeight, backgroundColor: band }, children: cells }, key));
                    }))] }), showRange || pageCount > 1 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md,
                }, children: [showRange ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.mutedText,
                            fontSize: tokens.typography.scale.xs,
                            fontVariant: ['tabular-nums'],
                        }, children: `${first}–${last} of ${sorted.length}` })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), pageCount > 1 ? ((0, jsx_runtime_1.jsx)(Pagination_1.Pagination, { page: current, pageCount: pageCount, onPageChange: setPage })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {}))] })) : null] }));
}
//# sourceMappingURL=DataTableV4.js.map