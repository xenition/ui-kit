"use strict";
/**
 * `@xenition/ui/realestate` — composed real-estate and property blocks for
 * React DOM. The web parity of `@xenition/ui/native/realestate`: presentational
 * only, every component takes shaped data plus callbacks (nothing fetches) and
 * is styled exclusively from the `--xen-*` theme tokens via Tailwind classes
 * (no literal colors), so a seed change (dark mode included) restyles the whole
 * set. No map or charting dependency — `MapPinCard` and `FloorPlanView` are
 * static, styled `div` placeholders; charts reuse the token-bound `../charts`
 * family. Money is always integer **cents**, formatted through the shared
 * `formatMoney`. Native `onPress` maps to the DOM `onClick`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactAgentBar = exports.SchoolCard = exports.PropertyFactsBar = exports.MortgageSummary = exports.AgentProfileHeader = exports.ListingHero = exports.TourSchedulerV4 = exports.SavedSearchRowV4 = exports.OpenHouseBadgeV4 = exports.PriceHistoryV4 = exports.NeighborhoodStatV4 = exports.MortgageCalcV4 = exports.MapPinCardV4 = exports.FloorPlanViewV4 = exports.AmenityGridV4 = exports.ListingGalleryV4 = exports.ComparableRowV4 = exports.AgentCardV4 = exports.PropertyCardV4 = exports.ComparableRowV3 = exports.ComparableRowV2 = exports.ComparableRow = exports.NeighborhoodStat = exports.OpenHouseBadge = exports.SavedSearchRow = exports.FloorPlanView = exports.AgentCardV3 = exports.AgentCardV2 = exports.AgentCard = exports.MortgageCalc = exports.TourScheduler = exports.MapPinCard = exports.PriceHistory = exports.AmenityGrid = exports.ListingGalleryV3 = exports.ListingGalleryV2 = exports.ListingGallery = exports.PropertyCardV3 = exports.PropertyCardV2 = exports.PropertyCard = void 0;
var PropertyCard_1 = require("./PropertyCard");
Object.defineProperty(exports, "PropertyCard", { enumerable: true, get: function () { return PropertyCard_1.PropertyCard; } });
var PropertyCardV2_1 = require("./PropertyCardV2");
Object.defineProperty(exports, "PropertyCardV2", { enumerable: true, get: function () { return PropertyCardV2_1.PropertyCardV2; } });
var PropertyCardV3_1 = require("./PropertyCardV3");
Object.defineProperty(exports, "PropertyCardV3", { enumerable: true, get: function () { return PropertyCardV3_1.PropertyCardV3; } });
var ListingGallery_1 = require("./ListingGallery");
Object.defineProperty(exports, "ListingGallery", { enumerable: true, get: function () { return ListingGallery_1.ListingGallery; } });
var ListingGalleryV2_1 = require("./ListingGalleryV2");
Object.defineProperty(exports, "ListingGalleryV2", { enumerable: true, get: function () { return ListingGalleryV2_1.ListingGalleryV2; } });
var ListingGalleryV3_1 = require("./ListingGalleryV3");
Object.defineProperty(exports, "ListingGalleryV3", { enumerable: true, get: function () { return ListingGalleryV3_1.ListingGalleryV3; } });
var AmenityGrid_1 = require("./AmenityGrid");
Object.defineProperty(exports, "AmenityGrid", { enumerable: true, get: function () { return AmenityGrid_1.AmenityGrid; } });
var PriceHistory_1 = require("./PriceHistory");
Object.defineProperty(exports, "PriceHistory", { enumerable: true, get: function () { return PriceHistory_1.PriceHistory; } });
var MapPinCard_1 = require("./MapPinCard");
Object.defineProperty(exports, "MapPinCard", { enumerable: true, get: function () { return MapPinCard_1.MapPinCard; } });
var TourScheduler_1 = require("./TourScheduler");
Object.defineProperty(exports, "TourScheduler", { enumerable: true, get: function () { return TourScheduler_1.TourScheduler; } });
var MortgageCalc_1 = require("./MortgageCalc");
Object.defineProperty(exports, "MortgageCalc", { enumerable: true, get: function () { return MortgageCalc_1.MortgageCalc; } });
var AgentCard_1 = require("./AgentCard");
Object.defineProperty(exports, "AgentCard", { enumerable: true, get: function () { return AgentCard_1.AgentCard; } });
var AgentCardV2_1 = require("./AgentCardV2");
Object.defineProperty(exports, "AgentCardV2", { enumerable: true, get: function () { return AgentCardV2_1.AgentCardV2; } });
var AgentCardV3_1 = require("./AgentCardV3");
Object.defineProperty(exports, "AgentCardV3", { enumerable: true, get: function () { return AgentCardV3_1.AgentCardV3; } });
var FloorPlanView_1 = require("./FloorPlanView");
Object.defineProperty(exports, "FloorPlanView", { enumerable: true, get: function () { return FloorPlanView_1.FloorPlanView; } });
var SavedSearchRow_1 = require("./SavedSearchRow");
Object.defineProperty(exports, "SavedSearchRow", { enumerable: true, get: function () { return SavedSearchRow_1.SavedSearchRow; } });
var OpenHouseBadge_1 = require("./OpenHouseBadge");
Object.defineProperty(exports, "OpenHouseBadge", { enumerable: true, get: function () { return OpenHouseBadge_1.OpenHouseBadge; } });
var NeighborhoodStat_1 = require("./NeighborhoodStat");
Object.defineProperty(exports, "NeighborhoodStat", { enumerable: true, get: function () { return NeighborhoodStat_1.NeighborhoodStat; } });
var ComparableRow_1 = require("./ComparableRow");
Object.defineProperty(exports, "ComparableRow", { enumerable: true, get: function () { return ComparableRow_1.ComparableRow; } });
var ComparableRowV2_1 = require("./ComparableRowV2");
Object.defineProperty(exports, "ComparableRowV2", { enumerable: true, get: function () { return ComparableRowV2_1.ComparableRowV2; } });
var ComparableRowV3_1 = require("./ComparableRowV3");
Object.defineProperty(exports, "ComparableRowV3", { enumerable: true, get: function () { return ComparableRowV3_1.ComparableRowV3; } });
/*
 * ── V4 "listing" (image-forward, editorial) design line ──
 * A drop-in V4 variant for each of the 13 originals: elevated cards with
 * floating rounded photos, price-forward headers, soft-primary fact chips, and a
 * brand gradient reserved for the listing moments (property hero, agent header,
 * mortgage summary) and hero image scrims. Base/V2/V3 untouched; V4 is additive.
 * Token-driven, dark-mode safe, web + native.
 */
var PropertyCardV4_1 = require("./PropertyCardV4");
Object.defineProperty(exports, "PropertyCardV4", { enumerable: true, get: function () { return PropertyCardV4_1.PropertyCardV4; } });
var AgentCardV4_1 = require("./AgentCardV4");
Object.defineProperty(exports, "AgentCardV4", { enumerable: true, get: function () { return AgentCardV4_1.AgentCardV4; } });
var ComparableRowV4_1 = require("./ComparableRowV4");
Object.defineProperty(exports, "ComparableRowV4", { enumerable: true, get: function () { return ComparableRowV4_1.ComparableRowV4; } });
var ListingGalleryV4_1 = require("./ListingGalleryV4");
Object.defineProperty(exports, "ListingGalleryV4", { enumerable: true, get: function () { return ListingGalleryV4_1.ListingGalleryV4; } });
var AmenityGridV4_1 = require("./AmenityGridV4");
Object.defineProperty(exports, "AmenityGridV4", { enumerable: true, get: function () { return AmenityGridV4_1.AmenityGridV4; } });
var FloorPlanViewV4_1 = require("./FloorPlanViewV4");
Object.defineProperty(exports, "FloorPlanViewV4", { enumerable: true, get: function () { return FloorPlanViewV4_1.FloorPlanViewV4; } });
var MapPinCardV4_1 = require("./MapPinCardV4");
Object.defineProperty(exports, "MapPinCardV4", { enumerable: true, get: function () { return MapPinCardV4_1.MapPinCardV4; } });
var MortgageCalcV4_1 = require("./MortgageCalcV4");
Object.defineProperty(exports, "MortgageCalcV4", { enumerable: true, get: function () { return MortgageCalcV4_1.MortgageCalcV4; } });
var NeighborhoodStatV4_1 = require("./NeighborhoodStatV4");
Object.defineProperty(exports, "NeighborhoodStatV4", { enumerable: true, get: function () { return NeighborhoodStatV4_1.NeighborhoodStatV4; } });
var PriceHistoryV4_1 = require("./PriceHistoryV4");
Object.defineProperty(exports, "PriceHistoryV4", { enumerable: true, get: function () { return PriceHistoryV4_1.PriceHistoryV4; } });
var OpenHouseBadgeV4_1 = require("./OpenHouseBadgeV4");
Object.defineProperty(exports, "OpenHouseBadgeV4", { enumerable: true, get: function () { return OpenHouseBadgeV4_1.OpenHouseBadgeV4; } });
var SavedSearchRowV4_1 = require("./SavedSearchRowV4");
Object.defineProperty(exports, "SavedSearchRowV4", { enumerable: true, get: function () { return SavedSearchRowV4_1.SavedSearchRowV4; } });
var TourSchedulerV4_1 = require("./TourSchedulerV4");
Object.defineProperty(exports, "TourSchedulerV4", { enumerable: true, get: function () { return TourSchedulerV4_1.TourSchedulerV4; } });
/* ── New components (V4 listing line) ── */
var ListingHero_1 = require("./ListingHero");
Object.defineProperty(exports, "ListingHero", { enumerable: true, get: function () { return ListingHero_1.ListingHero; } });
var AgentProfileHeader_1 = require("./AgentProfileHeader");
Object.defineProperty(exports, "AgentProfileHeader", { enumerable: true, get: function () { return AgentProfileHeader_1.AgentProfileHeader; } });
var MortgageSummary_1 = require("./MortgageSummary");
Object.defineProperty(exports, "MortgageSummary", { enumerable: true, get: function () { return MortgageSummary_1.MortgageSummary; } });
var PropertyFactsBar_1 = require("./PropertyFactsBar");
Object.defineProperty(exports, "PropertyFactsBar", { enumerable: true, get: function () { return PropertyFactsBar_1.PropertyFactsBar; } });
var SchoolCard_1 = require("./SchoolCard");
Object.defineProperty(exports, "SchoolCard", { enumerable: true, get: function () { return SchoolCard_1.SchoolCard; } });
var ContactAgentBar_1 = require("./ContactAgentBar");
Object.defineProperty(exports, "ContactAgentBar", { enumerable: true, get: function () { return ContactAgentBar_1.ContactAgentBar; } });
//# sourceMappingURL=index.js.map