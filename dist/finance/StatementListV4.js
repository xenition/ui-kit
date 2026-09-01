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
exports.StatementListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const ledger_v4_1 = require("./internal/ledger-v4");
const TransactionRowV4_1 = require("./TransactionRowV4");
/**
 * **V4 statement list** — the web twin of the native `StatementListV4`, same
 * props as {@link StatementList} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **`loadingRows={0}` draws no skeletons.** `Math.max(1, loadingRows)`
 *    meant zero was silently one, so the one caller who wanted the header and
 *    nothing else got a placeholder bar it could not turn off.
 * 2. **The loading region is announced.** Each placeholder carried
 *    `aria-label="Loading transaction"` on a bare `div`, which has no role to
 *    hang a name on, so nothing reached a reader at all — and four of them
 *    would have been four announcements of the same fact. One live region says
 *    it once.
 * 3. **Skeletons take the shared placeholder ground**, not `bg-border` at
 *    `opacity-50` — the hairline colour, stretched into a surface and then
 *    made translucent, so it was a different colour on every ground it was
 *    dropped onto.
 * 4. **An entry with no `currency` inherits the list's.** Each row fell
 *    through to its own `'USD'` default, so one euro statement with a single
 *    entry missing its code printed that row in dollars, at the same
 *    magnitude. The list resolves one currency from the entries that declare
 *    one and hands it to those that do not.
 * 5. **It is a real list, and empty is a real empty state.** The rows were
 *    sibling `div`s with no list semantics and no count; the empty case drew
 *    the v0 dashed box rather than the V4 one.
 */
exports.StatementListV4 = React.forwardRef(function StatementListV4({ items, header, onSelectItem, loading = false, loadingRows = 4, emptyTitle = 'No transactions', emptyDescription, loadingLabel = 'Loading transactions', className, ...rest }, ref) {
    const list = items ?? [];
    const headerNode = header != null ? ((0, jsx_runtime_1.jsx)("p", { className: "mb-xs text-xs font-semibold uppercase tracking-wide text-muted-text", children: header })) : null;
    if (loading) {
        const rows = Math.max(0, Math.trunc(loadingRows));
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [headerNode, (0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: "flex flex-col", children: Array.from({ length: rows }).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md px-md py-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 rounded-full', ledger_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-1/3', ledger_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-2/3', ledger_v4_1.PLACEHOLDER_CLASS) })] }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-xl shrink-0', ledger_v4_1.PLACEHOLDER_CLASS) })] }, index))) })] }));
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [headerNode, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyTitle, description: emptyDescription })] }));
    }
    // One statement is one currency in every product that has ever shipped
    // one; an entry that omits the code means "the same as the rest", not
    // "dollars".
    const listCurrency = list.find((entry) => entry.currency != null)?.currency;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: className, ...rest, children: [headerNode, (0, jsx_runtime_1.jsx)("ul", { "aria-label": header, className: "flex flex-col", children: list.map((entry, index) => ((0, jsx_runtime_1.jsx)("li", { className: index < list.length - 1 ? 'border-b border-border' : undefined, children: (0, jsx_runtime_1.jsx)(TransactionRowV4_1.TransactionRowV4, { title: entry.title, subtitle: entry.subtitle, amountCents: entry.amountCents, currency: entry.currency ?? listCurrency, direction: entry.direction, date: entry.date, icon: entry.icon, onClick: onSelectItem ? () => onSelectItem(entry, index) : undefined }) }, entry.id ?? String(index)))) })] }));
});
//# sourceMappingURL=StatementListV4.js.map