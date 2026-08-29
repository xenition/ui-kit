"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentedV4 = SegmentedV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const nav_v4_1 = require("./internal/nav-v4");
/**
 * **V4 segmented control** — the web twin of the native `SegmentedV4`, same
 * props as {@link Segmented}, a different design line.
 *
 * ## One thumb, and it travels
 *
 * The base control repainted a background on whichever segment was selected:
 * the fill blinked out here and in there, two events for one change. V4 has a
 * single absolutely-positioned thumb that **slides** — §36.5, continuity of
 * position, and the reason this control feels like a physical switch rather
 * than a row of buttons that happen to share a box. The transition is dropped
 * under `prefers-reduced-motion` (§36.10), and with no layout engine at all —
 * jsdom, SSR — the thumb is simply not rendered and the labels' colour and
 * weight carry the state on their own.
 *
 * ## Why this one is allowed to be a pill
 *
 * `design.md` §8 lists "excessive pill-shaped controls" among the tells of
 * generic AI UI. A segmented control is the exception the word *excessive* is
 * there for: the capsule is not decoration applied to a control, it IS the
 * control — the shape is how a user recognises "pick exactly one of these"
 * before reading a single label (§32). It still defers to the seed:
 * `--xen-radius-full` is 0 on a `sharp` brand, so a sharp app gets a sharp
 * switch rather than the capsule being smuggled in over a design decision.
 *
 * ## Depth, and the rail it replaced
 *
 * The base rail was `bg-neutral-100`, a raw ramp step — which the dark block
 * re-emits inverted, so it happened to work, by accident, and would stop the
 * moment a component reached one step further. V4's rail is `border` mixed
 * into `surface`: two semantic slots the compiler re-derives per scheme, so
 * the rail is a rail in both by construction. The thumb takes
 * `--xen-elevation-card`, the smallest of the three, because it has lifted by
 * exactly the height of a thumb — and it is zero under a `depth: 'flat'` seed
 * with no branch anywhere here.
 *
 * ## Reach
 *
 * Each segment is a full 44px target composed from the spacing scale. The base
 * control was `py-1` around a 14px label — around 22px, half a target, on the
 * control people click most often per screen.
 */
function SegmentedV4({ options, value, onChange, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS);
    const indicator = (0, nav_v4_1.useMovingIndicator)(value, options.length);
    return ((0, jsx_runtime_1.jsxs)("div", { role: "tablist", "data-xen-v4-nav-rail": "", className: (0, cn_1.cn)('relative inline-flex rounded-[var(--xen-radius-full)] p-xs', className), children: [indicator.style !== null && ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-nav-indicator": "", "data-xen-v4-nav-thumb": "", "aria-hidden": "true", className: "absolute inset-y-xs left-0 rounded-[var(--xen-radius-full)]", style: indicator.style })), options.map((option) => {
                const active = option.value === value;
                return ((0, jsx_runtime_1.jsx)("button", { ref: indicator.itemRef(option.value), type: "button", role: "tab", "data-xen-v4-nav-item": "", "aria-selected": active, onClick: () => onChange(option.value), className: (0, cn_1.cn)('relative inline-flex items-center justify-center whitespace-nowrap px-lg', 'rounded-[var(--xen-radius-full)] font-body text-sm focus-visible:outline-none', nav_v4_1.MIN_TAP_CLASS, 
                    // `on-surface` on the thumb, `muted` on the rail — the same pair
                    // the thumb's own fill is guaranteed against.
                    active ? 'font-semibold text-on-surface' : 'font-medium text-muted-text'), children: option.label }, option.value));
            })] }));
}
//# sourceMappingURL=SegmentedV4.js.map