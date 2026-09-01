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
exports.TagFilterBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * A selected chip's paired ink, as a custom property.
 *
 * `TONE_VAR` already gives the fill; the state layer needs the **ink** as a
 * variable too, so the layer it mixes is the chip's own content colour over the
 * chip's own ground rather than the page's. Same six rows as `TONE_ON`, in the
 * one spelling `color-mix()` can read.
 */
const TONE_ON_VAR = {
    neutral: 'var(--xen-on-surface)',
    primary: 'var(--xen-on-primary)',
    accent: 'var(--xen-on-accent)',
    success: 'var(--xen-on-success)',
    warn: 'var(--xen-on-warn)',
    danger: 'var(--xen-on-danger)',
};
/**
 * **V4 tag filter bar** — the web twin of the native `TagFilterBarV4`, same
 * props as {@link TagFilterBar} plus `formatFilterLabel`.
 *
 * ## Five changes
 *
 * 1. **A selected chip is readable, on both twins.** Native filled with
 *    `colors[tone]` and inked with `colors.onSurface` for every tone but
 *    `primary` and `accent` — body ink on a saturated brand fill, with no
 *    contrast promise anywhere in it — and `neutral` filled the chip with
 *    `colors.muted`, a **text** token. The fill and its ink now come from one
 *    table, so they can never disagree about which tone they are.
 * 2. **The idle chip's ground is opaque.** Web painted a `bg-neutral-100` ramp
 *    step and native a translucent wash whose rendered colour depended on
 *    whatever the caller put behind the bar.
 * 3. **The chips and the Clear control clear 44**, and Clear is a real button
 *    with a border rather than a word of red text floating in the row.
 * 4. **The count joins the chip's name.** It was drawn and never announced, so
 *    a reader could not tell a filter with 40 matches from one with none.
 * 5. **Selection is announced once.** The base said `aria-pressed` *and*
 *    appended ", selected" to the label, so a screen reader said it twice.
 *
 * Rule B applies throughout: a press is the M3 state layer, not an opacity.
 */
exports.TagFilterBarV4 = React.forwardRef(function TagFilterBarV4({ tags, selected, onToggle, onClear, tone = 'primary', emptyLabel = 'No filters', formatFilterLabel, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const list = tags ?? [];
    const active = selected ?? [];
    const spellLabel = formatFilterLabel ?? ((label, count) => (count != null ? `${label}, ${count}` : label));
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-label": emptyLabel, className: (0, cn_1.cn)('py-sm text-sm text-muted-text', className), ...rest, children: emptyLabel }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full items-center gap-xs overflow-x-auto', className), ...rest, children: [list.map((tag) => {
                const isOn = active.includes(tag.key);
                return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": isOn, "aria-label": spellLabel(tag.label, tag.count), onClick: () => onToggle(tag.key), "data-xen-v4-state": "", style: 
                    // A selected chip wears its tone's pair, so its press layer is
                    // that tone's ink over that tone's fill — not `on-surface` over
                    // the page, which is a layer for a ground the chip is not on.
                    (0, v4_state_1.stateGroundVars)(isOn ? tone_v4_1.TONE_VAR[tone] : 'var(--xen-card)', isOn ? TONE_ON_VAR[tone] : 'var(--xen-on-card)'), className: (0, cn_1.cn)('inline-flex shrink-0 items-center gap-xs rounded-[var(--xen-radius-full)] border px-sm py-xs text-sm', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS, isOn
                        ? // One table decides the fill and the ink together, so the
                            // pair is the compiler's guaranteed one for this tone.
                            (0, cn_1.cn)(tone_v4_1.TONE_BG[tone], crm_v4_1.TONE_ON[tone], 'border-transparent font-bold')
                        : // Opaque, and the raised slot rather than a ramp step.
                            'border-border bg-card text-on-card font-medium'), children: [isOn ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-bold", children: "\u2713" })) : null, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: tag.label }), tag.count != null ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs font-semibold", children: tag.count })) : null] }, tag.key));
            }), onClear && active.length > 0 ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Clear filters", onClick: onClear, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)('inline-flex shrink-0 items-center rounded-[var(--xen-radius-full)] border border-border bg-card px-sm py-xs text-sm font-semibold', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS, (0, crm_v4_1.toneInkClass)('danger')), children: "Clear" })) : null] }));
});
//# sourceMappingURL=TagFilterBarV4.js.map