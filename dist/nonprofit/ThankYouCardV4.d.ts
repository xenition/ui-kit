import * as React from 'react';
import type { ThankYouCardProps } from './ThankYouCard';
/** Drop-in for {@link ThankYouCardProps} — same props, the V4 "rally" design. */
export type ThankYouCardV4Props = ThankYouCardProps;
/**
 * ThankYouCard — **V4** "rally" design (web parity of the native V4). The
 * post-donation confirmation card and the ONE reserved gradient moment of the
 * nonprofit "rally" line: a celebratory glyph, a thank-you headline (optionally
 * naming the donor), the gift amount in integer cents, a mission message, an
 * optional concrete impact chip, and share / receipt actions. Honors both
 * `variant`s and is prop-identical to {@link ThankYouCardProps}.
 *
 * - `celebratory` = the reserved gradient celebration: an elevated
 *   `bg-gradient-to-br from-primary-500 to-primary-700` ground with near-white
 *   `text-primary-50`/`text-primary-100` ink and frosted
 *   (`bg-primary-50/15 border-primary-50/30`) amount / impact tiles.
 * - `default` = a clean, warm thank-you on the plain surface (no gradient):
 *   `rounded-lg border border-border bg-surface shadow-md`, with the amount as a
 *   soft-primary chip.
 *
 * All colors come from `--xen-*` token classes (`primary`/`accent`/`neutral`
 * ramps) — no literal colors.
 */
export declare const ThankYouCardV4: React.ForwardRefExoticComponent<ThankYouCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ThankYouCardV4.d.ts.map