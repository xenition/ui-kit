import * as React from 'react';
import type { StatusPipelineProps } from './StatusPipeline';
/** Drop-in alternate: identical props to {@link StatusPipelineProps}. */
export type StatusPipelineV2Props = StatusPipelineProps;
/**
 * StatusPipeline — design V2 (web). A big, celebratory funnel: large numbered
 * circles joined by connector rails, each with its stage word underneath.
 * Completed circles fill primary with a ✓, the current one is ringed, future
 * ones are muted. Rejection is spelled out as text (✕ glyph + danger word),
 * never color alone. `variant` is accepted for drop-in parity but the layout is
 * fixed — this file *is* the design. Token-pure.
 */
export declare const StatusPipelineV2: React.ForwardRefExoticComponent<StatusPipelineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatusPipelineV2.d.ts.map