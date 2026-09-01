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
exports.NewsTickerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TagV4_1 = require("../primitives/TagV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const reading_v4_1 = require("./internal/reading-v4");
/** How many placeholder headlines a loading ticker draws. */
const SKELETON_ITEMS = 3;
/**
 * The eyebrow's tone, as a `Tag` tone.
 *
 * `Tag` resolves every tone to a fill and the ink the compiler guaranteed
 * *against that fill*, so the chip is never a hand-paired background and
 * foreground — which is how the native twin draws it too. `ToneV4` carries a
 * `muted` that `Tag` does not; both mean "no status", and the shared tone
 * table already resolves the pair to the same ink.
 */
const CHIP_TONE = {
    muted: 'neutral',
    neutral: 'neutral',
    primary: 'primary',
    accent: 'accent',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * One headline. A `<button>` on both twins when there is a handler, plain text
 * when there is not — the base said `button` on web and `link` on native for
 * the same prop.
 */
function HeadlineV4({ item, onItemClick, clamp, }) {
    const text = (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-on-surface', clamp), children: item.text });
    if (!onItemClick)
        return text;
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onItemClick(item.id), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('flex min-w-0 shrink items-center rounded-[var(--xen-radius-sm)] px-xs text-left', 
        // The HIG floor, composed from the spacing scale — not a typed 44.
        chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: text }));
}
/**
 * **V4 news ticker** — the web twin of the native `NewsTickerV4`, same props as
 * {@link NewsTicker} plus `loadingLabel`, `regionLabel` and `labelTone`.
 *
 * ## Six changes
 *
 * 1. **The eyebrow stops being `danger`.** `label` is caller copy, documented
 *    as "`LIVE`" or "`BREAKING`" — so a section name, an editorial rubric or a
 *    sponsor tag came out in the colour that means *something has gone wrong*.
 *    It defaults to `neutral` now; red is a decision a caller makes.
 * 2. **Loading draws the ticker's skeleton.** The base parameterised
 *    `emptyLabel` and then hard-coded `'Loading headlines…'` two lines later,
 *    collapsing the strip to one text line that then reflowed to N headlines.
 *    The string survives as the busy region's name.
 * 3. **The region is named on both twins**, with the same role — native had no
 *    label at all.
 * 4. **A headline is the same control on both twins** (web said `button`,
 *    native said `link`) and clears 44.
 * 5. **The scroller is keyboard reachable.** A horizontally scrolling strip
 *    that only a pointer can move is unreachable content.
 * 6. **Press is the state layer**, not `hover:opacity-70`.
 */
exports.NewsTickerV4 = React.forwardRef(function NewsTickerV4({ items, label = 'LIVE', onItemClick, variant = 'scroll', loading = false, emptyLabel = 'No headlines', loadingLabel = 'Loading headlines…', regionLabel = 'Latest headlines', labelTone = 'neutral', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const scroll = variant === 'scroll';
    const shell = (children, busy) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "region", "aria-label": busy ? loadingLabel : regionLabel, "aria-busy": busy || undefined, className: (0, cn_1.cn)('gap-sm rounded-[var(--xen-radius-md)] border border-border bg-surface px-md py-sm', scroll ? 'flex items-center' : 'flex flex-col items-stretch', className), ...rest, children: [label != null ? ((0, jsx_runtime_1.jsx)(TagV4_1.TagV4, { tone: CHIP_TONE[labelTone], variant: "solid", size: "sm", className: "shrink-0 self-center font-bold tracking-wide", children: label })) : null, children] }));
    if (loading) {
        return shell(
        // The shape it is about to be, so the strip does not jump when the
        // headlines land.
        (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex flex-1 gap-sm', scroll ? 'items-center' : 'flex-col items-stretch'), children: Array.from({ length: SKELETON_ITEMS }).map((_, index) => ((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", className: (0, cn_1.cn)('h-[var(--xen-text-sm)]', scroll ? 'w-1/3' : 'w-full') }, index))) }), true);
    }
    if (items.length === 0) {
        return shell((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', reading_v4_1.TONE_INK.muted), children: emptyLabel }), false);
    }
    if (!scroll) {
        return shell((0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 flex-col gap-xs", children: items.map((item) => ((0, jsx_runtime_1.jsx)(HeadlineV4, { item: item, onItemClick: onItemClick, clamp: "line-clamp-2" }, item.id))) }), false);
    }
    return shell((0, jsx_runtime_1.jsx)("div", { 
        // A strip that overflows and cannot be scrolled from the keyboard is
        // content nobody without a pointer can reach.
        tabIndex: 0, className: (0, cn_1.cn)('flex flex-1 items-center gap-sm overflow-x-auto', 'rounded-[var(--xen-radius-sm)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: items.map((item, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [index > 0 ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: reading_v4_1.TONE_INK.muted, children: "\u00B7" })) : null, (0, jsx_runtime_1.jsx)(HeadlineV4, { item: item, onItemClick: onItemClick, clamp: "whitespace-nowrap" })] }, item.id))) }), false);
});
//# sourceMappingURL=NewsTickerV4.js.map