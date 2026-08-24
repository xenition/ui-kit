import * as React from 'react';
export interface TicketTypeRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
    /** Tier name, e.g. `General Admission`. */
    name: string;
    /** Pre-formatted price, e.g. `$49` or `Free`. */
    price: string;
    /** Short description / perks line. */
    description?: string;
    /** Remaining inventory; `0` marks the row sold out and disables it. */
    remaining?: number;
    /** Force the sold-out state regardless of `remaining`. */
    soldOut?: boolean;
    /** Whether this row is the current selection. */
    selected?: boolean;
    /** Fires when the row is chosen (never fires while sold out/disabled). */
    onSelect?: () => void;
}
/**
 * A selectable ticket-tier row for a purchase sheet: name, price, description
 * and inventory, with a radio-style indicator on the right. Selection is
 * conveyed by a filled indicator, a bold border, and `aria-checked` — not color
 * alone. Sold-out rows are dimmed, badged, and non-interactive (`onSelect`
 * never fires while sold out). `onSelect` is renamed from the DOM `onSelect`.
 * Colors come from the `--xen-*` tokens; no literal colors.
 */
export declare const TicketTypeRow: React.ForwardRefExoticComponent<TicketTypeRowProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=TicketTypeRow.d.ts.map