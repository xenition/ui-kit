"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineV4 = TimelineV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
/**
 * Tone → dot fill.
 *
 * One correction against the base map: `neutral` was `bg-neutral-300`, a ramp
 * step. The emitted `--xen-neutral-300` carries the LIGHT orientation and is
 * mirrored under `[data-theme="dark"]`, so a neutral dot drifted with the
 * scheme instead of staying "present but quiet". `bg-muted` is the semantic
 * slot that means exactly that, and it is contrast-checked in both schemes.
 */
const DOT = {
    primary: 'bg-primary',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    neutral: 'bg-muted',
};
/**
 * **V4 timeline** — the web twin of the native `TimelineV4`, same props as
 * {@link Timeline}, a different design line.
 *
 * A timeline is scanned by **when**, then read for **what**. The base puts the
 * time last, in the same muted register as the description, so the one field
 * the eye is hunting for is the least findable thing in the item and sits
 * below the text it is supposed to stamp.
 *
 * Four changes:
 *
 * 1. **The time leads.** It moves above the title, muted and in tabular
 *    figures, so the times form a straight column the eye runs down — the
 *    landmark §33 asks for. Tabular figures matter more here than anywhere:
 *    `09:05` and `11:42` only line up if the digits are the same width.
 * 2. **The title outranks the description.** `text-base` semibold against
 *    `text-xs` muted. The base set both at `text-sm` and separated them by
 *    colour alone (§10 — hierarchy through size and weight, not just
 *    contrast).
 * 3. **The rail is continuous.** The base put `pb-6` on the whole `<li>`, so
 *    the connector stopped above the padding and every item was fenced off by
 *    a gap in its own thread. Moving the padding to the content column lets
 *    the rail run dot-to-dot, which is what makes a timeline read as one
 *    sequence instead of a stack of blocks.
 * 4. **The dot is a token.** `h-2.5 w-2.5 mt-1` were Tailwind's own scale;
 *    they come off the theme's spacing scale now, so a seed that changes the
 *    scale changes the timeline with it.
 *
 * **No depth, no container.** An activity feed is the classic place to wrap
 * each entry in a card, and §11 asks what that container would be for: the
 * rail already groups the items and the gaps already separate them.
 */
function TimelineV4({ items, className }) {
    return ((0, jsx_runtime_1.jsx)("ol", { className: (0, cn_1.cn)('flex flex-col', className), children: items.map((it, i) => {
            const last = i === items.length - 1;
            return ((0, jsx_runtime_1.jsxs)("li", { className: "flex gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-sm flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-xs h-sm w-sm shrink-0 rounded-[var(--xen-radius-full)]', DOT[it.tone ?? 'primary']) }), !last && (0, jsx_runtime_1.jsx)("span", { className: "w-px flex-1 bg-border" })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('min-w-0 flex-1', last ? 'pb-0' : 'pb-[var(--xen-space-lg)]'), children: [it.time != null && ((0, jsx_runtime_1.jsx)("div", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: it.time })), (0, jsx_runtime_1.jsx)("div", { className: "text-base font-semibold text-on-surface", children: it.title }), it.description != null && (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-muted-text", children: it.description })] })] }, i));
        }) }));
}
//# sourceMappingURL=TimelineV4.js.map