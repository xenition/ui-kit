"use strict";
/**
 * `@xenition/ui/native/food` — presentational food-ordering / restaurant
 * components for React Native. Mobile-first, native-only, styled exclusively
 * from compiled theme tokens (no literal colors), with no data fetching or SDK
 * imports. Money is always integer **cents**, formatted through the shared
 * `formatMoney` home re-exported from `@xenition/ui/native/commerce`.
 *
 * Components compose the native primitives (`Card`, `Button`, `Badge`, `Icon`,
 * `Rating`) and the commerce layer (`PriceTag`, `QuantityStepper`, the money
 * formatter) so the food domain stays a thin, opinionated surface on top.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuSectionV3 = exports.MenuSectionV2 = exports.CartBarV3 = exports.CartBarV2 = exports.RestaurantCardV3 = exports.RestaurantCardV2 = exports.DishCardV3 = exports.DishCardV2 = exports.TableReservationRow = exports.CuisineChip = exports.NutritionBadge = exports.TipSelector = exports.ReorderRow = exports.RatingSummary = exports.DeliveryEstimate = exports.ModifierList = exports.RestaurantCard = exports.OrderStatusTracker = exports.CartBar = exports.MenuSection = exports.DishCard = void 0;
var DishCard_1 = require("./DishCard");
Object.defineProperty(exports, "DishCard", { enumerable: true, get: function () { return DishCard_1.DishCard; } });
var MenuSection_1 = require("./MenuSection");
Object.defineProperty(exports, "MenuSection", { enumerable: true, get: function () { return MenuSection_1.MenuSection; } });
var CartBar_1 = require("./CartBar");
Object.defineProperty(exports, "CartBar", { enumerable: true, get: function () { return CartBar_1.CartBar; } });
var OrderStatusTracker_1 = require("./OrderStatusTracker");
Object.defineProperty(exports, "OrderStatusTracker", { enumerable: true, get: function () { return OrderStatusTracker_1.OrderStatusTracker; } });
var RestaurantCard_1 = require("./RestaurantCard");
Object.defineProperty(exports, "RestaurantCard", { enumerable: true, get: function () { return RestaurantCard_1.RestaurantCard; } });
var ModifierList_1 = require("./ModifierList");
Object.defineProperty(exports, "ModifierList", { enumerable: true, get: function () { return ModifierList_1.ModifierList; } });
var DeliveryEstimate_1 = require("./DeliveryEstimate");
Object.defineProperty(exports, "DeliveryEstimate", { enumerable: true, get: function () { return DeliveryEstimate_1.DeliveryEstimate; } });
var RatingSummary_1 = require("./RatingSummary");
Object.defineProperty(exports, "RatingSummary", { enumerable: true, get: function () { return RatingSummary_1.RatingSummary; } });
var ReorderRow_1 = require("./ReorderRow");
Object.defineProperty(exports, "ReorderRow", { enumerable: true, get: function () { return ReorderRow_1.ReorderRow; } });
var TipSelector_1 = require("./TipSelector");
Object.defineProperty(exports, "TipSelector", { enumerable: true, get: function () { return TipSelector_1.TipSelector; } });
var NutritionBadge_1 = require("./NutritionBadge");
Object.defineProperty(exports, "NutritionBadge", { enumerable: true, get: function () { return NutritionBadge_1.NutritionBadge; } });
var CuisineChip_1 = require("./CuisineChip");
Object.defineProperty(exports, "CuisineChip", { enumerable: true, get: function () { return CuisineChip_1.CuisineChip; } });
var TableReservationRow_1 = require("./TableReservationRow");
Object.defineProperty(exports, "TableReservationRow", { enumerable: true, get: function () { return TableReservationRow_1.TableReservationRow; } });
/**
 * Alternate DESIGNS (V2 / V3) of the most-used food components. Each is a
 * genuinely different layout — not a restyle — and a drop-in for its classic:
 * `<Name>V2Props` / `<Name>V3Props` are aliases of the classic `<Name>Props`,
 * so they swap in with no prop changes. Same token purity, a11y, and cents
 * money contract as the originals.
 */
var DishCardV2_1 = require("./DishCardV2");
Object.defineProperty(exports, "DishCardV2", { enumerable: true, get: function () { return DishCardV2_1.DishCardV2; } });
var DishCardV3_1 = require("./DishCardV3");
Object.defineProperty(exports, "DishCardV3", { enumerable: true, get: function () { return DishCardV3_1.DishCardV3; } });
var RestaurantCardV2_1 = require("./RestaurantCardV2");
Object.defineProperty(exports, "RestaurantCardV2", { enumerable: true, get: function () { return RestaurantCardV2_1.RestaurantCardV2; } });
var RestaurantCardV3_1 = require("./RestaurantCardV3");
Object.defineProperty(exports, "RestaurantCardV3", { enumerable: true, get: function () { return RestaurantCardV3_1.RestaurantCardV3; } });
var CartBarV2_1 = require("./CartBarV2");
Object.defineProperty(exports, "CartBarV2", { enumerable: true, get: function () { return CartBarV2_1.CartBarV2; } });
var CartBarV3_1 = require("./CartBarV3");
Object.defineProperty(exports, "CartBarV3", { enumerable: true, get: function () { return CartBarV3_1.CartBarV3; } });
var MenuSectionV2_1 = require("./MenuSectionV2");
Object.defineProperty(exports, "MenuSectionV2", { enumerable: true, get: function () { return MenuSectionV2_1.MenuSectionV2; } });
var MenuSectionV3_1 = require("./MenuSectionV3");
Object.defineProperty(exports, "MenuSectionV3", { enumerable: true, get: function () { return MenuSectionV3_1.MenuSectionV3; } });
//# sourceMappingURL=index.js.map