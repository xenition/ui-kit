import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AlertV4 } from '../primitives/AlertV4';
import { AuthBrandTileV4 } from '../primitives/AuthBrandTileV4';
import { AuthDividerV4 } from '../primitives/AuthDividerV4';
import { AuthFieldV4 } from '../primitives/AuthFieldV4';
import { AuthHeadingV4 } from '../primitives/AuthHeadingV4';
import { AuthProviderButtonV4 } from '../primitives/AuthProviderButtonV4';
import { AuthStickyFooterV4 } from '../primitives/AuthStickyFooterV4';
import { AuthSwitchFooterV4 } from '../primitives/AuthSwitchFooterV4';
import { AuthTermsCardV4 } from '../primitives/AuthTermsCardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressLayer } from '../primitives/internal/state-v4';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import { ProgressDotsV4 } from './ProgressDotsV4';
import {
  FlowHeaderV4,
  flowGrounds,
  type FlowLegalLink,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import { FlowLinkV4 } from './internal/flow-v4';
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
export function SignInScreenV4({
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
  onTermsLinkPress,
  providers = [],
  onProviderPress,
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
  onLegalLinkPress,
  pinSwitchFooter = false,
  ground = 'plain',
  accent = 'primary',
  style,
}: SignInScreenV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const grounds = flowGrounds(theme, ground, accent);

  const register = mode === 'register';
  const gated = requireTerms ?? register;

  // The footer carries the *opposite* action, so which callback it fires
  // depends on the mode. A host that renders both modes from one prop set
  // usually wires only the one it thinks in, so the other is the fallback
  // rather than leaving the footer silently absent.
  const switchPress = register
    ? (onSwitchToSignIn ?? onSwitchToSignUp)
    : (onSwitchToSignUp ?? onSwitchToSignIn);

  const switchFooter = switchPress ? (
    <AuthSwitchFooterV4
      prompt={switchPrompt ?? (register ? 'Already have an account?' : "Don't have an account?")}
      label={switchLabel ?? (register ? 'Sign in' : 'Sign up')}
      onPress={switchPress}
      disabled={pending}
    />
  ) : null;

  const legal = legalLinks?.filter((link) => link.label) ?? [];

  return (
    <View style={[{ flex: 1, backgroundColor: grounds.page }, style]}>
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

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.lg,
        }}
      >
        <AuthBrandTileV4 glyph={logoGlyph} name={logoIcon} align="left" />

        <AuthHeadingV4
          title={title ?? (register ? 'Create account' : 'Welcome back')}
          subtitle={subtitle}
          align="left"
          size="3xl"
        />

        {error ? <AlertV4 tone="danger">{error}</AlertV4> : null}

        <View style={{ gap: tokens.spacing.md }}>
          {register ? (
            <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
              <AuthFieldV4
                style={{ flex: 1 }}
                label={firstNameLabel}
                icon="user"
                accessibilityLabel={firstNameLabel}
                placeholder={firstNamePlaceholder}
                autoComplete="name-given"
                textContentType="givenName"
                error={firstNameError}
                disabled={pending}
                value={firstName}
                onChangeText={onFirstNameChange}
              />
              <AuthFieldV4
                style={{ flex: 1 }}
                label={lastNameLabel}
                icon="user"
                accessibilityLabel={lastNameLabel}
                placeholder={lastNamePlaceholder}
                autoComplete="name-family"
                textContentType="familyName"
                error={lastNameError}
                disabled={pending}
                value={lastName}
                onChangeText={onLastNameChange}
              />
            </View>
          ) : null}

          <AuthFieldV4
            label={emailLabel}
            icon="mail"
            accessibilityLabel={emailLabel}
            placeholder={emailPlaceholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            error={emailError}
            disabled={pending}
            value={email}
            onChangeText={onEmailChange}
          />

          <AuthFieldV4
            secure
            label={passwordLabel}
            icon="lock"
            accessibilityLabel={passwordLabel}
            placeholder={passwordPlaceholder}
            autoCapitalize="none"
            autoComplete={register ? 'password-new' : 'password'}
            textContentType={register ? 'newPassword' : 'password'}
            error={passwordError}
            disabled={pending}
            value={password}
            onChangeText={onPasswordChange}
          />

          {/* §9: right-aligned under the password on sign-in, and nowhere at
              all on register — there is no password to have forgotten for an
              account that does not exist yet. */}
          {!register && onForgotPassword ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={forgotLabel}
              onPress={onForgotPassword}
              disabled={pending}
              style={({ pressed }) => ({
                alignSelf: 'flex-end',
                justifyContent: 'center',
                minHeight: minTap(tokens.spacing),
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? pressLayer(theme) : 'transparent',
              })}
            >
              <TextV4 size="sm" weight="semibold" tone="primaryText">
                {forgotLabel}
              </TextV4>
            </Pressable>
          ) : null}

          {register && gated ? (
            <AuthTermsCardV4
              checked={termsAccepted}
              onCheckedChange={onTermsChange}
              label={termsLabel}
              links={termsLinks}
              onLinkPress={onTermsLinkPress}
              error={termsError}
              disabled={pending}
            />
          ) : null}
        </View>

        {/* The guard is on the whole block, divider included: a rule labelled
            "or continue with" above nothing is worse than no rule. */}
        {providers.length > 0 ? (
          <View style={{ gap: tokens.spacing.md }}>
            <AuthDividerV4 label={providersLabel} />
            <View style={{ gap: tokens.spacing.sm }}>
              {providers.map((provider) => (
                <AuthProviderButtonV4
                  key={provider.id}
                  label={provider.label}
                  glyph={provider.glyph}
                  disabled={pending}
                  onPress={() => onProviderPress?.(provider.id)}
                />
              ))}
            </View>
          </View>
        ) : null}

        {pinSwitchFooter ? null : switchFooter}
      </ScrollView>

      <AuthStickyFooterV4>
        <GetStartedButtonV4
          label={submitLabel ?? (register ? 'Create account' : 'Sign in')}
          onPress={onSubmit}
          loading={pending}
          disabled={register && gated && !termsAccepted}
        />
        {pinSwitchFooter ? switchFooter : null}
        {legal.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.sm,
            }}
          >
            {legal.map((link, i) => (
              <React.Fragment key={link.id}>
                {i > 0 ? (
                  <TextV4 size="xs" tone="mutedText">
                    ·
                  </TextV4>
                ) : null}
                <FlowLinkV4
                  label={link.label}
                  emphasis="tertiary"
                  onPress={onLegalLinkPress ? () => onLegalLinkPress(link.id) : undefined}
                />
              </React.Fragment>
            ))}
          </View>
        ) : null}
      </AuthStickyFooterV4>
    </View>
  );
}
