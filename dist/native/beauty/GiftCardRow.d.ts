import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from '../commerce/money';
export type GiftCardStatus = 'active' | 'redeemed' | 'expired' | 'pending';
export interface GiftCardRowProps {
    /** Face value / original amount in integer cents. */
    amountCents: number;
    /** Remaining balance in cents. Defaults to `amountCents`. */
    balanceCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Gift-card code (partially shown; use a masked value if sensitive). */
    code?: string;
    /** Lifecycle status; drives the badge + accent. Falls back to `active`. */
    status?: GiftCardStatus;
    /** Expiry date string (e.g. "Exp 12/26"). */
    expires?: string;
    /** Recipient / sender note. */
    note?: string;
    /** Override the cents → string money formatter. */
    formatMoney?: MoneyFormatter;
    /** Fires when the row is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A gift-card wallet row: a gift glyph, the face value with remaining balance,
 * the (masked) code and expiry, and a status badge. `status` carries the state
 * word and accent (never color alone) — `redeemed`/`expired` dim the row. When
 * balance differs from the face value both are shown. Amounts are integer cents
 * via {@link formatMoney}. Token-only colors via semantic slots + `withAlpha`.
 */
export declare function GiftCardRow({ amountCents, balanceCents, currency, code, status, expires, note, formatMoney: format, onPress, style, }: GiftCardRowProps): React.ReactElement;
//# sourceMappingURL=GiftCardRow.d.ts.map