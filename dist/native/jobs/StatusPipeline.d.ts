import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ApplicationStage } from './types';
export type StatusPipelineVariant = 'full' | 'compact';
export interface StatusPipelineProps {
    /** The stage the application currently sits at. */
    stage: ApplicationStage;
    /** When true, the pipeline ended in rejection at `stage`. */
    rejected?: boolean;
    /**
     * `full` (default) renders the primitive `Steps` track with a labeled marker
     * per stage; `compact` renders a single stage `Badge` with an `n / total`
     * position — for dense rows.
     */
    variant?: StatusPipelineVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * Hiring-funnel progress: applied → screening → interview → offer → hired.
 * Built on the primitive `Steps`, so each stage carries a numbered/checked
 * marker AND its text label — stage is never conveyed by color alone (an
 * explicit accessibility summary states "Stage n of m: <label>", and rejection
 * is announced as text, not just a danger hue). Presentational; pass `stage`.
 */
export declare function StatusPipeline({ stage, rejected, variant, style, }: StatusPipelineProps): React.ReactElement;
//# sourceMappingURL=StatusPipeline.d.ts.map