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
exports.IcebreakerChipV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
/**
 * Padding and type scale per size. The **height** is not here: both sizes take
 * {@link MIN_TAP_CLASS}, so `sm` is a smaller chip, not a chip you cannot hit.
 */
const SIZE = {
    sm: 'gap-xs px-sm text-xs',
    md: 'gap-xs px-md text-sm',
};
/**
 * **V4 icebreaker chip** — the web twin of the native `IcebreakerChipV4`, same
 * props as {@link IcebreakerChip}.
 *
 * ## Four changes
 *
 * 1. **Both sizes are hittable.** `sm` came out around 22px tall and `md`
 *    around 30 — and `ProfileCard` renders *every* interest chip at `sm`, so a
 *    profile was a field of 22px targets. Both now clear 44.
 * 2. **`solid` is actually solid, and the same solid on both twins.** Web drew
 *    `bg-primary-100 text-primary` under that name — a ramp step wearing the
 *    solid label, and a different chip from its native twin. `soft` is an
 *    opaque `color-mix` into `surface` rather than a `-50` ramp step, so it
 *    keeps its colour on a card, on the page and over a photo.
 * 3. **Brand ink is the contrast-corrected slot.** `text-primary` is a *fill*
 *    with no contrast promise; on a 12% tint of itself it is the one place the
 *    promise actually matters. It becomes `text-primary-text`.
 * 4. **Selected is a mark, not just a colour.** `aria-pressed` always said so;
 *    nothing visible did, and a selected `solid` chip and an unselected one
 *    were the same disc. A check leads the label when the chip is chosen.
 *
 * Press and hover are the shared state layer — the base faded the chip's own
 * content with `hover:opacity-90`, which is the signal M3 spends on *disabled*.
 */
exports.IcebreakerChipV4 = React.forwardRef(function IcebreakerChipV4({ label, value, selected = false, disabled = false, variant = 'soft', size = 'md', glyph, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    // A chosen chip is filled whatever its variant — that is what "chosen"
    // looks like — so `solid` and `selected` share one ground and the check
    // tells them apart.
    const filled = selected || variant === 'solid';
    const ground = filled
        ? 'bg-primary text-on-primary'
        : variant === 'soft'
            ? 'bg-[color-mix(in_srgb,var(--xen-primary)_12%,var(--xen-surface))] text-primary-text'
            : 'border border-border bg-surface text-on-surface';
    const stateVars = filled
        ? (0, v4_state_1.stateGroundVars)('var(--xen-primary)', 'var(--xen-on-primary)')
        : variant === 'soft'
            ? (0, v4_state_1.stateGroundVars)('color-mix(in srgb, var(--xen-primary) 12%, var(--xen-surface))', 'var(--xen-primary)')
            : (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)');
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-pressed": selected, "aria-label": label, disabled: disabled, onClick: () => onClick?.(value ?? label), "data-xen-v4-state": "", style: stateVars, className: (0, cn_1.cn)('inline-flex items-center justify-center self-start rounded-full font-semibold', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', v4_state_1.V4_DISABLED_CLASS, nav_v4_1.MIN_TAP_CLASS, SIZE[size], ground, className), ...rest, children: [selected ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u2713" }) : null, glyph ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph }) : null, (0, jsx_runtime_1.jsx)("span", { children: label })] }));
});
//# sourceMappingURL=IcebreakerChipV4.js.map