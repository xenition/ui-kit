import * as React from 'react';
import type { ServiceCardProps } from './ServiceCard';
/** Same public contract as {@link ServiceCard} — a drop-in alternate design. */
export type ServiceCardV3Props = ServiceCardProps;
/**
 * ServiceCard, redesigned (v3): a **dense directory line**. A category glyph, the
 * title over a category·channel·time subtitle, and a compact Start — hairline-
 * bordered for a services list. The opposite of v2's card. Same props, token-only.
 */
export declare const ServiceCardV3: React.ForwardRefExoticComponent<ServiceCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceCardV3.d.ts.map