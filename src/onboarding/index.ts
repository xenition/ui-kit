/**
 * `@xenition/ui/onboarding` — first-run, auth-flow, paywall and monetization
 * components for React DOM (the web parity of `@xenition/ui/native/onboarding`).
 * Presentational only: the app owns the data and callbacks, nothing here fetches
 * or persists. Every color traces to a `--xen-*` token class (no literal
 * colors), and the flow follows the product design guide — paywall-after-value
 * (§27-28), staged onboarding (§41-42), contextual "explain-then-ask"
 * permissions (§17) and outcome-oriented copy (§47).
 *
 * Composed from the shared `../primitives` (Card, Button, Icon, Badge, PinInput,
 * Segmented, Avatar, Spinner, …) and `../commerce` (EmptyState) so a theme-seed
 * change restyles the entire funnel, dark mode included.
 */

export { OnboardingSlides } from './OnboardingSlides';
export type { OnboardingSlidesProps, OnboardingSlidesVariant } from './OnboardingSlides';
export { OnboardingSlidesV2 } from './OnboardingSlidesV2';
export type { OnboardingSlidesV2Props } from './OnboardingSlidesV2';
export { OnboardingSlidesV3 } from './OnboardingSlidesV3';
export type { OnboardingSlidesV3Props } from './OnboardingSlidesV3';

export { WelcomeScreen } from './WelcomeScreen';
export type { WelcomeScreenProps, WelcomeScreenVariant } from './WelcomeScreen';
export { WelcomeScreenV2 } from './WelcomeScreenV2';
export type { WelcomeScreenV2Props } from './WelcomeScreenV2';
export { WelcomeScreenV3 } from './WelcomeScreenV3';
export type { WelcomeScreenV3Props } from './WelcomeScreenV3';

export { SignInScreen } from './SignInScreen';
export type { SignInScreenProps, SignInMode } from './SignInScreen';
export { SignInScreenV2 } from './SignInScreenV2';
export type { SignInScreenV2Props } from './SignInScreenV2';
export { SignInScreenV3 } from './SignInScreenV3';
export type { SignInScreenV3Props } from './SignInScreenV3';

export { PermissionPrompt } from './PermissionPrompt';
export type { PermissionPromptProps, PermissionKind, PermissionState, PermissionBenefit } from './PermissionPrompt';

export { PlanSelector } from './PlanSelector';
export type { PlanSelectorProps, PlanSelectorLayout } from './PlanSelector';
export { PlanSelectorV2 } from './PlanSelectorV2';
export type { PlanSelectorV2Props } from './PlanSelectorV2';
export { PlanSelectorV3 } from './PlanSelectorV3';
export type { PlanSelectorV3Props } from './PlanSelectorV3';

export { PaywallScreen, PaywallFeatureRows } from './PaywallScreen';
export type {
  PaywallScreenProps,
  PaywallValueProp,
  PaywallFeatureRow,
  PaywallFeatureRowsProps,
  PaywallValueFraming,
} from './PaywallScreen';
export { PaywallScreenV2 } from './PaywallScreenV2';
export type { PaywallScreenV2Props } from './PaywallScreenV2';
export { PaywallScreenV3 } from './PaywallScreenV3';
export type { PaywallScreenV3Props } from './PaywallScreenV3';

export { FeatureLockCard } from './FeatureLockCard';
export type { FeatureLockCardProps, FeatureLockVariant } from './FeatureLockCard';

export { OtpVerify } from './OtpVerify';
export type { OtpVerifyProps } from './OtpVerify';

export { ProfileSetup } from './ProfileSetup';
export type { ProfileSetupProps, ProfileField } from './ProfileSetup';

export { InterestPicker } from './InterestPicker';
export type { InterestPickerProps } from './InterestPicker';

export { GetStartedButton } from './GetStartedButton';
export type { GetStartedButtonProps } from './GetStartedButton';

export { ProgressDots } from './ProgressDots';
export type { ProgressDotsProps, ProgressDotsSize, ProgressDotsVariant } from './ProgressDots';

export { TrialBanner } from './TrialBanner';
export type { TrialBannerProps, TrialBannerTone } from './TrialBanner';

export type {
  BillingPeriod,
  OnboardingSlide,
  PlanTier,
  InterestOption,
  SignInProvider,
} from './types';

export { ProfileSetupV2 } from './ProfileSetupV2';
export type { ProfileSetupV2Props } from './ProfileSetupV2';
export { ProfileSetupV3 } from './ProfileSetupV3';
export type { ProfileSetupV3Props } from './ProfileSetupV3';

export { InterestPickerV2 } from './InterestPickerV2';
export type { InterestPickerV2Props } from './InterestPickerV2';
export { InterestPickerV3 } from './InterestPickerV3';
export type { InterestPickerV3Props } from './InterestPickerV3';

export { PermissionPromptV2 } from './PermissionPromptV2';
export type { PermissionPromptV2Props } from './PermissionPromptV2';
export { PermissionPromptV3 } from './PermissionPromptV3';
export type { PermissionPromptV3Props } from './PermissionPromptV3';

export { OtpVerifyV2 } from './OtpVerifyV2';
export type { OtpVerifyV2Props } from './OtpVerifyV2';
export { OtpVerifyV3 } from './OtpVerifyV3';
export type { OtpVerifyV3Props } from './OtpVerifyV3';
