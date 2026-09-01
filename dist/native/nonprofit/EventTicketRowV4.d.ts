import * as React from 'react';
import type { EventTicketRowProps } from './EventTicketRow';
/** Drop-in for {@link EventTicketRowProps} — same props, the V4 "rally" design. */
export type EventTicketRowV4Props = EventTicketRowProps;
/**
 * EventTicketRow — **V4** "rally" design. The warm, mission-driven take on a
 * selectable charity-event ticket row: an elevated rounded row (soft shadow,
 * clean surface — no gradient) with a leading ticket glyph in a soft-primary
 * well, a bold tier name, muted perks, an optional tax-deductible note, the
 * price rendered bold via `formatMoney`, and a radio indicator. Availability is
 * read via a glyph + a labelled Badge + token color (never color alone): sold
 * out gets a danger "Sold out" badge and disables the row; low stock gets a
 * warn "N left" badge. Selection is announced by `accessibilityState.selected`
 * (plus a filled dot and a bold primary border). Honors every prop of
 * {@link EventTicketRowProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function EventTicketRowV4({ name, priceCents, currency, description, deductibleCents, remaining, soldOut, selected, onSelect, disabled, style, }: EventTicketRowV4Props): React.ReactElement;
//# sourceMappingURL=EventTicketRowV4.d.ts.map