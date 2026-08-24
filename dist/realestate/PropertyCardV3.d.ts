import * as React from 'react';
import type { PropertyCardProps } from './PropertyCard';
/** Same public contract as {@link PropertyCard} — a drop-in alternate design. */
export type PropertyCardV3Props = PropertyCardProps;
/**
 * PropertyCard, redesigned (v3): a **dense listing row**. A small thumbnail, the
 * price + address over a locality·beds·baths·sqft line, and the status badge on
 * the trailing edge — hairline-bordered for a results list. The opposite of v2's
 * hero. Same props, token-only.
 */
export declare const PropertyCardV3: React.ForwardRefExoticComponent<PropertyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PropertyCardV3.d.ts.map