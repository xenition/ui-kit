"use strict";
/**
 * `@xenition/ui/native/pos` — presentational point-of-sale / retail-ops /
 * register blocks for React Native. Composed from the native primitives (`Card`,
 * `Button`, `EmptyState`) and the commerce module (`QuantityStepper`), plus the
 * module-local `StatusPill`, styled exclusively from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors (accents come from
 * `SemanticColors` slots, `tokens.ramps.*`, or a token-tinted `withAlpha`).
 * Money — tenders, totals, discounts, refunds, cash counts — is carried as
 * integer **cents** and funnelled through the shared `formatMoney` for stable
 * 2-decimal output. Every status — tender type, ticket new/preparing/ready,
 * refund requested/processed, cash over/short — is conveyed by a **glyph +
 * word**, never by color alone. Each component is data + callbacks +
 * variants/states with empty/loading handling and a11y labels; no fetching, no
 * SDK import, no printer/hardware dependency.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSuccess = exports.StatusPillV4 = exports.ShiftReportV4 = exports.CashDrawerRowV4 = exports.SplitBillRowV4 = exports.RefundRowV4 = exports.DiscountRowV4 = exports.OrderTicketV4 = exports.PaymentMethodTileV4 = exports.QuickChargeBarV4 = exports.RegisterKeypadV4 = exports.ReceiptViewV4 = exports.CartLineV4 = exports.ProductGridTileV4 = exports.CASH_MOVEMENT_META = exports.REFUND_REASON_META = exports.REFUND_STATUS_META = exports.TICKET_STATUS_META = exports.PAYMENT_METHOD_META = exports.seedRampStep = exports.initials = exports.varianceMeta = exports.sumCents = exports.safeCents = exports.onToneSlot = exports.toneSlot = exports.toneColor = exports.withAlpha = exports.formatMoney = exports.StatusPill = exports.OrderTicket = exports.QuickChargeBar = exports.ShiftReport = exports.RefundRow = exports.SplitBillRow = exports.ProductGridTile = exports.CashDrawerRow = exports.DiscountRow = exports.PaymentMethodTile = exports.ProductGridTileV3 = exports.ProductGridTileV2 = exports.ReceiptViewV3 = exports.ReceiptViewV2 = exports.CartLineV3 = exports.CartLineV2 = exports.RegisterKeypadV3 = exports.RegisterKeypadV2 = exports.ReceiptView = exports.CartLine = exports.RegisterKeypad = void 0;
exports.CategoryTabs = exports.TipSelector = exports.CheckoutSummary = exports.RegisterHeader = exports.SalesSummary = void 0;
var RegisterKeypad_1 = require("./RegisterKeypad");
Object.defineProperty(exports, "RegisterKeypad", { enumerable: true, get: function () { return RegisterKeypad_1.RegisterKeypad; } });
var CartLine_1 = require("./CartLine");
Object.defineProperty(exports, "CartLine", { enumerable: true, get: function () { return CartLine_1.CartLine; } });
var ReceiptView_1 = require("./ReceiptView");
Object.defineProperty(exports, "ReceiptView", { enumerable: true, get: function () { return ReceiptView_1.ReceiptView; } });
// ── design variants (V2 / V3): separate drop-in alternates, identical props ──
var RegisterKeypadV2_1 = require("./RegisterKeypadV2");
Object.defineProperty(exports, "RegisterKeypadV2", { enumerable: true, get: function () { return RegisterKeypadV2_1.RegisterKeypadV2; } });
var RegisterKeypadV3_1 = require("./RegisterKeypadV3");
Object.defineProperty(exports, "RegisterKeypadV3", { enumerable: true, get: function () { return RegisterKeypadV3_1.RegisterKeypadV3; } });
var CartLineV2_1 = require("./CartLineV2");
Object.defineProperty(exports, "CartLineV2", { enumerable: true, get: function () { return CartLineV2_1.CartLineV2; } });
var CartLineV3_1 = require("./CartLineV3");
Object.defineProperty(exports, "CartLineV3", { enumerable: true, get: function () { return CartLineV3_1.CartLineV3; } });
var ReceiptViewV2_1 = require("./ReceiptViewV2");
Object.defineProperty(exports, "ReceiptViewV2", { enumerable: true, get: function () { return ReceiptViewV2_1.ReceiptViewV2; } });
var ReceiptViewV3_1 = require("./ReceiptViewV3");
Object.defineProperty(exports, "ReceiptViewV3", { enumerable: true, get: function () { return ReceiptViewV3_1.ReceiptViewV3; } });
var ProductGridTileV2_1 = require("./ProductGridTileV2");
Object.defineProperty(exports, "ProductGridTileV2", { enumerable: true, get: function () { return ProductGridTileV2_1.ProductGridTileV2; } });
var ProductGridTileV3_1 = require("./ProductGridTileV3");
Object.defineProperty(exports, "ProductGridTileV3", { enumerable: true, get: function () { return ProductGridTileV3_1.ProductGridTileV3; } });
var PaymentMethodTile_1 = require("./PaymentMethodTile");
Object.defineProperty(exports, "PaymentMethodTile", { enumerable: true, get: function () { return PaymentMethodTile_1.PaymentMethodTile; } });
var DiscountRow_1 = require("./DiscountRow");
Object.defineProperty(exports, "DiscountRow", { enumerable: true, get: function () { return DiscountRow_1.DiscountRow; } });
var CashDrawerRow_1 = require("./CashDrawerRow");
Object.defineProperty(exports, "CashDrawerRow", { enumerable: true, get: function () { return CashDrawerRow_1.CashDrawerRow; } });
var ProductGridTile_1 = require("./ProductGridTile");
Object.defineProperty(exports, "ProductGridTile", { enumerable: true, get: function () { return ProductGridTile_1.ProductGridTile; } });
var SplitBillRow_1 = require("./SplitBillRow");
Object.defineProperty(exports, "SplitBillRow", { enumerable: true, get: function () { return SplitBillRow_1.SplitBillRow; } });
var RefundRow_1 = require("./RefundRow");
Object.defineProperty(exports, "RefundRow", { enumerable: true, get: function () { return RefundRow_1.RefundRow; } });
var ShiftReport_1 = require("./ShiftReport");
Object.defineProperty(exports, "ShiftReport", { enumerable: true, get: function () { return ShiftReport_1.ShiftReport; } });
var QuickChargeBar_1 = require("./QuickChargeBar");
Object.defineProperty(exports, "QuickChargeBar", { enumerable: true, get: function () { return QuickChargeBar_1.QuickChargeBar; } });
var OrderTicket_1 = require("./OrderTicket");
Object.defineProperty(exports, "OrderTicket", { enumerable: true, get: function () { return OrderTicket_1.OrderTicket; } });
// ── shared status vocabulary + reusable pill ──────────────────────────────
var StatusPill_1 = require("./StatusPill");
Object.defineProperty(exports, "StatusPill", { enumerable: true, get: function () { return StatusPill_1.StatusPill; } });
var internal_1 = require("./internal");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return internal_1.formatMoney; } });
Object.defineProperty(exports, "withAlpha", { enumerable: true, get: function () { return internal_1.withAlpha; } });
Object.defineProperty(exports, "toneColor", { enumerable: true, get: function () { return internal_1.toneColor; } });
Object.defineProperty(exports, "toneSlot", { enumerable: true, get: function () { return internal_1.toneSlot; } });
Object.defineProperty(exports, "onToneSlot", { enumerable: true, get: function () { return internal_1.onToneSlot; } });
Object.defineProperty(exports, "safeCents", { enumerable: true, get: function () { return internal_1.safeCents; } });
Object.defineProperty(exports, "sumCents", { enumerable: true, get: function () { return internal_1.sumCents; } });
Object.defineProperty(exports, "varianceMeta", { enumerable: true, get: function () { return internal_1.varianceMeta; } });
Object.defineProperty(exports, "initials", { enumerable: true, get: function () { return internal_1.initials; } });
Object.defineProperty(exports, "seedRampStep", { enumerable: true, get: function () { return internal_1.seedRampStep; } });
Object.defineProperty(exports, "PAYMENT_METHOD_META", { enumerable: true, get: function () { return internal_1.PAYMENT_METHOD_META; } });
Object.defineProperty(exports, "TICKET_STATUS_META", { enumerable: true, get: function () { return internal_1.TICKET_STATUS_META; } });
Object.defineProperty(exports, "REFUND_STATUS_META", { enumerable: true, get: function () { return internal_1.REFUND_STATUS_META; } });
Object.defineProperty(exports, "REFUND_REASON_META", { enumerable: true, get: function () { return internal_1.REFUND_REASON_META; } });
Object.defineProperty(exports, "CASH_MOVEMENT_META", { enumerable: true, get: function () { return internal_1.CASH_MOVEMENT_META; } });
/*
 * ── V4 "register" (tactile checkout) design line ──
 * A drop-in V4 variant for each of the 13 originals: crisp tactile surfaces with
 * bold, prominent totals (tabular-nums), satisfying press/selected states, big
 * ≥44px controls, and a brand gradient reserved for the checkout moments
 * (payment success, sales summary, register header, the charge button). Base/
 * V2/V3 untouched; V4 is additive. Token-driven, dark-mode safe, web + native.
 */
var ProductGridTileV4_1 = require("./ProductGridTileV4");
Object.defineProperty(exports, "ProductGridTileV4", { enumerable: true, get: function () { return ProductGridTileV4_1.ProductGridTileV4; } });
var CartLineV4_1 = require("./CartLineV4");
Object.defineProperty(exports, "CartLineV4", { enumerable: true, get: function () { return CartLineV4_1.CartLineV4; } });
var ReceiptViewV4_1 = require("./ReceiptViewV4");
Object.defineProperty(exports, "ReceiptViewV4", { enumerable: true, get: function () { return ReceiptViewV4_1.ReceiptViewV4; } });
var RegisterKeypadV4_1 = require("./RegisterKeypadV4");
Object.defineProperty(exports, "RegisterKeypadV4", { enumerable: true, get: function () { return RegisterKeypadV4_1.RegisterKeypadV4; } });
var QuickChargeBarV4_1 = require("./QuickChargeBarV4");
Object.defineProperty(exports, "QuickChargeBarV4", { enumerable: true, get: function () { return QuickChargeBarV4_1.QuickChargeBarV4; } });
var PaymentMethodTileV4_1 = require("./PaymentMethodTileV4");
Object.defineProperty(exports, "PaymentMethodTileV4", { enumerable: true, get: function () { return PaymentMethodTileV4_1.PaymentMethodTileV4; } });
var OrderTicketV4_1 = require("./OrderTicketV4");
Object.defineProperty(exports, "OrderTicketV4", { enumerable: true, get: function () { return OrderTicketV4_1.OrderTicketV4; } });
var DiscountRowV4_1 = require("./DiscountRowV4");
Object.defineProperty(exports, "DiscountRowV4", { enumerable: true, get: function () { return DiscountRowV4_1.DiscountRowV4; } });
var RefundRowV4_1 = require("./RefundRowV4");
Object.defineProperty(exports, "RefundRowV4", { enumerable: true, get: function () { return RefundRowV4_1.RefundRowV4; } });
var SplitBillRowV4_1 = require("./SplitBillRowV4");
Object.defineProperty(exports, "SplitBillRowV4", { enumerable: true, get: function () { return SplitBillRowV4_1.SplitBillRowV4; } });
var CashDrawerRowV4_1 = require("./CashDrawerRowV4");
Object.defineProperty(exports, "CashDrawerRowV4", { enumerable: true, get: function () { return CashDrawerRowV4_1.CashDrawerRowV4; } });
var ShiftReportV4_1 = require("./ShiftReportV4");
Object.defineProperty(exports, "ShiftReportV4", { enumerable: true, get: function () { return ShiftReportV4_1.ShiftReportV4; } });
var StatusPillV4_1 = require("./StatusPillV4");
Object.defineProperty(exports, "StatusPillV4", { enumerable: true, get: function () { return StatusPillV4_1.StatusPillV4; } });
/* ── New components (V4 register line) ── */
var PaymentSuccess_1 = require("./PaymentSuccess");
Object.defineProperty(exports, "PaymentSuccess", { enumerable: true, get: function () { return PaymentSuccess_1.PaymentSuccess; } });
var SalesSummary_1 = require("./SalesSummary");
Object.defineProperty(exports, "SalesSummary", { enumerable: true, get: function () { return SalesSummary_1.SalesSummary; } });
var RegisterHeader_1 = require("./RegisterHeader");
Object.defineProperty(exports, "RegisterHeader", { enumerable: true, get: function () { return RegisterHeader_1.RegisterHeader; } });
var CheckoutSummary_1 = require("./CheckoutSummary");
Object.defineProperty(exports, "CheckoutSummary", { enumerable: true, get: function () { return CheckoutSummary_1.CheckoutSummary; } });
var TipSelector_1 = require("./TipSelector");
Object.defineProperty(exports, "TipSelector", { enumerable: true, get: function () { return TipSelector_1.TipSelector; } });
var CategoryTabs_1 = require("./CategoryTabs");
Object.defineProperty(exports, "CategoryTabs", { enumerable: true, get: function () { return CategoryTabs_1.CategoryTabs; } });
//# sourceMappingURL=index.js.map