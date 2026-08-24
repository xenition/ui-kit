import * as React from 'react';
import type { ServiceMenuItemProps } from './ServiceMenuItem';
/** Same public contract as {@link ServiceMenuItem} — a drop-in alternate design. */
export type ServiceMenuItemV3Props = ServiceMenuItemProps;
/**
 * ServiceMenuItem, redesigned (v3): a **menu line with a dotted leader**. The glyph
 * + name sit left, a dotted rule bridges to the price on the right, and the
 * duration/description fold into a quiet subtitle — a classic price-list row. The
 * opposite of v2's card. Same props, token-only.
 */
export declare const ServiceMenuItemV3: React.ForwardRefExoticComponent<ServiceMenuItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ServiceMenuItemV3.d.ts.map