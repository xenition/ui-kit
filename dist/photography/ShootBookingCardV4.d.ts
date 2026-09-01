import * as React from 'react';
import type { ShootBookingCardProps } from './ShootBookingCard';
/** Drop-in for {@link ShootBookingCardProps} — same props, the V4 "studio" design. */
export type ShootBookingCardV4Props = ShootBookingCardProps;
/**
 * ShootBookingCard — **V4** "studio" design (web parity of the native V4). A
 * booking summary on a clean, elevated studio surface: an elevated `shadow-md`
 * card, bold client name, muted shoot type, and a date/time/location block with
 * muted glyphs. The lifecycle `status` is a labelled `Badge` with the correct
 * tone per status — `requested` (warn), `confirmed` (success), `completed`
 * (primary), `cancelled` (danger) — never color alone. The confirm `Button`
 * only shows for `requested` and stops propagation so it never triggers the
 * card. Optional quoted price via {@link PriceTag}. Identical props/behavior to
 * {@link ShootBookingCardProps}; `onClick` makes the card a keyboard-operable
 * `button`. All colors from `--xen-*` token classes (no literals).
 */
export declare const ShootBookingCardV4: React.ForwardRefExoticComponent<ShootBookingCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ShootBookingCardV4.d.ts.map