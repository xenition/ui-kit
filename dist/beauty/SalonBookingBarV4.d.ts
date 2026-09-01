import * as React from 'react';
import type { SalonBookingBarProps } from './SalonBookingBar';
export interface SalonBookingBarV4Props extends SalonBookingBarProps {
    /**
     * Pay the bottom safe-area inset. Default `true`.
     *
     * The reason this component needed the pass most: it is a **pinned bottom
     * bar** and it read no inset at all, so on a notched phone the one button
     * that takes the money sat under the home indicator.
     */
    safeArea?: boolean;
}
/**
 * **V4 salon booking bar** — the web twin of the native `SalonBookingBarV4`,
 * same props as {@link SalonBookingBar} plus `safeArea`.
 *
 * ## Four changes
 *
 * 1. **It clears the safe-area inset**, via `AuthStickyFooterV4` — the same
 *    band every other pinned CTA in the kit uses, and it also pins and stacks
 *    correctly, which the base's plain bar did not.
 * 2. **The price stops being `text-primary` at `font-weight: 800`.** A fill
 *    slot used as ink, at a weight the scale does not have.
 * 3. **The CTA is the §5 shape** — the one loud thing in the band.
 * 4. **The empty state is announced copy**, not a disabled button alone.
 */
export declare const SalonBookingBarV4: React.ForwardRefExoticComponent<SalonBookingBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SalonBookingBarV4.d.ts.map