import * as React from 'react';
import type { TicketStubProps } from './TicketStub';
/**
 * Alternate design (V3) for {@link TicketStub}. Same props — a drop-in swap.
 *
 * A **minimal boarding-pass line**: everything sits on one horizontal strip —
 * the event name + holder / date on the left, structured fields inline through
 * the middle, and a short vertical token-bar strip with the code on the right,
 * split off by a dashed rule. Flat and hairline-bordered rather than the tall
 * elevated stub. Token-pure; the bars carry no scan dependency.
 */
export type TicketStubV3Props = TicketStubProps;
export declare function TicketStubV3({ eventTitle, holderName, dateLabel, fields, code, tier, variant, style, }: TicketStubV3Props): React.ReactElement;
//# sourceMappingURL=TicketStubV3.d.ts.map