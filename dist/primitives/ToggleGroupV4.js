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
exports.ToggleGroupV4 = ToggleGroupV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const chrome_v4_1 = require("./internal/chrome-v4");
/**
 * `ToggleGroup`, V4 — the same props, at the height every other control in the
 * form is.
 *
 * ## One form, one edge
 *
 * The single biggest quality signal a form can send is that every control in it
 * agrees. So this takes the shared V4 control metrics: `2xl` tall,
 * `radius.md` — the same numbers `InputV4` shipped and `internal/field-v4`
 * holds for the eleven other form controls. The base's `py-sm` put it around
 * 34, so a toggle group stacked next to a select in the same form was visibly a
 * different family and missed the 44px target as well.
 *
 * ## The seam
 *
 * A hairline `<span>` between cells rather than a `border-l` on each, matching
 * `ButtonGroupV4`. A border on the cell stops at the cell's own padding box, so
 * when one neighbour is filled and the other is not the divider reads as a step
 * rather than a seam; a stretched span is full-bleed in every combination.
 *
 * The group is joined by adjacency and one hairline. No fill, no gradient, no
 * shadow (§9, §11) — the selected cell is what carries colour, and it is the
 * only thing that does.
 *
 * ## Feedback
 *
 * Hover and press are the M3 state layer, and each cell layers over **its own**
 * ground: an unselected cell mixes `on-surface` into `surface`, a selected one
 * mixes `on-primary` into `primary`. The base's `hover:bg-neutral-100` is a
 * light-oriented ramp step that paints a near-white slab on a dark page, and it
 * skipped the selected cell entirely, so the chosen option was the one thing in
 * the control that never answered the pointer.
 *
 * Focus is `--xen-ring` — one ring for the whole kit — inset by 2px so it stays
 * inside the joined shape instead of being clipped by it.
 *
 * ## What the group announces
 *
 * `radiogroup` in single mode, `group` in `multiple` mode. The base said
 * `group` on the web and `radiogroup` on native in **both** modes, so a
 * multi-select group announced itself to a screen reader as a set of mutually
 * exclusive choices — which is the opposite of what it does. `radio` children
 * also require a `radiogroup` parent to be valid at all, so the single-mode
 * case was under-described in the same breath.
 */
function ToggleGroupV4({ options, value, onChange, multiple = false, disabled = false, accessibilityLabel, className, }) {
    (0, inject_1.injectStyleOnce)(chrome_v4_1.CHROME_V4_STYLE_ID, chrome_v4_1.CHROME_V4_CSS);
    const selected = React.useMemo(() => {
        if (multiple)
            return Array.isArray(value) ? value : [];
        return typeof value === 'string' && value ? [value] : [];
    }, [value, multiple]);
    const toggle = (v) => {
        if (multiple) {
            const set = new Set(selected);
            if (set.has(v))
                set.delete(v);
            else
                set.add(v);
            onChange?.(Array.from(set));
        }
        else {
            onChange?.(selected[0] === v ? '' : v);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { 
        // `radiogroup` only when the choices actually are exclusive; `radio`
        // children are not valid outside one.
        role: multiple ? 'group' : 'radiogroup', "aria-label": accessibilityLabel, "aria-disabled": disabled || undefined, "data-xen-v4-toggle-group": "", className: (0, cn_1.cn)('inline-flex items-stretch overflow-hidden', 'min-h-[var(--xen-space-2xl)] rounded-[var(--xen-radius-md)] border border-border', className), children: options.map((opt, i) => {
            const active = selected.includes(opt.value);
            const itemDisabled = disabled || opt.disabled === true;
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "w-px self-stretch bg-border" }) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", role: multiple ? 'checkbox' : 'radio', "aria-checked": active, "aria-label": opt.label, disabled: itemDisabled, onClick: () => toggle(opt.value), "data-xen-v4-chrome": active ? 'filled-primary' : 'on-surface', className: (0, cn_1.cn)('flex items-center justify-center px-md font-body text-sm', 'focus-visible:outline-none', active
                            ? 'bg-primary font-semibold text-on-primary'
                            : 'bg-surface font-medium text-on-surface'), children: opt.label })] }, opt.value));
        }) }));
}
//# sourceMappingURL=ToggleGroupV4.js.map