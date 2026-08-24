import * as React from 'react';
import type { StatusPipelineProps } from './StatusPipeline';
/** Drop-in alternate: identical props to {@link StatusPipelineProps}. */
export type StatusPipelineV3Props = StatusPipelineProps;
/**
 * StatusPipeline — design V3. A minimal, dense read-out: the current stage
 * word (with a ✓/✕ glyph so meaning survives without color) and an `n / total`
 * position on one line, above a thin segmented bar that fills to the current
 * stage. Rejection tints the filled segments danger AND is stated as the word,
 * never color alone. `variant` is accepted for parity but ignored. Token-pure.
 */
export declare function StatusPipelineV3({ stage, rejected, style, }: StatusPipelineV3Props): React.ReactElement;
//# sourceMappingURL=StatusPipelineV3.d.ts.map