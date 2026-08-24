import * as React from 'react';
import type { JobCardProps } from './JobCard';
/** Drop-in alternate: identical props to {@link JobCardProps}. */
export type JobCardV2Props = JobCardProps;
/**
 * JobCard — design V2. An elevated, shadowed card led by a big rounded company
 * logo tile, a full-width tinted salary rail, and a wrapped skill-chip shelf.
 * Same props as {@link JobCardProps} (drop-in), same token discipline: fills are
 * `withAlpha` tints of theme tokens, depth is the shared elevation scale, the
 * employment type is a `Badge` tone plus its text label. Mount enter + press
 * spring via the shared motion hooks (reduced-motion aware).
 */
export declare function JobCardV2({ job, saved, onSave, applyState, onApply, onWithdraw, applyLoading, onPress, loading, maxSkills, style, }: JobCardV2Props): React.ReactElement;
//# sourceMappingURL=JobCardV2.d.ts.map