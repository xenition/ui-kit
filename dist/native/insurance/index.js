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
exports.formatMoney = exports.POLICY_VARIANT = exports.CLAIM_STATUS = exports.AgentContactCard = exports.RenewalBanner = exports.RiskScore = exports.PolicyDocumentRow = exports.ClaimStatusTracker = exports.BeneficiaryRow = exports.DeductibleBar = exports.QuoteForm = exports.PremiumSummary = exports.CoverageItem = exports.ClaimRow = exports.PolicyCard = void 0;
var PolicyCard_1 = require("./PolicyCard");
Object.defineProperty(exports, "PolicyCard", { enumerable: true, get: function () { return PolicyCard_1.PolicyCard; } });
var ClaimRow_1 = require("./ClaimRow");
Object.defineProperty(exports, "ClaimRow", { enumerable: true, get: function () { return ClaimRow_1.ClaimRow; } });
var CoverageItem_1 = require("./CoverageItem");
Object.defineProperty(exports, "CoverageItem", { enumerable: true, get: function () { return CoverageItem_1.CoverageItem; } });
var PremiumSummary_1 = require("./PremiumSummary");
Object.defineProperty(exports, "PremiumSummary", { enumerable: true, get: function () { return PremiumSummary_1.PremiumSummary; } });
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
//# sourceMappingURL=index.js.map