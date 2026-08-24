import * as React from 'react';
import type { DestinationCardProps } from './DestinationCard';
/** Same public contract as {@link DestinationCard} — a drop-in alternate design. */
export type DestinationCardV3Props = DestinationCardProps;
/**
 * DestinationCard, redesigned (v3): a **compact destination row**. A glyph tile,
 * the name over a country·tagline line with an optional badge, and the "from"
 * price pinned right — hairline-bordered for a list. The opposite of v2's hero.
 * Same props, token-only.
 */
export declare const DestinationCardV3: React.ForwardRefExoticComponent<DestinationCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DestinationCardV3.d.ts.map