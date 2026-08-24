"use strict";
/**
 * `@xenition/ui/crypto` — presentational crypto / web3 / wallet / portfolio
 * blocks for React DOM. Composed from the web primitives (`Card`, `Button`,
 * `Badge`, `Switch`, `Icon`, `Input`), charts (`Sparkline`, `DonutChart`,
 * `Legend`), and the finance `MoneyAmount`, and styled exclusively from the
 * `--xen-*` Tailwind token classes — no literal colors (gains read
 * `text-success`, losses `text-danger`), and no status is conveyed by color
 * alone (glyph + label everywhere). Fiat is carried as integer **cents** and
 * funnelled through `MoneyAmount`; token amounts/prices/percentages are
 * formatted with fixed precision so printed values never drift. UI only — no
 * chain deps, no fetching, no SDK import. Web parity of
 * `@xenition/ui/native/crypto`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeToneClass = exports.changeGlyph = exports.changeToneKey = exports.formatPct = exports.formatPrice = exports.formatToken = exports.truncateHash = exports.SeedPhraseGrid = exports.NetworkBadge = exports.PriceAlertRow = exports.StakingCard = exports.TxList = exports.TxRow = exports.PortfolioSummaryV3 = exports.PortfolioSummaryV2 = exports.PortfolioSummary = exports.GasFeeRow = exports.SwapForm = exports.NFTCardV3 = exports.NFTCardV2 = exports.NFTCard = exports.PriceTicker = exports.TokenRowV3 = exports.TokenRowV2 = exports.TokenRow = exports.WalletCardV3 = exports.WalletCardV2 = exports.WalletCard = void 0;
var WalletCard_1 = require("./WalletCard");
Object.defineProperty(exports, "WalletCard", { enumerable: true, get: function () { return WalletCard_1.WalletCard; } });
var WalletCardV2_1 = require("./WalletCardV2");
Object.defineProperty(exports, "WalletCardV2", { enumerable: true, get: function () { return WalletCardV2_1.WalletCardV2; } });
var WalletCardV3_1 = require("./WalletCardV3");
Object.defineProperty(exports, "WalletCardV3", { enumerable: true, get: function () { return WalletCardV3_1.WalletCardV3; } });
var TokenRow_1 = require("./TokenRow");
Object.defineProperty(exports, "TokenRow", { enumerable: true, get: function () { return TokenRow_1.TokenRow; } });
var TokenRowV2_1 = require("./TokenRowV2");
Object.defineProperty(exports, "TokenRowV2", { enumerable: true, get: function () { return TokenRowV2_1.TokenRowV2; } });
var TokenRowV3_1 = require("./TokenRowV3");
Object.defineProperty(exports, "TokenRowV3", { enumerable: true, get: function () { return TokenRowV3_1.TokenRowV3; } });
var PriceTicker_1 = require("./PriceTicker");
Object.defineProperty(exports, "PriceTicker", { enumerable: true, get: function () { return PriceTicker_1.PriceTicker; } });
var NFTCard_1 = require("./NFTCard");
Object.defineProperty(exports, "NFTCard", { enumerable: true, get: function () { return NFTCard_1.NFTCard; } });
var NFTCardV2_1 = require("./NFTCardV2");
Object.defineProperty(exports, "NFTCardV2", { enumerable: true, get: function () { return NFTCardV2_1.NFTCardV2; } });
var NFTCardV3_1 = require("./NFTCardV3");
Object.defineProperty(exports, "NFTCardV3", { enumerable: true, get: function () { return NFTCardV3_1.NFTCardV3; } });
var SwapForm_1 = require("./SwapForm");
Object.defineProperty(exports, "SwapForm", { enumerable: true, get: function () { return SwapForm_1.SwapForm; } });
var GasFeeRow_1 = require("./GasFeeRow");
Object.defineProperty(exports, "GasFeeRow", { enumerable: true, get: function () { return GasFeeRow_1.GasFeeRow; } });
var PortfolioSummary_1 = require("./PortfolioSummary");
Object.defineProperty(exports, "PortfolioSummary", { enumerable: true, get: function () { return PortfolioSummary_1.PortfolioSummary; } });
var PortfolioSummaryV2_1 = require("./PortfolioSummaryV2");
Object.defineProperty(exports, "PortfolioSummaryV2", { enumerable: true, get: function () { return PortfolioSummaryV2_1.PortfolioSummaryV2; } });
var PortfolioSummaryV3_1 = require("./PortfolioSummaryV3");
Object.defineProperty(exports, "PortfolioSummaryV3", { enumerable: true, get: function () { return PortfolioSummaryV3_1.PortfolioSummaryV3; } });
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
Object.defineProperty(exports, "changeToneClass", { enumerable: true, get: function () { return format_1.changeToneClass; } });
//# sourceMappingURL=index.js.map