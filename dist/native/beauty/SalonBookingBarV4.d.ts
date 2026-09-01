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
 * **V4 salon booking bar** — same props as {@link SalonBookingBar} plus
 * `safeArea`.
 *
 * ## Four changes
 *
 * 1. **It clears the home indicator.** Built on `AuthStickyFooterV4`, which
 *    pays `insets.bottom` — the same band every other pinned CTA in the kit
 *    uses. The base drew its own bar and read no inset.
 * 2. **The price stops being `colors.primary` at `fontWeight: '800'`.** A fill
 *    slot used as ink, at a weight the scale does not have. It is now
 *    `onSurface` in the display face, which is what a total should be.
 * 3. **The CTA is the §5 shape** — full width, `radius.full`, and the one
 *    loud thing in the band.
 * 4. **The empty state is the bar's own copy**, announced, rather than a
 *    disabled button with nothing beside it.
 *
 * Composition note: this is a *band*, so it renders even with no selection —
 * that is the point of it. The empty case is copy, not absence.
 */
export declare function SalonBookingBarV4({ serviceName, totalCents, currency, detail, formatMoney, ctaLabel, disabled, loading, emptyLabel, safeArea, onBook, style, }: SalonBookingBarV4Props): React.ReactElement;
//# sourceMappingURL=SalonBookingBarV4.d.ts.map