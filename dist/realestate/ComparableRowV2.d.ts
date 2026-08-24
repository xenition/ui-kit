import * as React from 'react';
import type { ComparableRowProps } from './ComparableRow';
/** Same public contract as {@link ComparableRow} — a drop-in alternate design. */
export type ComparableRowV2Props = ComparableRowProps;
/**
 * ComparableRow, redesigned (v2): an **elevated comp card**. The address leads
 * with a status badge, the price is a hero figure, and beds·baths·sqft·$/sqft
 * render as tinted stat chips with the distance trailing. Distinct from v1's flat
 * row. Same props, token-only.
 */
export declare const ComparableRowV2: React.ForwardRefExoticComponent<ComparableRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ComparableRowV2.d.ts.map