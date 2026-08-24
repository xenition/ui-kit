import * as React from 'react';
import type { LikertScaleProps } from './LikertScale';
/** Same public contract as {@link LikertScale} — a drop-in alternate design. */
export type LikertScaleV2Props = LikertScaleProps;
/**
 * LikertScale, redesigned (v2): **big labelled buttons**. Each agreement point is
 * a large rounded numbered button that fills primary when chosen, with the min/max
 * anchors printed beneath the ends. A bolder scale than v1's dots. Same props,
 * token-only.
 */
export declare const LikertScaleV2: React.ForwardRefExoticComponent<LikertScaleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LikertScaleV2.d.ts.map