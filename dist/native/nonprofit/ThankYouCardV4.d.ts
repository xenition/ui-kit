import * as React from 'react';
import type { ThankYouCardProps } from './ThankYouCard';
/** Drop-in for {@link ThankYouCardProps} — same props, the V4 "rally" design. */
export type ThankYouCardV4Props = ThankYouCardProps;
/**
 * ThankYouCard — **V4** "rally" design. The post-donation confirmation card and
 * the ONE reserved gradient moment of the nonprofit "rally" line: a celebratory
 * glyph, a thank-you headline (optionally naming the donor), the gift amount in
 * integer cents, a mission message, an optional concrete impact chip, and share
 * / receipt actions. Honors both `variant`s and is prop-identical to
 * {@link ThankYouCardProps}.
 *
 * - `celebratory` = the reserved gradient celebration: a `rallyGradient` ground
 *   filling a rounded, overflow-hidden container, near-white `rallyInk` /
 *   `rallyInkSoft` ink, and frosted (`rallyTile` + `rallyBorder`) amount / impact
 *   tiles.
 * - `default` = a clean, warm thank-you on the plain surface (no gradient): a
 *   soft-shadowed rounded card, with the amount as a soft-primary chip.
 *
 * Token-only colors via `useXenitionTheme()` + the rally ramp helpers — no
 * literal colors. Web/native parity with the web `ThankYouCardV4`.
 */
export declare function ThankYouCardV4({ donorName, amountCents, currency, headline, message, impactLabel, variant, onShare, onViewReceipt, style, }: ThankYouCardV4Props): React.ReactElement;
//# sourceMappingURL=ThankYouCardV4.d.ts.map