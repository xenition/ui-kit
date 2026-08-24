import * as React from 'react';
import type { ComparableRowProps } from './ComparableRow';
/** Same public contract as {@link ComparableRow} — a drop-in alternate design. */
export type ComparableRowV3Props = ComparableRowProps;
/**
 * ComparableRow, redesigned (v3): a **dense comp line**. The address over a
 * beds·baths·sqft·distance subtitle with a status dot + word, and the price pinned
 * right — hairline-bordered for a comps table. The opposite of v2's card. Status
 * is dot + word, never color alone. Same props, token-only.
 */
export declare const ComparableRowV3: React.ForwardRefExoticComponent<ComparableRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ComparableRowV3.d.ts.map