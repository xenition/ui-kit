import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
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
    /**
     * Surface treatment (visual-diversity preset). Defaults to `classic` —
     * byte-for-byte the historical bordered card, so this is opt-in only.
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single account tile: a tinted variant glyph + name/type header over the
 * balance. `variant` selects the accent `SemanticColors` slot (`checking` →
 * primary, `savings` → success, `credit` → accent) and a default glyph; the
 * balance is integer cents rendered through {@link MoneyAmount} (neutral tone,
 * so a positive balance is not colored "income" green). Token-bound throughout.
 */
export declare function AccountCard({ name, variant, balanceCents, currency, accountNumber, icon, onPress, appearance, style, }: AccountCardProps): React.ReactElement;
//# sourceMappingURL=AccountCard.d.ts.map