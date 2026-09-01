import * as React from 'react';
import type { VenueCardProps } from './VenueCard';
export interface VenueCardV4Props extends VenueCardProps {
    /** The directions control's copy. Default `'Directions'`. */
    directionsLabel?: string;
}
/**
 * **V4 venue card** — the web twin of the native `VenueCardV4`, same props as
 * {@link VenueCard} plus `directionsLabel`.
 *
 * ## Five changes
 *
 * 1. **Enter on "Directions" gives directions.** This is §1.2's defect and it
 *    is a live keyboard bug. The card guarded the *click* path with
 *    `e.stopPropagation()` and left the *key* path open, so the card's own
 *    `onKeyDown` caught the keydown bubbling out of the Directions button and
 *    ran `e.preventDefault(); currentTarget.click()` — cancelling Enter's
 *    default activation of the button and firing the card instead. A keyboard
 *    user pressing Enter on "Directions" **opened the venue**. The fix is
 *    structural: the card's activation is a real `<button>` around the media
 *    and the details, Directions is that button's **sibling**, and the
 *    synthesised `currentTarget.click()` is gone.
 * 2. **One accessible name carrying the venue.** `aria-label={name}` replaced
 *    the subtree — and `role="button"` makes a subtree presentational anyway —
 *    so the address, the rating, the capacity and the distance were all
 *    unreachable to a screen reader.
 * 3. **The photo placeholder is the shared placeholder ground**, not
 *    `bg-neutral-100`: a ramp step mirrors under `[data-theme="dark"]`, so an
 *    imageless venue drew a near-white plate across the top of a dark card.
 * 4. **Both controls clear 44.** "Directions" was a bare text button, and it is
 *    the one thing on this card somebody taps while walking.
 * 5. **Press is a state layer** — `hover:opacity-95` and `hover:opacity-70` dim
 *    the control's own content, which is the signal M3 reserves for *disabled*
 *    — and the focus ring is `--xen-ring`, not the `primary-300` ramp step.
 */
export declare const VenueCardV4: React.ForwardRefExoticComponent<VenueCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VenueCardV4.d.ts.map