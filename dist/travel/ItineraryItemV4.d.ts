import * as React from 'react';
import type { ItineraryItemProps } from './ItineraryItem';
/** Drop-in for {@link ItineraryItemProps} — same props, the V4 "journey" design. */
export type ItineraryItemV4Props = ItineraryItemProps;
/**
 * ItineraryItem — **V4** "journey" design (web parity of the native V4). One
 * boarding-pass timeline row: the kind glyph rides a small brand-gradient disc
 * (the signature V4 touch) sitting on a token connector rail, with the time,
 * title and detail line beside it and a status pill (`Badge`) — done→success,
 * active→warn, upcoming→neutral. Same props/behavior as
 * {@link ItineraryItemProps}; all colors from `--xen-*` token classes (no literal
 * colors). Set `showConnector={false}` on the final row.
 */
export declare const ItineraryItemV4: React.ForwardRefExoticComponent<ItineraryItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ItineraryItemV4.d.ts.map