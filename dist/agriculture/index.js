"use strict";
/**
 * `@xenition/ui/agriculture` — presentational farm / agri-tech blocks for React
 * DOM. The web parity of `@xenition/ui/native/agriculture`: same component and
 * prop names (`onPress` → `onClick`, RN → DOM), composed from the web primitives
 * (`Card`, `Button`, `Icon`, `Badge`, `Switch`, `Progress`) plus the shared
 * `BarChart` / `LineChart` and the `EmptyState`. Styled exclusively from the
 * `--xen-*` token classes — no literal colors. Every component forwards a ref to
 * its DOM root, ships empty / loading affordances, and keeps status
 * color-independent (glyph + text label); advisories/alerts use `role="alert"`,
 * interactive cards expose `role="button"` with keyboard activation. None
 * fetches or imports the SDK.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmTaskRow = exports.MarketPriceRow = exports.PestAlert = exports.EquipmentStatus = exports.YieldChart = exports.IrrigationSchedule = exports.SoilMoistureCard = exports.WeatherAdvisory = exports.HarvestLog = exports.LivestockRow = exports.FieldCard = exports.CropCard = void 0;
var CropCard_1 = require("./CropCard");
Object.defineProperty(exports, "CropCard", { enumerable: true, get: function () { return CropCard_1.CropCard; } });
var FieldCard_1 = require("./FieldCard");
Object.defineProperty(exports, "FieldCard", { enumerable: true, get: function () { return FieldCard_1.FieldCard; } });
var LivestockRow_1 = require("./LivestockRow");
Object.defineProperty(exports, "LivestockRow", { enumerable: true, get: function () { return LivestockRow_1.LivestockRow; } });
var HarvestLog_1 = require("./HarvestLog");
Object.defineProperty(exports, "HarvestLog", { enumerable: true, get: function () { return HarvestLog_1.HarvestLog; } });
var WeatherAdvisory_1 = require("./WeatherAdvisory");
Object.defineProperty(exports, "WeatherAdvisory", { enumerable: true, get: function () { return WeatherAdvisory_1.WeatherAdvisory; } });
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
//# sourceMappingURL=index.js.map