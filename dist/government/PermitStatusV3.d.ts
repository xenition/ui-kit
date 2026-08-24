import * as React from 'react';
import type { PermitStatusProps } from './PermitStatus';
/** Same public contract as {@link PermitStatus} — a drop-in alternate design. */
export type PermitStatusV3Props = PermitStatusProps;
/**
 * PermitStatus, redesigned (v3): a **compact status line**. The current stage's
 * glyph + label (in its tone) and the permit number sit inline over a tiny
 * progress-dot strip. The opposite of v2's node stepper. Same props, token-only.
 */
export declare const PermitStatusV3: React.ForwardRefExoticComponent<PermitStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PermitStatusV3.d.ts.map