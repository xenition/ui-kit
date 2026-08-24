import * as React from 'react';
import { type StyleProp, type TextStyle } from 'react-native';
import { type MoneyFormatter } from '../commerce/money';
/**
 * Semantic tone for a monetary value.
 * - `auto` derives from the sign of `cents` (income → success, expense →
 *   danger, zero → on-surface).
 * - `income` / `expense` force the credit / debit tone.
 * - `neutral` reads on-surface; `muted` reads muted.
 */
export type MoneyTone = 'auto' | 'income' | 'expense' | 'neutral' | 'muted';
export type MoneyAmountSize = 'sm' | 'md' | 'lg' | 'xl';
/** How the +/− prefix is shown. `auto` shows `−` for negatives only. */
export type MoneySignDisplay = 'auto' | 'always' | 'never';
export interface MoneyAmountProps {
    /**
     * Signed integer **minor units (cents)** — the sign carries direction, so no
     * float ever reaches the display (mirrors the kit-wide cents contract).
     */
    cents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Tone → color mapping (default `auto`, derived from the sign). */
    tone?: MoneyTone;
    /** Visual scale (default `md`). */
    size?: MoneyAmountSize;
    /** Sign prefix behavior (default `auto` → `−` on negatives only). */
    signDisplay?: MoneySignDisplay;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
    /** Announced label; defaults to the formatted value with a credit/debit hint. */
    accessibilityLabel?: string;
    style?: StyleProp<TextStyle>;
}
/**
 * The finance module's canonical money display: a single signed, token-toned
 * `Text`. Amounts are integer cents so the printed value never drifts —
 * `formatMoney` renders exactly two decimals via `Intl.NumberFormat`, and the
 * magnitude is formatted from `Math.abs(cents)` with the sign applied
 * separately. Color traces to a `SemanticColors` slot (income = `success`,
 * expense = `danger`) — never a literal. Every other finance component funnels
 * its amounts through here.
 */
export declare function MoneyAmount({ cents, currency, tone, size, signDisplay, formatMoney: format, accessibilityLabel, style, }: MoneyAmountProps): React.ReactElement;
//# sourceMappingURL=MoneyAmount.d.ts.map