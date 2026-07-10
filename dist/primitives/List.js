"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = List;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/** Vertical list of leading/title/description/trailing rows — bound to the theme tokens. */
function List({ items, className }) {
    return ((0, jsx_runtime_1.jsx)("ul", { className: (0, cn_1.cn)('divide-y divide-border overflow-hidden rounded-[var(--xen-radius-md)] border border-border', className), children: items.map((it, i) => {
            const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [it.leading != null && (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: it.leading }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm font-medium text-on-surface", children: it.title }), it.description != null && ((0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm text-muted", children: it.description }))] }), it.trailing != null && (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: it.trailing })] }));
            return ((0, jsx_runtime_1.jsx)("li", { children: it.onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: it.onClick, className: "flex w-full items-center gap-3 bg-surface px-4 py-3 text-left transition-colors hover:bg-neutral-50", children: inner })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full items-center gap-3 bg-surface px-4 py-3", children: inner })) }, i));
        }) }));
}
//# sourceMappingURL=List.js.map