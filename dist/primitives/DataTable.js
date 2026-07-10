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
const cn_1 = require("./cn");
const Input_1 = require("./Input");
const Pagination_1 = require("./Pagination");
/**
 * Sortable, searchable, paginated data table — the control every list/CRM/admin
 * screen needs. Client-side; bound to the theme tokens. For a full
 * create/edit/delete screen use {@link CrudTable}.
 */
function DataTable({ columns, rows, pageSize = 10, searchable = false, getRowKey, onRowClick, empty = 'No data', className, }) {
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
    const toggleSort = (key) => setSort((s) => (s && s.key === key ? (s.dir === 'asc' ? { key, dir: 'desc' } : null) : { key, dir: 'asc' }));
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-3', className), children: [searchable && ((0, jsx_runtime_1.jsx)(Input_1.Input, { value: query, onChange: (e) => {
                    setQuery(e.target.value);
                    setPage(1);
                }, placeholder: "Search\u2026", className: "max-w-xs" })), (0, jsx_runtime_1.jsx)("div", { className: "w-full overflow-x-auto rounded-[var(--xen-radius-md)] border border-border", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full border-collapse text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { className: "border-b border-border bg-neutral-50", children: columns.map((c) => {
                                    const active = sort?.key === c.key;
                                    return ((0, jsx_runtime_1.jsx)("th", { className: (0, cn_1.cn)('px-4 py-2.5 text-left font-medium text-muted', c.sortable && 'cursor-pointer select-none'), onClick: c.sortable ? () => toggleSort(c.key) : undefined, children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1", children: [c.header, c.sortable && ((0, jsx_runtime_1.jsx)("span", { className: "text-xs", children: active ? (sort?.dir === 'asc' ? '▲' : '▼') : '⇅' }))] }) }, c.key));
                                }) }) }), (0, jsx_runtime_1.jsx)("tbody", { children: pageRows.length === 0 ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: columns.length, className: "px-4 py-10 text-center text-muted", children: empty }) })) : (pageRows.map((row, i) => ((0, jsx_runtime_1.jsx)("tr", { onClick: onRowClick ? () => onRowClick(row) : undefined, className: (0, cn_1.cn)('border-b border-border last:border-0', onRowClick && 'cursor-pointer transition-colors hover:bg-neutral-50'), children: columns.map((c) => ((0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2.5 text-on-surface", children: c.render ? c.render(row) : String(accessorFor(c)(row) ?? '') }, c.key))) }, getRowKey ? getRowKey(row, i) : i)))) })] }) }), pageCount > 1 && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-end", children: (0, jsx_runtime_1.jsx)(Pagination_1.Pagination, { page: current, pageCount: pageCount, onPageChange: setPage }) }))] }));
}
//# sourceMappingURL=DataTable.js.map