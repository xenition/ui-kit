import * as React from 'react';
import type { StatusPipelineProps } from './StatusPipeline';
/** Drop-in alternate: identical props to {@link StatusPipelineProps}. */
export type StatusPipelineV3Props = StatusPipelineProps;
/**
 * StatusPipeline — design V3 (web). A minimal, dense read-out: the current stage
 * word (with a ✓/✕ glyph so meaning survives without color) and an `n of total`
 * position on one line, above a thin segmented bar that fills to the current
 * stage. Rejection tints the filled segments danger AND is stated as the word,
 * never color alone. `variant` is accepted for parity but ignored. Token-pure.
 */
export declare const StatusPipelineV3: React.ForwardRefExoticComponent<StatusPipelineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatusPipelineV3.d.ts.map