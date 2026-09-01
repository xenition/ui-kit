"use strict";
/**
 * `@xenition/ui/native/agriculture` — presentational farm / agri-tech blocks for
 * React Native. Composed from the native primitives (`Card`, `Button`, `Icon`,
 * `Badge`, `Switch`, `Progress`, `EmptyState`) and the shared `BarChart` /
 * `LineChart`, styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — colors resolve to `SemanticColors` keys (plus a local
 * `withAlpha` tint of a semantic slot for the advisory / pest banners); no
 * literal hex, no new dependencies. Every component is mobile-first and takes
 * data + callbacks + variants/states with empty / loading affordances and
 * color-independent status labels (alerts use `accessibilityRole="alert"`);
 * none fetches or imports the SDK.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.YieldChartV4 = exports.SoilMoistureCardV4 = exports.IrrigationScheduleV4 = exports.HarvestLogV4 = exports.WeatherAdvisoryV4 = exports.PestAlertV4 = exports.MarketPriceRowV4 = exports.LivestockRowV4 = exports.FarmTaskRowV4 = exports.EquipmentStatusV4 = exports.FieldCardV4 = exports.CropCardV4 = exports.FarmTaskRow = exports.MarketPriceRow = exports.PestAlert = exports.EquipmentStatus = exports.YieldChart = exports.IrrigationSchedule = exports.SoilMoistureCard = exports.WeatherAdvisoryV3 = exports.WeatherAdvisoryV2 = exports.WeatherAdvisory = exports.HarvestLogV3 = exports.HarvestLogV2 = exports.HarvestLog = exports.LivestockRow = exports.FieldCardV3 = exports.FieldCardV2 = exports.FieldCard = exports.CropCardV3 = exports.CropCardV2 = exports.CropCard = void 0;
var CropCard_1 = require("./CropCard");
Object.defineProperty(exports, "CropCard", { enumerable: true, get: function () { return CropCard_1.CropCard; } });
var CropCardV2_1 = require("./CropCardV2");
Object.defineProperty(exports, "CropCardV2", { enumerable: true, get: function () { return CropCardV2_1.CropCardV2; } });
var CropCardV3_1 = require("./CropCardV3");
Object.defineProperty(exports, "CropCardV3", { enumerable: true, get: function () { return CropCardV3_1.CropCardV3; } });
var FieldCard_1 = require("./FieldCard");
Object.defineProperty(exports, "FieldCard", { enumerable: true, get: function () { return FieldCard_1.FieldCard; } });
var FieldCardV2_1 = require("./FieldCardV2");
Object.defineProperty(exports, "FieldCardV2", { enumerable: true, get: function () { return FieldCardV2_1.FieldCardV2; } });
var FieldCardV3_1 = require("./FieldCardV3");
Object.defineProperty(exports, "FieldCardV3", { enumerable: true, get: function () { return FieldCardV3_1.FieldCardV3; } });
var LivestockRow_1 = require("./LivestockRow");
Object.defineProperty(exports, "LivestockRow", { enumerable: true, get: function () { return LivestockRow_1.LivestockRow; } });
var HarvestLog_1 = require("./HarvestLog");
Object.defineProperty(exports, "HarvestLog", { enumerable: true, get: function () { return HarvestLog_1.HarvestLog; } });
var HarvestLogV2_1 = require("./HarvestLogV2");
Object.defineProperty(exports, "HarvestLogV2", { enumerable: true, get: function () { return HarvestLogV2_1.HarvestLogV2; } });
var HarvestLogV3_1 = require("./HarvestLogV3");
Object.defineProperty(exports, "HarvestLogV3", { enumerable: true, get: function () { return HarvestLogV3_1.HarvestLogV3; } });
var WeatherAdvisory_1 = require("./WeatherAdvisory");
Object.defineProperty(exports, "WeatherAdvisory", { enumerable: true, get: function () { return WeatherAdvisory_1.WeatherAdvisory; } });
var WeatherAdvisoryV2_1 = require("./WeatherAdvisoryV2");
Object.defineProperty(exports, "WeatherAdvisoryV2", { enumerable: true, get: function () { return WeatherAdvisoryV2_1.WeatherAdvisoryV2; } });
var WeatherAdvisoryV3_1 = require("./WeatherAdvisoryV3");
Object.defineProperty(exports, "WeatherAdvisoryV3", { enumerable: true, get: function () { return WeatherAdvisoryV3_1.WeatherAdvisoryV3; } });
var SoilMoistureCard_1 = require("./SoilMoistureCard");
Object.defineProperty(exports, "SoilMoistureCard", { enumerable: true, get: function () { return SoilMoistureCard_1.SoilMoistureCard; } });
var IrrigationSchedule_1 = require("./IrrigationSchedule");
Object.defineProperty(exports, "IrrigationSchedule", { enumerable: true, get: function () { return IrrigationSchedule_1.IrrigationSchedule; } });
var YieldChart_1 = require("./YieldChart");
Object.defineProperty(exports, "YieldChart", { enumerable: true, get: function () { return YieldChart_1.YieldChart; } });
var EquipmentStatus_1 = require("./EquipmentStatus");
Object.defineProperty(exports, "EquipmentStatus", { enumerable: true, get: function () { return EquipmentStatus_1.EquipmentStatus; } });
var PestAlert_1 = require("./PestAlert");
Object.defineProperty(exports, "PestAlert", { enumerable: true, get: function () { return PestAlert_1.PestAlert; } });
var MarketPriceRow_1 = require("./MarketPriceRow");
Object.defineProperty(exports, "MarketPriceRow", { enumerable: true, get: function () { return MarketPriceRow_1.MarketPriceRow; } });
var FarmTaskRow_1 = require("./FarmTaskRow");
Object.defineProperty(exports, "FarmTaskRow", { enumerable: true, get: function () { return FarmTaskRow_1.FarmTaskRow; } });
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `VERTICALS-V4-BRIEF.md`. Each is a
// drop-in for its base — same props plus optional additions — with one
// deliberate exception: `YieldChartV4` replaces `color` with `tone`, because
// the base used a status colour as a series identity (see the file).
var CropCardV4_1 = require("./CropCardV4");
Object.defineProperty(exports, "CropCardV4", { enumerable: true, get: function () { return CropCardV4_1.CropCardV4; } });
var FieldCardV4_1 = require("./FieldCardV4");
Object.defineProperty(exports, "FieldCardV4", { enumerable: true, get: function () { return FieldCardV4_1.FieldCardV4; } });
var EquipmentStatusV4_1 = require("./EquipmentStatusV4");
Object.defineProperty(exports, "EquipmentStatusV4", { enumerable: true, get: function () { return EquipmentStatusV4_1.EquipmentStatusV4; } });
var FarmTaskRowV4_1 = require("./FarmTaskRowV4");
Object.defineProperty(exports, "FarmTaskRowV4", { enumerable: true, get: function () { return FarmTaskRowV4_1.FarmTaskRowV4; } });
var LivestockRowV4_1 = require("./LivestockRowV4");
Object.defineProperty(exports, "LivestockRowV4", { enumerable: true, get: function () { return LivestockRowV4_1.LivestockRowV4; } });
var MarketPriceRowV4_1 = require("./MarketPriceRowV4");
Object.defineProperty(exports, "MarketPriceRowV4", { enumerable: true, get: function () { return MarketPriceRowV4_1.MarketPriceRowV4; } });
var PestAlertV4_1 = require("./PestAlertV4");
Object.defineProperty(exports, "PestAlertV4", { enumerable: true, get: function () { return PestAlertV4_1.PestAlertV4; } });
var WeatherAdvisoryV4_1 = require("./WeatherAdvisoryV4");
Object.defineProperty(exports, "WeatherAdvisoryV4", { enumerable: true, get: function () { return WeatherAdvisoryV4_1.WeatherAdvisoryV4; } });
var HarvestLogV4_1 = require("./HarvestLogV4");
Object.defineProperty(exports, "HarvestLogV4", { enumerable: true, get: function () { return HarvestLogV4_1.HarvestLogV4; } });
var IrrigationScheduleV4_1 = require("./IrrigationScheduleV4");
Object.defineProperty(exports, "IrrigationScheduleV4", { enumerable: true, get: function () { return IrrigationScheduleV4_1.IrrigationScheduleV4; } });
var SoilMoistureCardV4_1 = require("./SoilMoistureCardV4");
Object.defineProperty(exports, "SoilMoistureCardV4", { enumerable: true, get: function () { return SoilMoistureCardV4_1.SoilMoistureCardV4; } });
var YieldChartV4_1 = require("./YieldChartV4");
Object.defineProperty(exports, "YieldChartV4", { enumerable: true, get: function () { return YieldChartV4_1.YieldChartV4; } });
//# sourceMappingURL=index.js.map