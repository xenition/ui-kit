"use strict";
/**
 * `@xenition/ui/native/utilities` — presentational utility / energy / bill-pay
 * blocks for React Native. Composed from the native primitives (`Card`,
 * `Button`, `Icon`, `Badge`, `Progress`, `Switch`) and the token-bound `charts`
 * (`BarChart` / `LineChart`), styled exclusively from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors (every color traces to a
 * `SemanticColors` slot or a `ramps`-derived `withAlpha` tint). Money is always
 * carried as integer **cents** and funnelled through the single `formatMoney`
 * home, so printed values never drift, and metered quantities run through
 * `formatUsage`. Bill / service / payment / request / outage status is conveyed
 * by **text + glyph + color** (paid → success, overdue/outage → danger) — never
 * color alone. Every component takes data + callbacks + variants/states (no
 * fetching, no SDK import).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPct = exports.formatUsage = exports.formatMoney = exports.OUTAGE_STATE = exports.REQUEST_STATE = exports.PAYMENT_STATE = exports.SERVICE_STATE = exports.BILL_STATUS = exports.UTILITY_KIND = exports.EnergyTip = exports.ServiceRequestRow = exports.BudgetBillRow = exports.ConsumptionChart = exports.AutoPayRow = exports.RatePlanCard = exports.OutageAlert = exports.MeterReading = exports.ServiceStatusV3 = exports.ServiceStatusV2 = exports.ServiceStatus = exports.PaymentRowV3 = exports.PaymentRowV2 = exports.PaymentRow = exports.UsageMeterV3 = exports.UsageMeterV2 = exports.UsageMeter = exports.BillCardV3 = exports.BillCardV2 = exports.BillCard = void 0;
var BillCard_1 = require("./BillCard");
Object.defineProperty(exports, "BillCard", { enumerable: true, get: function () { return BillCard_1.BillCard; } });
var BillCardV2_1 = require("./BillCardV2");
Object.defineProperty(exports, "BillCardV2", { enumerable: true, get: function () { return BillCardV2_1.BillCardV2; } });
var BillCardV3_1 = require("./BillCardV3");
Object.defineProperty(exports, "BillCardV3", { enumerable: true, get: function () { return BillCardV3_1.BillCardV3; } });
var UsageMeter_1 = require("./UsageMeter");
Object.defineProperty(exports, "UsageMeter", { enumerable: true, get: function () { return UsageMeter_1.UsageMeter; } });
var UsageMeterV2_1 = require("./UsageMeterV2");
Object.defineProperty(exports, "UsageMeterV2", { enumerable: true, get: function () { return UsageMeterV2_1.UsageMeterV2; } });
var UsageMeterV3_1 = require("./UsageMeterV3");
Object.defineProperty(exports, "UsageMeterV3", { enumerable: true, get: function () { return UsageMeterV3_1.UsageMeterV3; } });
var PaymentRow_1 = require("./PaymentRow");
Object.defineProperty(exports, "PaymentRow", { enumerable: true, get: function () { return PaymentRow_1.PaymentRow; } });
var PaymentRowV2_1 = require("./PaymentRowV2");
Object.defineProperty(exports, "PaymentRowV2", { enumerable: true, get: function () { return PaymentRowV2_1.PaymentRowV2; } });
var PaymentRowV3_1 = require("./PaymentRowV3");
Object.defineProperty(exports, "PaymentRowV3", { enumerable: true, get: function () { return PaymentRowV3_1.PaymentRowV3; } });
var ServiceStatus_1 = require("./ServiceStatus");
Object.defineProperty(exports, "ServiceStatus", { enumerable: true, get: function () { return ServiceStatus_1.ServiceStatus; } });
var ServiceStatusV2_1 = require("./ServiceStatusV2");
Object.defineProperty(exports, "ServiceStatusV2", { enumerable: true, get: function () { return ServiceStatusV2_1.ServiceStatusV2; } });
var ServiceStatusV3_1 = require("./ServiceStatusV3");
Object.defineProperty(exports, "ServiceStatusV3", { enumerable: true, get: function () { return ServiceStatusV3_1.ServiceStatusV3; } });
var MeterReading_1 = require("./MeterReading");
Object.defineProperty(exports, "MeterReading", { enumerable: true, get: function () { return MeterReading_1.MeterReading; } });
var OutageAlert_1 = require("./OutageAlert");
Object.defineProperty(exports, "OutageAlert", { enumerable: true, get: function () { return OutageAlert_1.OutageAlert; } });
var RatePlanCard_1 = require("./RatePlanCard");
Object.defineProperty(exports, "RatePlanCard", { enumerable: true, get: function () { return RatePlanCard_1.RatePlanCard; } });
var AutoPayRow_1 = require("./AutoPayRow");
Object.defineProperty(exports, "AutoPayRow", { enumerable: true, get: function () { return AutoPayRow_1.AutoPayRow; } });
var ConsumptionChart_1 = require("./ConsumptionChart");
Object.defineProperty(exports, "ConsumptionChart", { enumerable: true, get: function () { return ConsumptionChart_1.ConsumptionChart; } });
var BudgetBillRow_1 = require("./BudgetBillRow");
Object.defineProperty(exports, "BudgetBillRow", { enumerable: true, get: function () { return BudgetBillRow_1.BudgetBillRow; } });
var ServiceRequestRow_1 = require("./ServiceRequestRow");
Object.defineProperty(exports, "ServiceRequestRow", { enumerable: true, get: function () { return ServiceRequestRow_1.ServiceRequestRow; } });
var EnergyTip_1 = require("./EnergyTip");
Object.defineProperty(exports, "EnergyTip", { enumerable: true, get: function () { return EnergyTip_1.EnergyTip; } });
// Shared domain descriptors + the single money/format home (re-exported for
// ergonomics; mirrors the finance / insurance modules).
var status_1 = require("./internal/status");
Object.defineProperty(exports, "UTILITY_KIND", { enumerable: true, get: function () { return status_1.UTILITY_KIND; } });
Object.defineProperty(exports, "BILL_STATUS", { enumerable: true, get: function () { return status_1.BILL_STATUS; } });
Object.defineProperty(exports, "SERVICE_STATE", { enumerable: true, get: function () { return status_1.SERVICE_STATE; } });
Object.defineProperty(exports, "PAYMENT_STATE", { enumerable: true, get: function () { return status_1.PAYMENT_STATE; } });
Object.defineProperty(exports, "REQUEST_STATE", { enumerable: true, get: function () { return status_1.REQUEST_STATE; } });
Object.defineProperty(exports, "OUTAGE_STATE", { enumerable: true, get: function () { return status_1.OUTAGE_STATE; } });
var format_1 = require("./internal/format");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return format_1.formatMoney; } });
Object.defineProperty(exports, "formatUsage", { enumerable: true, get: function () { return format_1.formatUsage; } });
Object.defineProperty(exports, "formatPct", { enumerable: true, get: function () { return format_1.formatPct; } });
//# sourceMappingURL=index.js.map