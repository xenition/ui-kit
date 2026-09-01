import * as React from 'react';
import { cn } from '../primitives/cn';
import { AlertV4 } from '../primitives/AlertV4';
import { AuthBrandTileV4 } from '../primitives/AuthBrandTileV4';
import { AuthDividerV4 } from '../primitives/AuthDividerV4';
import { AuthFieldV4 } from '../primitives/AuthFieldV4';
import { AuthHeadingV4 } from '../primitives/AuthHeadingV4';
import { AuthProviderButtonV4 } from '../primitives/AuthProviderButtonV4';
import { AuthStickyFooterV4 } from '../primitives/AuthStickyFooterV4';
import { AuthSwitchFooterV4 } from '../primitives/AuthSwitchFooterV4';
import { AuthTermsCardV4 } from '../primitives/AuthTermsCardV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import { ProgressDotsV4 } from './ProgressDotsV4';
import {
  FlowHeaderV4,
  FlowLinkV4,
  flowGroundVars,
  type FlowLegalLink,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
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
  onLegalLinkClick?: (id: string) => void;
  /**
   * Move the switch footer into the pinned band rather than leaving it as the
   * last thing in the scrolling form. Default `false`.
   *
   * On a short screen the two look identical. On a register form with a terms
   * card, "Already have an account? Sign in" scrolls off the bottom — and a
   * user who is on the wrong screen is the one person guaranteed not to scroll
   * to the end of it.
   */
  pinSwitchFooter?: boolean;
}

/**
 * **V4 sign-in / register** — the web twin of the native `SignInScreenV4`: the
 * base's props plus the header controls (`onBack`, `onDismiss`, `stepCount`),
 * `legalLinks`, `pinSwitchFooter` and the line's `ground`/`accent`.
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
 *    a page built with V4 components everywhere else had base-line auth fields
 *    in the middle of it. Control height, focus ring, error text and hover
 *    state all move to the shared answer.
 * 2. **The screen has a header.** Every other screen in the funnel does, and
 *    sign-in was the one place a user could not go back or see how far through
 *    they were.
 * 3. **The switch footer can be pinned** — see `pinSwitchFooter`.
 * 4. **Legal links have a home** under the CTA, where a register screen needs
 *    them.
 * 5. **The forgot link is a real control** — a tap target with the shared
 *    state layer and focus ring, rather than a bare span.
 *
 * Both modes must render with `providers={[]}` — an app with no social sign-in
 * must not show a rule labelled "or continue with" above nothing — and the
 * guard is on the whole block, divider included.
 */
export const SignInScreenV4 = React.forwardRef<HTMLDivElement, SignInScreenV4Props>(
  function SignInScreenV4(
    {
      mode = 'signIn',
      title,
      subtitle,
      logoGlyph,
      logoIcon,
      email,
      onEmailChange,
      password,
      onPasswordChange,
      firstName = '',
      onFirstNameChange,
      lastName = '',
      onLastNameChange,
      onSubmit,
      submitLabel,
      pending = false,
      error,
      emailError,
      passwordError,
      firstNameError,
      lastNameError,
      termsError,
      requireTerms,
      termsAccepted = false,
      onTermsChange,
      termsLabel,
      termsLinks,
      onTermsLinkClick,
      providers = [],
      onProviderClick,
      providersLabel = 'or continue with',
      onForgotPassword,
      forgotLabel = 'Forgot password?',
      onSwitchToSignUp,
      onSwitchToSignIn,
      switchPrompt,
      switchLabel,
      emailLabel = 'Email',
      emailPlaceholder = 'you@example.com',
      passwordLabel = 'Password',
      passwordPlaceholder = 'Your password',
      firstNameLabel = 'First name',
      firstNamePlaceholder = 'Ada',
      lastNameLabel = 'Last name',
      lastNamePlaceholder = 'Lovelace',
      onBack,
      onDismiss,
      stepCount,
      stepIndex = 0,
      legalLinks,
      onLegalLinkClick,
      pinSwitchFooter = false,
      ground = 'plain',
      accent = 'primary',
      className,
      style,
      ...rest
    },
    ref
  ) {
    const register = mode === 'register';
    const gated = requireTerms ?? register;

    // The footer carries the *opposite* action, so which callback it fires
    // depends on the mode. A host that renders both modes from one prop set
    // usually wires only the one it thinks in, so the other is the fallback
    // rather than leaving the footer silently absent.
    const switchClick = register
      ? (onSwitchToSignIn ?? onSwitchToSignUp)
      : (onSwitchToSignUp ?? onSwitchToSignIn);

    const switchFooter = switchClick ? (
      <AuthSwitchFooterV4
        prompt={switchPrompt ?? (register ? 'Already have an account?' : "Don't have an account?")}
        label={switchLabel ?? (register ? 'Sign in' : 'Sign up')}
        onClick={switchClick}
        disabled={pending}
      />
    ) : null;

    const legal = legalLinks?.filter((link) => link.label) ?? [];

    return (
      <div
        ref={ref}
        style={{ ...flowGroundVars(ground, accent), ...style }}
        className={cn('flex min-h-full flex-col bg-[var(--flow-page)]', className)}
        {...rest}
      >
        <FlowHeaderV4
          onBack={onBack}
          onDismiss={onDismiss}
          progress={
            stepCount != null && stepCount > 0 ? (
              <ProgressDotsV4
                variant="bars"
                accent={accent}
                count={stepCount}
                activeIndex={stepIndex}
              />
            ) : null
          }
        />

        <div className="flex min-h-0 flex-1 flex-col gap-lg overflow-y-auto p-lg">
          <AuthBrandTileV4 glyph={logoGlyph} name={logoIcon} align="left" />

          <AuthHeadingV4
            title={title ?? (register ? 'Create account' : 'Welcome back')}
            subtitle={subtitle}
            align="left"
            size="3xl"
          />

          {error ? <AlertV4 tone="danger">{error}</AlertV4> : null}

          <div className="flex flex-col gap-md">
            {register ? (
              <div className="flex gap-sm">
                <AuthFieldV4
                  className="flex-1"
                  label={firstNameLabel}
                  icon="user"
                  placeholder={firstNamePlaceholder}
                  autoComplete="given-name"
                  error={firstNameError}
                  disabled={pending}
                  value={firstName}
                  onChangeText={onFirstNameChange}
                />
                <AuthFieldV4
                  className="flex-1"
                  label={lastNameLabel}
                  icon="user"
                  placeholder={lastNamePlaceholder}
                  autoComplete="family-name"
                  error={lastNameError}
                  disabled={pending}
                  value={lastName}
                  onChangeText={onLastNameChange}
                />
              </div>
            ) : null}

            <AuthFieldV4
              label={emailLabel}
              icon="mail"
              inputType="email"
              placeholder={emailPlaceholder}
              autoComplete="email"
              error={emailError}
              disabled={pending}
              value={email}
              onChangeText={onEmailChange}
            />

            <AuthFieldV4
              secure
              label={passwordLabel}
              icon="lock"
              placeholder={passwordPlaceholder}
              autoComplete={register ? 'new-password' : 'current-password'}
              error={passwordError}
              disabled={pending}
              value={password}
              onChangeText={onPasswordChange}
            />

            {/* §9: right-aligned under the password on sign-in, and nowhere at
                all on register — there is no password to have forgotten for an
                account that does not exist yet. */}
            {!register && onForgotPassword ? (
              <button
                type="button"
                onClick={onForgotPassword}
                disabled={pending}
                data-xen-v4-chrome="on-surface"
                className={cn(
                  'self-end rounded-[var(--xen-radius-md)] px-sm text-sm font-semibold text-primary-text',
                  MIN_TAP_CLASS
                )}
              >
                {forgotLabel}
              </button>
            ) : null}

            {register && gated ? (
              <AuthTermsCardV4
                checked={termsAccepted}
                onCheckedChange={onTermsChange}
                label={termsLabel}
                links={termsLinks}
                onLinkClick={onTermsLinkClick}
                error={termsError}
                disabled={pending}
              />
            ) : null}
          </div>

          {/* The guard is on the whole block, divider included: a rule labelled
              "or continue with" above nothing is worse than no rule. */}
          {providers.length > 0 ? (
            <div className="flex flex-col gap-md">
              <AuthDividerV4 label={providersLabel} />
              <div className="flex flex-col gap-sm">
                {providers.map((provider) => (
                  <AuthProviderButtonV4
                    key={provider.id}
                    label={provider.label}
                    glyph={provider.glyph}
                    disabled={pending}
                    onClick={() => onProviderClick?.(provider.id)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {pinSwitchFooter ? null : switchFooter}
        </div>

        <AuthStickyFooterV4>
          <GetStartedButtonV4
            label={submitLabel ?? (register ? 'Create account' : 'Sign in')}
            onClick={onSubmit}
            loading={pending}
            disabled={register && gated && !termsAccepted}
          />
          {pinSwitchFooter ? switchFooter : null}
          {legal.length > 0 ? (
            <p className="flex items-center justify-center gap-sm text-xs text-muted-text">
              {legal.map((link, i) => (
                <React.Fragment key={link.id}>
                  {i > 0 ? <span aria-hidden>·</span> : null}
                  <FlowLinkV4
                    label={link.label}
                    emphasis="tertiary"
                    onClick={onLegalLinkClick ? () => onLegalLinkClick(link.id) : undefined}
                  />
                </React.Fragment>
              ))}
            </p>
          ) : null}
        </AuthStickyFooterV4>
      </div>
    );
  }
);
