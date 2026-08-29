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
exports.TableV4 = TableV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const v4_depth_1 = require("./internal/v4-depth");
const v4_data_1 = require("./internal/v4-data");
/**
 * Guiding two-line empty state (design.md §15): a title plus a hint on what
 * makes rows appear, instead of a bare "No data".
 */
const DEFAULT_EMPTY = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-on-surface", children: "Nothing here yet" }), (0, jsx_runtime_1.jsx)("span", { className: "text-muted-text text-xs", children: "Rows will appear once data is added." })] }));
/** The fallback cell text — the only path the component is allowed to read. */
function cellText(row, col) {
    return String(row[col.key] ?? '');
}
/**
 * **V4 table** — the web twin of the native `TableV4`, same props as
 * {@link Table}, a different design line.
 *
 * The base table draws a border under every row and fills its header with
 * `bg-neutral-50`. Both are the reflex §9 warns about: a rule per row costs a
 * line of ink for every item and buys nothing a steady baseline was not
 * already giving the eye, and a ramp-step header fill is a second surface
 * whose only job was to look like a header. On a twenty-row table the two
 * together turn the data into a grid the reader has to look *through*. A table
 * that reads faster is the premium version — not a table with more chrome.
 *
 * Five changes, all of them about scanning (§33):
 *
 * 1. **One rule, not `n` rules.** The single horizontal line left is the one
 *    that means something: labels above it, data below it.
 * 2. **A zebra that survives dark mode.** The band is `color-mix`ed from
 *    `--xen-surface` toward `--xen-on-surface`, both re-emitted under
 *    `[data-theme="dark"]`, so it darkens a light page and lightens a dark one
 *    with no dark rule of its own. `--xen-neutral-50` — what the base header
 *    used — was the obvious reach and the wrong one.
 * 3. **Numerals line up.** A column whose fallback text is entirely quantities
 *    is right-aligned and set in tabular figures, header included. Nothing was
 *    added to the props to say so: alignment is a fact about the data, and a
 *    column with a custom `render` opts out by construction.
 * 4. **A steady baseline.** Every row takes the same minimum height, so the
 *    eye tracks across a row and down a column without re-finding the line.
 * 5. **The header lifts, and only the header.** It is sticky, and it carries
 *    `elevation.card` — the one legitimate use of depth in a table, because it
 *    is genuinely a layer above the rows once they scroll under it. A data row
 *    never lifts. The compiler zeroes the token for a `depth: 'flat'` seed, so
 *    this needs no check.
 */
function TableV4({ columns, rows, getRowKey, empty, className, }) {
    (0, inject_1.injectStyleOnce)(v4_data_1.V4_TABLE_STYLE_ID, v4_data_1.V4_TABLE_CSS);
    const theme = (0, v4_depth_1.useOptionalCompiledTheme)();
    const numeric = React.useMemo(() => {
        const set = new Set();
        columns.forEach((c) => {
            if (c.render)
                return;
            if ((0, v4_data_1.isNumericColumn)(rows.map((r) => cellText(r, c))))
                set.add(c.key);
        });
        return set;
    }, [columns, rows]);
    const vars = {};
    if (theme !== null) {
        vars['--xen-v4-lift-l'] = (0, v4_depth_1.shadowCss)(theme.lightElevation.card);
        vars['--xen-v4-lift-d'] = (0, v4_depth_1.shadowCss)(theme.darkElevation.card);
    }
    return ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-table": "", className: (0, cn_1.cn)('w-full overflow-x-auto rounded-[var(--xen-radius-md)] border border-border bg-surface', className), style: vars, children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full border-collapse text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { children: columns.map((c) => ((0, jsx_runtime_1.jsx)("th", { "data-numeric": numeric.has(c.key) ? 'true' : 'false', scope: "col", className: "px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left text-xs font-semibold text-muted-text", children: c.header }, c.key))) }) }), (0, jsx_runtime_1.jsx)("tbody", { children: rows.length === 0 ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: columns.length, className: "px-[var(--xen-space-md)] py-[var(--xen-space-xl)] text-center text-muted-text", children: empty ?? DEFAULT_EMPTY }) })) : (rows.map((row, i) => ((0, jsx_runtime_1.jsx)("tr", { children: columns.map((c) => ((0, jsx_runtime_1.jsx)("td", { "data-numeric": numeric.has(c.key) ? 'true' : 'false', className: "h-[calc(var(--xen-space-xl)_+_var(--xen-space-xs))] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-on-surface", children: c.render ? c.render(row) : cellText(row, c) }, c.key))) }, getRowKey ? getRowKey(row, i) : String(i))))) })] }) }));
}
//# sourceMappingURL=TableV4.js.map