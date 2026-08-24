import * as React from 'react';
import type { ItineraryItemProps } from './ItineraryItem';
/**
 * Drop-in alternate design for {@link ItineraryItem} — same props, new look.
 *
 * V3 is a **minimal dense line**: a fixed-width time gutter, a small status dot,
 * then title and subtitle on one tight baseline — no node ring, no rail. Built
 * for long, compact day lists. Identical `ItineraryItemProps` (`showConnector`
 * becomes a hairline divider under the row).
 */
export type ItineraryItemV3Props = ItineraryItemProps;
export declare function ItineraryItemV3({ kind, glyph, time, title, subtitle, status, showConnector, onPress, style, }: ItineraryItemV3Props): React.ReactElement;
//# sourceMappingURL=ItineraryItemV3.d.ts.map