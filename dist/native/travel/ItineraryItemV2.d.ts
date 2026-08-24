import * as React from 'react';
import type { ItineraryItemProps } from './ItineraryItem';
/**
 * Drop-in alternate design for {@link ItineraryItem} — same props, new look.
 *
 * V2 is a **timeline node card**: the status node + connecting rail stay on the
 * left, but the event content lifts into an elevated card on the right with a
 * status badge — a chunkier, scannable day-plan row. Identical `ItineraryItemProps`.
 */
export type ItineraryItemV2Props = ItineraryItemProps;
export declare function ItineraryItemV2({ kind, glyph, time, title, subtitle, status, showConnector, onPress, style, }: ItineraryItemV2Props): React.ReactElement;
//# sourceMappingURL=ItineraryItemV2.d.ts.map