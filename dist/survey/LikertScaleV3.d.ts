import * as React from 'react';
import type { LikertScaleProps } from './LikertScale';
/** Same public contract as {@link LikertScale} — a drop-in alternate design. */
export type LikertScaleV3Props = LikertScaleProps;
/**
 * LikertScale, redesigned (v3): a **compact dot strip**. Small circular points
 * pack on one line between the min/max anchors; the chosen point fills primary
 * and grows slightly. The tightest scale for a dense form. The opposite of v2's
 * big buttons. Same props, token-only.
 */
export declare const LikertScaleV3: React.ForwardRefExoticComponent<LikertScaleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LikertScaleV3.d.ts.map