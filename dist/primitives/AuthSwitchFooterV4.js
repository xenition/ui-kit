"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_FOOTER_V4_CSS = exports.AUTH_FOOTER_V4_STYLE_ID = void 0;
exports.AuthSwitchFooterV4 = AuthSwitchFooterV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const TextV4_1 = require("./TextV4");
const nav_v4_1 = require("./internal/nav-v4");
const v4_state_1 = require("./internal/v4-state");
/** The `<style>` id the V4 auth footers share. Injection is idempotent. */
exports.AUTH_FOOTER_V4_STYLE_ID = 'xen-v4-auth-footer-styles';
/**
 * The one thing a utility class cannot say.
 *
 * A focus indicator is an accessibility affordance, not a decoration, so it
 * comes off `--xen-ring` — the single slot the compiler already corrected to
 * 3:1 against `surface` — exactly as `ButtonV4` rings itself. Tabbing from the
 * CTA onto the footer link must not change the shape of the focus signal.
 */
exports.AUTH_FOOTER_V4_CSS = `
[data-xen-v4-auth-link]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
`;
const TONE = {
    primary: { ink: 'primaryText', weight: 'semibold' },
    muted: { ink: 'mutedText', weight: 'medium' },
};
/**
 * **V4 auth switch footer** — the web twin of the native `AuthSwitchFooterV4`,
 * the base's props plus {@link AuthSwitchTone}, a different design line.
 *
 * §9's centred footer line carrying the opposite action. One line, one
 * emphasis: the prompt is muted, the action is the only thing with weight.
 *
 * ## What V4 changes
 *
 * **The link is a real tap target.** The base put `min-h-11` on the *row* and
 * left the `<button>` the size of the word inside it, so the row was 44 tall
 * and the thing you could actually press was about 17. The minimum moves onto
 * the button, composed as `2xl - xs` off the spacing scale rather than typed as
 * `44`, which is the same expression `ButtonV4` and the V4 nav line compose —
 * so a footer link, a nav row and a button land on one size instead of three
 * that happen to be close.
 *
 * **It answers the pointer.** The base had no hover, no press and no visible
 * disabled state at all on web: the only signal that "Register" was pressable
 * was that it was blue. V4 takes the M3 state layer (`data-xen-v4-state`) —
 * the control's own ink at 0.08 / 0.12 over the ground — and M3's 0.38 for
 * disabled content, instead of dimming, which is the signal 0.38 already means.
 *
 * **The prompt reads.** `muted` is `neutral[600]` and carries no contrast
 * promise; `muted-text` is that slot corrected to AA on `surface`, once, by the
 * compiler. A footer line is small type, which is the last place that can
 * afford ink nobody measured.
 *
 * **Nothing renders without a label** (§10.6/§12). A footer line with no action
 * on it is the same defect as §9's divider above no providers.
 */
function AuthSwitchFooterV4({ prompt, label, onClick, disabled = false, tone = 'primary', className, ...rest }) {
    if (!label)
        return null;
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    (0, inject_1.injectStyleOnce)(exports.AUTH_FOOTER_V4_STYLE_ID, exports.AUTH_FOOTER_V4_CSS);
    const t = TONE[tone];
    return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-auth-switch": tone, className: (0, cn_1.cn)('flex flex-wrap items-center justify-center gap-xs', className), ...rest, children: [prompt ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: prompt })) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-auth-link": "", "data-xen-v4-state": "", "aria-label": label, onClick: onClick, disabled: disabled, className: (0, cn_1.cn)('inline-flex items-center justify-center px-sm', 'rounded-[var(--xen-radius-md)] focus-visible:outline-none', nav_v4_1.MIN_TAP_CLASS, v4_state_1.V4_DISABLED_CLASS), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: t.weight, tone: t.ink, children: label }) })] }));
}
//# sourceMappingURL=AuthSwitchFooterV4.js.map