import * as React from 'react';
import type { TreatmentCardProps, TreatmentVariant } from './TreatmentCard';
export interface TreatmentCardV4Props extends TreatmentCardProps {
    /** Override the treatment names — six English words lived inside. */
    variantLabels?: Partial<Record<TreatmentVariant, string>>;
    /** Format the duration. Default `'60 min'`. */
    formatDuration?: (minutes: number) => string;
}
/**
 * **V4 treatment card** — the web twin of the native `TreatmentCardV4`, same
 * props as {@link TreatmentCard} plus `variantLabels` and `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **The category stops spending a status colour.**
 * 2. **The media box has a fixed 16:9 ratio and a `muted` ground**, so a grid
 *    does not reflow as images arrive and a missing image is not a pale
 *    rectangle on a dark page.
 * 3. **The price is in the display face and tabular.**
 * 4. **An interactive card is a real `<button>`**, and the whole card has one
 *    accessible name.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare const TreatmentCardV4: React.ForwardRefExoticComponent<TreatmentCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TreatmentCardV4.d.ts.map