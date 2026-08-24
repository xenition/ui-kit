import * as React from 'react';
/** The kind of account a card represents. */
export type AccountVariant = 'checking' | 'savings' | 'credit';
export interface AccountCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Account display name (e.g. "Everyday Checking"). */
    name: string;
    /** Account kind — drives the accent border/glyph and default label. */
    variant: AccountVariant;
    /** Current balance in integer **cents** (may be negative for credit). */
    balanceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Full or partial account/card number; shown masked to the last four. */
    accountNumber?: string;
    /** Override the leading glyph (defaults per variant). */
    icon?: string;
    /** Fires on card click — makes the card a keyboard-operable button. */
    onClick?: () => void;
}
/**
 * A single account tile: a tinted variant glyph + name/type header over the
 * balance. `variant` selects the accent border token (`checking` → primary,
 * `savings` → success, `credit` → accent) and a default glyph; the balance is
 * integer cents rendered through {@link MoneyAmount} (neutral tone, so a
 * positive balance is not colored "income" green). Token-bound throughout. Web
 * parity of the native `AccountCard`.
 */
export declare const AccountCard: React.ForwardRefExoticComponent<AccountCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AccountCard.d.ts.map