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
exports.BoostBannerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const LikePassButtonsV4_1 = require("./LikePassButtonsV4");
const profile_v4_1 = require("./internal/profile-v4");
/**
 * The three upsells.
 *
 * `premium` wore `warn` — the slot that means *something has gone wrong* — for
 * an offer. An upsell is identity, so the glyph carries which one it is and the
 * tone stays inside the two identity slots the theme guarantees.
 */
const SPEC = {
    boost: {
        glyph: '⚡',
        tone: 'primary',
        title: 'Be seen first',
        subtitle: 'Boost your profile to the top for 30 minutes.',
        cta: 'Boost me',
    },
    superboost: {
        glyph: '🚀',
        tone: 'accent',
        title: 'Super Boost tonight',
        subtitle: 'Up to 100× more profile views during peak hours.',
        cta: 'Super Boost',
    },
    premium: {
        glyph: '★',
        tone: 'primary',
        title: 'Go Premium',
        subtitle: 'Unlimited likes, see who likes you, and more.',
        cta: 'Upgrade',
    },
};
/**
 * **V4 boost banner** — the web twin of the native `BoostBannerV4`, same props
 * as {@link BoostBanner} plus `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **`onDismiss` no longer deletes the CTA.** The two lived in one ternary,
 *    so supplying a dismiss handler silently removed the call to action —
 *    `ctaLabel` was accepted, typed and documented, and never rendered. A
 *    dismissible upsell is the normal case, and it shipped with no way to
 *    accept the offer. Both render.
 * 2. **The banner is not a button with buttons in it.** It was a `<div>` with
 *    `role="button"`, `tabIndex={0}` and a hand-written Enter/Space handler,
 *    wrapping a real `<button>` that had to `stopPropagation` to work — three
 *    approximations of a button, nested, each of which a screen reader reports
 *    as a separate control on top of the container's own name. The banner is a
 *    labelled group; the CTA and the dismiss are the only controls in it.
 * 3. **Dismiss is hittable and named.** It was a bare `✕` glyph on a text-sized
 *    hit box with a hard-coded English name.
 * 4. **Press is a state layer**, not `hover:opacity-90` on the whole card —
 *    dimming is how the line draws *disabled*, so a hovered banner and a dead
 *    one looked alike.
 */
exports.BoostBannerV4 = React.forwardRef(function BoostBannerV4({ variant = 'boost', title, subtitle, ctaLabel, onClick, activeLabel, onDismiss, dismissLabel = 'Dismiss', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const headingId = React.useId();
    const spec = SPEC[variant];
    const skin = LikePassButtonsV4_1.ACTION_SKIN[spec.tone];
    const active = activeLabel != null;
    const heading = title ?? spec.title;
    const support = active ? activeLabel : (subtitle ?? spec.subtitle);
    // A CTA with no handler and no label of its own is an offer nobody can
    // accept, so it is not drawn — but supplying either one is enough.
    const showCta = onClick != null || ctaLabel != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-labelledby": headingId, className: (0, cn_1.cn)('flex items-center gap-md rounded-[var(--xen-radius-lg)] border bg-surface p-md', active ? skin.ring : 'border-border', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-full border text-xl', nav_v4_1.MIN_TAP_SQUARE_CLASS, skin.fill, skin.ring), children: spec.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { id: headingId, className: "text-base font-bold text-on-surface", children: heading }), (0, jsx_runtime_1.jsx)("span", { role: active ? 'status' : undefined, "aria-live": active ? 'polite' : undefined, className: (0, cn_1.cn)('line-clamp-2 text-sm', active ? profile_v4_1.TONE_INK[spec.tone] : 'text-muted-text'), children: support })] }), showCta ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", onClick: () => onClick?.(), children: ctaLabel ?? spec.cta })) : null, onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": dismissLabel, onClick: () => onDismiss(), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center rounded-full text-muted-text', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', nav_v4_1.MIN_TAP_SQUARE_CLASS), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "lg" }) })) : null] }));
});
//# sourceMappingURL=BoostBannerV4.js.map