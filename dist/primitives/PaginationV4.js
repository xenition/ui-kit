"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationV4 = PaginationV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const nav_v4_1 = require("./internal/nav-v4");
/**
 * The pages to show: first, last, the current one and `siblingCount` either
 * side, with `'ellipsis'` wherever a run was skipped. Same truncation as the
 * base component — the arithmetic of "where am I in this list" is not a design
 * decision and should not differ between design lines.
 */
function pageItems(page, pageCount, siblingCount) {
    const wanted = new Set([1, pageCount]);
    for (let i = page - siblingCount; i <= page + siblingCount; i++) {
        if (i >= 1 && i <= pageCount)
            wanted.add(i);
    }
    const items = [];
    let previous = 0;
    for (const p of Array.from(wanted).sort((a, b) => a - b)) {
        if (p - previous > 1)
            items.push('ellipsis');
        items.push(p);
        previous = p;
    }
    return items;
}
/**
 * **V4 pagination** — the web twin of the native `PaginationV4`, same props as
 * {@link Pagination}, a different design line.
 *
 * ## One page is filled; nothing else has chrome
 *
 * §32 asks the user to recognise where they are rather than reconstruct it, and
 * in a row of numbers the only thing that can carry that is a **contained
 * fill**. The current page gets `bg-primary` with its guaranteed `on-primary`
 * and weight 600; every other cell is plain `text-on-surface` with no ground,
 * no border and no tint until it is hovered. That contrast is what makes the
 * answer findable in a glance — one filled shape in a row of bare numerals —
 * and it is the hierarchy §5 asks for, applied to a component that had none.
 *
 * The hover ground is mixed from `--xen-border` instead of `bg-neutral-100`,
 * so it is a hairline's worth of contrast in both schemes rather than a fixed
 * grey that happens to invert, and it is suppressed on the current page: a
 * filled cell does not need to react to a pointer to say what it is.
 *
 * The ellipsis stays `muted`: it is a gap marker, not a page, and a reader
 * should never spend a fixation deciding whether it is one.
 *
 * ## Reach — the change that actually matters
 *
 * The base cell was `h-8 min-w-8` — **32 × 32**, hard-coded. That is not a tap
 * target on any platform (§30, §46), and this is a component whose entire
 * surface area is targets sitting side by side, so a miss lands on the wrong
 * page rather than on nothing. Every cell is now 44 × 44, composed from the
 * spacing scale — the same expression `ButtonV4` and every other V4 navigation
 * control uses.
 *
 * Each number also carries an `aria-label` of its own. A screen reader
 * announcing "3, button" tells you nothing; "Page 3" tells you everything, and
 * the base had it on native and not on web.
 */
function PaginationV4({ page, pageCount, onPageChange, siblingCount = 1, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    if (pageCount <= 1)
        return null;
    const items = pageItems(page, pageCount, siblingCount);
    const cellClass = (current) => (0, cn_1.cn)('inline-flex items-center justify-center rounded-[var(--xen-radius-md)] px-xs', 'font-body text-sm focus-visible:outline-none', 'disabled:pointer-events-none disabled:text-muted-text disabled:opacity-[0.38]', nav_v4_1.MIN_TAP_SQUARE_CLASS, 
    // Exactly one cell in the row is filled; the rest are bare numerals.
    current ? 'bg-primary font-semibold text-on-primary' : 'font-medium text-on-surface');
    return ((0, jsx_runtime_1.jsxs)("nav", { "aria-label": "Pagination", className: (0, cn_1.cn)('flex items-center gap-xs', className), children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-nav-item": "", "aria-label": "Previous", disabled: page <= 1, onClick: () => onPageChange(page - 1), className: cellClass(false), children: "\u2039" }), items.map((item, index) => item === 'ellipsis' ? ((0, jsx_runtime_1.jsx)("span", { className: "px-xs text-sm text-muted-text", children: "\u2026" }, `ellipsis-${index}`)) : ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-nav-item": "", "aria-label": `Page ${item}`, "aria-current": item === page ? 'page' : undefined, onClick: () => onPageChange(item), className: cellClass(item === page), children: item }, `page-${item}`))), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-nav-item": "", "aria-label": "Next", disabled: page >= pageCount, onClick: () => onPageChange(page + 1), className: cellClass(false), children: "\u203A" })] }));
}
//# sourceMappingURL=PaginationV4.js.map