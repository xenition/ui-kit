"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListV4 = ListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const v4_data_1 = require("./internal/v4-data");
/**
 * **V4 list** — the web twin of the native `ListV4`, same props as
 * {@link List}, a different design line.
 *
 * The base list puts `divide-y` between every pair of rows, gives the title
 * and the description the same `text-sm`, and hovers with `bg-neutral-50`.
 * That is three problems with one cause: structure is being drawn instead of
 * typeset, and the ink it is drawn with came from the wrong ramp.
 *
 * Three changes:
 *
 * 1. **Typography carries the hierarchy.** The title steps up to `text-base`
 *    semibold; the description drops to `text-xs` and stays muted. §10 asks
 *    for size, weight and contrast before containers and dividers, and a title
 *    bigger than its description does not need a line under the row to say
 *    where the row ends.
 * 2. **No divider between rows.** The gap between one row's description and
 *    the next row's title is the full vertical padding of both — many times
 *    the gap inside a row — so the grouping is already unambiguous. §9:
 *    spacing IS the structure. What is left is the one border around the list,
 *    because a list is a single object and earns a container (§11).
 * 3. **Hover follows the scheme, and tints rather than lifts.**
 *    `bg-neutral-50` is the light-oriented ramp — under `[data-theme="dark"]`
 *    the emitted var mirrors to the far end and the hover becomes a near-white
 *    slab across a dark row. V4 mixes `--xen-on-surface` into `--xen-surface`,
 *    which darkens a light row and lightens a dark one with no dark rule to
 *    keep in step. The same rule arms `:focus-visible`, so a keyboard sees
 *    what a pointer sees.
 *
 * Every row keeps the `2xl` minimum height the rest of the V4 line uses, so a
 * pressable row is a real target. Nothing gains a shadow: a list row that
 * lifts is a card, and a stack of cards inside a bordered list is exactly the
 * "cards inside cards inside cards" §8 bans.
 */
function ListV4({ items, className }) {
    (0, inject_1.injectStyleOnce)(v4_data_1.V4_ROW_STYLE_ID, v4_data_1.V4_ROW_CSS);
    return ((0, jsx_runtime_1.jsx)("ul", { className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-surface', className), children: items.map((it, i) => {
            const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [it.leading != null && (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: it.leading }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-base font-semibold text-on-surface", children: it.title }), it.description != null && ((0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted-text", children: it.description }))] }), it.trailing != null && (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: it.trailing })] }));
            // No `divide-y`: the gap between rows already says where one ends (§9).
            const row = 'flex w-full items-center gap-[var(--xen-space-md)] bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-left min-h-[var(--xen-space-2xl)]';
            return ((0, jsx_runtime_1.jsx)("li", { children: it.onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-row": "", "data-interactive": "true", onClick: it.onClick, className: (0, cn_1.cn)(row, 'transition-colors'), children: inner })) : ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-row": "", "data-interactive": "false", className: row, children: inner })) }, i));
        }) }));
}
//# sourceMappingURL=ListV4.js.map