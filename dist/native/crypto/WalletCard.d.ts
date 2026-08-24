import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Custody kind of the wallet. */
export type WalletKind = 'hot' | 'hardware' | 'watch';
export type WalletCardVariant = 'elevated' | 'outlined' | 'accent';
export interface WalletCardProps {
    /** Public address (truncated for display; full string used for copy/a11y). */
    address: string;
    /** Friendly label (e.g. `Main Wallet`). */
    label?: string;
    /** Total portfolio value in integer **cents**. */
    balanceCents?: number;
    /** ISO 4217 currency for the fiat balance (default `USD`). */
    currency?: string;
    /** Native-token balance amount (e.g. `1.245`). */
    nativeAmount?: number;
    /** Native-token ticker (e.g. `ETH`). */
    nativeSymbol?: string;
    /** Fraction digits for the native amount (default `4`). */
    nativeDecimals?: number;
    /** Custody kind — shown as a tone-mapped badge. */
    kind?: WalletKind;
    variant?: WalletCardVariant;
    /** Skeleton state while the balance loads. */
    loading?: boolean;
    /** Fires with the full address when the address chip is pressed. */
    onCopy?: (address: string) => void;
    /** Fires when the card body is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * The header card for a single wallet: a friendly label + custody badge, the
 * total fiat balance (via {@link MoneyAmount}, so the printed value never
 * drifts), the native-token amount, and a pressable truncated-address chip
 * that hands the FULL address back through `onCopy`. Token-bound throughout;
 * the `accent` variant tints the surface from the primary ramp.
 */
export declare function WalletCard({ address, label, balanceCents, currency, nativeAmount, nativeSymbol, nativeDecimals, kind, variant, loading, onCopy, onPress, style, }: WalletCardProps): React.ReactElement;
//# sourceMappingURL=WalletCard.d.ts.map