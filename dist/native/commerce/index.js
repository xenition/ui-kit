"use strict";
/**
 * `@xenition/ui/native/commerce` — presentational catalog / cart / order
 * components for React Native, mirroring the web `@xenition/ui/commerce` prop
 * contracts exactly (Product `{title, priceCents, currency?, compareAtCents?,
 * imageUrl?}`, CartItem `{title, variantTitle, quantity, unitPriceCents}`). No
 * fetching, no SDK import; styled only from compiled theme tokens. Money is
 * always integer **cents**, formatted through the single {@link formatMoney}
 * home (re-exported from the web money util — one formatter across platforms).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerativeCover = exports.EmptyState = exports.StatusBadge = exports.CheckoutSummary = exports.OrderSummary = exports.CartSummary = exports.CartLineItem = exports.QuantityStepper = exports.ProductGrid = exports.ProductCard = exports.PriceTag = exports.formatMoney = void 0;
var money_1 = require("./money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
var PriceTag_1 = require("./PriceTag");
Object.defineProperty(exports, "PriceTag", { enumerable: true, get: function () { return PriceTag_1.PriceTag; } });
var ProductCard_1 = require("./ProductCard");
Object.defineProperty(exports, "ProductCard", { enumerable: true, get: function () { return ProductCard_1.ProductCard; } });
var ProductGrid_1 = require("./ProductGrid");
Object.defineProperty(exports, "ProductGrid", { enumerable: true, get: function () { return ProductGrid_1.ProductGrid; } });
var QuantityStepper_1 = require("./QuantityStepper");
Object.defineProperty(exports, "QuantityStepper", { enumerable: true, get: function () { return QuantityStepper_1.QuantityStepper; } });
var CartLineItem_1 = require("./CartLineItem");
Object.defineProperty(exports, "CartLineItem", { enumerable: true, get: function () { return CartLineItem_1.CartLineItem; } });
var CartSummary_1 = require("./CartSummary");
Object.defineProperty(exports, "CartSummary", { enumerable: true, get: function () { return CartSummary_1.CartSummary; } });
var OrderSummary_1 = require("./OrderSummary");
Object.defineProperty(exports, "OrderSummary", { enumerable: true, get: function () { return OrderSummary_1.OrderSummary; } });
Object.defineProperty(exports, "CheckoutSummary", { enumerable: true, get: function () { return OrderSummary_1.CheckoutSummary; } });
var StatusBadge_1 = require("./StatusBadge");
Object.defineProperty(exports, "StatusBadge", { enumerable: true, get: function () { return StatusBadge_1.StatusBadge; } });
var EmptyState_1 = require("./EmptyState");
Object.defineProperty(exports, "EmptyState", { enumerable: true, get: function () { return EmptyState_1.EmptyState; } });
var GenerativeCover_1 = require("./GenerativeCover");
Object.defineProperty(exports, "GenerativeCover", { enumerable: true, get: function () { return GenerativeCover_1.GenerativeCover; } });
//# sourceMappingURL=index.js.map