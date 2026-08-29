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
exports.BannerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const feedback_v4_1 = require("./internal/feedback-v4");
/**
 * How far the action chip lifts off the band it sits on.
 *
 * The chip is the band's own two colours mixed — the tone with a fifth of its
 * on-pair stirred in — so it is lighter than the band in light mode and lighter
 * than the band in dark mode, without either case being special-cased. A fifth
 * is the smallest step that survives being viewed at arm's length; more starts
 * to read as a second tone on a band that is supposed to carry exactly one.
 */
const CHIP_LIFT = 0.2;
/** Band fill, its guaranteed ink, and the chip mixed from the two. */
const TONE = {
    info: {
        band: 'bg-primary text-on-primary',
        chip: (0, feedback_v4_1.mixArbitrary)(feedback_v4_1.TONE_SLOTS.info.on, feedback_v4_1.TONE_SLOTS.info.fill, CHIP_LIFT),
    },
    success: {
        band: 'bg-success text-on-success',
        chip: (0, feedback_v4_1.mixArbitrary)(feedback_v4_1.TONE_SLOTS.success.on, feedback_v4_1.TONE_SLOTS.success.fill, CHIP_LIFT),
    },
    warn: {
        band: 'bg-warn text-on-warn',
        chip: (0, feedback_v4_1.mixArbitrary)(feedback_v4_1.TONE_SLOTS.warn.on, feedback_v4_1.TONE_SLOTS.warn.fill, CHIP_LIFT),
    },
    danger: {
        band: 'bg-danger text-on-danger',
        chip: (0, feedback_v4_1.mixArbitrary)(feedback_v4_1.TONE_SLOTS.danger.on, feedback_v4_1.TONE_SLOTS.danger.fill, CHIP_LIFT),
    },
};
/**
 * **V4 banner** — the web twin of the native `BannerV4`, same props as
 * {@link Banner}, a different design line.
 *
 * A banner is the loudest thing this kit can say: full width, edge to edge, a
 * solid semantic fill. That is its identity and V4 keeps it. What V4 changes is
 * everything the loudness was hiding.
 *
 * ## The band does not sweep
 *
 * No gradient, at any depth. `design.md` §35.4 makes the tone the content, and
 * a band that runs from one hue to another has two contents — the reader has to
 * decide which end was the message. The one exception §35.11 allows a gradient,
 * the hero, is not this. And no shadow: a banner is in the document flow at the
 * top of a region, not floating over it, so `elevation` would be claiming a
 * layer the component does not occupy.
 *
 * ## The action stops pretending to be prose
 *
 * The base banner rendered its action as underlined text in the same colour as
 * the message beside it. On a saturated `danger` band that is two sentences of
 * red-and-white where one of them is a control, and the only thing separating
 * them is an underline — §33, a scannable screen needs the control to be found
 * without reading. V4 gives it a chip: an opaque `color-mix` of the band's own
 * tone and its on-pair, so the affordance is visible without introducing a
 * third colour to a component whose whole point is carrying one.
 *
 * Both controls take a real target — `--xen-space-xl` tall, which clears the
 * 44px minimum §46 asks for once the band's own padding is counted.
 *
 * The chip's label keeps the tone's `on` pair. That pair is guaranteed against
 * the band, and the chip is only a fifth of the way from the band toward the
 * ink itself — a direction that can only increase the separation, never close
 * it. The native twin re-measures the same mix with `ensureContrast` and its
 * spec is what holds the claim.
 */
exports.BannerV4 = React.forwardRef(function BannerV4({ tone = 'info', icon, actionLabel, onAction, onClose, className, children, ...rest }, ref) {
    const t = TONE[tone];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-banner": tone, role: tone === 'danger' ? 'alert' : 'status', className: (0, cn_1.cn)('flex w-full items-center gap-[var(--xen-space-sm)]', 'px-[var(--xen-space-lg)] py-[var(--xen-space-md)]', t.band, className), ...rest, children: [icon != null && (0, jsx_runtime_1.jsx)("span", { className: "inline-flex shrink-0", children: icon }), (0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1 text-sm font-medium", children: children }), actionLabel && ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-state": "", onClick: onAction, className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center', 'min-h-[var(--xen-space-xl)] px-[var(--xen-space-md)]', 'rounded-[var(--xen-radius-sm)] text-sm font-semibold', `bg-[${t.chip}]`), children: actionLabel })), onClose && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClose, "aria-label": "Dismiss", "data-xen-v4-state": "", className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center leading-none', 'min-h-[var(--xen-space-xl)] min-w-[var(--xen-space-xl)]', 'rounded-[var(--xen-radius-sm)]'), children: "\u2715" }))] }));
});
//# sourceMappingURL=BannerV4.js.map