import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from './internal/format';
export interface AccountHeaderProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * The account home header: a calm brand-gradient panel with the account name, the
 * current balance (integer cents via `formatMoney`), the next due date + an
 * optional AutoPay chip, and a pay CTA. When the balance is `<= 0` it flips to an
 * "all paid up" state. Near-white ink and the gradient derive from the brand
 * ramp — no literals, restyles from the seed, light + dark. The one vivid surface
 * on an otherwise clean, trust-first screen.
 */
export declare function AccountHeader({ accountName, address, balanceCents, currency, dueDate, autoPay, formatMoney: format, payLabel, onPay, onProfile, avatarGlyph, style, }: AccountHeaderProps): React.ReactElement;
//# sourceMappingURL=AccountHeader.d.ts.map