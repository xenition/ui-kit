"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomNavV4 = BottomNavV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const nav_v4_1 = require("./internal/nav-v4");
const surface_v4_1 = require("./internal/surface-v4");
/**
 * **V4 bottom navigation** — the web twin of the native `BottomNavV4`, same
 * props as {@link BottomNav}, a different design line.
 *
 * ## The selected state is a shape, not just a colour
 *
 * The base bar said "you are here" with one channel: the label went from
 * `text-muted-text` to `text-primary`. That is the weakest possible answer to §29's
 * question, and it fails twice over — `primary` is a FILL slot with no contrast
 * promise as text, and a colour-only signal is invisible to a good share of
 * readers.
 *
 * V4 says it three ways. A **contained fill** sits behind the active icon —
 * `primary` mixed OPAQUELY into `surface` at 14%, so it is a real colour rather
 * than a translucent one borrowing whatever is behind the bar. The label moves
 * to `primary-text`, the compiler's brand hue walked until it clears AA. And
 * the weight goes to 600. Any one of the three read on its own is enough to
 * answer the question (§32).
 *
 * The fill is the one place this component is allowed a capsule. §8 bans
 * *excessive* pill-shaped controls; here the pill is the smallest shape that
 * can hold an icon without looking like a button, and it defers to the seed —
 * `--xen-radius-full` is 0 on a `sharp` brand.
 *
 * ## Why the bar has a shadow, and why it points up
 *
 * A bottom bar genuinely floats above scrolling content, so
 * `--xen-elevation-sheet` is layer order made visible rather than decoration.
 * Its offset is NEGATIVE — the compiler built it for a sheet rising from the
 * bottom edge — which is exactly the direction a bottom bar's shadow has to
 * fall: onto the content passing underneath it. A `depth: 'flat'` seed zeroes
 * it with no branch here, and the top hairline still separates bar from page.
 *
 * Glass is the one thing that must be asked for, because the compiler never
 * neutralises it: at `depth: 'glass'` the bar becomes translucent with a real
 * `backdrop-filter` and its hairline switches to the glass edge — the only
 * treatment where content scrolling under a nav bar is a feature.
 *
 * ## Reach and safe areas
 *
 * Every cell clears 44px, composed from the spacing scale, and the viewport's
 * bottom safe-area inset is added underneath so the bar clears an iOS home
 * indicator instead of sitting under it (§30). The base bar did neither.
 */
function BottomNavV4({ items, active, onChange, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    const glassy = (0, surface_v4_1.useDepth)() === 'glass';
    return ((0, jsx_runtime_1.jsx)("nav", { role: "tablist", "data-xen-v4-nav-bar": glassy ? 'glass' : '', className: (0, cn_1.cn)('fixed inset-x-0 bottom-0 z-40 flex w-full border-t border-border pt-xs', 'pb-[calc(var(--xen-space-xs)_+_env(safe-area-inset-bottom))]', className), children: items.map((item) => {
            const selected = item.key === active;
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "tab", "data-xen-v4-nav-item": "", "aria-selected": selected, "aria-label": item.label, onClick: () => onChange(item.key), className: (0, cn_1.cn)('flex flex-1 flex-col items-center justify-center gap-[calc(var(--xen-space-xs)/2)]', 'font-body text-xs focus-visible:outline-none', nav_v4_1.MIN_TAP_CLASS, 
                // `primary-text`, not `primary`: the base used the FILL slot as
                // text, which carries no contrast promise on a surface.
                selected ? 'font-semibold text-primary-text' : 'font-medium text-muted-text'), children: [item.icon != null && ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-nav-pill": selected ? '' : undefined, className: (0, cn_1.cn)('inline-flex min-w-xl items-center justify-center rounded-[var(--xen-radius-full)]', 'px-sm py-[calc(var(--xen-space-xs)/2)]'), children: item.icon })), (0, jsx_runtime_1.jsx)("span", { className: "max-w-full truncate", children: item.label })] }, item.key));
        }) }));
}
//# sourceMappingURL=BottomNavV4.js.map