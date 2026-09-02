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
exports.SkillTagV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const v4_state_1 = require("../primitives/internal/v4-state");
const tone_v4_1 = require("./internal/tone-v4");
/** The chip's ground and ink per variant. `default` is identity, so neutral. */
const VARIANT_CLASS = {
    // `bg-neutral-100` mirrors under `[data-theme="dark"]` and paints a near-white
    // slab on a dark page; `card` is the slot for a raised chip in both schemes.
    default: 'border border-border bg-card text-on-card',
    matched: 'border border-success bg-success text-on-success',
    missing: 'border border-danger bg-danger text-on-danger',
};
/** The state layer's ground/ink pair per variant — the fill it actually wears. */
const VARIANT_STATE = {
    default: ['var(--xen-card)', 'var(--xen-on-card)'],
    matched: ['var(--xen-success)', 'var(--xen-on-success)'],
    missing: ['var(--xen-danger)', 'var(--xen-on-danger)'],
};
/** A non-colour signal, so the variant survives monochrome and colour blindness. */
const MARKER = {
    default: '',
    matched: '✓ ',
    missing: '! ',
};
/** What each variant *means*, said out loud. The marker is only half of it. */
const VARIANT_LABEL = {
    default: undefined,
    matched: 'on your résumé',
    missing: 'missing from your résumé',
};
/**
 * **V4 skill tag** — same props as {@link SkillTag} plus `removeLabel` and
 * `variantLabels`.
 *
 * ## Five changes
 *
 * 1. **A removable, pressable chip is no longer a `<button>` inside a
 *    `<button>`.** That is invalid HTML — the parser closes the outer button
 *    before the inner one even opens — and invalid ARIA, and it is what the
 *    base emitted for every chip that had both `onClick` and `onRemove`. What
 *    the browser actually built was two sibling buttons with the ✕ outside the
 *    chip's own box, so the guard around its click (`stopPropagation`) was
 *    guarding against a bubble that no longer happened, while the chip's press
 *    target silently lost its trailing half. The pill is now a plain `<span>`
 *    that *contains* two siblings: the chip's activation, and the ✕.
 * 2. **The variant stops being lost in the name.** `aria-label={label}`
 *    overrode the whole subtree, marker included, so a chip visibly marked
 *    "! React" — required and *not* on your résumé — announced "React", which
 *    is the opposite reading. The name is now the label and the variant's
 *    meaning together.
 * 3. **The chip is a real tap target.** It was roughly 20px tall (`py-[3px]`
 *    around a 12px label) and it is the most-tapped control in the module,
 *    because `JobFilterBar` is built out of these. Both the activation and
 *    the ✕ clear 44.
 * 4. **Press is a state layer, not `hover:opacity-90`.** Dimming fades the
 *    chip's own *content*, which is the signal M3 spends 0.38 on to mean
 *    disabled — so a hovered chip and a dead one looked alike.
 * 5. **The default chip stops painting itself with a hairline colour.**
 *    `bg-neutral-100` is a ramp step that inverts under a dark seed; the
 *    neutral chip now takes `card` with a `border` hairline, which is what
 *    `border` is for.
 */
exports.SkillTagV4 = React.forwardRef(function SkillTagV4({ label, variant = 'default', selected = false, onClick, onRemove, removeLabel, variantLabels, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const meaning = variantLabels?.[variant] ?? VARIANT_LABEL[variant];
    const name = (0, tone_v4_1.spokenLine)([label, meaning]);
    const [ground, ink] = VARIANT_STATE[variant];
    const text = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: MARKER[variant] }), label] }));
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "data-xen-v4-skill-tag": "", className: (0, cn_1.cn)('inline-flex shrink-0 items-center gap-xs self-start overflow-hidden', 'rounded-[var(--xen-radius-sm)] text-xs font-medium', VARIANT_CLASS[variant], selected && 'ring-2 ring-ring', className), ...rest, children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, "aria-pressed": selected, onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(ground, ink), className: (0, cn_1.cn)('inline-flex items-center px-sm text-inherit', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: text })) : (
            /*
              Not interactive, so it is not a target and does not pay the 44 floor.
              The meaning still rides with it, as text a reader will actually read
              rather than as a label on something that cannot carry one.
            */
            (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center px-sm py-xs", children: [text, meaning ? (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: `, ${meaning}` }) : null] })), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": removeLabel ?? `Remove ${label}`, onClick: onRemove, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(ground, ink), className: (0, cn_1.cn)('inline-flex items-center justify-center font-semibold text-inherit', tone_v4_1.MIN_TAP_SQUARE_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u00D7" }) })) : null] }));
});
//# sourceMappingURL=SkillTagV4.js.map