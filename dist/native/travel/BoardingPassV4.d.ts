import * as React from 'react';
import type { BoardingPassProps } from './BoardingPass';
/** Drop-in for {@link BoardingPassProps} — same props, the V4 "journey" design. */
export type BoardingPassV4Props = BoardingPassProps;
/**
 * BoardingPass — **V4** "journey" design. The signature of the boarding-pass
 * line: a saturated brand-gradient header band carrying the airline/flight and
 * the from→gradient-plane-disc→to route in near-white ink (the FlightCardV4 rail
 * motif), the gate/seat/zone/boarding fields as frosted glass tiles, then a
 * dashed perforated tear line — notched at both edges — dividing the header from
 * a stub bearing a token-drawn barcode and the passenger name / confirmation
 * code. Same props/behavior as {@link BoardingPassProps}; token-only colors via
 * `useXenitionTheme()` and the `journey*` helpers; dark-mode safe.
 */
export declare function BoardingPassV4({ passenger, from, to, flight, gate, seat, zone, boardingTime, extraFields, barcode, style, }: BoardingPassV4Props): React.ReactElement;
//# sourceMappingURL=BoardingPassV4.d.ts.map