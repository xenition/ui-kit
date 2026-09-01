import * as React from 'react';
import { type FlowLegalLink, type OnboardingFlowV4Props } from './internal/flow-v4';
import type { SignInScreenProps } from './SignInScreen';
export interface SignInScreenV4Props extends SignInScreenProps, OnboardingFlowV4Props {
    /** Back affordance in the header. Omit on the flow's first screen. */
    onBack?: () => void;
    /** Dismiss affordance in the header. */
    onDismiss?: () => void;
    /** Total steps in the surrounding flow — draws the segmented bars. */
    stepCount?: number;
    /** Zero-based position within {@link stepCount}. Default `0`. */
    stepIndex?: number;
    /** Terms · Privacy, inline under the CTA. */
    legalLinks?: FlowLegalLink[];
    onLegalLinkPress?: (id: string) => void;
    /**
     * Announce the switch footer as part of the pinned band rather than as the
     * last thing in the scrolling form. Default `false`.
     *
     * On a short screen the two look identical. On a register form with a terms
     * card, "Already have an account? Sign in" scrolls off the bottom, and a
     * user who is on the wrong screen is the one person guaranteed not to scroll
     * to the end of it.
     */
    pinSwitchFooter?: boolean;
}
/**
 * **V4 sign-in / register** — the base's props plus the header controls
 * (`onBack`, `onDismiss`, `stepCount`), `legalLinks`, `pinSwitchFooter` and
 * the line's `ground`/`accent`.
 *
 * §9's anatomy, on the V4 auth primitives: brand tile top-left (not centred),
 * a `3xl` headline, the fields at the shared control height with leading
 * icons, a right-aligned "Forgot password?", the sticky CTA, an "or continue
 * with" divider, the provider buttons, and a footer carrying the opposite
 * action.
 *
 * ## Five changes
 *
 * 1. **Every part is its V4 twin.** The base composed `AuthField`,
 *    `AuthBrandTile`, `AuthProviderButton` and the rest from the base line, so
 *    a screen built with V4 components everywhere else had base-line auth
 *    fields in the middle of it. This is the mechanical half of the pass and
 *    the visible one: control height, focus ring, error text and press state
 *    all change to the shared answer.
 * 2. **The screen has a header.** Every other screen in the funnel does, and
 *    the base's sign-in was the one place a user could not go back or see how
 *    far through they were.
 * 3. **The switch footer can be pinned** — see `pinSwitchFooter`.
 * 4. **Legal links have a home** under the CTA, where a register screen needs
 *    them.
 * 5. **The forgot link takes a press layer and a real tap target**, instead of
 *    being a bare `Text` in a `Pressable` with `hitSlop`.
 *
 * Both modes must render with `providers={[]}` — an app with no social
 * sign-in must not show a rule labelled "or continue with" above nothing — and
 * the guard is on the whole block, divider included.
 */
export declare function SignInScreenV4({ mode, title, subtitle, logoGlyph, logoIcon, email, onEmailChange, password, onPasswordChange, firstName, onFirstNameChange, lastName, onLastNameChange, onSubmit, submitLabel, pending, error, emailError, passwordError, firstNameError, lastNameError, termsError, requireTerms, termsAccepted, onTermsChange, termsLabel, termsLinks, onTermsLinkPress, providers, onProviderPress, providersLabel, onForgotPassword, forgotLabel, onSwitchToSignUp, onSwitchToSignIn, switchPrompt, switchLabel, emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder, firstNameLabel, firstNamePlaceholder, lastNameLabel, lastNamePlaceholder, onBack, onDismiss, stepCount, stepIndex, legalLinks, onLegalLinkPress, pinSwitchFooter, ground, accent, style, }: SignInScreenV4Props): React.ReactElement;
//# sourceMappingURL=SignInScreenV4.d.ts.map