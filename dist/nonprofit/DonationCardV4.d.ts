import * as React from 'react';
import type { DonationCardProps } from './DonationCard';
/** Drop-in for {@link DonationCardProps} — same props, the V4 "rally" design. */
export type DonationCardV4Props = DonationCardProps;
/**
 * DonationCard — **V4** "rally" design (web parity of the native V4). The warm,
 * mission-driven donate call-to-action surface: an elevated rounded card with a
 * soft shadow, a bold title/blurb, a grid of preset gift amounts as tappable
 * soft-primary chips (integer cents → localized currency via `formatMoney`), and
 * a primary CTA that reports the chosen amount. Selection is conveyed by a filled
 * soft-primary chip, a bold border, AND `aria-checked` on a `role="radio"` button
 * — never color alone. Honors all three `variant`s — `default` (full card),
 * `compact` (dense padding), and `featured` (larger title) — identical
 * props/behavior to {@link DonationCardProps}. All colors from `--xen-*` token
 * classes (no literals).
 */
export declare const DonationCardV4: React.ForwardRefExoticComponent<DonationCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DonationCardV4.d.ts.map