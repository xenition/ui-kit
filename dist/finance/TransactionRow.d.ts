import * as React from 'react';
import { type IconColor } from '../primitives/Icon';
/** Credit (money in) vs debit (money out). */
export type TransactionDirection = 'income' | 'expense';
export interface TransactionRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Merchant / counterparty / description. */
    title: string;
    /** Secondary line (category, account, memo). */
    subtitle?: string;
    /** Transaction amount in integer **cents** (magnitude; sign taken from `direction`). */
    amountCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /**
     * Income tints the amount `success` and prefixes `+`; expense tints it
     * `danger` and prefixes `−`. Omit to let the sign of `amountCents` drive tone.
     */
    direction?: TransactionDirection;
    /** Right-aligned timestamp string (already localized by the caller). */
    date?: string;
    /** Leading glyph/emoji for the category avatar (e.g. `'☕'`, `'🛒'`). */
    icon?: string;
    /** Token color slot for the avatar disc glyph (default `primary`). */
    iconColor?: IconColor;
    /** Fires on row click — makes the row a keyboard-operable button. */
    onClick?: () => void;
}
/**
 * One line in a transaction feed: a tinted category avatar, a title/subtitle
 * stack, and a right-aligned {@link MoneyAmount} over an optional date. The
 * amount tone follows `direction` (income = `text-success`, expense =
 * `text-danger`) and the magnitude is integer cents — no float drift. Fully
 * token-bound; becomes a button only when `onClick` is supplied. Web parity of
 * the native `TransactionRow`.
 */
export declare const TransactionRow: React.ForwardRefExoticComponent<TransactionRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TransactionRow.d.ts.map