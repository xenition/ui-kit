/**
 * `@xenition/ui/native/onboarding` — first-run, auth-flow, paywall and
 * monetization components for React Native. Mobile-first and presentational: the
 * app owns the data and callbacks, nothing here fetches or persists. Every color
 * traces to a compiled `SemanticColors` token via `useXenitionTheme()` (no
 * literal colors), and the flow follows the product design guide —
 * paywall-after-value (§27-28), staged onboarding (§41-42), contextual
 * "explain-then-ask" permissions (§17) and outcome-oriented copy (§47).
 *
 * Composed from the shared `../primitives` (Card, Button, Icon, Badge, PinInput,
 * Segmented, Avatar, …) so a theme-seed change restyles the entire funnel,
 * dark mode included.
 */

export { OnboardingSlides } from './OnboardingSlides';
export type { OnboardingSlidesProps, OnboardingSlidesVariant } from './OnboardingSlides';

export { WelcomeScreen } from './WelcomeScreen';
export type { WelcomeScreenProps, WelcomeScreenVariant } from './WelcomeScreen';

export { PermissionPrompt } from './PermissionPrompt';
export type { PermissionPromptProps, PermissionKind, PermissionState } from './PermissionPrompt';

export { PlanSelector } from './PlanSelector';
export type { PlanSelectorProps } from './PlanSelector';

export { PaywallScreen } from './PaywallScreen';
export type { PaywallScreenProps, PaywallValueProp } from './PaywallScreen';

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
export type { ProgressDotsProps, ProgressDotsSize } from './ProgressDots';

export { TrialBanner } from './TrialBanner';
export type { TrialBannerProps, TrialBannerTone } from './TrialBanner';

export type { BillingPeriod, OnboardingSlide, PlanTier, InterestOption } from './types';
