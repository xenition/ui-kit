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
exports.AlertV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const feedback_v4_1 = require("./internal/feedback-v4");
/**
 * Per-tone classes. The mix ground is generated from the shared slot table so
 * the two twins cannot drift on which token a tone means; the class names for
 * fill / on-pair / text form are literal because a Tailwind class has to be
 * legible to a scanner.
 */
const TONE = {
    info: {
        fill: 'bg-primary',
        on: 'text-on-primary',
        text: 'text-primary-text',
        ring: 'border-primary',
        tint: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.info.fill),
    },
    success: {
        fill: 'bg-success',
        on: 'text-on-success',
        text: 'text-success-text',
        ring: 'border-success',
        tint: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.success.fill),
    },
    warn: {
        fill: 'bg-warn',
        on: 'text-on-warn',
        text: 'text-warn-text',
        ring: 'border-warn',
        tint: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.warn.fill),
    },
    danger: {
        fill: 'bg-danger',
        on: 'text-on-danger',
        text: 'text-danger-text',
        ring: 'border-danger',
        tint: (0, feedback_v4_1.tintArbitrary)(feedback_v4_1.TONE_SLOTS.danger.fill),
    },
};
/** The left rule: full tone strength, one spacing step wide. */
const RULE = {
    info: 'border-l-primary',
    success: 'border-l-success',
    warn: 'border-l-warn',
    danger: 'border-l-danger',
};
/**
 * **V4 alert** — the web twin of the native `AlertV4`, same props as
 * {@link Alert}, a different design line.
 *
 * ## The colour IS the message
 *
 * `design.md` §35.4 is the whole brief here. An alert's red is not the alert
 * being styled red; it is the alert saying "this is dangerous". So V4 spends
 * exactly one colour decision on an alert — which tone — and refuses every
 * other one:
 *
 * - **No gradient.** Not even under a `depth` that has them. A tone that
 *   sweeps between two hues asks the reader which end was the meaning, and
 *   §35.11 keeps gradients for the hero and the one primary action anyway.
 * - **No shadow.** An alert is *in* the page, not above it. `elevation` would
 *   claim a layer the component does not occupy, and depth that lies about
 *   layer is decoration (§8).
 * - **`warn` is `warn`.** The base native alert routed `warn` to the `accent`
 *   token — a brand colour standing in for a caution — and so the two twins
 *   were painting different alerts. V4 shares one slot table and they agree.
 *
 * ## The tint owns its ground
 *
 * `subtle` is the default and the one people actually ship. The base painted it
 * `bg-neutral-50` — a ramp step, which the dark block re-emits inverted, so the
 * "subtle" alert was a light card on a dark page. V4 composites the tone into
 * `surface` with `color-mix`, which resolves against a real colour rather than
 * against whatever is behind the element: the block keeps its tone on a card,
 * on glass and on artwork alike, and follows the scheme because both operands
 * are scheme-aware tokens.
 *
 * The mix is 10%, deliberately shallower than `BadgeV4`'s 14%: a badge is a
 * small object read on its own, an alert is a wide field with a paragraph on
 * it, and the compiler's AA guarantee for `*-text` and `on-surface` is made
 * against `surface` — 10% stays close enough to it that the guarantee holds.
 * The native twin re-measures this exact mix with `ensureContrast` across every
 * tone, variant and scheme, and its spec is what proves the recipe.
 *
 * The left rule survives at full tone strength, because it is the fastest read
 * in the component: 4px of colour at the start of a block is identified before
 * a single word is.
 */
exports.AlertV4 = React.forwardRef(function AlertV4({ className, tone = 'info', variant = 'subtle', title, onClose, icon, action, children, ...rest }, ref) {
    const t = TONE[tone];
    const solid = variant === 'solid';
    const ground = variant === 'solid'
        ? (0, cn_1.cn)(t.fill, t.on)
        : variant === 'outline'
            ? (0, cn_1.cn)('border bg-surface', t.ring)
            : (0, cn_1.cn)('border border-border border-l-[length:var(--xen-space-xs)]', `bg-[${t.tint}]`, RULE[tone]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-alert": variant, role: tone === 'danger' ? 'alert' : 'status', className: (0, cn_1.cn)('flex gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] p-[var(--xen-space-md)]', ground, className), ...rest, children: [icon != null && (0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: icon }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [title != null && ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('font-heading text-sm font-semibold', solid ? t.on : t.text), children: title })), children != null && ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('text-sm', solid ? t.on : 'text-on-surface'), children: children })), action != null && (0, jsx_runtime_1.jsx)("div", { children: action })] }), onClose && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClose, "aria-label": "Dismiss", "data-xen-v4-state": "", className: (0, cn_1.cn)('shrink-0 self-start rounded-[var(--xen-radius-sm)] leading-none', solid ? t.on : 'text-muted-text'), children: "\u2715" }))] }));
});
//# sourceMappingURL=AlertV4.js.map