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
exports.EyebrowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const identity_v4_1 = require("./internal/identity-v4");
/**
 * The **text** form of each tone, not the fill.
 *
 * `text-primary` and `text-accent` resolve to the colours you paint a button
 * with; the compiler guarantees `on-primary` reads on `primary`, and guarantees
 * nothing about `primary` reading on `surface`. The `-text` slots are the same
 * hue walked in lightness until they clear AA there — built for this exact
 * case, and documented as such in the Tailwind preset.
 */
const TONE_CLASS = {
    primary: 'text-primary-text',
    accent: 'text-accent-text',
    muted: 'text-muted-text',
};
/**
 * **V4 eyebrow** — the web twin of the native `EyebrowV4`, same props as
 * {@link Eyebrow}, a different design line.
 *
 * The eyebrow is the smallest type in the kit — 12px, bold, uppercase — which
 * makes it the last place that can afford a colour nobody measured. The base
 * one used `text-primary` and `text-accent` **as ink**. Those are fill slots:
 * the preset says so in as many words ("`text-primary` still resolves to the
 * fill … new work colouring text with a brand colour wants these"), and the
 * `-text` slots are the ones the compiler walked to AA on `surface`.
 *
 * Two more things:
 *
 * - **The twins agree on tracking.** The web tracked at `0.22em` and native at
 *   `2px` (0.167em at the `xs` step), so the same eyebrow was a different width
 *   on a laptop and on a phone. Both now derive from one ratio.
 * - **The flanking rule stops competing.** Drawn with `bg-current`, a tick
 *   either side is the label's own colour and weight and reads as part of the
 *   word. In V4 it drops to the `border` hairline: it frames the label instead
 *   of shouting alongside it (§6 — hierarchy before styling; §7 — subtraction
 *   before addition).
 *
 * There is no gradient and no container. An eyebrow is typography doing the
 * work a card would otherwise be asked to do (§10), and §35.11 keeps the brand
 * sweep for the hero and the one primary action.
 */
exports.EyebrowV4 = React.forwardRef(function EyebrowV4({ tone = 'accent', rule = false, align = 'start', className, children, ...rest }, ref) {
    // A frame, not a second voice — and `spacing.lg` wide, so the tick belongs to
    // the same scale as the gap beside it.
    const tick = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-block h-px w-lg shrink-0 bg-border" }));
    return ((0, jsx_runtime_1.jsxs)("p", { ref: ref, "data-xen-v4-eyebrow": tone, className: (0, cn_1.cn)('flex items-center gap-xs font-heading text-xs font-bold uppercase', 
        // Caps at 12px lose the word-shape a reader scans by; tracking is the
        // repair, and it is the same ratio the native twin uses.
        identity_v4_1.EYEBROW_TRACKING_CLASS, align === 'center' && 'justify-center', TONE_CLASS[tone], className), ...rest, children: [rule ? tick : null, children, rule ? tick : null] }));
});
//# sourceMappingURL=EyebrowV4.js.map