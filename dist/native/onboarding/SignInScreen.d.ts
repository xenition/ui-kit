import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type AuthAlign, type AuthTermsLink } from '../primitives/AuthCard';
import type { TextSize } from '../primitives/Text';
import type { IconName } from '../../primitives/icon-names';
import type { SignInProvider } from './types';
/** Which of the two auth screens this is. Default `'signIn'`. */
export type SignInMode = 'signIn' | 'register';
export interface SignInScreenProps {
    /**
     * `'signIn'` (default) or `'register'`. §9 gives both screens **one**
     * anatomy — the same brand tile, headline, 56px fields, sticky CTA, divider,
     * providers and footer — differing only in which fields appear and whether
     * consent gates the CTA. Two screens with one anatomy beats two components
     * that drift apart the first time one of them is touched.
     */
    mode?: SignInMode;
    /** Headline. Defaults to `'Welcome back'` / `'Create account'` by mode. */
    title?: string;
    /** Supporting line under the title. */
    subtitle?: string;
    /** Emoji/glyph for the §9 brand tile. Nothing renders without one. */
    logoGlyph?: string;
    /** Brand tile icon from the kit's named set, for an app with no mark. */
    logoIcon?: IconName;
    /** Controlled email value. */
    email: string;
    /** Fires with the new email text. */
    onEmailChange: (value: string) => void;
    /** Controlled password value. */
    password: string;
    /** Fires with the new password text. */
    onPasswordChange: (value: string) => void;
    /** Controlled first name — `register` only, rendered on a row with the last name (§6). */
    firstName?: string;
    onFirstNameChange?: (value: string) => void;
    /** Controlled last name — `register` only. */
    lastName?: string;
    onLastNameChange?: (value: string) => void;
    /** Fires when the primary CTA is pressed. The host does the signing in. */
    onSubmit: () => void;
    /** Primary CTA copy. Defaults to `'Sign in'` / `'Create account'` by mode. */
    submitLabel?: string;
    /** Spinner on the CTA and every control disabled while the host awaits. */
    pending?: boolean;
    /** Form-level failure ("Wrong email or password", "You're offline"). */
    error?: string | null;
    /** Field-level message under the email input. */
    emailError?: string | null;
    /** Field-level message under the password input. */
    passwordError?: string | null;
    /** Field-level message under the first-name input. */
    firstNameError?: string | null;
    /** Field-level message under the last-name input. */
    lastNameError?: string | null;
    /** Message under the terms card (e.g. "Please accept the terms"). */
    termsError?: string | null;
    /**
     * Whether consent gates the CTA. Defaults to `true` in `register` mode and
     * `false` in `signIn` — so the terms card and the disabled CTA are exactly
     * the §9 register behaviour, and no existing sign-in caller is affected.
     * Pass `false` in register mode for an app whose legal copy lives elsewhere.
     */
    requireTerms?: boolean;
    /** Controlled consent state. */
    termsAccepted?: boolean;
    /** Fires with the next consent value. */
    onTermsChange?: (accepted: boolean) => void;
    /** Consent lead-in copy. Default `'I agree to the'`. */
    termsLabel?: string;
    /** The inline legal links. Defaults to Terms of Service + Privacy Policy. */
    termsLinks?: AuthTermsLink[];
    /** Fires with the pressed link's `id`. */
    onTermsLinkPress?: (id: string) => void;
    /** Social/SSO providers to offer. The whole block — divider included — is hidden when empty. */
    providers?: SignInProvider[];
    /** Fires with the provider's `id`. */
    onProviderPress?: (id: string) => void;
    /** Separator copy centred on the divider rule. Default `'or continue with'`. */
    providersLabel?: string;
    /** Fires on the forgot-password link. Hidden when omitted, and in `register` mode. */
    onForgotPassword?: () => void;
    /** Forgot-password copy. Default `'Forgot password?'`. */
    forgotLabel?: string;
    /** Fires on the switch to sign-up (the footer action in `signIn` mode). */
    onSwitchToSignUp?: () => void;
    /** Fires on the switch to sign-in (the footer action in `register` mode). */
    onSwitchToSignIn?: () => void;
    /** Lead-in copy for the switch. Defaults by mode. */
    switchPrompt?: string;
    /** Switch link copy. Defaults by mode. */
    switchLabel?: string;
    /** Field copy — every string a user reads is the host's to localize. */
    emailLabel?: string;
    emailPlaceholder?: string;
    passwordLabel?: string;
    passwordPlaceholder?: string;
    firstNameLabel?: string;
    firstNamePlaceholder?: string;
    lastNameLabel?: string;
    lastNamePlaceholder?: string;
    style?: StyleProp<ViewStyle>;
}
/** How one design line wants the shared parts drawn. */
export interface SignInPartsOptions {
    /** Headline step. Base/V2 use `'3xl'` (§9); V3 compacts to `'xl'`. */
    headingSize?: TextSize;
    /** Headline + brand alignment. Default `'left'` — §9 is explicit. */
    align?: AuthAlign;
    /** Tint the CTA's trailing arrow off for a terminal action. Default `true` (§5). */
    trailingArrow?: boolean;
}
/**
 * The parts of the auth anatomy, already wired to the props.
 *
 * The three design lines below differ in **layout**, not in what they are made
 * of: the same brand tile, the same 56px fields, the same divider, the same
 * CTA. Building those once here is what makes that claim true rather than
 * aspirational — a change to the field treatment cannot land in the base
 * screen and miss V3.
 */
export interface SignInParts {
    brand: React.ReactElement | null;
    heading: React.ReactElement | null;
    /** Form-level failure banner, or `null`. */
    alert: React.ReactElement | null;
    /** Every input, the forgot link and the terms card, in §9 order. */
    fields: React.ReactElement;
    /** Divider + provider buttons, or `null` when there are no providers. */
    providers: React.ReactElement | null;
    /** Centred footer line carrying the opposite action, or `null`. */
    switchFooter: React.ReactElement | null;
    /** The §5 CTA. */
    cta: React.ReactElement;
    /** Resolved mode flags, for a line that needs to branch. */
    register: boolean;
}
/**
 * Resolve {@link SignInScreenProps} into the shared anatomy. Exported for the
 * V2/V3 lines in this module; not part of the package's public surface.
 */
export declare function useSignInParts(props: SignInScreenProps, options?: SignInPartsOptions): SignInParts;
/**
 * Screen-level sign-in **and** register — the auth half of the onboarding
 * anatomy in `ONBOARDING-DESIGN-SPEC.md` §9.
 *
 * What was thin about the old screen: an 80px medallion centred over a centred
 * `2xl` headline, two bare 40px `Field`+`Input` boxes, a flat mid-page button,
 * and two stubs of hairline either side of "or continue with". Nothing had a
 * dominant element and nothing had a floor — it read as a form, not a front
 * door.
 *
 * What this is instead:
 *
 * - a 56×56 brand tile top-**left**, so the eye starts where the reading does;
 * - a `3xl` bold headline with a muted subhead under it;
 * - 56px fields with muted leading icons (`mail`, `lock`, `user`), a focus
 *   border in `primary`, and errors drawn as a `danger` border **and** a
 *   message in `dangerText`;
 * - the forgot link right-aligned where the thumb already is;
 * - the CTA pinned into a sticky footer — 56 tall, `radius.full`, trailing `→`
 *   — with a hairline above it so content scrolls under rather than colliding;
 * - "or continue with" centred **on** one continuous rule, and provider
 *   buttons at the same 56 height so the alternative path is not visibly
 *   cheaper than the form;
 * - a centred footer line carrying the opposite action.
 *
 * `mode="register"` renders the §9 register variant from the same parts:
 * First/Last on one row, email, password, a terms checkbox in a bordered card
 * with both links inline, and a CTA that stays disabled until it is ticked.
 *
 * Every empty state is composed: no `logoGlyph` means no tile rather than an
 * empty box, no `subtitle` means no gap, and `providers={[]}` hides the divider
 * along with the buttons.
 *
 * **Presentational only**, like everything else in the kit: fully controlled,
 * it takes callbacks and shaped data and fetches nothing. Wire `onSubmit` to
 * `@xenition/sdk` auth, Supabase, or whatever the app uses. Every color and
 * space comes from the compiled tokens. No literal colors.
 */
export declare function SignInScreen(props: SignInScreenProps): React.ReactElement;
//# sourceMappingURL=SignInScreen.d.ts.map