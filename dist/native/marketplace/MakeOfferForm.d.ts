import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface MakeOfferFormProps {
    /** The listing's asking price in cents; shown as context when provided. */
    listPriceCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Minimum acceptable offer in cents; offers below are rejected inline. */
    minOfferCents?: number;
    /** Include a free-text message field. Default `false`. */
    withMessage?: boolean;
    /** Submit button label (default "Send offer"). */
    submitLabel?: string;
    /** Show a spinner and block submission. */
    loading?: boolean;
    /**
     * Fires with the parsed offer in integer cents (and the optional message)
     * once the input is a valid amount at/above `minOfferCents`.
     */
    onSubmit?: (offerCents: number, message?: string) => void;
    /** testID applied to the amount input (defaults to `xen-mkt-offer-amount`). */
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A make-an-offer form for a listing — an amount field (major units, parsed to
 * integer cents), an optional message, and a submit action. Self-contained
 * validation: empty/invalid amounts and amounts below `minOfferCents` disable
 * submit and surface an inline, token-styled error (state carried by text, not
 * color alone). Presentational: nothing is sent; a valid submit calls
 * `onSubmit(offerCents, message?)`. Reuses `Input`, `Button`, and the shared
 * `formatMoney`; token-only colors via `useXenitionTheme()`.
 */
export declare function MakeOfferForm({ listPriceCents, currency, minOfferCents, withMessage, submitLabel, loading, onSubmit, testID, style, }: MakeOfferFormProps): React.ReactElement;
//# sourceMappingURL=MakeOfferForm.d.ts.map