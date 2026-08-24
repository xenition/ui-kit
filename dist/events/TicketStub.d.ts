import * as React from 'react';
/** Emphasis of a {@link TicketStub}. */
export type TicketStubVariant = 'default' | 'compact';
export interface TicketStubField {
    /** Small uppercase caption, e.g. `SECTION`. */
    label: string;
    /** The value, e.g. `A`. */
    value: string;
}
export interface TicketStubProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Event name printed across the top of the stub. */
    eventTitle: string;
    /** Ticket holder name. */
    holderName?: string;
    /** Pre-formatted date/time line. */
    dateLabel?: string;
    /** Structured fields rendered in a row (section / row / seat / gate …). */
    fields?: TicketStubField[];
    /**
     * The ticket identifier. Its characters deterministically seed the widths of
     * the placeholder "barcode" bars — this ships NO scan/barcode dependency, it
     * is a purely visual token-drawn placeholder.
     */
    code: string;
    /** Short status/tier tag, e.g. `VIP`. */
    tier?: string;
    /** Density. `compact` hides the field row. */
    variant?: TicketStubVariant;
}
/**
 * A tear-off ticket stub. The lower band is a placeholder "barcode" — a row of
 * vertical bars whose widths are derived deterministically from the ticket
 * `code` characters and painted purely from theme tokens (`on-surface` /
 * `muted`). There is no barcode or scanning dependency; this is a visual
 * stand-in only. All colors come from the `--xen-*` tokens — no literal colors.
 */
export declare const TicketStub: React.ForwardRefExoticComponent<TicketStubProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TicketStub.d.ts.map