import * as React from 'react';
import type { DonationCardProps } from './DonationCard';
/** Drop-in alternate of {@link DonationCardProps} — identical prop contract. */
export type DonationCardV3Props = DonationCardProps;
/**
 * DonationCard — design variant **V3**: a **minimal inline amount row**. No card
 * chrome at all — a compact title, a single horizontal strip of pill amounts,
 * and an inline donate button. Selection rounds a pill to a filled primary tint
 * with a bold ring and flips `accessibilityState.selected` (state by a11y + fill,
 * never color alone). Meant to drop into an existing surface (a sheet, a list
 * footer) rather than own one. Same props as {@link DonationCardProps}.
 * Token-only; money is integer cents formatted through `formatMoney`.
 */
export declare function DonationCardV3({ title, description, presets, selected, currency, ctaLabel, variant, onSelectAmount, onDonate, loading, disabled, style, }: DonationCardV3Props): React.ReactElement;
//# sourceMappingURL=DonationCardV3.d.ts.map