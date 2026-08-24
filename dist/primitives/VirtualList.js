"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualList = VirtualList;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/**
 * Web parity of the native `VirtualList`. NOTE: this is **not** truly virtualized
 * — it takes no windowing dependency. It is a plain overflow-auto scroll
 * container with a `max-height` cap, so every row renders. It keeps the native
 * API (`data`/`renderItem`/`keyExtractor`/`separators`/`emptyText`/`loading`) so
 * call sites port over; swap in a windowing lib later without changing props. All
 * colors come from the `--xen-*` tokens via Tailwind classes — no literal colors.
 */
function VirtualList({ className, data, renderItem, keyExtractor, estimatedItemSize, separators = true, emptyText = 'Nothing here yet', loading = false, maxHeight = 480, ...rest }) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex items-center justify-center p-6', className), ...rest, children: (0, jsx_runtime_1.jsx)("span", { role: "status", "aria-label": "Loading", className: "inline-block h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-primary" }) }));
    }
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('bg-surface p-6 text-center text-sm text-muted', className), ...rest, children: emptyText }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { role: "list", className: (0, cn_1.cn)('bg-surface overflow-auto', separators && 'divide-y divide-border', className), style: { maxHeight }, ...rest, children: data.map((item, index) => ((0, jsx_runtime_1.jsx)("div", { role: "listitem", style: estimatedItemSize != null ? { minHeight: estimatedItemSize } : undefined, children: renderItem(item, index) }, keyExtractor ? keyExtractor(item, index) : String(index)))) }));
}
//# sourceMappingURL=VirtualList.js.map