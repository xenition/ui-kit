import * as React from 'react';
import type { PermitStatusProps } from './PermitStatus';
/** Same public contract as {@link PermitStatus} — a drop-in alternate design. */
export type PermitStatusV2Props = PermitStatusProps;
/**
 * PermitStatus, redesigned (v2): a **big node stepper**. The permit title/number
 * head a horizontal track of stage nodes (glyph + label) joined by connectors;
 * reached nodes fill primary, and a denial shows a danger end-state. Distinct from
 * v1's linear Steps. Same props, token-only.
 */
export declare const PermitStatusV2: React.ForwardRefExoticComponent<PermitStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PermitStatusV2.d.ts.map