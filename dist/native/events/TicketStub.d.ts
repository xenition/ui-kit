import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Emphasis of a {@link TicketStub}. */
export type TicketStubVariant = 'default' | 'compact';
export interface TicketStubField {
    /** Small uppercase caption, e.g. `SECTION`. */
    label: string;
    /** The value, e.g. `A`. */
    value: string;
}
export interface TicketStubProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A tear-off ticket stub. The lower band is a placeholder "barcode" — a row of
 * vertical bars whose widths are derived deterministically from the ticket
 * `code` characters and drawn purely from theme tokens (`onSurface` / `muted`).
 * There is no barcode or scanning dependency; this is a visual stand-in only.
 * All colors come from the compiled theme tokens — no literal colors.
 */
export declare function TicketStub({ eventTitle, holderName, dateLabel, fields, code, tier, variant, style, }: TicketStubProps): React.ReactElement;
//# sourceMappingURL=TicketStub.d.ts.map