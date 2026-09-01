import * as React from 'react';
import type { TreatmentCardProps, TreatmentVariant } from './TreatmentCard';
export interface TreatmentCardV4Props extends TreatmentCardProps {
    /** Override the treatment names — six English words lived inside. */
    variantLabels?: Partial<Record<TreatmentVariant, string>>;
    /** Format the duration. Default `'60 min'`. */
    formatDuration?: (minutes: number) => string;
}
/**
 * **V4 treatment card** — same props as {@link TreatmentCard} plus
 * `variantLabels` and `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **The category stops spending a status colour** — see
 *    {@link TREATMENT_META}.
 * 2. **The media box has a fixed ratio and a `muted` ground**, so a grid does
 *    not reflow as images arrive and a missing image is not a pale rectangle
 *    on a dark page.
 * 3. **The price is in the display face and tabular**, because it is the
 *    figure the decision turns on.
 * 4. **Press is a state layer** over the card's own fill, and the whole card
 *    has one accessible name.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function TreatmentCardV4({ name, priceCents, currency, variant, durationMin, description, imageUrl, formatMoney, bookLabel, variantLabels, formatDuration, onBook, onPress, style, }: TreatmentCardV4Props): React.ReactElement | null;
//# sourceMappingURL=TreatmentCardV4.d.ts.map