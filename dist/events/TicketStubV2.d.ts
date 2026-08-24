import * as React from 'react';
import type { TicketStubProps } from './TicketStub';
/** Drop-in replacement for {@link TicketStub} — identical props. */
export type TicketStubV2Props = TicketStubProps;
/**
 * TicketStub — **elevated ticket** alternate design (web / React DOM).
 *
 * Leans into the physical stub metaphor: a soft primary-tinted header band with
 * the event name set large, a punched perforation line (edge notches + a dotted
 * tear) instead of a plain divider, and a taller token-bar "barcode" band. Drop
 * shadow, no border. Same props as {@link TicketStub} — a drop-in swap.
 * Token-pure — the barcode bars ship no scan dependency; their widths seed from
 * `code`.
 */
export declare const TicketStubV2: React.ForwardRefExoticComponent<TicketStubProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TicketStubV2.d.ts.map