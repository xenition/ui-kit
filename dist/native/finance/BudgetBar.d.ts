import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from '../commerce/money';
export interface BudgetBarProps {
    /** Category / budget name. */
    label: string;
    /** Amount spent so far, in integer **cents**. */
    spentCents: number;
    /** Budget ceiling, in integer **cents**. */
    limitCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    style?: StyleProp<ViewStyle>;
}
/**
 * A labelled budget progress bar: spent-of-limit with a fill whose tone shifts
 * as the budget is consumed — `success` under 75%, `warn` from 75–100%,
 * `danger` once over. Amounts are integer cents (two-decimal, no drift) and the
 * "remaining / over" line is a signed {@link MoneyAmount}. `limitCents <= 0` is
 * guarded (ratio pinned, no divide-by-zero). Token-bound throughout.
 */
export declare function BudgetBar({ label, spentCents, limitCents, currency, formatMoney: format, style, }: BudgetBarProps): React.ReactElement;
//# sourceMappingURL=BudgetBar.d.ts.map