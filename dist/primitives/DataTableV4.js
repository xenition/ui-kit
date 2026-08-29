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
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const v4_depth_1 = require("./internal/v4-depth");
const v4_data_1 = require("./internal/v4-data");
const Input_1 = require("./Input");
const Pagination_1 = require("./Pagination");
/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
const DEFAULT_EMPTY = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-on-surface", children: "Nothing here yet" }), (0, jsx_runtime_1.jsx)("span", { className: "text-muted-text text-xs", children: "Rows will appear once data is added." })] }));
/**
 * **V4 data table** — the web twin of the native `DataTableV4`, same props as
 * {@link DataTable}, a different design line.
 *
 * It inherits everything `TableV4` establishes — one rule instead of `n`, a
 * scheme-derived zebra, right-aligned tabular numerals for quantity columns, a
 * sticky header that lifts and rows that never do — and answers the two
 * questions a *sortable, paginated* table adds, both of which the base leaves
 * the reader to work out:
 *
 * 1. **Which column is the table sorted by?** The base marks it with a caret
 *    the same weight and colour as every other caret on the row. V4 promotes
 *    the active header itself to `text-on-surface` at full weight and leaves
 *    the inactive ones muted, so the sort order reads off the header block at
 *    a glance rather than by hunting for a triangle (§33 — important
 *    information understandable through emphasis).
 * 2. **What am I looking at, out of how many?** A quiet `1–10 of 47` sits
 *    opposite the pager, in tabular figures so it does not reflow as the page
 *    changes. It is derived from data the component already has, so it costs
 *    no prop, and it is the difference between "page 2" and "page 2 of a
 *    filtered set of 47" — §37, make system status visible.
 *
 * That range line **only appears when it has something to say**: when the
 * table is paginated, or when a search has narrowed it. On a nine-row
 * unfiltered table it would be reading a number back to someone who can see
 * all nine, which is exactly the container §11 refuses to let exist.
 *
 * A clickable row also becomes reachable: `role="button"`, `tabIndex`, and
 * Enter/Space. The base bound `onRowClick` to a bare `<tr onClick>`, which is
 * unreachable without a mouse — §46 puts accessibility ahead of the design
 * line, so V4 fixes it rather than inheriting it.
 */
function DataTableV4({ columns, rows, pageSize = 10, searchable = false, getRowKey, onRowClick, empty = DEFAULT_EMPTY, className, }) {
    (0, inject_1.injectStyleOnce)(v4_data_1.V4_TABLE_STYLE_ID, v4_data_1.V4_TABLE_CSS);
    const theme = (0, v4_depth_1.useOptionalCompiledTheme)();
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
    const vars = {};
    if (theme !== null) {
        vars['--xen-v4-lift-l'] = (0, v4_depth_1.shadowCss)(theme.lightElevation.card);
        vars['--xen-v4-lift-d'] = (0, v4_depth_1.shadowCss)(theme.darkElevation.card);
    }
    // A row-actions column shrinks to its buttons (`w-px` + `whitespace-nowrap`
    // is the table-layout idiom for "as narrow as the content"). Letting it take
    // an equal share is how a four-column table spends a quarter of its width on
    // two ghost buttons while the data gets squeezed.
    const controlCell = (c) => (0, v4_data_1.isControlColumn)(c.header, c.render !== undefined) ? 'w-px whitespace-nowrap text-right' : '';
    const first = (current - 1) * pageSize + 1;
    const last = (current - 1) * pageSize + pageRows.length;
    const showRange = pageRows.length > 0 && (pageCount > 1 || sorted.length !== rows.length);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), children: [searchable && ((0, jsx_runtime_1.jsx)(Input_1.Input, { value: query, onChange: (e) => {
                    setQuery(e.target.value);
                    setPage(1);
                }, placeholder: "Search\u2026", "aria-label": "Search", className: "max-w-xs" })), (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-table": "", className: "w-full overflow-x-auto rounded-[var(--xen-radius-md)] border border-border bg-surface", style: vars, children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full border-collapse text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { children: columns.map((c) => {
                                    const active = sort?.key === c.key;
                                    return ((0, jsx_runtime_1.jsx)("th", { scope: "col", "data-numeric": numeric.has(c.key) ? 'true' : 'false', "aria-sort": active ? (sort?.dir === 'asc' ? 'ascending' : 'descending') : undefined, onClick: c.sortable ? () => toggleSort(c.key) : undefined, className: (0, cn_1.cn)('px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left text-xs', controlCell(c), 
                                        // Promotion, not decoration: the sorted column is the one
                                        // that reads at full strength.
                                        active ? 'font-bold text-on-surface' : 'font-semibold text-muted-text', c.sortable && 'cursor-pointer select-none'), children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)]", children: [c.header, c.sortable && ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: active ? (sort?.dir === 'asc' ? '↑' : '↓') : '⇅' }))] }) }, c.key));
                                }) }) }), (0, jsx_runtime_1.jsx)("tbody", { children: pageRows.length === 0 ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: columns.length, className: "px-[var(--xen-space-md)] py-[var(--xen-space-xl)] text-center text-muted-text", children: empty }) })) : (pageRows.map((row, i) => ((0, jsx_runtime_1.jsx)("tr", { "data-clickable": onRowClick ? 'true' : 'false', role: onRowClick ? 'button' : undefined, tabIndex: onRowClick ? 0 : undefined, onClick: onRowClick ? () => onRowClick(row) : undefined, onKeyDown: onRowClick
                                    ? (e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            onRowClick(row);
                                        }
                                    }
                                    : undefined, children: columns.map((c) => ((0, jsx_runtime_1.jsx)("td", { "data-numeric": numeric.has(c.key) ? 'true' : 'false', className: (0, cn_1.cn)('h-[calc(var(--xen-space-xl)_+_var(--xen-space-xs))] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-on-surface', controlCell(c)), children: c.render ? c.render(row) : String(accessorFor(c)(row) ?? '') }, c.key))) }, getRowKey ? getRowKey(row, i) : String(i))))) })] }) }), (showRange || pageCount > 1) && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-md)]", children: [showRange ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-range": "", className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: `${first}–${last} of ${sorted.length}` })) : ((0, jsx_runtime_1.jsx)("span", {})), pageCount > 1 ? ((0, jsx_runtime_1.jsx)(Pagination_1.Pagination, { page: current, pageCount: pageCount, onPageChange: setPage })) : ((0, jsx_runtime_1.jsx)("span", {}))] }))] }));
}
//# sourceMappingURL=DataTableV4.js.map