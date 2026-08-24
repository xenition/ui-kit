import * as React from 'react';
import type { ServiceCardProps } from './ServiceCard';
/** Same public contract as {@link ServiceCard} — a drop-in alternate design. */
export type ServiceCardV2Props = ServiceCardProps;
/**
 * ServiceCard, redesigned (v2): an **elevated service card**. A tinted category
 * glyph tile leads the title and description; a channel badge and estimated time
 * follow, with a full-width Start CTA. Distinct from v1. Same props, token-only.
 */
export declare const ServiceCardV2: React.ForwardRefExoticComponent<ServiceCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceCardV2.d.ts.map