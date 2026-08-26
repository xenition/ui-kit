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
exports.AccordionV4 = AccordionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const icon_names_1 = require("./icon-names");
const v4_depth_1 = require("./internal/v4-depth");
const color_1 = require("../theme/color");
const v4_motion_1 = require("./internal/v4-motion");
/**
 * The reveal is a `grid-template-rows: 0fr → 1fr` transition, which is the only
 * way CSS animates to a height it has not been told — no measurement, no
 * `max-height` guess that either clips a long panel or drifts on a short one.
 * The row is `min-height: 0` so the panel can actually collapse.
 *
 * §36.2 puts an enter at 160–240ms; a disclosure is the smaller half of that,
 * and it decelerates, because a panel arriving decelerates (§36.3). `muted` is
 * `neutral[600]` with no contrast promise against `surface`, so both inks are
 * custom properties computed per scheme.
 */
const ACCORDION_V4_CSS = `
[data-xen-v4-accordion-panel] {
  display: grid;
  grid-template-rows: 0fr;
  transition: ${(0, v4_motion_1.transitionCss)(['grid-template-rows'])};
}
[data-xen-v4-accordion-panel][data-open="true"] { grid-template-rows: 1fr; }
[data-xen-v4-accordion-panel] > * { min-height: 0; overflow: hidden; }
[data-xen-v4-accordion-mark] {
  transition: ${(0, v4_motion_1.transitionCss)(['transform'])};
  color: var(--xen-v4-mark-l, var(--xen-muted));
}
[data-theme="dark"] [data-xen-v4-accordion-mark] { color: var(--xen-v4-mark-d, var(--xen-muted)); }
[data-xen-v4-accordion-mark][data-open="true"] { transform: rotate(180deg); }
[data-xen-v4-accordion-body] { color: var(--xen-muted-text); }
[data-xen-v4-accordion-header]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: -2px;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-accordion-panel],
  [data-xen-v4-accordion-mark] { transition: none; }
}
`;
/**
 * **V4 accordion** — the web twin of the native `AccordionV4`, same props as
 * {@link Accordion}, a different design line.
 *
 * A disclosure is a motion component whose motion was an afterthought.
 *
 * 1. **The panel opens; it does not appear.** The base mounted and unmounted
 *    the body, so the only animated thing on the whole control was a chevron
 *    turning next to content that had already popped into place. V4 animates
 *    the height itself with `grid-template-rows: 0fr → 1fr` — the technique
 *    that needs no measurement and no `max-height` guess — so the marker and
 *    the content move together (§36.1, §36.5: spatial continuity).
 * 2. **The curve matches the action.** A panel arriving decelerates (§36.3),
 *    and both the height and the chevron run on the same ease-out over the same
 *    180ms, so one gesture reads as one movement.
 * 3. **Reduced motion is respected.** The base's bare `transition-transform`
 *    ran regardless of the OS switch. Both transitions now drop under
 *    `prefers-reduced-motion` and the state change is instant (§36.10).
 * 4. **The panel is a panel, and the header opens it.** There was no
 *    `aria-controls`, no `id`, and no region: a screen reader heard a button
 *    that expanded something unnamed. Each header now points at its panel, and
 *    the panel names itself back.
 * 5. **A real target and a real focus ring.** `py-3` made a roughly 40px row,
 *    under the 44 a finger needs, and nothing at all marked the focused header.
 *
 * The chevron comes from the kit's named icon set rather than a `▾` typed into
 * this file, and both muted inks are re-measured — `muted` is `neutral[600]`,
 * and the compiler guarantees the on-pairs, not that one. Padding is on the
 * spacing scale: `px-4 py-3` was 16/12 against native's 24/16.
 *
 * No fill, no gradient, no shadow. An accordion is a list with rules between
 * its rows (§11), and §35.11 keeps the sweep for the hero and the one action.
 */
function AccordionV4({ items, type = 'single', defaultValue = [], className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-accordion-styles', ACCORDION_V4_CSS);
    const theme = (0, v4_depth_1.useOptionalCompiledTheme)();
    const reactId = React.useId();
    const [open, setOpen] = React.useState(defaultValue);
    const toggle = (v) => setOpen((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : type === 'single' ? [v] : [...prev, v]);
    const vars = {};
    if (theme !== null) {
        // A chevron is a UI mark, judged at 3:1 rather than as text.
        vars['--xen-v4-mark-l'] = (0, color_1.ensureContrast)(theme.light.muted, theme.light.surface, 3);
        vars['--xen-v4-mark-d'] = (0, color_1.ensureContrast)(theme.dark.muted, theme.dark.surface, 3);
    }
    return ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-accordion": "", className: (0, cn_1.cn)('divide-y divide-border overflow-hidden rounded-[var(--xen-radius-md)] border border-border', className), style: vars, children: items.map((it) => {
            const isOpen = open.includes(it.value);
            const headerId = `${reactId}-${it.value}-header`;
            const panelId = `${reactId}-${it.value}-panel`;
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", id: headerId, "data-xen-v4-accordion-header": "", "aria-expanded": isOpen, "aria-controls": panelId, onClick: () => toggle(it.value), className: (0, cn_1.cn)('flex w-full items-center justify-between gap-sm px-lg py-md text-left', 'min-h-[44px] font-body text-sm font-semibold text-on-surface', 'focus-visible:outline-none'), children: [it.title, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-v4-accordion-mark": "", "data-open": isOpen ? 'true' : 'false', className: "ml-sm shrink-0", children: (0, icon_names_1.resolveIconGlyph)('chevron-down') })] }), (0, jsx_runtime_1.jsx)("div", { id: panelId, role: "region", "aria-labelledby": headerId, "data-xen-v4-accordion-panel": "", "data-open": isOpen ? 'true' : 'false', children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-accordion-body": "", className: "px-lg pb-md font-body text-sm", ...(isOpen ? {} : { inert: '' }), children: it.content }) }) })] }, it.value));
        }) }));
}
//# sourceMappingURL=AccordionV4.js.map