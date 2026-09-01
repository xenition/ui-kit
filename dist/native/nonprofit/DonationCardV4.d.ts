import * as React from 'react';
import type { DonationCardProps } from './DonationCard';
/** Drop-in for {@link DonationCardProps} — same props, the V4 "rally" design. */
export type DonationCardV4Props = DonationCardProps;
/**
 * DonationCard — **V4** "rally" design. The warm, mission-driven donate
 * call-to-action surface: an elevated rounded card with a soft shadow, a bold
 * title/blurb, a grid of preset gift amounts as tappable soft-primary chips
 * (integer cents → localized currency via `formatMoney`, each ≥44px), and a
 * primary CTA that reports the chosen amount. Selection is conveyed by a filled
 * soft-primary chip, a bold border, and `accessibilityState.selected` — never
 * color alone. Honors all three `variant`s — `default` (full card), `compact`
 * (dense padding), and `featured` (larger title) — identical props/behavior to
 * {@link DonationCardProps}. Token-only colors via `useXenitionTheme()`.
 */
export declare function DonationCardV4({ title, description, presets, selected, currency, ctaLabel, variant, onSelectAmount, onDonate, loading, disabled, style, }: DonationCardV4Props): React.ReactElement;
//# sourceMappingURL=DonationCardV4.d.ts.map