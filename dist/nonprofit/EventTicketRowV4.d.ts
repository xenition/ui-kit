import * as React from 'react';
import type { EventTicketRowProps } from './EventTicketRow';
/** Drop-in for {@link EventTicketRowProps} — same props, the V4 "rally" design. */
export type EventTicketRowV4Props = EventTicketRowProps;
/**
 * EventTicketRow — **V4** "rally" design (web parity of the native V4). The
 * warm, mission-driven take on a selectable charity-event ticket row: an
 * elevated rounded row (soft shadow, clean surface — no gradient) with a
 * leading ticket glyph in a soft-primary well, a bold tier name, muted perks,
 * an optional tax-deductible note, the price rendered bold via `formatMoney`,
 * and a radio indicator that doubles as the ≥44px hit target. Availability is
 * read via a glyph + a labelled Badge + token color (never color alone): sold
 * out gets a danger "Sold out" badge and disables the row; low stock gets a
 * warn "N left" badge. Selection is announced by `role="radio"` +
 * `aria-checked` (plus a filled dot and a bold primary border). Honors every
 * prop of {@link EventTicketRowProps}; the whole row is a real `<button>`.
 * All colors from `--xen-*` token classes (no literals).
 */
export declare const EventTicketRowV4: React.ForwardRefExoticComponent<EventTicketRowProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=EventTicketRowV4.d.ts.map