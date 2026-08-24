import * as React from 'react';
import type { HotelCardProps } from './HotelCard';
/** Same public contract as {@link HotelCard} — a drop-in alternate design. */
export type HotelCardV3Props = HotelCardProps;
/**
 * HotelCard, redesigned (v3): a **dense property row**. A glyph tile, the name over
 * a location + inline rating line, and the nightly price pinned right — hairline-
 * bordered for a results list. The opposite of v2's media hero. Same props,
 * token-only.
 */
export declare const HotelCardV3: React.ForwardRefExoticComponent<HotelCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HotelCardV3.d.ts.map