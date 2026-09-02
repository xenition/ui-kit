import * as React from 'react';
import type { ProgressTrackerProps } from './ProgressTracker';
/** Drop-in for {@link ProgressTrackerProps} — same props, the V4 "campus" design. */
export type ProgressTrackerV4Props = ProgressTrackerProps;
/**
 * ProgressTracker — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded card with a soft shadow holding a course-completion summary
 * (a bar or a circular ring) with a big legible **tabular-nums** percentage, and
 * an optional per-step checklist. Completion is counted from each `step.completed`
 * flag and guarded against an empty list, which renders a muted empty state.
 * Reuses the base `variant` (`bar` / `ring`). Identical props/behavior to
 * {@link ProgressTrackerProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
export declare const ProgressTrackerV4: React.ForwardRefExoticComponent<ProgressTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProgressTrackerV4.d.ts.map