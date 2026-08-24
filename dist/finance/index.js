"use strict";
/**
 * `@xenition/ui/finance` — presentational fintech / banking / budgeting blocks
 * for React DOM. Composed from the web primitives (`Card`, `Button`, `Icon`,
 * `Badge`, `Field`, `Select`, `Input`, `CurrencyInput`) and charts (`Sparkline`,
 * `ProgressRing`), styled exclusively from the `--xen-*` token classes — no
 * literal colors. Money is always carried as integer **cents** and funnelled
 * through {@link MoneyAmount} / the single `formatMoney` home, so printed values
 * never drift. Income reads `text-success`, expense reads `text-danger`; every
 * component takes data + callbacks + variants (no fetching, no SDK import). Web
 * parity of `@xenition/ui/native/finance`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskAccountNumber = exports.maskCardNumber = exports.formatMoney = exports.ExchangeRateRow = exports.PaymentMethodRow = exports.SavingsGoalCardV3 = exports.SavingsGoalCardV2 = exports.SavingsGoalCard = exports.StatementList = exports.TransferForm = exports.InvoiceLine = exports.SpendCategoryRow = exports.CreditCardView = exports.BudgetBar = exports.BalanceHeaderV3 = exports.BalanceHeaderV2 = exports.BalanceHeader = exports.AccountCardV3 = exports.AccountCardV2 = exports.AccountCard = exports.TransactionRowV3 = exports.TransactionRowV2 = exports.TransactionRow = exports.MoneyAmount = void 0;
var MoneyAmount_1 = require("./MoneyAmount");
Object.defineProperty(exports, "MoneyAmount", { enumerable: true, get: function () { return MoneyAmount_1.MoneyAmount; } });
var TransactionRow_1 = require("./TransactionRow");
Object.defineProperty(exports, "TransactionRow", { enumerable: true, get: function () { return TransactionRow_1.TransactionRow; } });
var TransactionRowV2_1 = require("./TransactionRowV2");
Object.defineProperty(exports, "TransactionRowV2", { enumerable: true, get: function () { return TransactionRowV2_1.TransactionRowV2; } });
var TransactionRowV3_1 = require("./TransactionRowV3");
Object.defineProperty(exports, "TransactionRowV3", { enumerable: true, get: function () { return TransactionRowV3_1.TransactionRowV3; } });
var AccountCard_1 = require("./AccountCard");
Object.defineProperty(exports, "AccountCard", { enumerable: true, get: function () { return AccountCard_1.AccountCard; } });
var AccountCardV2_1 = require("./AccountCardV2");
Object.defineProperty(exports, "AccountCardV2", { enumerable: true, get: function () { return AccountCardV2_1.AccountCardV2; } });
var AccountCardV3_1 = require("./AccountCardV3");
Object.defineProperty(exports, "AccountCardV3", { enumerable: true, get: function () { return AccountCardV3_1.AccountCardV3; } });
var BalanceHeader_1 = require("./BalanceHeader");
Object.defineProperty(exports, "BalanceHeader", { enumerable: true, get: function () { return BalanceHeader_1.BalanceHeader; } });
var BalanceHeaderV2_1 = require("./BalanceHeaderV2");
Object.defineProperty(exports, "BalanceHeaderV2", { enumerable: true, get: function () { return BalanceHeaderV2_1.BalanceHeaderV2; } });
var BalanceHeaderV3_1 = require("./BalanceHeaderV3");
Object.defineProperty(exports, "BalanceHeaderV3", { enumerable: true, get: function () { return BalanceHeaderV3_1.BalanceHeaderV3; } });
var BudgetBar_1 = require("./BudgetBar");
Object.defineProperty(exports, "BudgetBar", { enumerable: true, get: function () { return BudgetBar_1.BudgetBar; } });
var CreditCardView_1 = require("./CreditCardView");
Object.defineProperty(exports, "CreditCardView", { enumerable: true, get: function () { return CreditCardView_1.CreditCardView; } });
var SpendCategoryRow_1 = require("./SpendCategoryRow");
Object.defineProperty(exports, "SpendCategoryRow", { enumerable: true, get: function () { return SpendCategoryRow_1.SpendCategoryRow; } });
var InvoiceLine_1 = require("./InvoiceLine");
Object.defineProperty(exports, "InvoiceLine", { enumerable: true, get: function () { return InvoiceLine_1.InvoiceLine; } });
var TransferForm_1 = require("./TransferForm");
Object.defineProperty(exports, "TransferForm", { enumerable: true, get: function () { return TransferForm_1.TransferForm; } });
var StatementList_1 = require("./StatementList");
Object.defineProperty(exports, "StatementList", { enumerable: true, get: function () { return StatementList_1.StatementList; } });
var SavingsGoalCard_1 = require("./SavingsGoalCard");
Object.defineProperty(exports, "SavingsGoalCard", { enumerable: true, get: function () { return SavingsGoalCard_1.SavingsGoalCard; } });
var SavingsGoalCardV2_1 = require("./SavingsGoalCardV2");
Object.defineProperty(exports, "SavingsGoalCardV2", { enumerable: true, get: function () { return SavingsGoalCardV2_1.SavingsGoalCardV2; } });
var SavingsGoalCardV3_1 = require("./SavingsGoalCardV3");
Object.defineProperty(exports, "SavingsGoalCardV3", { enumerable: true, get: function () { return SavingsGoalCardV3_1.SavingsGoalCardV3; } });
var PaymentMethodRow_1 = require("./PaymentMethodRow");
Object.defineProperty(exports, "PaymentMethodRow", { enumerable: true, get: function () { return PaymentMethodRow_1.PaymentMethodRow; } });
var ExchangeRateRow_1 = require("./ExchangeRateRow");
Object.defineProperty(exports, "ExchangeRateRow", { enumerable: true, get: function () { return ExchangeRateRow_1.ExchangeRateRow; } });
// Money is integer cents everywhere; re-export the single formatter home for
// ergonomics (mirrors the commerce module).
var money_1 = require("../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
// Number-masking utilities used by the card / account / payment components.
var mask_1 = require("./internal/mask");
Object.defineProperty(exports, "maskCardNumber", { enumerable: true, get: function () { return mask_1.maskCardNumber; } });
Object.defineProperty(exports, "maskAccountNumber", { enumerable: true, get: function () { return mask_1.maskAccountNumber; } });
//# sourceMappingURL=index.js.map