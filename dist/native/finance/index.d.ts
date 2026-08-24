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
export { MoneyAmount } from './MoneyAmount';
export type { MoneyAmountProps, MoneyTone, MoneyAmountSize, MoneySignDisplay, } from './MoneyAmount';
export { TransactionRow } from './TransactionRow';
export type { TransactionRowProps, TransactionDirection } from './TransactionRow';
export { AccountCard } from './AccountCard';
export type { AccountCardProps, AccountVariant } from './AccountCard';
export { BalanceHeader } from './BalanceHeader';
export type { BalanceHeaderProps } from './BalanceHeader';
export { BudgetBar } from './BudgetBar';
export type { BudgetBarProps } from './BudgetBar';
export { CreditCardView } from './CreditCardView';
export type { CreditCardViewProps, CardBrand, CreditCardVariant } from './CreditCardView';
export { SpendCategoryRow } from './SpendCategoryRow';
export type { SpendCategoryRowProps } from './SpendCategoryRow';
export { InvoiceLine } from './InvoiceLine';
export type { InvoiceLineProps } from './InvoiceLine';
export { TransferForm } from './TransferForm';
export type { TransferFormProps, TransferValues, TransferAccount } from './TransferForm';
export { StatementList } from './StatementList';
export type { StatementListProps, StatementEntry } from './StatementList';
export { SavingsGoalCard } from './SavingsGoalCard';
export type { SavingsGoalCardProps } from './SavingsGoalCard';
export { PaymentMethodRow } from './PaymentMethodRow';
export type { PaymentMethodRowProps, PaymentMethodKind } from './PaymentMethodRow';
export { ExchangeRateRow } from './ExchangeRateRow';
export type { ExchangeRateRowProps } from './ExchangeRateRow';
export { formatMoney } from '../commerce/money';
export type { MoneyFormatter } from '../commerce/money';
export { maskCardNumber, maskAccountNumber } from './internal/mask';
//# sourceMappingURL=index.d.ts.map