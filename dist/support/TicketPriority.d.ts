import * as React from 'react';
/** Ticket priority levels, low → urgent. */
export type Priority = 'low' | 'normal' | 'high' | 'urgent';
/** `chip` = pill with label; `bars` = a compact signal-strength indicator. */
export type TicketPriorityVariant = 'chip' | 'bars';
export type TicketPrioritySize = 'sm' | 'md';
export interface TicketPriorityProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** The priority level. */
    level: Priority;
    /** Visual treatment (default `chip`). */
    variant?: TicketPriorityVariant;
    /** Size scale (default `md`). */
    size?: TicketPrioritySize;
    /** Hide the text label (glyph/bars only). Label still drives a11y. */
    hideLabel?: boolean;
}
/**
 * Ticket priority indicator (`low`/`normal`/`high`/`urgent`). Two variants: a
 * `chip` (glyph + label pill) and `bars` (a four-step signal indicator whose
 * filled count encodes the level). Tone maps to token classes
 * (`text-danger`/`text-warn`/`text-primary`/`text-muted`); the glyph and the bar
 * count carry the level independently of color. No literal hex. Presentational.
 */
export declare const TicketPriority: React.ForwardRefExoticComponent<TicketPriorityProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=TicketPriority.d.ts.map