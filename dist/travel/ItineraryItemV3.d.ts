import * as React from 'react';
import type { ItineraryItemProps } from './ItineraryItem';
/** Same public contract as {@link ItineraryItem} — a drop-in alternate design. */
export type ItineraryItemV3Props = ItineraryItemProps;
/**
 * ItineraryItem, redesigned (v3): a **dense agenda line**. The time leads, then the
 * glyph, the title over a subtitle, and a status dot pinned right — hairline-
 * bordered for a packed day plan. The opposite of v2's timeline card. Status is
 * dot + text, never color alone. Same props, token-only.
 */
export declare const ItineraryItemV3: React.ForwardRefExoticComponent<ItineraryItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ItineraryItemV3.d.ts.map