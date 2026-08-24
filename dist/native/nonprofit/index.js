"use strict";
/**
 * `@xenition/ui/native/nonprofit` — presentational React Native components for
 * nonprofit / charity / fundraising surfaces (browse causes → donate → track a
 * campaign → recognize donors → thank them). Every component is data +
 * callbacks + variants only: no fetching, no SDK import, no external deps. Money
 * is carried as integer **cents** and formatted through the single `formatMoney`
 * home. All colors resolve from the compiled theme tokens via
 * `useXenitionTheme()` (semantic slots + `tokens.ramps.*` + `withAlpha` tints) —
 * no literal colors. Built on the shared `../primitives` (Card, Button, Badge,
 * Icon, Avatar).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalPct = exports.withAlpha = exports.formatMoney = exports.ThankYouCard = exports.MatchingGiftBanner = exports.EventTicketRow = exports.RecurringGiftRow = exports.FundraiserCard = exports.ImpactStat = exports.DonorRow = exports.PledgeRow = exports.VolunteerShift = exports.CauseCard = exports.CampaignProgress = exports.DonationCard = void 0;
var DonationCard_1 = require("./DonationCard");
Object.defineProperty(exports, "DonationCard", { enumerable: true, get: function () { return DonationCard_1.DonationCard; } });
var CampaignProgress_1 = require("./CampaignProgress");
Object.defineProperty(exports, "CampaignProgress", { enumerable: true, get: function () { return CampaignProgress_1.CampaignProgress; } });
var CauseCard_1 = require("./CauseCard");
Object.defineProperty(exports, "CauseCard", { enumerable: true, get: function () { return CauseCard_1.CauseCard; } });
var VolunteerShift_1 = require("./VolunteerShift");
Object.defineProperty(exports, "VolunteerShift", { enumerable: true, get: function () { return VolunteerShift_1.VolunteerShift; } });
var PledgeRow_1 = require("./PledgeRow");
Object.defineProperty(exports, "PledgeRow", { enumerable: true, get: function () { return PledgeRow_1.PledgeRow; } });
var DonorRow_1 = require("./DonorRow");
Object.defineProperty(exports, "DonorRow", { enumerable: true, get: function () { return DonorRow_1.DonorRow; } });
var ImpactStat_1 = require("./ImpactStat");
Object.defineProperty(exports, "ImpactStat", { enumerable: true, get: function () { return ImpactStat_1.ImpactStat; } });
var FundraiserCard_1 = require("./FundraiserCard");
Object.defineProperty(exports, "FundraiserCard", { enumerable: true, get: function () { return FundraiserCard_1.FundraiserCard; } });
var RecurringGiftRow_1 = require("./RecurringGiftRow");
Object.defineProperty(exports, "RecurringGiftRow", { enumerable: true, get: function () { return RecurringGiftRow_1.RecurringGiftRow; } });
var EventTicketRow_1 = require("./EventTicketRow");
Object.defineProperty(exports, "EventTicketRow", { enumerable: true, get: function () { return EventTicketRow_1.EventTicketRow; } });
var MatchingGiftBanner_1 = require("./MatchingGiftBanner");
Object.defineProperty(exports, "MatchingGiftBanner", { enumerable: true, get: function () { return MatchingGiftBanner_1.MatchingGiftBanner; } });
var ThankYouCard_1 = require("./ThankYouCard");
Object.defineProperty(exports, "ThankYouCard", { enumerable: true, get: function () { return ThankYouCard_1.ThankYouCard; } });
// Shared money + tint helpers (no external deps).
var internal_1 = require("./internal");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return internal_1.formatMoney; } });
Object.defineProperty(exports, "withAlpha", { enumerable: true, get: function () { return internal_1.withAlpha; } });
Object.defineProperty(exports, "goalPct", { enumerable: true, get: function () { return internal_1.goalPct; } });
//# sourceMappingURL=index.js.map