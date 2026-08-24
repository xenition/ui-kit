import * as React from 'react';
import type { TicketStubProps } from './TicketStub';
/** Drop-in replacement for {@link TicketStub} — identical props. */
export type TicketStubV3Props = TicketStubProps;
/**
 * TicketStub — **minimal boarding-pass line** alternate design (web / React DOM).
 *
 * Everything sits on one horizontal strip: the event name + holder / date on
 * the left, structured fields inline through the middle, and a short vertical
 * token-bar strip with the code on the right, split off by a dashed rule. Flat
 * and hairline-bordered rather than the tall elevated stub. Same props as
 * {@link TicketStub} — a drop-in swap. Token-pure; the bars carry no scan
 * dependency.
 */
export declare const TicketStubV3: React.ForwardRefExoticComponent<TicketStubProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TicketStubV3.d.ts.map