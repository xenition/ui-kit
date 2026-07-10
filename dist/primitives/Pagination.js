"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = Pagination;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/** Page navigation bound to the theme tokens, with ellipsis truncation. */
function Pagination({ page, pageCount, onPageChange, siblingCount = 1, className, }) {
    if (pageCount <= 1)
        return null;
    const wanted = new Set([1, pageCount]);
    for (let i = page - siblingCount; i <= page + siblingCount; i++) {
        if (i >= 1 && i <= pageCount)
            wanted.add(i);
    }
    const sorted = Array.from(wanted).sort((a, b) => a - b);
    const items = [];
    let prev = 0;
    for (const p of sorted) {
        if (p - prev > 1)
            items.push('ellipsis');
        items.push(p);
        prev = p;
    }
    const btn = 'inline-flex h-8 min-w-8 items-center justify-center rounded-[var(--xen-radius-sm)] px-2 text-sm transition-colors';
    const nav = (0, cn_1.cn)(btn, 'text-on-surface hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40');
    return ((0, jsx_runtime_1.jsxs)("nav", { className: (0, cn_1.cn)('flex items-center gap-1', className), "aria-label": "Pagination", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: nav, disabled: page <= 1, onClick: () => onPageChange(page - 1), "aria-label": "Previous", children: "\u2039" }), items.map((it, i) => it === 'ellipsis' ? ((0, jsx_runtime_1.jsx)("span", { className: "px-1 text-muted", children: "\u2026" }, `e${i}`)) : ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-current": it === page ? 'page' : undefined, className: (0, cn_1.cn)(btn, it === page ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-neutral-100'), onClick: () => onPageChange(it), children: it }, it))), (0, jsx_runtime_1.jsx)("button", { type: "button", className: nav, disabled: page >= pageCount, onClick: () => onPageChange(page + 1), "aria-label": "Next", children: "\u203A" })] }));
}
//# sourceMappingURL=Pagination.js.map