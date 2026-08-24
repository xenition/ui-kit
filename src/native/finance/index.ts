/**
 * `@xenition/ui/native/finance` — presentational fintech / banking / budgeting
 * blocks for React Native. Composed from the native primitives (`Card`,
 * `Button`, `Icon`, `Badge`, `Field`, `Select`, `Input`, `CurrencyInput`) and
 * charts (`MiniBar`, `Sparkline`, `ProgressRing`), styled exclusively from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors. Money is
 * always carried as integer **cents** and funnelled through {@link MoneyAmount}
 * / the single `formatMoney` home, so printed values never drift. Income reads
 * `success`, expense reads `danger`; every component takes data + callbacks +
 * variants (no fetching, no SDK import).
 */

export { MoneyAmount } from './MoneyAmount';
export type {
  MoneyAmountProps,
  MoneyTone,
  MoneyAmountSize,
  MoneySignDisplay,
} from './MoneyAmount';

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

// Money is integer cents everywhere; re-export the single formatter home for
// ergonomics (mirrors the commerce module).
export { formatMoney } from '../commerce/money';
export type { MoneyFormatter } from '../commerce/money';

// Number-masking utilities used by the card / account / payment components.
export { maskCardNumber, maskAccountNumber } from './internal/mask';
