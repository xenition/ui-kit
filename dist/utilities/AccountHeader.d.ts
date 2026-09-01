import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
export interface AccountHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Account holder or provider name. */
    accountName: string;
    /** Service address / account number line. */
    address?: string;
    /** Current balance owed, in integer **cents** (`<= 0` → all paid up). */
    balanceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Localized next-due date string. */
    dueDate?: string;
    /** Show an "AutoPay on" chip. */
    autoPay?: boolean;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    /** Pay button label (default "Pay bill"). Hidden when no `onPay` or nothing due. */
    payLabel?: string;
    /** Fires on the pay action. */
    onPay?: () => void;
    /** Fires when the profile avatar is tapped. */
    onProfile?: () => void;
    /** Avatar glyph for the profile button. Default `'👤'`. */
    avatarGlyph?: string;
}
/**
 * The account home header (web parity): a calm brand-gradient panel with the
 * account name, the current balance (integer cents via `formatMoney`), the next
 * due date + an optional AutoPay chip, and a pay CTA. When the balance is `<= 0`
 * it flips to an "all paid up" state. Near-white ink (`text-on-primary` /
 * `text-primary-100`) and the gradient both derive from the brand ramp; the
 * frosted chips are `bg-primary-500` and the pay pill is near-white
 * (`bg-on-primary text-primary`). Token-only colors — the one vivid surface on
 * an otherwise clean, trust-first screen.
 */
export declare const AccountHeader: React.ForwardRefExoticComponent<AccountHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AccountHeader.d.ts.map