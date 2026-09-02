"use strict";
/**
 * `@xenition/ui/native/insurance` — presentational insurance / policy / claims
 * blocks for React Native. Composed from the native primitives (`Card`,
 * `Button`, `Icon`, `Badge`, `Avatar`, `Progress`, `Steps`, `Field`, `Select`,
 * `Input`) and styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors (colors trace to `SemanticColors`
 * slots or `ramps`-derived `withAlpha` tints). Money is always carried as
 * integer **cents** and funnelled through the single `formatMoney` home, so
 * printed values never drift. Claim/policy status is conveyed by **text +
 * glyph + color** (approved → success, denied → danger) — never color alone.
 * Every component takes data + callbacks + variants/states (no fetching, no SDK
 * import).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskScoreV4 = exports.RenewalBannerV4 = exports.QuoteFormV4 = exports.PremiumSummaryV4 = exports.PolicyDocumentRowV4 = exports.PolicyCardV4 = exports.InsuranceIdCardV4 = exports.DeductibleBarV4 = exports.CoverageItemV4 = exports.ClaimTimelineV4 = exports.ClaimStatusTrackerV4 = exports.ClaimRowV4 = exports.BeneficiaryRowV4 = exports.AgentContactCardV4 = exports.formatMoney = exports.POLICY_VARIANT = exports.CLAIM_STATUS = exports.AgentContactCard = exports.RenewalBanner = exports.RiskScore = exports.PolicyDocumentRow = exports.ClaimStatusTracker = exports.BeneficiaryRow = exports.DeductibleBar = exports.QuoteForm = exports.PremiumSummaryV3 = exports.PremiumSummaryV2 = exports.CoverageItemV3 = exports.CoverageItemV2 = exports.ClaimRowV3 = exports.ClaimRowV2 = exports.PolicyCardV3 = exports.PolicyCardV2 = exports.PremiumSummary = exports.CoverageItem = exports.ClaimRow = exports.PolicyCard = void 0;
var PolicyCard_1 = require("./PolicyCard");
Object.defineProperty(exports, "PolicyCard", { enumerable: true, get: function () { return PolicyCard_1.PolicyCard; } });
var ClaimRow_1 = require("./ClaimRow");
Object.defineProperty(exports, "ClaimRow", { enumerable: true, get: function () { return ClaimRow_1.ClaimRow; } });
var CoverageItem_1 = require("./CoverageItem");
Object.defineProperty(exports, "CoverageItem", { enumerable: true, get: function () { return CoverageItem_1.CoverageItem; } });
var PremiumSummary_1 = require("./PremiumSummary");
Object.defineProperty(exports, "PremiumSummary", { enumerable: true, get: function () { return PremiumSummary_1.PremiumSummary; } });
// Alternate drop-in designs (V2 / V3) — same props as the base component, a
// visually distinct treatment. Import in place of the base where a different
// look is wanted; the data contract (integer cents, glyph+text+color status,
// token purity) is identical.
var PolicyCardV2_1 = require("./PolicyCardV2");
Object.defineProperty(exports, "PolicyCardV2", { enumerable: true, get: function () { return PolicyCardV2_1.PolicyCardV2; } });
var PolicyCardV3_1 = require("./PolicyCardV3");
Object.defineProperty(exports, "PolicyCardV3", { enumerable: true, get: function () { return PolicyCardV3_1.PolicyCardV3; } });
var ClaimRowV2_1 = require("./ClaimRowV2");
Object.defineProperty(exports, "ClaimRowV2", { enumerable: true, get: function () { return ClaimRowV2_1.ClaimRowV2; } });
var ClaimRowV3_1 = require("./ClaimRowV3");
Object.defineProperty(exports, "ClaimRowV3", { enumerable: true, get: function () { return ClaimRowV3_1.ClaimRowV3; } });
var CoverageItemV2_1 = require("./CoverageItemV2");
Object.defineProperty(exports, "CoverageItemV2", { enumerable: true, get: function () { return CoverageItemV2_1.CoverageItemV2; } });
var CoverageItemV3_1 = require("./CoverageItemV3");
Object.defineProperty(exports, "CoverageItemV3", { enumerable: true, get: function () { return CoverageItemV3_1.CoverageItemV3; } });
var PremiumSummaryV2_1 = require("./PremiumSummaryV2");
Object.defineProperty(exports, "PremiumSummaryV2", { enumerable: true, get: function () { return PremiumSummaryV2_1.PremiumSummaryV2; } });
var PremiumSummaryV3_1 = require("./PremiumSummaryV3");
Object.defineProperty(exports, "PremiumSummaryV3", { enumerable: true, get: function () { return PremiumSummaryV3_1.PremiumSummaryV3; } });
var QuoteForm_1 = require("./QuoteForm");
Object.defineProperty(exports, "QuoteForm", { enumerable: true, get: function () { return QuoteForm_1.QuoteForm; } });
var DeductibleBar_1 = require("./DeductibleBar");
Object.defineProperty(exports, "DeductibleBar", { enumerable: true, get: function () { return DeductibleBar_1.DeductibleBar; } });
var BeneficiaryRow_1 = require("./BeneficiaryRow");
Object.defineProperty(exports, "BeneficiaryRow", { enumerable: true, get: function () { return BeneficiaryRow_1.BeneficiaryRow; } });
var ClaimStatusTracker_1 = require("./ClaimStatusTracker");
Object.defineProperty(exports, "ClaimStatusTracker", { enumerable: true, get: function () { return ClaimStatusTracker_1.ClaimStatusTracker; } });
var PolicyDocumentRow_1 = require("./PolicyDocumentRow");
Object.defineProperty(exports, "PolicyDocumentRow", { enumerable: true, get: function () { return PolicyDocumentRow_1.PolicyDocumentRow; } });
var RiskScore_1 = require("./RiskScore");
Object.defineProperty(exports, "RiskScore", { enumerable: true, get: function () { return RiskScore_1.RiskScore; } });
var RenewalBanner_1 = require("./RenewalBanner");
Object.defineProperty(exports, "RenewalBanner", { enumerable: true, get: function () { return RenewalBanner_1.RenewalBanner; } });
var AgentContactCard_1 = require("./AgentContactCard");
Object.defineProperty(exports, "AgentContactCard", { enumerable: true, get: function () { return AgentContactCard_1.AgentContactCard; } });
// Shared domain descriptors + the single money/format home (re-exported for
// ergonomics; mirrors the finance module).
var status_1 = require("./internal/status");
Object.defineProperty(exports, "CLAIM_STATUS", { enumerable: true, get: function () { return status_1.CLAIM_STATUS; } });
Object.defineProperty(exports, "POLICY_VARIANT", { enumerable: true, get: function () { return status_1.POLICY_VARIANT; } });
var format_1 = require("./internal/format");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return format_1.formatMoney; } });
// ── The V4 line ───────────────────────────────────────────────
// The current design pattern, built against `INSURANCE-V4-SPEC.md`. Each is a
// drop-in for its base — same props plus optional additions, every one
// defaulting to the base's behaviour — so swapping `X` for `XV4` brings the
// fixes and no surprises. The two worth reading first are
// `ClaimStatusTrackerV4`, which stops inventing a denial reason the caller
// never supplied, and `PolicyDocumentRowV4`, whose Download button was not
// reachable by any gesture. `InsuranceIdCardV4` and `ClaimTimelineV4` are new:
// there is no base for either.
var AgentContactCardV4_1 = require("./AgentContactCardV4");
Object.defineProperty(exports, "AgentContactCardV4", { enumerable: true, get: function () { return AgentContactCardV4_1.AgentContactCardV4; } });
var BeneficiaryRowV4_1 = require("./BeneficiaryRowV4");
Object.defineProperty(exports, "BeneficiaryRowV4", { enumerable: true, get: function () { return BeneficiaryRowV4_1.BeneficiaryRowV4; } });
var ClaimRowV4_1 = require("./ClaimRowV4");
Object.defineProperty(exports, "ClaimRowV4", { enumerable: true, get: function () { return ClaimRowV4_1.ClaimRowV4; } });
var ClaimStatusTrackerV4_1 = require("./ClaimStatusTrackerV4");
Object.defineProperty(exports, "ClaimStatusTrackerV4", { enumerable: true, get: function () { return ClaimStatusTrackerV4_1.ClaimStatusTrackerV4; } });
var ClaimTimelineV4_1 = require("./ClaimTimelineV4");
Object.defineProperty(exports, "ClaimTimelineV4", { enumerable: true, get: function () { return ClaimTimelineV4_1.ClaimTimelineV4; } });
var CoverageItemV4_1 = require("./CoverageItemV4");
Object.defineProperty(exports, "CoverageItemV4", { enumerable: true, get: function () { return CoverageItemV4_1.CoverageItemV4; } });
var DeductibleBarV4_1 = require("./DeductibleBarV4");
Object.defineProperty(exports, "DeductibleBarV4", { enumerable: true, get: function () { return DeductibleBarV4_1.DeductibleBarV4; } });
var InsuranceIdCardV4_1 = require("./InsuranceIdCardV4");
Object.defineProperty(exports, "InsuranceIdCardV4", { enumerable: true, get: function () { return InsuranceIdCardV4_1.InsuranceIdCardV4; } });
var PolicyCardV4_1 = require("./PolicyCardV4");
Object.defineProperty(exports, "PolicyCardV4", { enumerable: true, get: function () { return PolicyCardV4_1.PolicyCardV4; } });
var PolicyDocumentRowV4_1 = require("./PolicyDocumentRowV4");
Object.defineProperty(exports, "PolicyDocumentRowV4", { enumerable: true, get: function () { return PolicyDocumentRowV4_1.PolicyDocumentRowV4; } });
var PremiumSummaryV4_1 = require("./PremiumSummaryV4");
Object.defineProperty(exports, "PremiumSummaryV4", { enumerable: true, get: function () { return PremiumSummaryV4_1.PremiumSummaryV4; } });
var QuoteFormV4_1 = require("./QuoteFormV4");
Object.defineProperty(exports, "QuoteFormV4", { enumerable: true, get: function () { return QuoteFormV4_1.QuoteFormV4; } });
var RenewalBannerV4_1 = require("./RenewalBannerV4");
Object.defineProperty(exports, "RenewalBannerV4", { enumerable: true, get: function () { return RenewalBannerV4_1.RenewalBannerV4; } });
var RiskScoreV4_1 = require("./RiskScoreV4");
Object.defineProperty(exports, "RiskScoreV4", { enumerable: true, get: function () { return RiskScoreV4_1.RiskScoreV4; } });
//# sourceMappingURL=index.js.map