import * as React from 'react';
import type { GiftCardRowProps, GiftCardStatus } from './GiftCardRow';
export interface GiftCardRowV4Props extends GiftCardRowProps {
    /** Override the status words — four English words lived inside. */
    statusLabels?: Partial<Record<GiftCardStatus, string>>;
    /** Label on the remaining-balance meter. Default `'Remaining'`. */
    balanceLabel?: string;
    /** Draw the separator under the row. Default `false`. */
    last?: boolean;
}
/**
 * **V4 gift card row** — the web twin of the native `GiftCardRowV4`, same
 * props as {@link GiftCardRow} plus `statusLabels`, `balanceLabel` and `last`.
 *
 * ## Four changes
 *
 * 1. **The balance is shown against the face value.** The base printed two
 *    money figures side by side and left the reader to do the division; a
 *    meter answers the only question anyone asks of a gift card.
 * 2. **The code is tabular.** A redemption code is read aloud character by
 *    character and typed into a field.
 * 3. **It is a row from the shared row line.**
 * 4. **Status is a word beside the tone**, and all four words are props.
 *
 * **Renders nothing without an `amountCents`** (§4.5).
 */
export declare const GiftCardRowV4: React.ForwardRefExoticComponent<GiftCardRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GiftCardRowV4.d.ts.map