"use strict";
/**
 * `@xenition/ui/native/finance` — presentational fintech / banking / budgeting
 * blocks for React Native. Composed from the native primitives (`Card`,
 * `Button`, `Icon`, `Badge`, `Field`, `Select`, `Input`, `CurrencyInput`) and
 * charts (`MiniBar`, `Sparkline`, `ProgressRing`), styled exclusively from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors. Money is
 * always carried as integer **cents** and funnelled through {@link MoneyAmount}
 * / the single `formatMoney` home, so printed values never drift. Income reads
 * `successText`, expense reads `dangerText` (money is TEXT, so it uses the
 * AA-guaranteed *Text slots); every component takes data + callbacks +
 * variants (no fetching, no SDK import). Card/row/tile blocks accept an
 * `appearance` preset (visual diversity) and animate press / mount motion via
 * the shared reduced-motion-aware hooks — both default to the historical look.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferFormV4 = exports.TransactionRowV4 = exports.StatementListV4 = exports.SpendCategoryRowV4 = exports.SavingsGoalCardV4 = exports.PaymentMethodRowV4 = exports.MoneyAmountV4 = exports.InvoiceLineV4 = exports.ExchangeRateRowV4 = exports.CreditCardViewV4 = exports.BudgetBarV4 = exports.BalanceHeaderV4 = exports.AccountCardV4 = exports.maskAccountNumber = exports.maskCardNumber = exports.formatMoney = exports.ExchangeRateRow = exports.PaymentMethodRow = exports.SavingsGoalCardV3 = exports.SavingsGoalCardV2 = exports.SavingsGoalCard = exports.StatementList = exports.TransferForm = exports.InvoiceLine = exports.SpendCategoryRow = exports.CreditCardView = exports.BudgetBar = exports.BalanceHeaderV3 = exports.BalanceHeaderV2 = exports.BalanceHeader = exports.AccountCardV3 = exports.AccountCardV2 = exports.AccountCard = exports.TransactionRowV3 = exports.TransactionRowV2 = exports.TransactionRow = exports.MoneyAmount = void 0;
var MoneyAmount_1 = require("./MoneyAmount");
Object.defineProperty(exports, "MoneyAmount", { enumerable: true, get: function () { return MoneyAmount_1.MoneyAmount; } });
var TransactionRow_1 = require("./TransactionRow");
Object.defineProperty(exports, "TransactionRow", { enumerable: true, get: function () { return TransactionRow_1.TransactionRow; } });
// Alternate designs (drop-in — identical props to the base component).
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
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `FINANCE-FOOD-V4-BRIEF.md`. Each
// is a drop-in for its base — same props plus optional additions.
var AccountCardV4_1 = require("./AccountCardV4");
Object.defineProperty(exports, "AccountCardV4", { enumerable: true, get: function () { return AccountCardV4_1.AccountCardV4; } });
var BalanceHeaderV4_1 = require("./BalanceHeaderV4");
Object.defineProperty(exports, "BalanceHeaderV4", { enumerable: true, get: function () { return BalanceHeaderV4_1.BalanceHeaderV4; } });
var BudgetBarV4_1 = require("./BudgetBarV4");
Object.defineProperty(exports, "BudgetBarV4", { enumerable: true, get: function () { return BudgetBarV4_1.BudgetBarV4; } });
var CreditCardViewV4_1 = require("./CreditCardViewV4");
Object.defineProperty(exports, "CreditCardViewV4", { enumerable: true, get: function () { return CreditCardViewV4_1.CreditCardViewV4; } });
var ExchangeRateRowV4_1 = require("./ExchangeRateRowV4");
Object.defineProperty(exports, "ExchangeRateRowV4", { enumerable: true, get: function () { return ExchangeRateRowV4_1.ExchangeRateRowV4; } });
var InvoiceLineV4_1 = require("./InvoiceLineV4");
Object.defineProperty(exports, "InvoiceLineV4", { enumerable: true, get: function () { return InvoiceLineV4_1.InvoiceLineV4; } });
var MoneyAmountV4_1 = require("./MoneyAmountV4");
Object.defineProperty(exports, "MoneyAmountV4", { enumerable: true, get: function () { return MoneyAmountV4_1.MoneyAmountV4; } });
var PaymentMethodRowV4_1 = require("./PaymentMethodRowV4");
Object.defineProperty(exports, "PaymentMethodRowV4", { enumerable: true, get: function () { return PaymentMethodRowV4_1.PaymentMethodRowV4; } });
var SavingsGoalCardV4_1 = require("./SavingsGoalCardV4");
Object.defineProperty(exports, "SavingsGoalCardV4", { enumerable: true, get: function () { return SavingsGoalCardV4_1.SavingsGoalCardV4; } });
var SpendCategoryRowV4_1 = require("./SpendCategoryRowV4");
Object.defineProperty(exports, "SpendCategoryRowV4", { enumerable: true, get: function () { return SpendCategoryRowV4_1.SpendCategoryRowV4; } });
var StatementListV4_1 = require("./StatementListV4");
Object.defineProperty(exports, "StatementListV4", { enumerable: true, get: function () { return StatementListV4_1.StatementListV4; } });
var TransactionRowV4_1 = require("./TransactionRowV4");
Object.defineProperty(exports, "TransactionRowV4", { enumerable: true, get: function () { return TransactionRowV4_1.TransactionRowV4; } });
var TransferFormV4_1 = require("./TransferFormV4");
Object.defineProperty(exports, "TransferFormV4", { enumerable: true, get: function () { return TransferFormV4_1.TransferFormV4; } });
//# sourceMappingURL=index.js.map