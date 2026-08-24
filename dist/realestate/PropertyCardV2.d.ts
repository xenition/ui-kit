import * as React from 'react';
import type { PropertyCardProps } from './PropertyCard';
/** Same public contract as {@link PropertyCard} — a drop-in alternate design. */
export type PropertyCardV2Props = PropertyCardProps;
/**
 * PropertyCard, redesigned (v2): a **full-bleed listing hero**. The photo fills
 * the card; the status chip floats top-left and the price + address + beds·baths·
 * sqft sit on a gradient scrim at the bottom. Elevated, hover-lift. Same props as
 * {@link PropertyCard}, token-only.
 */
export declare const PropertyCardV2: React.ForwardRefExoticComponent<PropertyCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PropertyCardV2.d.ts.map