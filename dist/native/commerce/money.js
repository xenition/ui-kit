"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = void 0;
/**
 * Money stays integer **cents** on native exactly as on web. `formatMoney` is
 * a pure `Intl.NumberFormat` util with no DOM dependency, so the native layer
 * re-exports the **single web home** rather than duplicating it — one formatter,
 * one set of tests, identical output across platforms.
 */
var money_1 = require("../../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
//# sourceMappingURL=money.js.map