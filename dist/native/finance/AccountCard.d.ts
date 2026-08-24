import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** The kind of account a card represents. */
export type AccountVariant = 'checking' | 'savings' | 'credit';
export interface AccountCardProps {
    /** Account display name (e.g. "Everyday Checking"). */
    name: string;
    /** Account kind — drives the accent color slot and default glyph. */
    variant: AccountVariant;
    /** Current balance in integer **cents** (may be negative for credit). */
    balanceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Full or partial account/card number; shown masked to the last four. */
    accountNumber?: string;
    /** Override the leading glyph (defaults per variant). */
    icon?: string;
    /** Fires on card press. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single account tile: a tinted variant glyph + name/type header over the
 * balance. `variant` selects the accent `SemanticColors` slot (`checking` →
 * primary, `savings` → success, `credit` → accent) and a default glyph; the
 * balance is integer cents rendered through {@link MoneyAmount} (neutral tone,
 * so a positive balance is not colored "income" green). Token-bound throughout.
 */
export declare function AccountCard({ name, variant, balanceCents, currency, accountNumber, icon, onPress, style, }: AccountCardProps): React.ReactElement;
//# sourceMappingURL=AccountCard.d.ts.map