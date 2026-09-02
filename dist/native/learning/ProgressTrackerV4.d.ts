import * as React from 'react';
import type { ProgressTrackerProps } from './ProgressTracker';
/** Drop-in for {@link ProgressTrackerProps} — same props, the V4 "campus" design. */
export type ProgressTrackerV4Props = ProgressTrackerProps;
/**
 * ProgressTracker — **V4** "campus" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow holding a course-completion summary (a
 * bar or a circular ring) with a big legible **tabular-nums** percentage, and an
 * optional per-step checklist. Guards an empty list with a muted empty state.
 * Reuses the base `variant` (`bar` / `ring`). Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function ProgressTrackerV4({ steps, variant, title, emptyLabel, showList, style }: ProgressTrackerV4Props): React.ReactElement;
//# sourceMappingURL=ProgressTrackerV4.d.ts.map