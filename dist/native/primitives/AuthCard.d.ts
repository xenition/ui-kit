import * as React from 'react';
import { type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
import { type TextSize } from './Text';
import type { IconName } from '../../primitives/icon-names';
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
export declare const AUTH_CONTROL_HEIGHT = 56;
export declare const AUTH_TAP_TARGET = 44;
/** Horizontal alignment for the brand tile + headline block. */
export type AuthAlign = 'left' | 'center';
export interface AuthBrandTileProps {
    /** One-off brand glyph/emoji. The kit ships no brand marks. */
    glyph?: string;
    /** A name from the kit's icon set, when the app has no mark of its own. */
    name?: IconName;
    /** Where the tile sits. Default `'left'` — §9 is explicit that it is not centred. */
    align?: AuthAlign;
    /** Announced label. Decorative by default. */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * The rounded-square brand tile that opens every auth screen (§9): 56×56,
 * `primary` fill, `radius.lg`, top-**left**. Renders nothing at all when the
 * app supplies neither a glyph nor a name — §10.6, an empty state must not
 * leave a hole where a box would be.
 */
export declare function AuthBrandTile({ glyph, name, align, accessibilityLabel, style, }: AuthBrandTileProps): React.ReactElement | null;
export interface AuthHeadingProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    /** Default `'left'` — the auth screens are the one place §4 left-aligns. */
    align?: AuthAlign;
    /** Headline step. Default `'xl'`; the screen-level auth surfaces pass `'3xl'`. */
    size?: TextSize;
    style?: StyleProp<ViewStyle>;
}
/**
 * Headline + muted subhead, drawn the same way on every auth surface. A string
 * is styled; any other node is rendered as given, so a caller can pass its own
 * markup without losing the block's rhythm.
 */
export declare function AuthHeading({ title, subtitle, align, size, style, }: AuthHeadingProps): React.ReactElement | null;
export interface AuthFieldProps extends Omit<TextInputProps, 'style' | 'editable' | 'secureTextEntry'> {
    /** Visible label above the control. Optional — §6 forbids faking one with a placeholder. */
    label?: string;
    /** Leading icon from the named set (`'mail'`, `'lock'`, `'user'`). */
    icon?: IconName;
    /** Validation message. Renders a `danger` border AND the message in `dangerText`. */
    error?: string | null;
    /** Helper text below the control, shown when there is no error. */
    hint?: string;
    /** Masks the text and adds the eye toggle (§6's "trailing affordance where it earns one"). */
    secure?: boolean;
    /** Extra trailing affordance (a clear `✕`, a unit). Rendered after the eye. */
    trailing?: React.ReactNode;
    /** Freezes the control and dims it. */
    disabled?: boolean;
    /** Wrapper style override — layout only. */
    style?: StyleProp<ViewStyle>;
    /** Show/hide copy for the secure toggle. */
    showLabel?: string;
    hideLabel?: string;
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
export declare function AuthField({ label, icon, error, hint, secure, trailing, disabled, style, showLabel, hideLabel, onFocus, onBlur, ...rest }: AuthFieldProps): React.ReactElement;
export interface AuthSubmitButtonProps {
    label: string;
    onPress?: () => void;
    loading?: boolean;
    disabled?: boolean;
    /** Trailing `→` on a forward action; drop it on a terminal one (§5). Default `true`. */
    trailingArrow?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * The sticky CTA's button (§5): full width, **56 tall**, `radius.full`,
 * `primary` fill, `onPrimary` semibold label, trailing `→`.
 *
 * Disabled is the same shape at reduced opacity, never a different shape —
 * a button that changes size when it enables looks like it moved.
 */
export declare function AuthSubmitButton({ label, onPress, loading, disabled, trailingArrow, style, }: AuthSubmitButtonProps): React.ReactElement;
export interface AuthStickyFooterProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * The footer the CTA is pinned into (§5): a hairline `border` divider on top
 * and `surface` behind it, so scrolling content passes **under** the action
 * instead of colliding with it.
 */
export declare function AuthStickyFooter({ children, style }: AuthStickyFooterProps): React.ReactElement;
export interface AuthDividerProps {
    /** Copy centred on the rule. Without it the rule is drawn bare. */
    label?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * The "or continue with" separator (§9): one hairline running the full width
 * with the label sitting **on** it, knocked out by a `surface` patch — not two
 * stubs of rule with a gap between them.
 *
 * The caller decides whether it appears at all: a divider above nothing is the
 * empty state §10.6 forbids.
 */
export declare function AuthDivider({ label, style }: AuthDividerProps): React.ReactElement;
export interface AuthProviderButtonProps {
    label: string;
    /** One-off brand glyph — the kit ships no Google/Apple marks. */
    glyph?: string;
    /** A name from the kit's icon set, for a non-brand provider (`'mail'`, `'phone'`). */
    name?: IconName;
    disabled?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One social/SSO button (§9): the same 56 height as the CTA and the fields,
 * outlined rather than filled so it reads as the alternative to the form, with
 * the logo leading the label.
 */
export declare function AuthProviderButton({ label, glyph, name, disabled, onPress, style, }: AuthProviderButtonProps): React.ReactElement;
/** One inline legal link inside {@link AuthTermsCard}. */
export interface AuthTermsLink {
    /** Stable key handed back to the press callback. */
    id: string;
    /** Link copy (e.g. `'Terms of Service'`). */
    label: string;
}
export interface AuthTermsCardProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    /** Lead-in copy. Default `'I agree to the'`. */
    label?: string;
    /** The inline links. Default: Terms of Service + Privacy Policy. */
    links?: AuthTermsLink[];
    /** Fires with the link's `id`. */
    onLinkPress?: (id: string) => void;
    /** Word joining the last two links. Default `'and'`. */
    separator?: string;
    error?: string | null;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/** The register screen's default legal links — overridable, never hard-coded copy. */
export declare const AUTH_DEFAULT_TERMS_LINKS: AuthTermsLink[];
/**
 * The terms consent (§9 register): a checkbox in a **bordered card** with both
 * links inline, rather than a naked checkbox floating above the CTA. The card
 * is what makes the consent read as a thing the user is agreeing to instead of
 * one more form row to skim past.
 */
export declare function AuthTermsCard({ checked, onCheckedChange, label, links, onLinkPress, separator, error, disabled, style, }: AuthTermsCardProps): React.ReactElement;
export interface AuthSwitchFooterProps {
    /** Lead-in copy ("Don't have an account?"). */
    prompt?: string;
    /** The action ("Register"). */
    label: string;
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * The centred footer line carrying the opposite action (§9). One line, one
 * emphasis: the prompt is muted, the action is `primaryText` and semibold.
 */
export declare function AuthSwitchFooter({ prompt, label, onPress, disabled, style, }: AuthSwitchFooterProps): React.ReactElement;
export interface AuthCardProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    /** Brand glyph for the §9 tile above the headline. Nothing renders without it. */
    brandGlyph?: string;
    /** Brand icon from the named set, for an app with no mark of its own. */
    brandIcon?: IconName;
    /** Headline alignment. Default `'left'` — the historical rendering. */
    align?: AuthAlign;
    /** Headline step. Default `'xl'` — the historical rendering. */
    titleSize?: TextSize;
    /** Wrapper style override — the native mirror of the web `className`. */
    style?: StyleProp<ViewStyle>;
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
export declare function AuthCard({ title, subtitle, children, footer, brandGlyph, brandIcon, align, titleSize, style, }: AuthCardProps): React.ReactElement;
//# sourceMappingURL=AuthCard.d.ts.map