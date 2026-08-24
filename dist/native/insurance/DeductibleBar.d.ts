import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
export interface DeductibleBarProps {
    /** Amount already applied toward the deductible, in integer **cents**. */
    metCents: number;
    /** Deductible ceiling, in integer **cents**. */
    deductibleCents: number;
    /** Label above the bar (default "Deductible"). */
    label?: string;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    style?: StyleProp<ViewStyle>;
}
/**
 * Progress toward an annual deductible: a token `Progress` bar sized to
 * `met / deductible` with a "met of ceiling" caption and a remaining/"met"
 * line. The bar tone shifts as the deductible is satisfied — `warn` in
 * progress, `success` once fully met — both tracing to `SemanticColors`. A
 * `deductibleCents <= 0` ceiling is guarded (treated as fully met, no
 * divide-by-zero). Amounts are integer cents via `formatMoney`.
 */
export declare function DeductibleBar({ metCents, deductibleCents, label, currency, formatMoney: format, style, }: DeductibleBarProps): React.ReactElement;
//# sourceMappingURL=DeductibleBar.d.ts.map