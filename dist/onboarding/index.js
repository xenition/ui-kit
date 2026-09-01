"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallFeatureRowsV3 = exports.PaywallFeatureRowsV2 = exports.ProgressDotsV3 = exports.ProgressDotsV2 = exports.SignInScreenV4 = exports.OtpVerifyV4 = exports.ProfileSetupV4 = exports.PermissionPromptV4 = exports.InterestPickerV4 = exports.OnboardingSlidesV4 = exports.WelcomeScreenV4 = exports.PaywallScreenV4 = exports.PlanSelectorV4 = exports.PaywallFeatureRowsV4 = exports.FeatureLockCardV4 = exports.TrialBannerV4 = exports.ProgressDotsV4 = exports.GetStartedButtonV4 = exports.OtpVerifyV3 = exports.OtpVerifyV2 = exports.PermissionPromptV3 = exports.PermissionPromptV2 = exports.InterestPickerV3 = exports.InterestPickerV2 = exports.ProfileSetupV3 = exports.ProfileSetupV2 = exports.TrialBanner = exports.ProgressDots = exports.GetStartedButton = exports.InterestPicker = exports.ProfileSetup = exports.OtpVerify = exports.FeatureLockCard = exports.PaywallScreenV3 = exports.PaywallScreenV2 = exports.PaywallFeatureRows = exports.PaywallScreen = exports.PlanSelectorV3 = exports.PlanSelectorV2 = exports.PlanSelector = exports.PermissionPrompt = exports.SignInScreenV3 = exports.SignInScreenV2 = exports.SignInScreen = exports.WelcomeScreenV3 = exports.WelcomeScreenV2 = exports.WelcomeScreen = exports.OnboardingSlidesV3 = exports.OnboardingSlidesV2 = exports.OnboardingSlides = void 0;
exports.FeatureLockCardV3 = exports.FeatureLockCardV2 = void 0;
var OnboardingSlides_1 = require("./OnboardingSlides");
Object.defineProperty(exports, "OnboardingSlides", { enumerable: true, get: function () { return OnboardingSlides_1.OnboardingSlides; } });
var OnboardingSlidesV2_1 = require("./OnboardingSlidesV2");
Object.defineProperty(exports, "OnboardingSlidesV2", { enumerable: true, get: function () { return OnboardingSlidesV2_1.OnboardingSlidesV2; } });
var OnboardingSlidesV3_1 = require("./OnboardingSlidesV3");
Object.defineProperty(exports, "OnboardingSlidesV3", { enumerable: true, get: function () { return OnboardingSlidesV3_1.OnboardingSlidesV3; } });
var WelcomeScreen_1 = require("./WelcomeScreen");
Object.defineProperty(exports, "WelcomeScreen", { enumerable: true, get: function () { return WelcomeScreen_1.WelcomeScreen; } });
var WelcomeScreenV2_1 = require("./WelcomeScreenV2");
Object.defineProperty(exports, "WelcomeScreenV2", { enumerable: true, get: function () { return WelcomeScreenV2_1.WelcomeScreenV2; } });
var WelcomeScreenV3_1 = require("./WelcomeScreenV3");
Object.defineProperty(exports, "WelcomeScreenV3", { enumerable: true, get: function () { return WelcomeScreenV3_1.WelcomeScreenV3; } });
var SignInScreen_1 = require("./SignInScreen");
Object.defineProperty(exports, "SignInScreen", { enumerable: true, get: function () { return SignInScreen_1.SignInScreen; } });
var SignInScreenV2_1 = require("./SignInScreenV2");
Object.defineProperty(exports, "SignInScreenV2", { enumerable: true, get: function () { return SignInScreenV2_1.SignInScreenV2; } });
var SignInScreenV3_1 = require("./SignInScreenV3");
Object.defineProperty(exports, "SignInScreenV3", { enumerable: true, get: function () { return SignInScreenV3_1.SignInScreenV3; } });
var PermissionPrompt_1 = require("./PermissionPrompt");
Object.defineProperty(exports, "PermissionPrompt", { enumerable: true, get: function () { return PermissionPrompt_1.PermissionPrompt; } });
var PlanSelector_1 = require("./PlanSelector");
Object.defineProperty(exports, "PlanSelector", { enumerable: true, get: function () { return PlanSelector_1.PlanSelector; } });
var PlanSelectorV2_1 = require("./PlanSelectorV2");
Object.defineProperty(exports, "PlanSelectorV2", { enumerable: true, get: function () { return PlanSelectorV2_1.PlanSelectorV2; } });
var PlanSelectorV3_1 = require("./PlanSelectorV3");
Object.defineProperty(exports, "PlanSelectorV3", { enumerable: true, get: function () { return PlanSelectorV3_1.PlanSelectorV3; } });
var PaywallScreen_1 = require("./PaywallScreen");
Object.defineProperty(exports, "PaywallScreen", { enumerable: true, get: function () { return PaywallScreen_1.PaywallScreen; } });
Object.defineProperty(exports, "PaywallFeatureRows", { enumerable: true, get: function () { return PaywallScreen_1.PaywallFeatureRows; } });
var PaywallScreenV2_1 = require("./PaywallScreenV2");
Object.defineProperty(exports, "PaywallScreenV2", { enumerable: true, get: function () { return PaywallScreenV2_1.PaywallScreenV2; } });
var PaywallScreenV3_1 = require("./PaywallScreenV3");
Object.defineProperty(exports, "PaywallScreenV3", { enumerable: true, get: function () { return PaywallScreenV3_1.PaywallScreenV3; } });
var FeatureLockCard_1 = require("./FeatureLockCard");
Object.defineProperty(exports, "FeatureLockCard", { enumerable: true, get: function () { return FeatureLockCard_1.FeatureLockCard; } });
var OtpVerify_1 = require("./OtpVerify");
Object.defineProperty(exports, "OtpVerify", { enumerable: true, get: function () { return OtpVerify_1.OtpVerify; } });
var ProfileSetup_1 = require("./ProfileSetup");
Object.defineProperty(exports, "ProfileSetup", { enumerable: true, get: function () { return ProfileSetup_1.ProfileSetup; } });
var InterestPicker_1 = require("./InterestPicker");
Object.defineProperty(exports, "InterestPicker", { enumerable: true, get: function () { return InterestPicker_1.InterestPicker; } });
var GetStartedButton_1 = require("./GetStartedButton");
Object.defineProperty(exports, "GetStartedButton", { enumerable: true, get: function () { return GetStartedButton_1.GetStartedButton; } });
var ProgressDots_1 = require("./ProgressDots");
Object.defineProperty(exports, "ProgressDots", { enumerable: true, get: function () { return ProgressDots_1.ProgressDots; } });
var TrialBanner_1 = require("./TrialBanner");
Object.defineProperty(exports, "TrialBanner", { enumerable: true, get: function () { return TrialBanner_1.TrialBanner; } });
var ProfileSetupV2_1 = require("./ProfileSetupV2");
Object.defineProperty(exports, "ProfileSetupV2", { enumerable: true, get: function () { return ProfileSetupV2_1.ProfileSetupV2; } });
var ProfileSetupV3_1 = require("./ProfileSetupV3");
Object.defineProperty(exports, "ProfileSetupV3", { enumerable: true, get: function () { return ProfileSetupV3_1.ProfileSetupV3; } });
var InterestPickerV2_1 = require("./InterestPickerV2");
Object.defineProperty(exports, "InterestPickerV2", { enumerable: true, get: function () { return InterestPickerV2_1.InterestPickerV2; } });
var InterestPickerV3_1 = require("./InterestPickerV3");
Object.defineProperty(exports, "InterestPickerV3", { enumerable: true, get: function () { return InterestPickerV3_1.InterestPickerV3; } });
var PermissionPromptV2_1 = require("./PermissionPromptV2");
Object.defineProperty(exports, "PermissionPromptV2", { enumerable: true, get: function () { return PermissionPromptV2_1.PermissionPromptV2; } });
var PermissionPromptV3_1 = require("./PermissionPromptV3");
Object.defineProperty(exports, "PermissionPromptV3", { enumerable: true, get: function () { return PermissionPromptV3_1.PermissionPromptV3; } });
var OtpVerifyV2_1 = require("./OtpVerifyV2");
Object.defineProperty(exports, "OtpVerifyV2", { enumerable: true, get: function () { return OtpVerifyV2_1.OtpVerifyV2; } });
var OtpVerifyV3_1 = require("./OtpVerifyV3");
Object.defineProperty(exports, "OtpVerifyV3", { enumerable: true, get: function () { return OtpVerifyV3_1.OtpVerifyV3; } });
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `ONBOARDING-V4-BRIEF.md`. Each is
// a drop-in for its base — same props plus optional additions — and each takes
// the line's two configuration axes (`ground`, `accent`) where it is a screen.
var GetStartedButtonV4_1 = require("./GetStartedButtonV4");
Object.defineProperty(exports, "GetStartedButtonV4", { enumerable: true, get: function () { return GetStartedButtonV4_1.GetStartedButtonV4; } });
var ProgressDotsV4_1 = require("./ProgressDotsV4");
Object.defineProperty(exports, "ProgressDotsV4", { enumerable: true, get: function () { return ProgressDotsV4_1.ProgressDotsV4; } });
var TrialBannerV4_1 = require("./TrialBannerV4");
Object.defineProperty(exports, "TrialBannerV4", { enumerable: true, get: function () { return TrialBannerV4_1.TrialBannerV4; } });
var FeatureLockCardV4_1 = require("./FeatureLockCardV4");
Object.defineProperty(exports, "FeatureLockCardV4", { enumerable: true, get: function () { return FeatureLockCardV4_1.FeatureLockCardV4; } });
var PaywallFeatureRowsV4_1 = require("./PaywallFeatureRowsV4");
Object.defineProperty(exports, "PaywallFeatureRowsV4", { enumerable: true, get: function () { return PaywallFeatureRowsV4_1.PaywallFeatureRowsV4; } });
var PlanSelectorV4_1 = require("./PlanSelectorV4");
Object.defineProperty(exports, "PlanSelectorV4", { enumerable: true, get: function () { return PlanSelectorV4_1.PlanSelectorV4; } });
var PaywallScreenV4_1 = require("./PaywallScreenV4");
Object.defineProperty(exports, "PaywallScreenV4", { enumerable: true, get: function () { return PaywallScreenV4_1.PaywallScreenV4; } });
var WelcomeScreenV4_1 = require("./WelcomeScreenV4");
Object.defineProperty(exports, "WelcomeScreenV4", { enumerable: true, get: function () { return WelcomeScreenV4_1.WelcomeScreenV4; } });
var OnboardingSlidesV4_1 = require("./OnboardingSlidesV4");
Object.defineProperty(exports, "OnboardingSlidesV4", { enumerable: true, get: function () { return OnboardingSlidesV4_1.OnboardingSlidesV4; } });
var InterestPickerV4_1 = require("./InterestPickerV4");
Object.defineProperty(exports, "InterestPickerV4", { enumerable: true, get: function () { return InterestPickerV4_1.InterestPickerV4; } });
var PermissionPromptV4_1 = require("./PermissionPromptV4");
Object.defineProperty(exports, "PermissionPromptV4", { enumerable: true, get: function () { return PermissionPromptV4_1.PermissionPromptV4; } });
var ProfileSetupV4_1 = require("./ProfileSetupV4");
Object.defineProperty(exports, "ProfileSetupV4", { enumerable: true, get: function () { return ProfileSetupV4_1.ProfileSetupV4; } });
var OtpVerifyV4_1 = require("./OtpVerifyV4");
Object.defineProperty(exports, "OtpVerifyV4", { enumerable: true, get: function () { return OtpVerifyV4_1.OtpVerifyV4; } });
var SignInScreenV4_1 = require("./SignInScreenV4");
Object.defineProperty(exports, "SignInScreenV4", { enumerable: true, get: function () { return SignInScreenV4_1.SignInScreenV4; } });
// ── Alternate design lines for the three controls that had none ────────
// The five that shipped without a V2/V3 were not five gaps: `GetStartedButton`
// is the one shape §5 pins so a funnel reads as one app, and `TrialBanner` is
// small enough that the base IS its whole line (asserted from the other side
// in `design-line-composition`). These three are the real gaps, closed.
var ProgressDotsV2_1 = require("./ProgressDotsV2");
Object.defineProperty(exports, "ProgressDotsV2", { enumerable: true, get: function () { return ProgressDotsV2_1.ProgressDotsV2; } });
var ProgressDotsV3_1 = require("./ProgressDotsV3");
Object.defineProperty(exports, "ProgressDotsV3", { enumerable: true, get: function () { return ProgressDotsV3_1.ProgressDotsV3; } });
var PaywallFeatureRowsV2_1 = require("./PaywallFeatureRowsV2");
Object.defineProperty(exports, "PaywallFeatureRowsV2", { enumerable: true, get: function () { return PaywallFeatureRowsV2_1.PaywallFeatureRowsV2; } });
var PaywallFeatureRowsV3_1 = require("./PaywallFeatureRowsV3");
Object.defineProperty(exports, "PaywallFeatureRowsV3", { enumerable: true, get: function () { return PaywallFeatureRowsV3_1.PaywallFeatureRowsV3; } });
var FeatureLockCardV2_1 = require("./FeatureLockCardV2");
Object.defineProperty(exports, "FeatureLockCardV2", { enumerable: true, get: function () { return FeatureLockCardV2_1.FeatureLockCardV2; } });
var FeatureLockCardV3_1 = require("./FeatureLockCardV3");
Object.defineProperty(exports, "FeatureLockCardV3", { enumerable: true, get: function () { return FeatureLockCardV3_1.FeatureLockCardV3; } });
//# sourceMappingURL=index.js.map