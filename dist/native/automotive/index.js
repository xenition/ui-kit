"use strict";
/**
 * `@xenition/ui/native/automotive` — composed ride-hailing, fleet, and
 * connected-car blocks for React Native. Mobile-first, presentational only:
 * every component takes shaped data plus callbacks (nothing fetches) and is
 * styled exclusively from the compiled theme via `useXenitionTheme()`, so a
 * seed change (dark mode included) restyles the whole set. No literal colors
 * (only `SemanticColors` slots plus `withAlpha` tints), and no external map or
 * native dependencies — `TripRoute` is a static styled placeholder.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideStatusBarV3 = exports.RideStatusBarV2 = exports.VehicleCardV3 = exports.VehicleCardV2 = exports.DriverCardV3 = exports.DriverCardV2 = exports.RideRequestCardV3 = exports.RideRequestCardV2 = exports.ServiceReminder = exports.VehicleHealthRow = exports.TripHistoryEmpty = exports.TripHistoryRow = exports.DriverRatingRow = exports.FareEstimate = exports.RideStatusBar = exports.ParkingSpot = exports.FuelChargeGauge = exports.VehicleCard = exports.TripRoute = exports.DriverCard = exports.RideRequestCard = void 0;
var RideRequestCard_1 = require("./RideRequestCard");
Object.defineProperty(exports, "RideRequestCard", { enumerable: true, get: function () { return RideRequestCard_1.RideRequestCard; } });
var DriverCard_1 = require("./DriverCard");
Object.defineProperty(exports, "DriverCard", { enumerable: true, get: function () { return DriverCard_1.DriverCard; } });
var TripRoute_1 = require("./TripRoute");
Object.defineProperty(exports, "TripRoute", { enumerable: true, get: function () { return TripRoute_1.TripRoute; } });
var VehicleCard_1 = require("./VehicleCard");
Object.defineProperty(exports, "VehicleCard", { enumerable: true, get: function () { return VehicleCard_1.VehicleCard; } });
var FuelChargeGauge_1 = require("./FuelChargeGauge");
Object.defineProperty(exports, "FuelChargeGauge", { enumerable: true, get: function () { return FuelChargeGauge_1.FuelChargeGauge; } });
var ParkingSpot_1 = require("./ParkingSpot");
Object.defineProperty(exports, "ParkingSpot", { enumerable: true, get: function () { return ParkingSpot_1.ParkingSpot; } });
var RideStatusBar_1 = require("./RideStatusBar");
Object.defineProperty(exports, "RideStatusBar", { enumerable: true, get: function () { return RideStatusBar_1.RideStatusBar; } });
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
// ── Alternate designs (v2 / v3) — separate drop-in components sharing each
// original's props (`<Name>V{2,3}Props = <Name>Props`). Pick a look at the
// call site; no runtime variant prop.
var RideRequestCardV2_1 = require("./RideRequestCardV2");
Object.defineProperty(exports, "RideRequestCardV2", { enumerable: true, get: function () { return RideRequestCardV2_1.RideRequestCardV2; } });
var RideRequestCardV3_1 = require("./RideRequestCardV3");
Object.defineProperty(exports, "RideRequestCardV3", { enumerable: true, get: function () { return RideRequestCardV3_1.RideRequestCardV3; } });
var DriverCardV2_1 = require("./DriverCardV2");
Object.defineProperty(exports, "DriverCardV2", { enumerable: true, get: function () { return DriverCardV2_1.DriverCardV2; } });
var DriverCardV3_1 = require("./DriverCardV3");
Object.defineProperty(exports, "DriverCardV3", { enumerable: true, get: function () { return DriverCardV3_1.DriverCardV3; } });
var VehicleCardV2_1 = require("./VehicleCardV2");
Object.defineProperty(exports, "VehicleCardV2", { enumerable: true, get: function () { return VehicleCardV2_1.VehicleCardV2; } });
var VehicleCardV3_1 = require("./VehicleCardV3");
Object.defineProperty(exports, "VehicleCardV3", { enumerable: true, get: function () { return VehicleCardV3_1.VehicleCardV3; } });
var RideStatusBarV2_1 = require("./RideStatusBarV2");
Object.defineProperty(exports, "RideStatusBarV2", { enumerable: true, get: function () { return RideStatusBarV2_1.RideStatusBarV2; } });
var RideStatusBarV3_1 = require("./RideStatusBarV3");
Object.defineProperty(exports, "RideStatusBarV3", { enumerable: true, get: function () { return RideStatusBarV3_1.RideStatusBarV3; } });
//# sourceMappingURL=index.js.map