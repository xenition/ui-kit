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
exports.TrialBanner = exports.ProgressDots = exports.GetStartedButton = exports.InterestPicker = exports.ProfileSetup = exports.OtpVerify = exports.FeatureLockCard = exports.PaywallScreenV3 = exports.PaywallScreenV2 = exports.PaywallScreen = exports.PlanSelectorV3 = exports.PlanSelectorV2 = exports.PlanSelector = exports.PermissionPrompt = exports.WelcomeScreenV3 = exports.WelcomeScreenV2 = exports.WelcomeScreen = exports.OnboardingSlidesV3 = exports.OnboardingSlidesV2 = exports.OnboardingSlides = void 0;
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
//# sourceMappingURL=index.js.map