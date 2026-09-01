import * as React from 'react';
import type { ItineraryItemProps } from './ItineraryItem';
/** Drop-in for {@link ItineraryItemProps} — same props, the V4 "journey" design. */
export type ItineraryItemV4Props = ItineraryItemProps;
/**
 * ItineraryItem — **V4** "journey" design. One boarding-pass timeline row: the
 * kind glyph rides a small brand-gradient disc (the signature V4 touch) sitting
 * on a token connector rail, with the time, title and detail line beside it and
 * a status pill (`Badge`) — done→success, active→warn, upcoming→neutral. Same
 * props/behavior as {@link ItineraryItemProps}; token-only colors via
 * `useXenitionTheme()`. Set `showConnector={false}` on the final row.
 */
export declare function ItineraryItemV4({ kind, glyph, time, title, subtitle, status, showConnector, onPress, style, }: ItineraryItemV4Props): React.ReactElement;
//# sourceMappingURL=ItineraryItemV4.d.ts.map