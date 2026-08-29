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
exports.AUTH_DEFAULT_TERMS_LINKS = exports.AuthProviderButton = exports.AuthSubmitButton = exports.AuthField = exports.AUTH_TAP_TARGET = exports.AUTH_CONTROL_HEIGHT = void 0;
exports.AuthBrandTile = AuthBrandTile;
exports.AuthHeading = AuthHeading;
exports.AuthStickyFooter = AuthStickyFooter;
exports.AuthDivider = AuthDivider;
exports.AuthTermsCard = AuthTermsCard;
exports.AuthSwitchFooter = AuthSwitchFooter;
exports.AuthCard = AuthCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const Button_1 = require("./Button");
const Card_1 = require("./Card");
const Checkbox_1 = require("./Checkbox");
const Icon_1 = require("./Icon");
const Spinner_1 = require("./Spinner");
const Text_1 = require("./Text");
/**
 * The auth family's shared anatomy — `AuthCard` and the parts every auth
 * surface is assembled from. Web twin of `native/primitives/AuthCard`, at prop
 * parity part for part.
 *
 * ## Why the parts live here
 *
 * `ONBOARDING-DESIGN-SPEC.md` §6/§9 describe **one** input treatment, **one**
 * CTA shape and **one** provider row for the whole auth family. Four
 * components need them (`LoginForm`, `SignupForm`, `ForgotPasswordForm` and
 * the screen-level `SignInScreen`), and before this file they each drew their
 * own: a screen assembled from `SignInScreen` and a screen assembled from
 * `LoginForm` did not look like the same product. Putting the parts in the
 * family's own shell module means there is exactly one 56px field in the kit,
 * and changing it changes every auth surface at once.
 *
 * Everything here is presentational and token-bound: colors, radii, spacing and
 * font sizes all resolve through the `--xen-*` Tailwind preset. The only bare
 * numbers are the two control heights below, which are geometry, not theme.
 */
/*
  §10.1 permits exactly these two geometric literals, so they are named once
  here rather than retyped at eleven call sites.

  56 is the height of anything a thumb aims at deliberately — a field, the
  primary CTA, a provider button. It is what makes the reference screens read
  as generous instead of cramped, and it is a *layout* decision: there is no
  "control height" token, and inventing one would push a layout choice into the
  theme seed where a brand color belongs.

  44 is the platform floor for an incidental tap target (a text link, the
  password eye). Both stay honest even when the glyph inside them is small.

  The Tailwind forms are written out as whole literals, never assembled from
  the numbers, because Tailwind's content scanner reads source text. `h-14` is
  3.5rem and `min-h-11` is 2.75rem — the same 56/44 at the default root size,
  spelled the way `GetStartedButton` spells the CTA so the funnel's controls
  cannot drift a pixel apart.
*/
exports.AUTH_CONTROL_HEIGHT = 56;
exports.AUTH_TAP_TARGET = 44;
const CONTROL_H = 'h-14';
const CONTROL_SQUARE = 'h-14 w-14';
const TAP_TARGET_MIN = 'min-h-11';
/**
 * The rounded-square brand tile that opens every auth screen (§9): 56×56,
 * `primary` fill, `radius.lg`, top-**left**. Renders nothing at all when the
 * app supplies neither a glyph nor a name — §10.6, an empty state must not
 * leave a hole where a box would be.
 */
function AuthBrandTile({ glyph, name, align = 'left', 'aria-label': ariaLabel, className, }) {
    if (!glyph && !name)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-lg)] bg-primary', CONTROL_SQUARE, align === 'center' ? 'self-center' : 'self-start', className), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, name: name, size: "2xl", color: "onPrimary", "aria-label": ariaLabel }) }));
}
/**
 * Headline + muted subhead, drawn the same way on every auth surface. A string
 * is styled; any other node is rendered as given, so a caller can pass its own
 * markup without losing the block's rhythm.
 */
function AuthHeading({ title, subtitle, align = 'left', size = 'xl', className, }) {
    if (title == null && subtitle == null)
        return null;
    const textAlign = align === 'center' ? 'center' : 'left';
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-xs', align === 'center' ? 'items-center' : 'items-start', className), children: [title != null ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)("h1", { children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: size, weight: "bold", align: textAlign, children: title }) })) : (title)) : null, subtitle != null ? (typeof subtitle === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", tone: "muted", align: textAlign, children: subtitle })) : (subtitle)) : null] }));
}
/**
 * The kit's auth input (§6): **56 tall**, `radius.lg`, hairline `border`,
 * `surface` fill, a muted leading icon, and a trailing affordance where one is
 * earned.
 *
 * Two states carry meaning and both are drawn, never one:
 *
 * - **focus** raises the border to `primary`;
 * - **error** raises it to `danger` *and* prints the message underneath in
 *   `dangerText`. A red border on its own is invisible to a colour-blind user,
 *   so the message is not optional — it is the state.
 */
exports.AuthField = React.forwardRef(function AuthField({ label, icon, error, hint, secure = false, trailing, disabled = false, onChangeText, onChange, inputType = 'text', className, showLabel = 'Show password', hideLabel = 'Hide password', ...rest }, ref) {
    const [visible, setVisible] = React.useState(false);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-xs', className), children: [label ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "medium", children: label })) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full items-center gap-sm bg-surface transition-colors', 'rounded-[var(--xen-radius-lg)] border px-md', CONTROL_H, error ? 'border-danger focus-within:border-danger' : 'border-border focus-within:border-primary', disabled && 'pointer-events-none opacity-50'), children: [icon ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: icon, size: "base", color: "muted" }) : null, (0, jsx_runtime_1.jsx)("input", { ref: ref, type: secure && !visible ? 'password' : secure ? 'text' : inputType, "aria-invalid": error ? true : undefined, disabled: disabled, onChange: (e) => {
                            onChangeText?.(e.target.value);
                            onChange?.(e);
                        }, className: "min-w-0 flex-1 bg-transparent text-base text-on-surface placeholder:text-muted focus:outline-none", ...rest }), secure ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": visible ? hideLabel : showLabel, "aria-pressed": visible, disabled: disabled, onClick: () => setVisible((v) => !v), className: "shrink-0 hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: visible ? 'eye-off' : 'eye', size: "base", color: visible ? 'primary' : 'muted' }) })) : null, trailing] }), error ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", role: "alert", children: error })) : hint ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: hint })) : null] }));
});
/**
 * The sticky CTA's button (§5): full width, **56 tall**, `radius.full`,
 * `primary` fill, `onPrimary` semibold label, trailing `→`.
 *
 * Disabled is the same shape at reduced opacity, never a different shape —
 * a button that changes size when it enables looks like it moved.
 */
exports.AuthSubmitButton = React.forwardRef(function AuthSubmitButton({ label, loading = false, trailingArrow = true, disabled, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)(Button_1.Button, { ref: ref, disabled: disabled || loading, "aria-busy": loading || undefined, "aria-label": label, className: (0, cn_1.cn)('w-full gap-sm rounded-[var(--xen-radius-full)] py-0', CONTROL_H, className), ...rest, children: [loading ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm", "aria-label": "Loading" }) : null, (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "lg", weight: "semibold", tone: "onPrimary", children: label }), trailingArrow ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "forward", size: "base", color: "onPrimary" }) : null] }));
});
/**
 * The footer the CTA is pinned into (§5): a hairline `border` divider on top
 * and `surface` behind it, so scrolling content passes **under** the action
 * instead of colliding with it.
 */
function AuthStickyFooter({ className, children, ...rest }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('sticky bottom-0 flex flex-col gap-sm border-t border-border bg-surface p-lg', className), ...rest, children: children }));
}
/**
 * The "or continue with" separator (§9): one hairline running the full width
 * with the label sitting **on** it, knocked out by a `surface` patch — not two
 * stubs of rule with a gap between them.
 *
 * The caller decides whether it appears at all: a divider above nothing is the
 * empty state §10.6 forbids.
 */
function AuthDivider({ label, className, ...rest }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex items-center justify-center', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "absolute inset-x-0 h-px bg-border" }), label ? ((0, jsx_runtime_1.jsx)("span", { className: "relative bg-surface px-sm", children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", tone: "muted", children: label }) })) : null] }));
}
/**
 * One social/SSO button (§9): the same 56 height as the CTA and the fields,
 * outlined rather than filled so it reads as the alternative to the form, with
 * the logo leading the label.
 */
exports.AuthProviderButton = React.forwardRef(function AuthProviderButton({ label, glyph, name, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": label, className: (0, cn_1.cn)('flex w-full items-center justify-center gap-sm bg-surface px-lg', 'rounded-[var(--xen-radius-full)] border border-border transition-opacity', 'hover:opacity-85 disabled:pointer-events-none disabled:opacity-50', CONTROL_H, className), ...rest, children: [glyph || name ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, name: name, size: "base" }) : null, (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "semibold", children: label })] }));
});
/** The register screen's default legal links — overridable, never hard-coded copy. */
exports.AUTH_DEFAULT_TERMS_LINKS = [
    { id: 'terms', label: 'Terms of Service' },
    { id: 'privacy', label: 'Privacy Policy' },
];
/**
 * The terms consent (§9 register): a checkbox in a **bordered card** with both
 * links inline, rather than a naked checkbox floating above the CTA. The card
 * is what makes the consent read as a thing the user is agreeing to instead of
 * one more form row to skim past.
 *
 * `onCheckedChange` is the boolean form both twins expose — the underlying web
 * `Checkbox` is a real DOM input whose `onChange` takes an event, so the
 * boolean lives one level up where it can have the same name on both platforms.
 */
function AuthTermsCard({ checked = false, onCheckedChange, label = 'I agree to the', links = exports.AUTH_DEFAULT_TERMS_LINKS, onLinkClick, separator = 'and', error, disabled = false, className, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-xs', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-sm rounded-[var(--xen-radius-lg)] border bg-surface p-md', error ? 'border-danger' : 'border-border', disabled && 'opacity-50'), children: [(0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { checked: checked, invalid: !!error, disabled: disabled, "aria-label": label, onChange: (e) => onCheckedChange?.(e.target.checked) }), (0, jsx_runtime_1.jsxs)(Text_1.Text, { size: "sm", tone: "muted", className: "flex-1", children: [label, ' ', links.map((link, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? `${separator} ` : '', (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled, onClick: () => onLinkClick?.(link.id), className: "font-semibold text-primary-text underline-offset-2 hover:underline", children: link.label }), i < links.length - 1 ? ' ' : ''] }, link.id)))] })] }), error ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", role: "alert", children: error })) : null] }));
}
/**
 * The centred footer line carrying the opposite action (§9). One line, one
 * emphasis: the prompt is muted, the action is `primary-text` and semibold.
 */
function AuthSwitchFooter({ prompt, label, onClick, disabled = false, className, ...rest }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-wrap items-center justify-center gap-xs', TAP_TARGET_MIN, className), ...rest, children: [prompt ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: prompt })) : null, (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, disabled: disabled, children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: "primaryText", children: label }) })] }));
}
/**
 * Centered card shell for auth screens (LoginForm/SignupForm/…). A themed
 * `Card` holding an optional brand tile, title + subtitle, the form
 * `children`, and an optional footer.
 *
 * `brandGlyph`/`brandIcon`, `align` and `titleSize` are additive: with none of
 * them passed the card renders as it always did (left-aligned `xl` title, `sm`
 * muted subtitle). Pass them to bring a composed form up to the screen-level §9
 * anatomy without rebuilding it. Bound to the theme tokens.
 */
function AuthCard({ title, subtitle, children, footer, brandGlyph, brandIcon, align = 'left', titleSize = 'xl', className, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('mx-auto w-full max-w-sm', className), children: (0, jsx_runtime_1.jsxs)(Card_1.Card, { className: "flex flex-col gap-md", children: [(0, jsx_runtime_1.jsx)(AuthBrandTile, { glyph: brandGlyph, name: brandIcon, align: align }), (0, jsx_runtime_1.jsx)(AuthHeading, { title: title, subtitle: subtitle != null && typeof subtitle === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", align: align === 'center' ? 'center' : 'left', children: subtitle })) : (subtitle), align: align, size: titleSize }), children, footer != null && (0, jsx_runtime_1.jsx)("div", { className: "text-center", children: footer })] }) }));
}
//# sourceMappingURL=AuthCard.js.map