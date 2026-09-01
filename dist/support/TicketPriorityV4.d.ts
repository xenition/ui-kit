import * as React from 'react';
import type { TicketPriorityProps } from './TicketPriority';
/** Drop-in for {@link TicketPriorityProps} — same props, the V4 "calm console" design. */
export type TicketPriorityV4Props = TicketPriorityProps;
/**
 * TicketPriority — **V4** "calm console" design (drop-in for
 * {@link TicketPriorityProps}). A refined priority chip: glyph + label inside a
 * soft-tint pill colored by level (`bg-<slot>/10 text-<slot>`) rather than the
 * bordered chip of the base — cleaner and more legible in a busy queue. The
 * `bars` variant is preserved as a four-step signal indicator whose filled count
 * carries the level. Level is encoded by glyph **and** color (never color alone);
 * `size` variants and the `low`/`normal`/`high`/`urgent` mapping are unchanged.
 * All colors from `--xen-*` token classes (no literal hex). Presentational.
 */
export declare const TicketPriorityV4: React.ForwardRefExoticComponent<TicketPriorityProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=TicketPriorityV4.d.ts.map