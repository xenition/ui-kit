import * as React from 'react';
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
export interface MoneyAmountProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /**
     * Signed integer **minor units (cents)** — the sign carries direction, so no
     * float ever reaches the display (mirrors the kit-wide cents contract).
     */
    cents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Tone → token color class (default `auto`, derived from the sign). */
    tone?: MoneyTone;
    /** Visual scale (default `md`). */
    size?: MoneyAmountSize;
    /** Sign prefix behavior (default `auto` → `−` on negatives only). */
    signDisplay?: MoneySignDisplay;
    /** Override the cents → string formatter (locale control). */
    formatMoney?: MoneyFormatter;
}
/**
 * The finance module's canonical money display: a single signed, token-toned
 * `<span>`. Amounts are integer cents so the printed value never drifts —
 * `formatMoney` renders exactly two decimals via `Intl.NumberFormat`, and the
 * magnitude is formatted from `Math.abs(cents)` with the sign applied
 * separately. Color traces to a `text-*` token class (income = `text-success`,
 * expense = `text-danger`) — never a literal. Every other finance component
 * funnels its amounts through here. Web parity of the native `MoneyAmount`.
 */
export declare const MoneyAmount: React.ForwardRefExoticComponent<MoneyAmountProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=MoneyAmount.d.ts.map