"use strict";
/**
 * `@xenition/ui/nonprofit` — presentational **React DOM** components for
 * nonprofit / charity / fundraising surfaces (browse causes → donate → track a
 * campaign → recognize donors → thank them). The web parity of
 * `@xenition/ui/native/nonprofit`: identical component + prop names/types, with
 * `onPress` → `onClick` and React Native primitives swapped for DOM. Every
 * component is data + callbacks + variants only: no fetching, no SDK import, no
 * external deps. Money is carried as integer **cents** and formatted through the
 * single `formatMoney` home. All colors resolve from the `--xen-*` Tailwind
 * token classes — no literal colors. Built on the shared `../primitives` (Card,
 * Button, Badge, Icon, Avatar).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalPct = exports.formatMoney = exports.ThankYouCard = exports.MatchingGiftBanner = exports.EventTicketRow = exports.RecurringGiftRow = exports.FundraiserCardV3 = exports.FundraiserCardV2 = exports.FundraiserCard = exports.ImpactStat = exports.DonorRow = exports.PledgeRow = exports.VolunteerShift = exports.CauseCardV3 = exports.CauseCardV2 = exports.CauseCard = exports.CampaignProgressV3 = exports.CampaignProgressV2 = exports.CampaignProgress = exports.DonationCardV3 = exports.DonationCardV2 = exports.DonationCard = void 0;
var DonationCard_1 = require("./DonationCard");
Object.defineProperty(exports, "DonationCard", { enumerable: true, get: function () { return DonationCard_1.DonationCard; } });
var DonationCardV2_1 = require("./DonationCardV2");
Object.defineProperty(exports, "DonationCardV2", { enumerable: true, get: function () { return DonationCardV2_1.DonationCardV2; } });
var DonationCardV3_1 = require("./DonationCardV3");
Object.defineProperty(exports, "DonationCardV3", { enumerable: true, get: function () { return DonationCardV3_1.DonationCardV3; } });
var CampaignProgress_1 = require("./CampaignProgress");
Object.defineProperty(exports, "CampaignProgress", { enumerable: true, get: function () { return CampaignProgress_1.CampaignProgress; } });
var CampaignProgressV2_1 = require("./CampaignProgressV2");
Object.defineProperty(exports, "CampaignProgressV2", { enumerable: true, get: function () { return CampaignProgressV2_1.CampaignProgressV2; } });
var CampaignProgressV3_1 = require("./CampaignProgressV3");
Object.defineProperty(exports, "CampaignProgressV3", { enumerable: true, get: function () { return CampaignProgressV3_1.CampaignProgressV3; } });
var CauseCard_1 = require("./CauseCard");
Object.defineProperty(exports, "CauseCard", { enumerable: true, get: function () { return CauseCard_1.CauseCard; } });
var CauseCardV2_1 = require("./CauseCardV2");
Object.defineProperty(exports, "CauseCardV2", { enumerable: true, get: function () { return CauseCardV2_1.CauseCardV2; } });
var CauseCardV3_1 = require("./CauseCardV3");
Object.defineProperty(exports, "CauseCardV3", { enumerable: true, get: function () { return CauseCardV3_1.CauseCardV3; } });
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
var FundraiserCardV2_1 = require("./FundraiserCardV2");
Object.defineProperty(exports, "FundraiserCardV2", { enumerable: true, get: function () { return FundraiserCardV2_1.FundraiserCardV2; } });
var FundraiserCardV3_1 = require("./FundraiserCardV3");
Object.defineProperty(exports, "FundraiserCardV3", { enumerable: true, get: function () { return FundraiserCardV3_1.FundraiserCardV3; } });
var RecurringGiftRow_1 = require("./RecurringGiftRow");
Object.defineProperty(exports, "RecurringGiftRow", { enumerable: true, get: function () { return RecurringGiftRow_1.RecurringGiftRow; } });
var EventTicketRow_1 = require("./EventTicketRow");
Object.defineProperty(exports, "EventTicketRow", { enumerable: true, get: function () { return EventTicketRow_1.EventTicketRow; } });
var MatchingGiftBanner_1 = require("./MatchingGiftBanner");
Object.defineProperty(exports, "MatchingGiftBanner", { enumerable: true, get: function () { return MatchingGiftBanner_1.MatchingGiftBanner; } });
var ThankYouCard_1 = require("./ThankYouCard");
Object.defineProperty(exports, "ThankYouCard", { enumerable: true, get: function () { return ThankYouCard_1.ThankYouCard; } });
// Shared money + progress helpers (no external deps).
var internal_1 = require("./internal");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return internal_1.formatMoney; } });
Object.defineProperty(exports, "goalPct", { enumerable: true, get: function () { return internal_1.goalPct; } });
//# sourceMappingURL=index.js.map