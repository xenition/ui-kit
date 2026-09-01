"use strict";
/**
 * `@xenition/ui/automotive` — composed ride-hailing, fleet, and connected-car
 * blocks for React DOM (web). The web parity of `@xenition/ui/native/automotive`:
 * same component names and prop shapes (`onPress` → `onClick`), presentational
 * only — every component takes shaped data plus callbacks (nothing fetches) and
 * is styled exclusively from `--xen-*` token utility classes, so a seed change
 * (dark mode included) restyles the whole set. No literal colors, and no map or
 * external dependency — `TripRoute` is a static styled `div` placeholder. Money
 * is always integer minor units (cents).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleHealthRowV4 = exports.VehicleCardV4 = exports.TripRouteV4 = exports.TripHistoryEmptyV4 = exports.TripHistoryRowV4 = exports.ServiceReminderV4 = exports.RideStatusBarV4 = exports.RideRequestCardV4 = exports.ParkingSpotV4 = exports.FuelChargeGaugeV4 = exports.FareEstimateV4 = exports.DriverRatingRowV4 = exports.DriverCardV4 = exports.ServiceReminder = exports.VehicleHealthRow = exports.TripHistoryEmpty = exports.TripHistoryRow = exports.DriverRatingRow = exports.FareEstimate = exports.RideStatusBarV3 = exports.RideStatusBarV2 = exports.RideStatusBar = exports.ParkingSpot = exports.FuelChargeGauge = exports.VehicleCardV3 = exports.VehicleCardV2 = exports.VehicleCard = exports.TripRoute = exports.DriverCardV3 = exports.DriverCardV2 = exports.DriverCard = exports.RideRequestCardV3 = exports.RideRequestCardV2 = exports.RideRequestCard = void 0;
var RideRequestCard_1 = require("./RideRequestCard");
Object.defineProperty(exports, "RideRequestCard", { enumerable: true, get: function () { return RideRequestCard_1.RideRequestCard; } });
var RideRequestCardV2_1 = require("./RideRequestCardV2");
Object.defineProperty(exports, "RideRequestCardV2", { enumerable: true, get: function () { return RideRequestCardV2_1.RideRequestCardV2; } });
var RideRequestCardV3_1 = require("./RideRequestCardV3");
Object.defineProperty(exports, "RideRequestCardV3", { enumerable: true, get: function () { return RideRequestCardV3_1.RideRequestCardV3; } });
var DriverCard_1 = require("./DriverCard");
Object.defineProperty(exports, "DriverCard", { enumerable: true, get: function () { return DriverCard_1.DriverCard; } });
var DriverCardV2_1 = require("./DriverCardV2");
Object.defineProperty(exports, "DriverCardV2", { enumerable: true, get: function () { return DriverCardV2_1.DriverCardV2; } });
var DriverCardV3_1 = require("./DriverCardV3");
Object.defineProperty(exports, "DriverCardV3", { enumerable: true, get: function () { return DriverCardV3_1.DriverCardV3; } });
var TripRoute_1 = require("./TripRoute");
Object.defineProperty(exports, "TripRoute", { enumerable: true, get: function () { return TripRoute_1.TripRoute; } });
var VehicleCard_1 = require("./VehicleCard");
Object.defineProperty(exports, "VehicleCard", { enumerable: true, get: function () { return VehicleCard_1.VehicleCard; } });
var VehicleCardV2_1 = require("./VehicleCardV2");
Object.defineProperty(exports, "VehicleCardV2", { enumerable: true, get: function () { return VehicleCardV2_1.VehicleCardV2; } });
var VehicleCardV3_1 = require("./VehicleCardV3");
Object.defineProperty(exports, "VehicleCardV3", { enumerable: true, get: function () { return VehicleCardV3_1.VehicleCardV3; } });
var FuelChargeGauge_1 = require("./FuelChargeGauge");
Object.defineProperty(exports, "FuelChargeGauge", { enumerable: true, get: function () { return FuelChargeGauge_1.FuelChargeGauge; } });
var ParkingSpot_1 = require("./ParkingSpot");
Object.defineProperty(exports, "ParkingSpot", { enumerable: true, get: function () { return ParkingSpot_1.ParkingSpot; } });
var RideStatusBar_1 = require("./RideStatusBar");
Object.defineProperty(exports, "RideStatusBar", { enumerable: true, get: function () { return RideStatusBar_1.RideStatusBar; } });
var RideStatusBarV2_1 = require("./RideStatusBarV2");
Object.defineProperty(exports, "RideStatusBarV2", { enumerable: true, get: function () { return RideStatusBarV2_1.RideStatusBarV2; } });
var RideStatusBarV3_1 = require("./RideStatusBarV3");
Object.defineProperty(exports, "RideStatusBarV3", { enumerable: true, get: function () { return RideStatusBarV3_1.RideStatusBarV3; } });
var FareEstimate_1 = require("./FareEstimate");
Object.defineProperty(exports, "FareEstimate", { enumerable: true, get: function () { return FareEstimate_1.FareEstimate; } });
var DriverRatingRow_1 = require("./DriverRatingRow");
Object.defineProperty(exports, "DriverRatingRow", { enumerable: true, get: function () { return DriverRatingRow_1.DriverRatingRow; } });
var TripHistoryRow_1 = require("./TripHistoryRow");
Object.defineProperty(exports, "TripHistoryRow", { enumerable: true, get: function () { return TripHistoryRow_1.TripHistoryRow; } });
Object.defineProperty(exports, "TripHistoryEmpty", { enumerable: true, get: function () { return TripHistoryRow_1.TripHistoryEmpty; } });
var VehicleHealthRow_1 = require("./VehicleHealthRow");
Object.defineProperty(exports, "VehicleHealthRow", { enumerable: true, get: function () { return VehicleHealthRow_1.VehicleHealthRow; } });
var ServiceReminder_1 = require("./ServiceReminder");
Object.defineProperty(exports, "ServiceReminder", { enumerable: true, get: function () { return ServiceReminder_1.ServiceReminder; } });
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `AUTOMOTIVE-BEAUTY-V4-BRIEF.md`.
// Each is a drop-in for its base — same props plus optional additions.
var DriverCardV4_1 = require("./DriverCardV4");
Object.defineProperty(exports, "DriverCardV4", { enumerable: true, get: function () { return DriverCardV4_1.DriverCardV4; } });
var DriverRatingRowV4_1 = require("./DriverRatingRowV4");
Object.defineProperty(exports, "DriverRatingRowV4", { enumerable: true, get: function () { return DriverRatingRowV4_1.DriverRatingRowV4; } });
var FareEstimateV4_1 = require("./FareEstimateV4");
Object.defineProperty(exports, "FareEstimateV4", { enumerable: true, get: function () { return FareEstimateV4_1.FareEstimateV4; } });
var FuelChargeGaugeV4_1 = require("./FuelChargeGaugeV4");
Object.defineProperty(exports, "FuelChargeGaugeV4", { enumerable: true, get: function () { return FuelChargeGaugeV4_1.FuelChargeGaugeV4; } });
var ParkingSpotV4_1 = require("./ParkingSpotV4");
Object.defineProperty(exports, "ParkingSpotV4", { enumerable: true, get: function () { return ParkingSpotV4_1.ParkingSpotV4; } });
var RideRequestCardV4_1 = require("./RideRequestCardV4");
Object.defineProperty(exports, "RideRequestCardV4", { enumerable: true, get: function () { return RideRequestCardV4_1.RideRequestCardV4; } });
var RideStatusBarV4_1 = require("./RideStatusBarV4");
Object.defineProperty(exports, "RideStatusBarV4", { enumerable: true, get: function () { return RideStatusBarV4_1.RideStatusBarV4; } });
var ServiceReminderV4_1 = require("./ServiceReminderV4");
Object.defineProperty(exports, "ServiceReminderV4", { enumerable: true, get: function () { return ServiceReminderV4_1.ServiceReminderV4; } });
var TripHistoryRowV4_1 = require("./TripHistoryRowV4");
Object.defineProperty(exports, "TripHistoryRowV4", { enumerable: true, get: function () { return TripHistoryRowV4_1.TripHistoryRowV4; } });
Object.defineProperty(exports, "TripHistoryEmptyV4", { enumerable: true, get: function () { return TripHistoryRowV4_1.TripHistoryEmptyV4; } });
var TripRouteV4_1 = require("./TripRouteV4");
Object.defineProperty(exports, "TripRouteV4", { enumerable: true, get: function () { return TripRouteV4_1.TripRouteV4; } });
var VehicleCardV4_1 = require("./VehicleCardV4");
Object.defineProperty(exports, "VehicleCardV4", { enumerable: true, get: function () { return VehicleCardV4_1.VehicleCardV4; } });
var VehicleHealthRowV4_1 = require("./VehicleHealthRowV4");
Object.defineProperty(exports, "VehicleHealthRowV4", { enumerable: true, get: function () { return VehicleHealthRowV4_1.VehicleHealthRowV4; } });
//# sourceMappingURL=index.js.map