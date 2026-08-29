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
exports.AuthProviderButtonV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const IconV4_1 = require("./IconV4");
const SpinnerV4_1 = require("./SpinnerV4");
const TextV4_1 = require("./TextV4");
const v4_motion_1 = require("./internal/v4-motion");
const v4_state_1 = require("./internal/v4-state");
/**
 * ## Which control height this takes, and why
 *
 * §9 says "provider buttons at the same 56 height" as the CTA and the fields.
 * The Addendum overrules the number and keeps the sentence: control height is
 * `spacing['2xl']` (48) at `radius.md`, because `InputV4` shipped first at
 * those values and is the anchor every field is measured against, and because
 * 56 is not a step on the spacing scale.
 *
 * The instruction §9 was actually giving is *"the same height as the fields"*.
 * A provider button is stacked directly under the email and password fields
 * and the CTA, and the single biggest quality signal an auth screen can send
 * is that every edge in that stack lines up. So this control takes the field
 * metric — `--xen-space-2xl` tall, `--xen-radius-md` corners, `px-lg` inside —
 * exactly as `InputV4` does, and the whole stack agrees.
 *
 * That is also why there is no named `56` constant in this file: taking the
 * metric off the scale means there is no literal to name. A `sharp` seed gets
 * square provider buttons and a re-scaled seed re-scales the auth stack
 * together, neither of which a hard 56 could do.
 *
 * The base's `radius.full` pill is deliberately not carried over. A pill at
 * `radius.full` beside a `radius.md` field reads as a different family, and
 * §9's own point is that the provider row is the *alternative to the form*,
 * not a visitor from another screen.
 */
const HEIGHT_CLASS = 'min-h-[var(--xen-space-2xl)]';
/**
 * How far the button depresses under a finger — the same figure `ButtonV4`
 * uses, so the CTA and the provider button beneath it answer a press
 * identically. A transform scale is geometry, not a token: there is no
 * "amount of squash" slot in the theme, and inventing one would put a motion
 * decision in the brand seed.
 */
const PRESS_SCALE = 0.985;
/**
 * The press depression and the focus ring live in a sheet for the reason every
 * V4 sheet does: a `transform` keyed to `:active` and an `outline` drawn from
 * a custom property cannot be said as utility classes bound to a token. Every
 * colour in it is a `--xen-*`.
 *
 * Hover, focus and press *tinting* is not here — that is the shared M3 state
 * layer from `internal/v4-state`, opted into with `data-xen-v4-state`.
 */
const PROVIDER_V4_CSS = `
[data-xen-v4-provider] {
  transition: ${(0, v4_motion_1.transitionCss)(['border-color'])},
    ${(0, v4_motion_1.transitionCss)(['transform'], v4_motion_1.V4_MOTION.quick)};
}
[data-xen-v4-provider]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
[data-xen-v4-provider]:active:not(:disabled) { transform: scale(${PRESS_SCALE}); }
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-provider] { transition: none; }
  [data-xen-v4-provider]:active { transform: none; }
}
`;
/**
 * **V4 provider button** — one social/SSO action from `ONBOARDING-DESIGN-SPEC.md`
 * §9, in the V4 design line. Web twin of the native `AuthProviderButtonV4`.
 *
 * Outlined, never filled. §5 gives the screen exactly one dominant action and
 * the primary CTA is it; a filled provider button beside a filled CTA makes
 * the user choose between two equally loud options for the same goal. So this
 * is `surface` behind a hairline `border`, with the logo leading the label —
 * calm enough to read as the alternative, present enough to be obviously
 * tappable.
 *
 * Feedback is the shared M3 state layer (`data-xen-v4-state`): hover, focus
 * and press tint the *container* at M3's opacities rather than dimming the
 * control's own content, which is the signal `0.38` is reserved for and which
 * made the base's `hover:opacity-85` read like a half-disabled button. Disabled
 * is that `0.38` — `V4_DISABLED_CLASS`, one spelling for the whole line.
 *
 * Because the button owns its fill, the state layer is grounded on it
 * explicitly ({@link stateGroundVars}) rather than left translucent: the label
 * is contrast-checked against `surface`, and an opaque layer keeps that
 * promise measurable instead of borrowing whatever the page put underneath.
 *
 * See {@link HEIGHT_CLASS} for the control-height ruling.
 */
exports.AuthProviderButtonV4 = React.forwardRef(function AuthProviderButtonV4({ label, glyph, name, loading = false, compact = false, fullWidth = true, disabled = false, className, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-auth-provider-styles', PROVIDER_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const isDisabled = disabled || loading;
    const hasMark = Boolean(glyph) || Boolean(name);
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": label, "aria-busy": loading || undefined, disabled: isDisabled, "data-xen-v4-provider": "", "data-xen-v4-state": "", className: (0, cn_1.cn)('inline-flex items-center justify-center gap-sm font-body', HEIGHT_CLASS, 'bg-surface text-on-surface', 'border border-border rounded-[var(--xen-radius-md)]', 'focus-visible:outline-none', compact ? 'px-md min-w-[var(--xen-space-2xl)]' : 'px-lg', fullWidth ? 'w-full' : 'w-auto', v4_state_1.V4_DISABLED_CLASS, className), style: {
            ...(0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'),
            ...style,
        }, ...rest, children: [loading ? (0, jsx_runtime_1.jsx)(SpinnerV4_1.SpinnerV4, { size: "sm" }) : hasMark ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, name: name, size: "base" }) : null, compact ? null : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", children: label }))] }));
});
//# sourceMappingURL=AuthProviderButtonV4.js.map