import * as React from 'react';
import type { BoardingPassProps } from './BoardingPass';
/** Drop-in for {@link BoardingPassProps} — same props, the V4 "journey" design. */
export type BoardingPassV4Props = BoardingPassProps;
/**
 * BoardingPass — **V4** "journey" design (web parity of the native V4). The
 * signature of the boarding-pass line: a saturated brand-gradient header band
 * carrying the airline/flight and the from→gradient-plane-disc→to route in
 * near-white ink (the FlightCardV4 rail motif), the gate/seat/zone/boarding
 * fields as frosted glass tiles, then a dashed perforated tear line — notched at
 * both edges — dividing the header from a stub bearing a token-drawn barcode and
 * the passenger name / confirmation code. Same props/behavior as
 * {@link BoardingPassProps}; all colors from `--xen-*` token classes and gradient
 * utilities (no literal colors); dark-mode safe.
 */
export declare const BoardingPassV4: React.ForwardRefExoticComponent<BoardingPassProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BoardingPassV4.d.ts.map