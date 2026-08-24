import * as React from 'react';
/** One tracked step/module in the course path. */
export interface ProgressStep {
    /** Stable id / key. */
    id: string;
    /** Step label, e.g. module title. */
    label: string;
    /** Whether the learner has completed it. */
    completed?: boolean;
}
/** Layout: a horizontal bar summary or a circular ring. */
export type ProgressTrackerVariant = 'bar' | 'ring';
export interface ProgressTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Ordered steps; completion is derived from `step.completed`. */
    steps: ProgressStep[];
    /** Visual style. */
    variant?: ProgressTrackerVariant;
    /** Heading label (default "Your progress"). */
    title?: string;
    /** Copy shown when `steps` is empty. */
    emptyLabel?: string;
    /** Show the per-step checklist under the summary. */
    showList?: boolean;
}
/**
 * Course-completion tracker: a percentage summary (bar or ring) over a set of
 * steps, with an optional per-step checklist. Completion is counted from each
 * `step.completed` flag and guarded against an empty list, which renders a muted
 * empty state instead. Token-only colors (`--xen-*`).
 */
export declare const ProgressTracker: React.ForwardRefExoticComponent<ProgressTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProgressTracker.d.ts.map