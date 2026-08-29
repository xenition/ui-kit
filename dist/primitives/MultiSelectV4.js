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
exports.MultiSelectV4 = MultiSelectV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const v4_state_1 = require("./internal/v4-state");
const cn_1 = require("./cn");
const useDismiss_1 = require("./useDismiss");
const field_v4_1 = require("./internal/field-v4");
/** How much brand a chip carries. Chosen, not filled. */
const CHIP_MIX = 14;
const MULTISELECT_V4_CSS = `
[data-xen-v4-chip] {
  background-color: color-mix(in srgb, var(--xen-primary) ${CHIP_MIX}%, var(--xen-surface));
  color: var(--xen-primary-text);
}
[data-xen-v4-listbox] {
  background-color: var(--xen-surface);
  box-shadow: var(--xen-elevation-sheet);
}
/*
  An option under the pointer takes the shared state layer, not a brand tint at
  a hand-picked 8%: the chip is the only thing in this control that gets to be
  brand-coloured, and hovering an option is not choosing it.
*/
[data-xen-v4-option]:hover {
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-on-surface)', 'var(--xen-surface)', 'hover')};
}
`;
/**
 * **V4 multi-select** — the same props as {@link MultiSelect}, a different
 * design line.
 *
 * The trigger is a **field**: it takes `FIELD_V4_SHELL`, which is the same
 * height, radius and padding `InputV4` and `SelectV4` take, from the same
 * shared constant. A form whose controls disagree about their own height reads
 * as parts that happened to land near each other; matching them is the cheapest
 * quality signal a kit has (§13).
 *
 * Three things changed beyond the metrics:
 *
 * 1. **The chips are not a second brand colour.** The base fills every chip
 *    with `bg-accent`, which puts the brand's secondary hue on screen once per
 *    selection — §35.5 asks for a limited number of simultaneous accents and
 *    §35.2 says the accent is for emphasis, not repetition. A V4 chip is a 14%
 *    brand tint mixed into `surface`, labelled in `--xen-primary-text`, which
 *    is the contrast-safe text form the compiler measured against `surface`.
 * 2. **The chips are not pills.** `--xen-radius-sm` from the seed, so a `sharp`
 *    brand gets square chips. §8 lists excessive pill-shaped controls among the
 *    tells of generic AI UI, and a row of capsules is exactly that shape.
 * 3. **The popover is a layer, and its rows are not.** It carries
 *    `--xen-elevation-sheet` instead of Tailwind's `shadow-lg`, so a
 *    `depth: 'flat'` seed flattens it for free; the hovered row is a token mix
 *    rather than `bg-neutral-100`, which keeps its light-mode orientation under
 *    `[data-theme="dark"]` and lit up as a pale bar on a dark page (§35.9).
 *
 * Focus is the shared V4 halo, drawn with `box-shadow` so arming it costs no
 * layout (§36.11), and `invalid` retints the border and the ring from one flag.
 */
function MultiSelectV4({ options, value = [], onChange, placeholder = 'Select…', invalid = false, disabled = false, accessibilityLabel, className, }) {
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    (0, inject_1.injectStyleOnce)('xen-v4-multiselect-styles', MULTISELECT_V4_CSS);
    const [open, setOpen] = React.useState(false);
    const ref = (0, useDismiss_1.useDismiss)(open, () => setOpen(false));
    const chosen = options.filter((o) => value.includes(o.value));
    const toggle = (v) => {
        onChange?.(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative w-full', className), children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", "data-xen-v4-field": "", "aria-label": accessibilityLabel, "aria-haspopup": "listbox", "aria-expanded": open, "aria-invalid": invalid || undefined, disabled: disabled, onClick: () => setOpen((o) => !o), className: (0, cn_1.cn)(field_v4_1.FIELD_V4_SHELL, (0, field_v4_1.fieldBorderClass)(invalid), 'flex items-center justify-between gap-sm py-xs text-left'), style: (0, field_v4_1.fieldRingVars)(invalid), children: [chosen.length === 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-muted-text", children: placeholder })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex flex-1 flex-wrap gap-xs", children: chosen.map((o) => ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-chip": "", className: "rounded-[var(--xen-radius-sm)] px-sm text-sm font-medium", children: o.label }, o.value))) })), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-sm text-muted-text", children: "\u25BE" })] }), open ? ((0, jsx_runtime_1.jsx)("div", { role: "listbox", "aria-multiselectable": true, "data-xen-v4-listbox": "", className: (0, cn_1.cn)('absolute z-50 mt-xs max-h-60 w-full overflow-auto', 'rounded-[var(--xen-radius-lg)] border border-border py-xs'), children: options.map((opt) => {
                    const active = value.includes(opt.value);
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "option", "data-xen-v4-option": "", "aria-selected": active, onClick: () => toggle(opt.value), className: (0, cn_1.cn)('flex min-h-[var(--xen-space-2xl)] w-full items-center justify-between gap-sm', 'px-md text-left text-base', active ? 'font-semibold text-primary-text' : 'text-on-surface'), children: [(0, jsx_runtime_1.jsx)("span", { children: opt.label }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-primary-text", children: active ? '✓' : '' })] }, opt.value));
                }) })) : null] }));
}
//# sourceMappingURL=MultiSelectV4.js.map