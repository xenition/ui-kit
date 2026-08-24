"use strict";
/**
 * `@xenition/ui/native/crypto` — presentational crypto / web3 / wallet /
 * portfolio blocks for React Native. Composed from the native primitives
 * (`Card`, `Button`, `Badge`, `Switch`, `Icon`) and charts (`Sparkline`,
 * `DonutChart`), and styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors (semantic slots plus `tokens.ramps.*`
 * tints only). Gains read `success`, losses read `danger`, and no status is
 * conveyed by color alone (glyph + label everywhere). Fiat is carried as
 * integer **cents** and funnelled through the finance `MoneyAmount`; token
 * amounts/prices/percentages are formatted with fixed precision so printed
 * values never drift. UI only — no chain deps, no fetching, no SDK import.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeGlyph = exports.changeToneKey = exports.formatPct = exports.formatPrice = exports.formatToken = exports.truncateHash = exports.SeedPhraseGrid = exports.NetworkBadge = exports.PriceAlertRow = exports.StakingCard = exports.TxList = exports.TxRow = exports.PortfolioSummary = exports.GasFeeRow = exports.SwapForm = exports.NFTCard = exports.PriceTicker = exports.TokenRow = exports.WalletCard = void 0;
var WalletCard_1 = require("./WalletCard");
Object.defineProperty(exports, "WalletCard", { enumerable: true, get: function () { return WalletCard_1.WalletCard; } });
var TokenRow_1 = require("./TokenRow");
Object.defineProperty(exports, "TokenRow", { enumerable: true, get: function () { return TokenRow_1.TokenRow; } });
var PriceTicker_1 = require("./PriceTicker");
Object.defineProperty(exports, "PriceTicker", { enumerable: true, get: function () { return PriceTicker_1.PriceTicker; } });
var NFTCard_1 = require("./NFTCard");
Object.defineProperty(exports, "NFTCard", { enumerable: true, get: function () { return NFTCard_1.NFTCard; } });
var SwapForm_1 = require("./SwapForm");
Object.defineProperty(exports, "SwapForm", { enumerable: true, get: function () { return SwapForm_1.SwapForm; } });
var GasFeeRow_1 = require("./GasFeeRow");
Object.defineProperty(exports, "GasFeeRow", { enumerable: true, get: function () { return GasFeeRow_1.GasFeeRow; } });
var PortfolioSummary_1 = require("./PortfolioSummary");
Object.defineProperty(exports, "PortfolioSummary", { enumerable: true, get: function () { return PortfolioSummary_1.PortfolioSummary; } });
var TxRow_1 = require("./TxRow");
Object.defineProperty(exports, "TxRow", { enumerable: true, get: function () { return TxRow_1.TxRow; } });
Object.defineProperty(exports, "TxList", { enumerable: true, get: function () { return TxRow_1.TxList; } });
var StakingCard_1 = require("./StakingCard");
Object.defineProperty(exports, "StakingCard", { enumerable: true, get: function () { return StakingCard_1.StakingCard; } });
var PriceAlertRow_1 = require("./PriceAlertRow");
Object.defineProperty(exports, "PriceAlertRow", { enumerable: true, get: function () { return PriceAlertRow_1.PriceAlertRow; } });
var NetworkBadge_1 = require("./NetworkBadge");
Object.defineProperty(exports, "NetworkBadge", { enumerable: true, get: function () { return NetworkBadge_1.NetworkBadge; } });
var SeedPhraseGrid_1 = require("./SeedPhraseGrid");
Object.defineProperty(exports, "SeedPhraseGrid", { enumerable: true, get: function () { return SeedPhraseGrid_1.SeedPhraseGrid; } });
// Display-formatting helpers (stable, no float drift) — exported for reuse.
var format_1 = require("./internal/format");
Object.defineProperty(exports, "truncateHash", { enumerable: true, get: function () { return format_1.truncateHash; } });
Object.defineProperty(exports, "formatToken", { enumerable: true, get: function () { return format_1.formatToken; } });
Object.defineProperty(exports, "formatPrice", { enumerable: true, get: function () { return format_1.formatPrice; } });
Object.defineProperty(exports, "formatPct", { enumerable: true, get: function () { return format_1.formatPct; } });
Object.defineProperty(exports, "changeToneKey", { enumerable: true, get: function () { return format_1.changeToneKey; } });
Object.defineProperty(exports, "changeGlyph", { enumerable: true, get: function () { return format_1.changeGlyph; } });
//# sourceMappingURL=index.js.map