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
exports.GenerativeCover = exports.EmptyState = exports.StatusBadge = exports.CheckoutSummaryV3 = exports.OrderSummaryV3 = exports.CheckoutSummaryV2 = exports.OrderSummaryV2 = exports.CheckoutSummary = exports.OrderSummary = exports.CartSummaryV3 = exports.CartSummaryV2 = exports.CartSummary = exports.CartLineItemV3 = exports.CartLineItemV2 = exports.CartLineItem = exports.QuantityStepper = exports.ProductGrid = exports.ProductCardV3 = exports.ProductCardV2 = exports.ProductCard = exports.PriceTag = exports.formatMoney = void 0;
var money_1 = require("./money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
var PriceTag_1 = require("./PriceTag");
Object.defineProperty(exports, "PriceTag", { enumerable: true, get: function () { return PriceTag_1.PriceTag; } });
var ProductCard_1 = require("./ProductCard");
Object.defineProperty(exports, "ProductCard", { enumerable: true, get: function () { return ProductCard_1.ProductCard; } });
var ProductCardV2_1 = require("./ProductCardV2");
Object.defineProperty(exports, "ProductCardV2", { enumerable: true, get: function () { return ProductCardV2_1.ProductCardV2; } });
var ProductCardV3_1 = require("./ProductCardV3");
Object.defineProperty(exports, "ProductCardV3", { enumerable: true, get: function () { return ProductCardV3_1.ProductCardV3; } });
var ProductGrid_1 = require("./ProductGrid");
Object.defineProperty(exports, "ProductGrid", { enumerable: true, get: function () { return ProductGrid_1.ProductGrid; } });
var QuantityStepper_1 = require("./QuantityStepper");
Object.defineProperty(exports, "QuantityStepper", { enumerable: true, get: function () { return QuantityStepper_1.QuantityStepper; } });
var CartLineItem_1 = require("./CartLineItem");
Object.defineProperty(exports, "CartLineItem", { enumerable: true, get: function () { return CartLineItem_1.CartLineItem; } });
var CartLineItemV2_1 = require("./CartLineItemV2");
Object.defineProperty(exports, "CartLineItemV2", { enumerable: true, get: function () { return CartLineItemV2_1.CartLineItemV2; } });
var CartLineItemV3_1 = require("./CartLineItemV3");
Object.defineProperty(exports, "CartLineItemV3", { enumerable: true, get: function () { return CartLineItemV3_1.CartLineItemV3; } });
var CartSummary_1 = require("./CartSummary");
Object.defineProperty(exports, "CartSummary", { enumerable: true, get: function () { return CartSummary_1.CartSummary; } });
var CartSummaryV2_1 = require("./CartSummaryV2");
Object.defineProperty(exports, "CartSummaryV2", { enumerable: true, get: function () { return CartSummaryV2_1.CartSummaryV2; } });
var CartSummaryV3_1 = require("./CartSummaryV3");
Object.defineProperty(exports, "CartSummaryV3", { enumerable: true, get: function () { return CartSummaryV3_1.CartSummaryV3; } });
var OrderSummary_1 = require("./OrderSummary");
Object.defineProperty(exports, "OrderSummary", { enumerable: true, get: function () { return OrderSummary_1.OrderSummary; } });
Object.defineProperty(exports, "CheckoutSummary", { enumerable: true, get: function () { return OrderSummary_1.CheckoutSummary; } });
var OrderSummaryV2_1 = require("./OrderSummaryV2");
Object.defineProperty(exports, "OrderSummaryV2", { enumerable: true, get: function () { return OrderSummaryV2_1.OrderSummaryV2; } });
Object.defineProperty(exports, "CheckoutSummaryV2", { enumerable: true, get: function () { return OrderSummaryV2_1.CheckoutSummaryV2; } });
var OrderSummaryV3_1 = require("./OrderSummaryV3");
Object.defineProperty(exports, "OrderSummaryV3", { enumerable: true, get: function () { return OrderSummaryV3_1.OrderSummaryV3; } });
Object.defineProperty(exports, "CheckoutSummaryV3", { enumerable: true, get: function () { return OrderSummaryV3_1.CheckoutSummaryV3; } });
var StatusBadge_1 = require("./StatusBadge");
Object.defineProperty(exports, "StatusBadge", { enumerable: true, get: function () { return StatusBadge_1.StatusBadge; } });
// EmptyState is a primitive and now lives in `native/primitives`; `./EmptyState`
// is the re-export that keeps the commerce entry point (and every existing
// import of it) working.
var EmptyState_1 = require("./EmptyState");
Object.defineProperty(exports, "EmptyState", { enumerable: true, get: function () { return EmptyState_1.EmptyState; } });
var GenerativeCover_1 = require("./GenerativeCover");
Object.defineProperty(exports, "GenerativeCover", { enumerable: true, get: function () { return GenerativeCover_1.GenerativeCover; } });
//# sourceMappingURL=index.js.map