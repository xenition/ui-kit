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
exports.MailLabelChipV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const mail_v4_1 = require("./internal/mail-v4");
/** 44 on both axes for the remove control, composed from the spacing scale. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
/** The chip's silhouette and type, shared by every variant. */
const CHIP_CLASS = 'inline-flex max-w-full items-center gap-xs self-start rounded-full text-xs font-semibold';
/**
 * **V4 mail label chip** — same props as {@link MailLabelChip} plus
 * `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **`soft` is soft for all six tones.** The `SOFT` and `SOLID` maps were
 *    byte-identical for `success`, `warn` and `danger`, so the same
 *    `variant="soft"` chip was a pale wash on the phone and a saturated block
 *    on the web. Soft is now one recipe — the tone mixed 10% into the card —
 *    applied to every tone by the same function.
 * 2. **A mail label is identity, so its ink is neutral.** A "Receipts" chip in
 *    the `danger` slot was indistinguishable from a genuine failure sitting in
 *    the same list. `labelInkClass` folds the three status tones to the neutral
 *    ink; the label's own word carries which label it is.
 * 3. **The remove `×` is a control, not a character.** It was a bare glyph with
 *    no box, roughly 12px of hit area, and it dimmed itself on hover at the
 *    band M3 spends on disabled. It is now a real target that clears 44 and
 *    answers with a state layer.
 * 4. **`solid` neutral gets a guaranteed pair.** It was `bg-muted` with
 *    `text-surface` — a page colour used as ink on a ramp step, a pairing
 *    nothing had measured.
 */
exports.MailLabelChipV4 = React.forwardRef(function MailLabelChipV4({ label, tone = 'neutral', variant = 'soft', glyph, onRemove, onClick, removeLabel = (value) => `Remove label ${value}`, className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const skin = variantClass(variant, tone);
    const solid = variant === 'solid';
    // `soft` mixes its ground inline, because `color-mix()` over a custom
    // property is not something a class bound to a token can say.
    const ground = variant === 'soft' ? (0, tone_v4_1.toneGround)(tone) : undefined;
    const interactive = onClick != null || onRemove != null;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs leading-none", children: glyph })) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate", children: label })] }));
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, style: ground ? { backgroundColor: ground } : undefined, className: (0, cn_1.cn)(CHIP_CLASS, skin, 
        // A static chip stays chip-sized; one with controls in it has to be
        // tall enough to hold a target.
        interactive ? (0, cn_1.cn)(chrome_v4_1.MIN_TAP_CLASS, 'px-xs') : 'px-sm py-xs', className), children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Label ${label}`, onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(solid ? tone_v4_1.TONE_VAR[tone] : 'var(--xen-card)', 'currentColor'), className: (0, cn_1.cn)('inline-flex min-w-0 items-center gap-xs rounded-full px-sm', chrome_v4_1.MIN_TAP_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: inner })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex min-w-0 items-center gap-xs', interactive && 'px-sm'), children: inner })), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": removeLabel(label), onClick: onRemove, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)(solid ? tone_v4_1.TONE_VAR[tone] : 'var(--xen-card)', 'currentColor'), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full leading-none', chrome_v4_1.MIN_TAP_CLASS, TAP_SQUARE, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u00D7" }) })) : null] }));
});
/**
 * The chip's ground and ink for one variant.
 *
 * `soft` paints its ground inline (see the call site) and takes only the ink
 * here; `solid` and `outline` are expressible as classes. Every ink is either
 * the tone's guaranteed pair (`solid`) or the identity-folded ink the module's
 * own vocabulary decides (`soft`, `outline`).
 */
function variantClass(variant, tone) {
    if (variant === 'solid')
        return (0, cn_1.cn)(tone_v4_1.TONE_BG[tone], mail_v4_1.TONE_ON[tone]);
    if (variant === 'outline')
        return (0, cn_1.cn)('border border-border bg-transparent', (0, mail_v4_1.labelInkClass)(tone));
    return (0, mail_v4_1.labelInkClass)(tone);
}
//# sourceMappingURL=MailLabelChipV4.js.map