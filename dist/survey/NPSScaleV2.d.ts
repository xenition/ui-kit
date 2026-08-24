import * as React from 'react';
import type { NPSScaleProps } from './NPSScale';
/** Same public contract as {@link NPSScale} — a drop-in alternate design. */
export type NPSScaleV2Props = NPSScaleProps;
/**
 * NPSScale, redesigned (v2): a **big 0–10 tile grid**. Eleven large square tiles
 * wrap into a grid; when `colorByBucket` is on, a chosen tile fills its bucket
 * tone (detractor/passive/promoter), else primary. Anchors sit beneath. Bolder
 * than v1's strip. Same props, token-only.
 */
export declare const NPSScaleV2: React.ForwardRefExoticComponent<NPSScaleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NPSScaleV2.d.ts.map