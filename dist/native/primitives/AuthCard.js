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
exports.AUTH_DEFAULT_TERMS_LINKS = exports.AUTH_TAP_TARGET = exports.AUTH_CONTROL_HEIGHT = void 0;
exports.AuthBrandTile = AuthBrandTile;
exports.AuthHeading = AuthHeading;
exports.AuthField = AuthField;
exports.AuthSubmitButton = AuthSubmitButton;
exports.AuthStickyFooter = AuthStickyFooter;
exports.AuthDivider = AuthDivider;
exports.AuthProviderButton = AuthProviderButton;
exports.AuthTermsCard = AuthTermsCard;
exports.AuthSwitchFooter = AuthSwitchFooter;
exports.AuthCard = AuthCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("./Button");
const Card_1 = require("./Card");
const Checkbox_1 = require("./Checkbox");
const Icon_1 = require("./Icon");
const Text_1 = require("./Text");
/**
 * The auth family's shared anatomy — `AuthCard` and the parts every auth
 * surface is assembled from.
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
 * Everything here is presentational and token-bound: no literal colors, no
 * literal radii, no literal font sizes. The only bare numbers are the two
 * control heights below, which are geometry, not theme.
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
*/
exports.AUTH_CONTROL_HEIGHT = 56;
exports.AUTH_TAP_TARGET = 44;
/**
 * The rounded-square brand tile that opens every auth screen (§9): 56×56,
 * `primary` fill, `radius.lg`, top-**left**. Renders nothing at all when the
 * app supplies neither a glyph nor a name — §10.6, an empty state must not
 * leave a hole where a box would be.
 */
function AuthBrandTile({ glyph, name, align = 'left', accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (!glyph && !name)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                width: exports.AUTH_CONTROL_HEIGHT,
                height: exports.AUTH_CONTROL_HEIGHT,
                borderRadius: tokens.radius.lg,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
                alignSelf: align === 'center' ? 'center' : 'flex-start',
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, name: name, size: "2xl", color: "onPrimary", accessibilityLabel: accessibilityLabel }) }));
}
/**
 * Headline + muted subhead, drawn the same way on every auth surface. A string
 * is styled; any other node is rendered as given, so a caller can pass its own
 * markup without losing the block's rhythm.
 */
function AuthHeading({ title, subtitle, align = 'left', size = 'xl', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    if (title == null && subtitle == null)
        return null;
    const textAlign = align === 'center' ? 'center' : 'left';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { gap: tokens.spacing.xs, alignItems: align === 'center' ? 'center' : 'flex-start' },
            style,
        ], children: [title != null ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: size, weight: "bold", align: textAlign, accessibilityRole: "header", children: title })) : (title)) : null, subtitle != null ? (typeof subtitle === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", tone: "muted", align: textAlign, children: subtitle })) : (subtitle)) : null] }));
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
function AuthField({ label, icon, error, hint, secure = false, trailing, disabled = false, style, showLabel = 'Show password', hideLabel = 'Hide password', onFocus, onBlur, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [focused, setFocused] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const borderColor = error ? colors.danger : focused ? colors.primary : colors.border;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [label ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "medium", children: label })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    height: exports.AUTH_CONTROL_HEIGHT,
                    paddingHorizontal: tokens.spacing.md,
                    borderWidth: 1,
                    borderColor,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: colors.surface,
                    opacity: disabled ? 0.5 : 1,
                }, children: [icon ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: icon, size: "base", color: "muted" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityState: { disabled }, placeholderTextColor: colors.muted, secureTextEntry: secure && !visible, onFocus: (e) => {
                            setFocused(true);
                            onFocus?.(e);
                        }, onBlur: (e) => {
                            setFocused(false);
                            onBlur?.(e);
                        }, style: {
                            flex: 1,
                            padding: 0,
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                        }, ...rest }), secure ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: visible ? hideLabel : showLabel, accessibilityState: { selected: visible, disabled }, disabled: disabled, onPress: () => setVisible((v) => !v), hitSlop: (exports.AUTH_TAP_TARGET - tokens.typography.scale.base) / 2, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: visible ? 'eye-off' : 'eye', size: "base", color: visible ? 'primary' : 'muted' }) })) : null, trailing] }), error ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", accessibilityRole: "alert", children: error })) : hint ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: hint })) : null] }));
}
/**
 * The sticky CTA's button (§5): full width, **56 tall**, `radius.full`,
 * `primary` fill, `onPrimary` semibold label, trailing `→`.
 *
 * Disabled is the same shape at reduced opacity, never a different shape —
 * a button that changes size when it enables looks like it moved.
 */
function AuthSubmitButton({ label, onPress, loading = false, disabled = false, trailingArrow = true, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(Button_1.Button, { onPress: onPress, loading: loading, disabled: disabled, accessibilityLabel: label, style: [
            {
                height: exports.AUTH_CONTROL_HEIGHT,
                paddingVertical: 0,
                borderRadius: tokens.radius.full,
                alignSelf: 'stretch',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Text_1.Text, { size: "lg", weight: "semibold", tone: "onPrimary", children: label }), trailingArrow ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "forward", size: "base", color: "onPrimary", style: { marginLeft: tokens.spacing.sm } })) : null] }));
}
/**
 * The footer the CTA is pinned into (§5): a hairline `border` divider on top
 * and `surface` behind it, so scrolling content passes **under** the action
 * instead of colliding with it.
 */
function AuthStickyFooter({ children, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                padding: tokens.spacing.lg,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: children }));
}
/**
 * The "or continue with" separator (§9): one hairline running the full width
 * with the label sitting **on** it, knocked out by a `surface` patch — not two
 * stubs of rule with a gap between them.
 *
 * The caller decides whether it appears at all: a divider above nothing is the
 * empty state §10.6 forbids.
 */
function AuthDivider({ label, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ justifyContent: 'center', alignItems: 'center' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: colors.border } }), label ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: colors.surface, paddingHorizontal: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "xs", tone: "muted", children: label }) })) : null] }));
}
/**
 * One social/SSO button (§9): the same 56 height as the CTA and the fields,
 * outlined rather than filled so it reads as the alternative to the form, with
 * the logo leading the label.
 */
function AuthProviderButton({ label, glyph, name, disabled = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.sm,
                height: exports.AUTH_CONTROL_HEIGHT,
                paddingHorizontal: tokens.spacing.lg,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.surface,
                opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
            },
            style,
        ], children: [glyph || name ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, name: name, size: "base" }) : null, (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "base", weight: "semibold", children: label })] }));
}
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
 */
function AuthTermsCard({ checked = false, onCheckedChange, label = 'I agree to the', links = exports.AUTH_DEFAULT_TERMS_LINKS, onLinkPress, separator = 'and', error, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.md,
                    borderWidth: 1,
                    borderColor: error ? colors.danger : colors.border,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: colors.surface,
                    opacity: disabled ? 0.5 : 1,
                }, children: [(0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { checked: checked, onCheckedChange: onCheckedChange, disabled: disabled, invalid: !!error, accessibilityLabel: label }), (0, jsx_runtime_1.jsxs)(Text_1.Text, { size: "sm", tone: "muted", style: { flex: 1 }, children: [label, ' ', links.map((link, i) => ((0, jsx_runtime_1.jsxs)(Text_1.Text, { size: "sm", weight: "semibold", tone: "primaryText", children: [i > 0 ? `${separator} ` : '', (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: "primaryText", accessibilityRole: "link", onPress: disabled ? undefined : () => onLinkPress?.(link.id), children: link.label }), i < links.length - 1 ? ' ' : ''] }, link.id)))] })] }), error ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "dangerText", accessibilityRole: "alert", children: error })) : null] }));
}
/**
 * The centred footer line carrying the opposite action (§9). One line, one
 * emphasis: the prompt is muted, the action is `primaryText` and semibold.
 */
function AuthSwitchFooter({ prompt, label, onPress, disabled = false, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: exports.AUTH_TAP_TARGET,
                gap: tokens.spacing.xs,
            },
            style,
        ], children: [prompt ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: prompt })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, disabled: disabled, hitSlop: tokens.spacing.sm, children: (0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", weight: "semibold", tone: "primaryText", children: label }) })] }));
}
/**
 * Centered card shell for auth screens (LoginForm/SignupForm/…) — the native
 * mirror of the web `AuthCard`. A themed `Card` holding an optional brand tile,
 * title + subtitle, the form `children`, and an optional footer.
 *
 * `brandGlyph`/`brandIcon`, `align` and `titleSize` are additive: with none of
 * them passed the card renders exactly as it always did (left-aligned `xl`
 * title, `sm` muted subtitle). Pass them to bring a composed form up to the
 * screen-level §9 anatomy without rebuilding it.
 *
 * Token-bound; no literal colors. (`className` → `style` is the only idiomatic
 * swap from the web twin.)
 */
function AuthCard({ title, subtitle, children, footer, brandGlyph, brandIcon, align = 'left', titleSize = 'xl', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ width: '100%', maxWidth: 384, alignSelf: 'center' }, style], children: (0, jsx_runtime_1.jsxs)(Card_1.Card, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(AuthBrandTile, { glyph: brandGlyph, name: brandIcon, align: align }), (0, jsx_runtime_1.jsx)(AuthHeading, { title: title, subtitle: subtitle != null && typeof subtitle === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", align: align === 'center' ? 'center' : 'left', children: subtitle })) : (subtitle), align: align, size: titleSize }), children, footer != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center' }, children: typeof footer === 'string' ? ((0, jsx_runtime_1.jsx)(Text_1.Text, { size: "sm", tone: "muted", children: footer })) : (footer) })) : null] }) }));
}
//# sourceMappingURL=AuthCard.js.map