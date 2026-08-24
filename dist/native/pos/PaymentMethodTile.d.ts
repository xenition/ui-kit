import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type PaymentMethod } from './internal';
export type PaymentMethodTileVariant = 'grid' | 'list';
export interface PaymentMethodTileProps {
    /** Tender type — drives the glyph, label, and accent tone. */
    method: PaymentMethod;
    /** Override the default label (e.g. "Visa •4242"). */
    label?: string;
    /** Selected state — accent ring + fill (also announced to a11y). */
    selected?: boolean;
    /** Block selection and dim the tile. */
    disabled?: boolean;
    /** Optional amount to charge with this tender, in integer **cents**. */
    amountCents?: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Press handler. */
    onPress?: () => void;
    /** `grid` (default) is a square tap target; `list` is a full-width row. */
    variant?: PaymentMethodTileVariant;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A selectable tender tile for the payment screen — glyph + word (never color
 * alone) with an optional amount. Selection is carried in
 * `accessibilityState.selected` and drawn as an accent ring + token-tinted fill.
 * `grid` is a compact square; `list` is a labelled full-width row. Money is
 * integer **cents**. Token-only: accent from the method tone, fill via a
 * token-tinted `withAlpha`.
 */
export declare function PaymentMethodTile({ method, label, selected, disabled, amountCents, currency, onPress, variant, testID, style, }: PaymentMethodTileProps): React.ReactElement;
//# sourceMappingURL=PaymentMethodTile.d.ts.map