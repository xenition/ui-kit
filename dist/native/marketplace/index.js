"use strict";
/**
 * `@xenition/ui/native/marketplace` — composed classifieds / auction /
 * peer-marketplace blocks for React Native. Mobile-first and presentational
 * only: every component takes shaped data plus callbacks (nothing fetches) and
 * is styled exclusively from the compiled theme via `useXenitionTheme()`, so a
 * seed change (dark mode included) restyles the whole set. Colors come only
 * from `SemanticColors` slots / `tokens.ramps.*`, with a token-derived
 * `withAlpha` for tints — no literal colors — and there are no external
 * dependencies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportListingV4 = exports.WatchlistRowV4 = exports.ShippingOptionV4 = exports.MakeOfferFormV4 = exports.OfferRowV4 = exports.BidRowV4 = exports.RatingBreakdownV4 = exports.CONDITION_V4_LABEL = exports.ConditionBadgeV4 = exports.CategoryTileV4 = exports.SellerCardV4 = exports.useCountdownV4 = exports.spokenRemainingV4 = exports.formatRemainingV4 = exports.AUCTION_V4_TIMING = exports.AuctionCardV4 = exports.ListingCardV4 = exports.ReportListing = exports.RatingBreakdown = exports.WatchlistRow = exports.MakeOfferForm = exports.ShippingOption = exports.ConditionBadge = exports.CategoryTile = exports.AuctionCard = exports.BidRow = exports.OfferRow = exports.WatchlistRowV3 = exports.WatchlistRowV2 = exports.AuctionCardV3 = exports.AuctionCardV2 = exports.SellerCardV3 = exports.SellerCardV2 = exports.ListingCardV3 = exports.ListingCardV2 = exports.SellerCard = exports.ListingCard = void 0;
var ListingCard_1 = require("./ListingCard");
Object.defineProperty(exports, "ListingCard", { enumerable: true, get: function () { return ListingCard_1.ListingCard; } });
var SellerCard_1 = require("./SellerCard");
Object.defineProperty(exports, "SellerCard", { enumerable: true, get: function () { return SellerCard_1.SellerCard; } });
// ── Alternate designs ─────────────────────────────────────────────────
// Drop-in redesigns of the high-traffic marketplace blocks: each `V2`/`V3`
// takes the SAME props as its base component (`<Name>V2Props = <Name>Props`)
// but renders a genuinely different layout, so an app can swap the visual
// treatment without touching call sites. Presentational and token-pure like
// the originals.
var ListingCardV2_1 = require("./ListingCardV2");
Object.defineProperty(exports, "ListingCardV2", { enumerable: true, get: function () { return ListingCardV2_1.ListingCardV2; } });
var ListingCardV3_1 = require("./ListingCardV3");
Object.defineProperty(exports, "ListingCardV3", { enumerable: true, get: function () { return ListingCardV3_1.ListingCardV3; } });
var SellerCardV2_1 = require("./SellerCardV2");
Object.defineProperty(exports, "SellerCardV2", { enumerable: true, get: function () { return SellerCardV2_1.SellerCardV2; } });
var SellerCardV3_1 = require("./SellerCardV3");
Object.defineProperty(exports, "SellerCardV3", { enumerable: true, get: function () { return SellerCardV3_1.SellerCardV3; } });
var AuctionCardV2_1 = require("./AuctionCardV2");
Object.defineProperty(exports, "AuctionCardV2", { enumerable: true, get: function () { return AuctionCardV2_1.AuctionCardV2; } });
var AuctionCardV3_1 = require("./AuctionCardV3");
Object.defineProperty(exports, "AuctionCardV3", { enumerable: true, get: function () { return AuctionCardV3_1.AuctionCardV3; } });
var WatchlistRowV2_1 = require("./WatchlistRowV2");
Object.defineProperty(exports, "WatchlistRowV2", { enumerable: true, get: function () { return WatchlistRowV2_1.WatchlistRowV2; } });
var WatchlistRowV3_1 = require("./WatchlistRowV3");
Object.defineProperty(exports, "WatchlistRowV3", { enumerable: true, get: function () { return WatchlistRowV3_1.WatchlistRowV3; } });
var OfferRow_1 = require("./OfferRow");
Object.defineProperty(exports, "OfferRow", { enumerable: true, get: function () { return OfferRow_1.OfferRow; } });
var BidRow_1 = require("./BidRow");
Object.defineProperty(exports, "BidRow", { enumerable: true, get: function () { return BidRow_1.BidRow; } });
var AuctionCard_1 = require("./AuctionCard");
Object.defineProperty(exports, "AuctionCard", { enumerable: true, get: function () { return AuctionCard_1.AuctionCard; } });
var CategoryTile_1 = require("./CategoryTile");
Object.defineProperty(exports, "CategoryTile", { enumerable: true, get: function () { return CategoryTile_1.CategoryTile; } });
var ConditionBadge_1 = require("./ConditionBadge");
Object.defineProperty(exports, "ConditionBadge", { enumerable: true, get: function () { return ConditionBadge_1.ConditionBadge; } });
var ShippingOption_1 = require("./ShippingOption");
Object.defineProperty(exports, "ShippingOption", { enumerable: true, get: function () { return ShippingOption_1.ShippingOption; } });
var MakeOfferForm_1 = require("./MakeOfferForm");
Object.defineProperty(exports, "MakeOfferForm", { enumerable: true, get: function () { return MakeOfferForm_1.MakeOfferForm; } });
var WatchlistRow_1 = require("./WatchlistRow");
Object.defineProperty(exports, "WatchlistRow", { enumerable: true, get: function () { return WatchlistRow_1.WatchlistRow; } });
var RatingBreakdown_1 = require("./RatingBreakdown");
Object.defineProperty(exports, "RatingBreakdown", { enumerable: true, get: function () { return RatingBreakdown_1.RatingBreakdown; } });
var ReportListing_1 = require("./ReportListing");
Object.defineProperty(exports, "ReportListing", { enumerable: true, get: function () { return ReportListing_1.ReportListing; } });
/* ------------------------------------------------------------------------ *
 * The V4 line
 *
 * Twelve components on the current design pattern. See
 * `COMMERCE-MARKETPLACE-V4-BRIEF.md` — marketplace and commerce were upgraded
 * as one surface, so `ListingCardV4` and `commerce`'s `ProductCardV4` share an
 * anatomy on purpose: a storefront and a marketplace must read as one product.
 * ------------------------------------------------------------------------ */
var ListingCardV4_1 = require("./ListingCardV4");
Object.defineProperty(exports, "ListingCardV4", { enumerable: true, get: function () { return ListingCardV4_1.ListingCardV4; } });
var AuctionCardV4_1 = require("./AuctionCardV4");
Object.defineProperty(exports, "AuctionCardV4", { enumerable: true, get: function () { return AuctionCardV4_1.AuctionCardV4; } });
Object.defineProperty(exports, "AUCTION_V4_TIMING", { enumerable: true, get: function () { return AuctionCardV4_1.AUCTION_V4_TIMING; } });
Object.defineProperty(exports, "formatRemainingV4", { enumerable: true, get: function () { return AuctionCardV4_1.formatRemainingV4; } });
Object.defineProperty(exports, "spokenRemainingV4", { enumerable: true, get: function () { return AuctionCardV4_1.spokenRemainingV4; } });
Object.defineProperty(exports, "useCountdownV4", { enumerable: true, get: function () { return AuctionCardV4_1.useCountdownV4; } });
var SellerCardV4_1 = require("./SellerCardV4");
Object.defineProperty(exports, "SellerCardV4", { enumerable: true, get: function () { return SellerCardV4_1.SellerCardV4; } });
var CategoryTileV4_1 = require("./CategoryTileV4");
Object.defineProperty(exports, "CategoryTileV4", { enumerable: true, get: function () { return CategoryTileV4_1.CategoryTileV4; } });
var ConditionBadgeV4_1 = require("./ConditionBadgeV4");
Object.defineProperty(exports, "ConditionBadgeV4", { enumerable: true, get: function () { return ConditionBadgeV4_1.ConditionBadgeV4; } });
Object.defineProperty(exports, "CONDITION_V4_LABEL", { enumerable: true, get: function () { return ConditionBadgeV4_1.CONDITION_V4_LABEL; } });
var RatingBreakdownV4_1 = require("./RatingBreakdownV4");
Object.defineProperty(exports, "RatingBreakdownV4", { enumerable: true, get: function () { return RatingBreakdownV4_1.RatingBreakdownV4; } });
var BidRowV4_1 = require("./BidRowV4");
Object.defineProperty(exports, "BidRowV4", { enumerable: true, get: function () { return BidRowV4_1.BidRowV4; } });
var OfferRowV4_1 = require("./OfferRowV4");
Object.defineProperty(exports, "OfferRowV4", { enumerable: true, get: function () { return OfferRowV4_1.OfferRowV4; } });
var MakeOfferFormV4_1 = require("./MakeOfferFormV4");
Object.defineProperty(exports, "MakeOfferFormV4", { enumerable: true, get: function () { return MakeOfferFormV4_1.MakeOfferFormV4; } });
var ShippingOptionV4_1 = require("./ShippingOptionV4");
Object.defineProperty(exports, "ShippingOptionV4", { enumerable: true, get: function () { return ShippingOptionV4_1.ShippingOptionV4; } });
var WatchlistRowV4_1 = require("./WatchlistRowV4");
Object.defineProperty(exports, "WatchlistRowV4", { enumerable: true, get: function () { return WatchlistRowV4_1.WatchlistRowV4; } });
var ReportListingV4_1 = require("./ReportListingV4");
Object.defineProperty(exports, "ReportListingV4", { enumerable: true, get: function () { return ReportListingV4_1.ReportListingV4; } });
//# sourceMappingURL=index.js.map