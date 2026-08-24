"use strict";
/**
 * `@xenition/ui/insurance` — presentational insurance / policy / claims blocks
 * for React DOM. Composed from the web primitives (`Card`, `Button`, `Icon`,
 * `Badge`, `Avatar`, `Progress`, `Steps`, `Field`, `Select`, `Input`) and
 * `EmptyState` / `formatMoney` from commerce, styled exclusively from the
 * `--xen-*` token classes — no literal colors. Money is always carried as
 * integer **cents** and funnelled through the single `formatMoney` home, so
 * printed values never drift. Claim/policy status is conveyed by **text +
 * glyph + color** (approved → success, denied → danger) — never color alone.
 * Every component takes data + callbacks + variants/states (no fetching, no SDK
 * import). Web parity of `@xenition/ui/native/insurance`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = exports.POLICY_VARIANT = exports.CLAIM_STATUS = exports.AgentContactCard = exports.RenewalBanner = exports.RiskScore = exports.PolicyDocumentRow = exports.ClaimStatusTracker = exports.BeneficiaryRow = exports.DeductibleBar = exports.QuoteForm = exports.PremiumSummaryV3 = exports.PremiumSummaryV2 = exports.PremiumSummary = exports.CoverageItemV3 = exports.CoverageItemV2 = exports.CoverageItem = exports.ClaimRowV3 = exports.ClaimRowV2 = exports.ClaimRow = exports.PolicyCardV3 = exports.PolicyCardV2 = exports.PolicyCard = void 0;
var PolicyCard_1 = require("./PolicyCard");
Object.defineProperty(exports, "PolicyCard", { enumerable: true, get: function () { return PolicyCard_1.PolicyCard; } });
var PolicyCardV2_1 = require("./PolicyCardV2");
Object.defineProperty(exports, "PolicyCardV2", { enumerable: true, get: function () { return PolicyCardV2_1.PolicyCardV2; } });
var PolicyCardV3_1 = require("./PolicyCardV3");
Object.defineProperty(exports, "PolicyCardV3", { enumerable: true, get: function () { return PolicyCardV3_1.PolicyCardV3; } });
var ClaimRow_1 = require("./ClaimRow");
Object.defineProperty(exports, "ClaimRow", { enumerable: true, get: function () { return ClaimRow_1.ClaimRow; } });
var ClaimRowV2_1 = require("./ClaimRowV2");
Object.defineProperty(exports, "ClaimRowV2", { enumerable: true, get: function () { return ClaimRowV2_1.ClaimRowV2; } });
var ClaimRowV3_1 = require("./ClaimRowV3");
Object.defineProperty(exports, "ClaimRowV3", { enumerable: true, get: function () { return ClaimRowV3_1.ClaimRowV3; } });
var CoverageItem_1 = require("./CoverageItem");
Object.defineProperty(exports, "CoverageItem", { enumerable: true, get: function () { return CoverageItem_1.CoverageItem; } });
var CoverageItemV2_1 = require("./CoverageItemV2");
Object.defineProperty(exports, "CoverageItemV2", { enumerable: true, get: function () { return CoverageItemV2_1.CoverageItemV2; } });
var CoverageItemV3_1 = require("./CoverageItemV3");
Object.defineProperty(exports, "CoverageItemV3", { enumerable: true, get: function () { return CoverageItemV3_1.CoverageItemV3; } });
var PremiumSummary_1 = require("./PremiumSummary");
Object.defineProperty(exports, "PremiumSummary", { enumerable: true, get: function () { return PremiumSummary_1.PremiumSummary; } });
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
// ergonomics; mirrors the native module and the commerce module).
var status_1 = require("./internal/status");
Object.defineProperty(exports, "CLAIM_STATUS", { enumerable: true, get: function () { return status_1.CLAIM_STATUS; } });
Object.defineProperty(exports, "POLICY_VARIANT", { enumerable: true, get: function () { return status_1.POLICY_VARIANT; } });
var format_1 = require("./internal/format");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return format_1.formatMoney; } });
//# sourceMappingURL=index.js.map