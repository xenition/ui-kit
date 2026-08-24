"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = Table;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
const DEFAULT_EMPTY = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-medium text-on-surface", children: "Nothing here yet" }), (0, jsx_runtime_1.jsx)("span", { className: "text-muted text-xs", children: "Rows will appear once data is added." })] }));
/** Themed data table — the control every list/CRM/support queue needs. Horizontally
 *  scrollable, token-bound, with a built-in empty state. */
function Table({ columns, rows, getRowKey, empty, className, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full overflow-x-auto rounded-[var(--xen-radius-md)] border border-border', className), children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full border-collapse text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { className: "border-b border-border bg-neutral-50", children: columns.map((c) => ((0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2.5 text-left font-semibold text-on-surface", children: c.header }, c.key))) }) }), (0, jsx_runtime_1.jsx)("tbody", { children: rows.length === 0 ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: columns.length, className: "px-4 py-8 text-center text-muted", children: empty ?? DEFAULT_EMPTY }) })) : (rows.map((row, i) => ((0, jsx_runtime_1.jsx)("tr", { className: "border-b border-border last:border-0 hover:bg-neutral-50", children: columns.map((c) => ((0, jsx_runtime_1.jsx)("td", { className: "px-4 py-2.5 text-on-surface", children: c.render ? c.render(row) : String(row[c.key] ?? '') }, c.key))) }, getRowKey ? getRowKey(row, i) : String(i))))) })] }) }));
}
//# sourceMappingURL=Table.js.map