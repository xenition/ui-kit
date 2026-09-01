import * as React from 'react';
import type { ShootBookingCardProps } from './ShootBookingCard';
/** Drop-in for {@link ShootBookingCardProps} — same props, the V4 "studio" design. */
export type ShootBookingCardV4Props = ShootBookingCardProps;
/**
 * ShootBookingCard — **V4** "studio" design. A booking summary on a clean,
 * elevated studio surface: an elevated card (soft shadow, hairline border), a
 * bold client name, muted shoot type, and a date/time/location block with muted
 * glyphs. The lifecycle `status` is a labelled `Badge` with the correct tone per
 * status — `requested` (warn), `confirmed` (success), `completed` (primary),
 * `cancelled` (danger) — never color alone. The confirm `Button` only shows for
 * `requested`; its `onPress` stops propagation so it never fires the card press.
 * Optional quoted price via {@link PriceTag}. Identical props/behavior to
 * {@link ShootBookingCardProps}; `onPress` makes the whole card a button.
 * Token-only colors via `useXenitionTheme()`.
 */
export declare function ShootBookingCardV4({ clientName, shootType, dateText, timeText, location, status, priceCents, currency, onConfirm, confirmLabel, onPress, formatMoney, style, }: ShootBookingCardV4Props): React.ReactElement;
//# sourceMappingURL=ShootBookingCardV4.d.ts.map