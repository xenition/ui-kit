"use strict";
/**
 * `@xenition/ui/beauty` — composed salon / spa / beauty-services blocks for the
 * web (React DOM). The web-parity twin of `@xenition/ui/native/beauty`:
 * presentational only, every component takes shaped data plus callbacks (nothing
 * fetches, no SDK import) and is styled exclusively via the `--xen-*` theme
 * tokens, so a seed change (dark mode included) restyles the whole set. No
 * literal colors — token classes only — and no external dependencies:
 * `BeforeAfter` is a styled split/toggle built from plain `div`s + `img`, no
 * slider library. Money is always integer **cents**, formatted through the
 * shared `formatMoney` (re-exported from the commerce module).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = exports.GiftCardRow = exports.PriceListRow = exports.LookbookGrid = exports.ReviewCard = exports.SalonBookingBar = exports.ProductRecommendation = exports.LoyaltyCard = exports.TreatmentCard = exports.BeforeAfter = exports.AppointmentSlot = exports.StylistCard = exports.ServiceMenuItem = void 0;
var ServiceMenuItem_1 = require("./ServiceMenuItem");
Object.defineProperty(exports, "ServiceMenuItem", { enumerable: true, get: function () { return ServiceMenuItem_1.ServiceMenuItem; } });
var StylistCard_1 = require("./StylistCard");
Object.defineProperty(exports, "StylistCard", { enumerable: true, get: function () { return StylistCard_1.StylistCard; } });
var AppointmentSlot_1 = require("./AppointmentSlot");
Object.defineProperty(exports, "AppointmentSlot", { enumerable: true, get: function () { return AppointmentSlot_1.AppointmentSlot; } });
var BeforeAfter_1 = require("./BeforeAfter");
Object.defineProperty(exports, "BeforeAfter", { enumerable: true, get: function () { return BeforeAfter_1.BeforeAfter; } });
var TreatmentCard_1 = require("./TreatmentCard");
Object.defineProperty(exports, "TreatmentCard", { enumerable: true, get: function () { return TreatmentCard_1.TreatmentCard; } });
var LoyaltyCard_1 = require("./LoyaltyCard");
Object.defineProperty(exports, "LoyaltyCard", { enumerable: true, get: function () { return LoyaltyCard_1.LoyaltyCard; } });
var ProductRecommendation_1 = require("./ProductRecommendation");
Object.defineProperty(exports, "ProductRecommendation", { enumerable: true, get: function () { return ProductRecommendation_1.ProductRecommendation; } });
var SalonBookingBar_1 = require("./SalonBookingBar");
Object.defineProperty(exports, "SalonBookingBar", { enumerable: true, get: function () { return SalonBookingBar_1.SalonBookingBar; } });
var ReviewCard_1 = require("./ReviewCard");
Object.defineProperty(exports, "ReviewCard", { enumerable: true, get: function () { return ReviewCard_1.ReviewCard; } });
var LookbookGrid_1 = require("./LookbookGrid");
Object.defineProperty(exports, "LookbookGrid", { enumerable: true, get: function () { return LookbookGrid_1.LookbookGrid; } });
var PriceListRow_1 = require("./PriceListRow");
Object.defineProperty(exports, "PriceListRow", { enumerable: true, get: function () { return PriceListRow_1.PriceListRow; } });
var GiftCardRow_1 = require("./GiftCardRow");
Object.defineProperty(exports, "GiftCardRow", { enumerable: true, get: function () { return GiftCardRow_1.GiftCardRow; } });
// Shared money formatter — one home across platforms/modules.
var money_1 = require("../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
//# sourceMappingURL=index.js.map