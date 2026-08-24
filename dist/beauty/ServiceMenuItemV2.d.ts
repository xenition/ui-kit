import * as React from 'react';
import type { ServiceMenuItemProps } from './ServiceMenuItem';
/** Same public contract as {@link ServiceMenuItem} — a drop-in alternate design. */
export type ServiceMenuItemV2Props = ServiceMenuItemProps;
/**
 * ServiceMenuItem, redesigned (v2): an **elevated service card**. A category glyph
 * tile leads the name, a Popular flag, a description, and a duration; the price
 * (with prefix) sits prominent. Distinct from v1's row. Same props, token-only.
 */
export declare const ServiceMenuItemV2: React.ForwardRefExoticComponent<ServiceMenuItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceMenuItemV2.d.ts.map