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
exports.TxListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const market_v4_1 = require("./internal/market-v4");
const TxRowV4_1 = require("./TxRowV4");
/** How many placeholder rows a fetching feed draws. */
const SKELETON_ROWS = 4;
/**
 * **V4 transaction list** — the web twin of the native `TxListV4`, same props
 * as {@link TxList} plus `loading` and `loadingLabel`.
 *
 * ## Three changes
 *
 * 1. **A fetching feed no longer says the wallet is empty.** `TxList` had no
 *    loading state at all, so the moment before the first page arrived it
 *    rendered "No transactions" — indistinguishable from a wallet with no
 *    history, and the worst possible thing to tell someone who has just sent
 *    money. Loading now draws skeleton rows in the shape the feed is about to
 *    take.
 * 2. **`onSelectItem` no longer silently overrides a row's own handler.** The
 *    base wrote `onClick={onSelectItem ? () => onSelectItem(item, index) :
 *    item.onClick}`, so a list-level callback swallowed every per-row one. The
 *    row's own handler wins, and the list's is the fallback.
 * 3. **The list is a list**, with a count in its name and one shared hairline
 *    between rows rather than a border on a wrapper `div`.
 */
exports.TxListV4 = React.forwardRef(function TxListV4({ items, emptyTitle = 'No transactions', emptyDescription, onSelectItem, loading = false, loadingLabel = 'Loading transactions', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    const list = items ?? [];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: Array.from({ length: SKELETON_ROWS }).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md px-md py-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-lg w-[5rem] shrink-0', market_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-2/5', market_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-1/4', market_v4_1.PLACEHOLDER_CLASS) })] }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-[4rem] shrink-0', market_v4_1.PLACEHOLDER_CLASS) })] }, index))) }));
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyTitle, description: emptyDescription }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("ul", { "aria-label": `${list.length} ${list.length === 1 ? 'transaction' : 'transactions'}`, className: "flex flex-col", children: list.map((item, index) => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)(TxRowV4_1.TxRowV4, { ...item, 
                        // The row's own handler wins; the list's is the fallback, not
                        // the override it used to be.
                        onClick: item.onClick ?? (onSelectItem ? () => onSelectItem(item, index) : undefined) }), index < list.length - 1 ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, row_v4_1.rowSeparatorClass)(false) })) : null] }, `${item.hash}-${index}`))) }) }));
});
//# sourceMappingURL=TxListV4.js.map