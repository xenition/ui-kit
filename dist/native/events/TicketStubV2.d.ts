import * as React from 'react';
import type { TicketStubProps } from './TicketStub';
/**
 * Alternate design (V2) for {@link TicketStub}. Same props — a drop-in swap.
 *
 * An **elevated ticket** that leans into the physical stub metaphor: a soft
 * primary-tinted header band with the event name set large, a punched
 * perforation line (edge notches + a dotted tear) instead of a plain divider,
 * and a taller token-bar "barcode" band. Drop shadow, no border. Token-pure —
 * the barcode bars ship no scan dependency; their widths seed from `code`.
 */
export type TicketStubV2Props = TicketStubProps;
export declare function TicketStubV2({ eventTitle, holderName, dateLabel, fields, code, tier, variant, style, }: TicketStubV2Props): React.ReactElement;
//# sourceMappingURL=TicketStubV2.d.ts.map