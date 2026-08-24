"use strict";
/**
 * `@xenition/ui/food` — presentational food-ordering / restaurant components
 * for React DOM (the web parity of `@xenition/ui/native/food`). Web-only,
 * styled exclusively from the `--xen-*` theme tokens via Tailwind token classes
 * (no literal colors), with no data fetching or SDK imports. Money is always
 * integer **cents**, formatted through the shared `formatMoney` re-exported from
 * `@xenition/ui/commerce`.
 *
 * Components compose the web primitives (`Card`, `Button`, `Badge`, `Icon`,
 * `Rating`) and the commerce layer (`PriceTag`, `QuantityStepper`, `EmptyState`,
 * the money formatter) so the food domain stays a thin, opinionated surface on
 * top. Native `onPress` handlers map to DOM `onClick`; whole-item press targets
 * are keyboard-operable `role="button"` roots and per-cell actions are real
 * `<button>`s.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableReservationRow = exports.CuisineChip = exports.NutritionBadge = exports.TipSelector = exports.ReorderRow = exports.RatingSummary = exports.DeliveryEstimate = exports.ModifierList = exports.RestaurantCardV3 = exports.RestaurantCardV2 = exports.RestaurantCard = exports.OrderStatusTracker = exports.CartBarV3 = exports.CartBarV2 = exports.CartBar = exports.MenuSectionV3 = exports.MenuSectionV2 = exports.MenuSection = exports.DishCardV3 = exports.DishCardV2 = exports.DishCard = void 0;
var DishCard_1 = require("./DishCard");
Object.defineProperty(exports, "DishCard", { enumerable: true, get: function () { return DishCard_1.DishCard; } });
var DishCardV2_1 = require("./DishCardV2");
Object.defineProperty(exports, "DishCardV2", { enumerable: true, get: function () { return DishCardV2_1.DishCardV2; } });
var DishCardV3_1 = require("./DishCardV3");
Object.defineProperty(exports, "DishCardV3", { enumerable: true, get: function () { return DishCardV3_1.DishCardV3; } });
var MenuSection_1 = require("./MenuSection");
Object.defineProperty(exports, "MenuSection", { enumerable: true, get: function () { return MenuSection_1.MenuSection; } });
var MenuSectionV2_1 = require("./MenuSectionV2");
Object.defineProperty(exports, "MenuSectionV2", { enumerable: true, get: function () { return MenuSectionV2_1.MenuSectionV2; } });
var MenuSectionV3_1 = require("./MenuSectionV3");
Object.defineProperty(exports, "MenuSectionV3", { enumerable: true, get: function () { return MenuSectionV3_1.MenuSectionV3; } });
var CartBar_1 = require("./CartBar");
Object.defineProperty(exports, "CartBar", { enumerable: true, get: function () { return CartBar_1.CartBar; } });
var CartBarV2_1 = require("./CartBarV2");
Object.defineProperty(exports, "CartBarV2", { enumerable: true, get: function () { return CartBarV2_1.CartBarV2; } });
var CartBarV3_1 = require("./CartBarV3");
Object.defineProperty(exports, "CartBarV3", { enumerable: true, get: function () { return CartBarV3_1.CartBarV3; } });
var OrderStatusTracker_1 = require("./OrderStatusTracker");
Object.defineProperty(exports, "OrderStatusTracker", { enumerable: true, get: function () { return OrderStatusTracker_1.OrderStatusTracker; } });
var RestaurantCard_1 = require("./RestaurantCard");
Object.defineProperty(exports, "RestaurantCard", { enumerable: true, get: function () { return RestaurantCard_1.RestaurantCard; } });
var RestaurantCardV2_1 = require("./RestaurantCardV2");
Object.defineProperty(exports, "RestaurantCardV2", { enumerable: true, get: function () { return RestaurantCardV2_1.RestaurantCardV2; } });
var RestaurantCardV3_1 = require("./RestaurantCardV3");
Object.defineProperty(exports, "RestaurantCardV3", { enumerable: true, get: function () { return RestaurantCardV3_1.RestaurantCardV3; } });
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
//# sourceMappingURL=index.js.map