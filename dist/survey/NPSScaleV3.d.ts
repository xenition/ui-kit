import * as React from 'react';
import type { NPSScaleProps } from './NPSScale';
/** Same public contract as {@link NPSScale} — a drop-in alternate design. */
export type NPSScaleV3Props = NPSScaleProps;
/**
 * NPSScale, redesigned (v3): a **compact number strip**. Eleven small cells in a
 * single tight row with anchors as tiny end labels; the chosen cell fills (bucket
 * tone when `colorByBucket`, else primary). The minimal counterpart to v2's grid.
 * Same props, token-only.
 */
export declare const NPSScaleV3: React.ForwardRefExoticComponent<NPSScaleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NPSScaleV3.d.ts.map