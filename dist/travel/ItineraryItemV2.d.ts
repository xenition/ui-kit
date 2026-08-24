import * as React from 'react';
import type { ItineraryItemProps } from './ItineraryItem';
/** Same public contract as {@link ItineraryItem} — a drop-in alternate design. */
export type ItineraryItemV2Props = ItineraryItemProps;
/**
 * ItineraryItem, redesigned (v2): a **timeline card**. A time gutter and a node dot
 * with a connector run down the left; the glyph, title and subtitle sit in an
 * elevated card to the right. Distinct from v1's flat row. Same props, token-only.
 */
export declare const ItineraryItemV2: React.ForwardRefExoticComponent<ItineraryItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ItineraryItemV2.d.ts.map