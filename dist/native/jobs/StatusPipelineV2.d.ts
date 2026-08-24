import * as React from 'react';
import type { StatusPipelineProps } from './StatusPipeline';
/** Drop-in alternate: identical props to {@link StatusPipelineProps}. */
export type StatusPipelineV2Props = StatusPipelineProps;
/**
 * StatusPipeline — design V2. A big, celebratory funnel: large numbered
 * circles joined by connector rails, each with its stage word underneath.
 * Completed circles fill primary with a ✓, the current one is ringed, future
 * ones are muted. Rejection is spelled out as text (✕ glyph + `*Text` token),
 * never color alone. The `variant` prop is accepted for drop-in parity but the
 * layout is fixed — this file *is* the design. Token-pure.
 */
export declare function StatusPipelineV2({ stage, rejected, style, }: StatusPipelineV2Props): React.ReactElement;
//# sourceMappingURL=StatusPipelineV2.d.ts.map