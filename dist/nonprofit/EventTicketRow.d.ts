import * as React from 'react';
export interface EventTicketRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
    /** Ticket tier name, e.g. `Gala Table` or `General Entry`. */
    name: string;
    /** Ticket price, integer **cents**. `0` renders as the localized zero (free). */
    priceCents: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Short perks / description line. */
    description?: string;
    /** Portion of the price that is tax-deductible, integer **cents**. */
    deductibleCents?: number;
    /** Remaining inventory; `0` marks the row sold out and disables it. */
    remaining?: number;
    /** Force the sold-out state regardless of `remaining`. */
    soldOut?: boolean;
    /** Current selection (radio-style). */
    selected?: boolean;
    /** Fires when chosen (never fires while sold out / disabled). */
    onSelect?: () => void;
    /** Disable interaction without the sold-out styling. */
    disabled?: boolean;
}
/**
 * Web parity of the native `EventTicketRow`: a selectable charity-event ticket
 * row — tier name, price (integer cents → `formatMoney`), optional
 * tax-deductible portion, perks, and inventory, with a radio indicator. The row
 * is a real `<button role="radio">`, so selection is announced by `aria-checked`
 * (plus a filled indicator and bold border) — not color alone. Sold-out rows are
 * dimmed, badged and non-interactive. All colors come from the `--xen-*` token
 * classes — no literal colors.
 */
export declare const EventTicketRow: React.ForwardRefExoticComponent<EventTicketRowProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=EventTicketRow.d.ts.map