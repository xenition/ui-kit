import * as React from 'react';
import type { DonationCardProps } from './DonationCard';
/** Drop-in alternate of {@link DonationCardProps} — identical prop contract. */
export type DonationCardV2Props = DonationCardProps;
/**
 * DonationCard — design variant **V2**: an **elevated donate surface**. Where V1
 * is a flat bordered card, V2 floats on a drop shadow (no border) and turns the
 * presets into a grid of large, tappable amount tiles — the tapped tile fills
 * with the primary slot and flips `accessibilityState.selected` (state by a11y +
 * fill, never color alone). The CTA is a full-width heart button that echoes the
 * chosen amount. Same props as {@link DonationCardProps}. Token-only; money is
 * integer cents formatted through `formatMoney`.
 */
export declare function DonationCardV2({ title, description, presets, selected, currency, ctaLabel, variant, onSelectAmount, onDonate, loading, disabled, style, }: DonationCardV2Props): React.ReactElement;
//# sourceMappingURL=DonationCardV2.d.ts.map