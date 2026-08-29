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
exports.AUTH_TERMS_V4_STYLE_ID = exports.AUTH_DEFAULT_TERMS_LINKS = void 0;
exports.AuthTermsCardV4 = AuthTermsCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const CheckboxV4_1 = require("./CheckboxV4");
const TextV4_1 = require("./TextV4");
const field_v4_1 = require("./internal/field-v4");
const v4_state_1 = require("./internal/v4-state");
const v4_motion_1 = require("./internal/v4-motion");
const AuthCard_1 = require("./AuthCard");
Object.defineProperty(exports, "AUTH_DEFAULT_TERMS_LINKS", { enumerable: true, get: function () { return AuthCard_1.AUTH_DEFAULT_TERMS_LINKS; } });
/**
 * The incidental-tap floor, composed from the spacing scale rather than
 * remembered as `44`.
 *
 * `2xl - xs` is 44 at the kit's scale — the same expression `ButtonV4`'s `md`
 * height and the native `minTap()` use, so a legal link, a tab and a button
 * land on one size instead of three that happen to be close. It is a *layout*
 * number, which is the one category §10.1 lets us name; it is still never a
 * literal, because it is composed from tokens.
 */
const TAP_MIN = 'calc(var(--xen-space-2xl) - var(--xen-space-xs))';
/** The `<style>` id this component injects its card and link rules from. */
exports.AUTH_TERMS_V4_STYLE_ID = 'xen-v4-auth-terms-styles';
/**
 * Everything the card paints that a utility class cannot say.
 *
 * Three things live here and nowhere else:
 *
 * 1. **The agreed tint.** A ticked consent answers with the M3 `hover` state
 *    layer of `--xen-primary` over `--xen-surface` — a `color-mix()` of two
 *    custom properties, so it follows `[data-theme="dark"]` with no dark rule
 *    of its own and no literal colour anywhere. It is the smallest amount of
 *    colour that still reads as *yes, that is done*: §7 asks a selected
 *    control to be unmistakable, and §8 warns that a card shouting at the
 *    user is the tell of generic UI. The card must never read as a warning,
 *    so the tint is the brand slot, never `danger`, until there really is an
 *    error.
 * 2. **The invalid override, last so it wins.** An untouched-but-required
 *    consent is the one case where this surface is allowed to go red, and it
 *    always carries the message underneath — never colour alone (§6).
 * 3. **The links' real tap target.** An inline `<button>` in flowing text is
 *    as tall as its text, which on a phone is roughly half the platform
 *    floor. `min-height` cannot fix that without turning each link into a
 *    block that breaks the sentence, so the target is expanded by an absolute
 *    `::after` centred on the link: the hit area becomes a full {@link
 *    TAP_MIN}, and the sentence keeps flowing exactly as it did. §46 —
 *    accessibility before tidiness — with, here, no tidiness given up.
 */
const AUTH_TERMS_V4_CSS = `
[data-xen-v4-terms] {
  transition: ${(0, v4_motion_1.transitionCss)(['border-color', 'background-color'], field_v4_1.FIELD_MOTION)};
}
[data-xen-v4-terms][data-checked="true"] {
  border-color: var(--xen-primary);
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-primary)', 'var(--xen-surface)', 'hover')};
}
[data-xen-v4-terms][data-invalid="true"] {
  border-color: var(--xen-danger);
  background-color: ${(0, v4_state_1.stateCss)('var(--xen-danger)', 'var(--xen-surface)', 'hover')};
}
[data-xen-v4-terms-link] {
  position: relative;
  border-radius: var(--xen-radius-sm);
}
[data-xen-v4-terms-link]::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: ${TAP_MIN};
  transform: translateY(-50%);
}
[data-xen-v4-terms-link]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-terms] { transition: none; }
}
`;
/**
 * **V4 terms consent** — the web twin of the native `AuthTermsCardV4`, the same
 * props as {@link AuthTermsCard} plus three additive ones, a different design
 * line.
 *
 * `ONBOARDING-DESIGN-SPEC.md` §9 asks the register screen for a terms
 * "checkbox in a bordered card with the two links inline", with the CTA
 * disabled until the box is ticked. That last part is the reason this
 * component matters more than its size suggests: it is the one control
 * standing between a user and the end of the funnel, so if it is hard to find,
 * hard to hit, or reads as an error, the sign-up stops there.
 *
 * What the V4 line changes:
 *
 * 1. **It answers.** The base card looked identical ticked and unticked —
 *    only the 16px box changed, and the user's own finger was on top of it.
 *    V4 moves the border to `primary` and washes the ground with the M3
 *    `hover` state layer of the brand, so the change is visible from the far
 *    side of the card. It is a tint, not a fill: this is a consent, not a
 *    selected plan, and §7's filled treatment would make it shout.
 * 2. **The whole card is the target.** `pressToToggle` wraps the copy in a
 *    real `<label>`, taking the tap area from one small square to the full
 *    card, without inventing a click handler that a screen reader cannot see.
 * 3. **The links are reachable.** They stay inline `<button>`s — keyboard
 *    tabbable, with the shared `--xen-ring` focus outline every other V4
 *    control uses — and each gets a genuine {@link TAP_MIN} hit area from an
 *    absolute `::after`, so the sentence still reads as a sentence.
 * 4. **It composes V4 children.** `CheckboxV4` and `TextV4`, never the bases
 *    (§10.5) — so the tick, the focus halo and the type scale here are the
 *    ones the rest of the V4 register screen is using.
 *
 * The empty states §12 asks about all hold: `links={[]}` renders the lead-in
 * copy alone with no dangling separator and no trailing space, no `error`
 * renders no message row, and no `description` renders the single-line card
 * the base drew.
 *
 * No gradient, no glass, no shadow. §16 asks that forms stay minimal, and the
 * one thing on this card that should catch the eye is whether the box is
 * ticked.
 *
 * `onCheckedChange` is the boolean form both twins expose — the underlying web
 * `CheckboxV4` is a real DOM input whose `onChange` takes an event, so the
 * boolean lives one level up where it can have the same name on both
 * platforms.
 */
function AuthTermsCardV4({ checked = false, onCheckedChange, label = 'I agree to the', links = AuthCard_1.AUTH_DEFAULT_TERMS_LINKS, onLinkClick, separator = 'and', description, align = 'center', pressToToggle = true, error, disabled = false, className, }) {
    (0, inject_1.injectStyleOnce)(field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS);
    (0, inject_1.injectStyleOnce)(exports.AUTH_TERMS_V4_STYLE_ID, AUTH_TERMS_V4_CSS);
    const reactId = React.useId();
    const boxId = `${reactId}-box`;
    const errorId = `${reactId}-error`;
    const invalid = Boolean(error);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { id: boxId, checked: checked, invalid: invalid, disabled: disabled, "aria-label": label, "aria-describedby": invalid ? errorId : undefined, onChange: (e) => onCheckedChange?.(e.target.checked) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: [label, links.map((link, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [` ${i > 0 ? `${separator} ` : ''}`, (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-terms-link": "", disabled: disabled, onClick: (e) => {
                                            // A link inside the `<label>` must not also tick the box.
                                            // Interactive content is exempt from label activation per
                                            // spec; stopping propagation makes that true in every DOM
                                            // implementation rather than most of them.
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onLinkClick?.(link.id);
                                        }, className: "font-semibold text-primary-text underline-offset-2 hover:underline", children: link.label })] }, link.id)))] }), description !== undefined ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: description })) : null] })] }));
    const cardProps = {
        'data-xen-v4-terms': '',
        'data-checked': checked ? 'true' : 'false',
        'data-invalid': invalid ? 'true' : 'false',
        className: (0, cn_1.cn)('flex gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-surface p-md', align === 'top' ? 'items-start' : 'items-center', disabled && v4_state_1.V4_DISABLED_SOFT_CLASS),
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-xs', className), children: [pressToToggle ? ((0, jsx_runtime_1.jsx)("label", { htmlFor: boxId, ...cardProps, children: body })) : ((0, jsx_runtime_1.jsx)("div", { ...cardProps, children: body })), error ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { id: errorId, size: "sm", tone: "dangerText", role: "alert", children: error })) : null] }));
}
//# sourceMappingURL=AuthTermsCardV4.js.map