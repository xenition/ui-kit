import * as React from 'react';
import type { JobCardProps } from './JobCard';
/** Drop-in alternate: identical props to {@link JobCardProps}. */
export type JobCardV2Props = JobCardProps;
/**
 * JobCard — design V2 (web). An elevated, shadowed card led by a big rounded
 * company-logo tile, a full-width tinted salary rail, and a wrapped skill-chip
 * shelf. Same props as {@link JobCardProps} (drop-in), same token discipline:
 * fills are token tints, depth is the shared shadow scale, the employment type
 * is a `Badge` tone plus its text label. Subtle hover lift / press settle
 * (reduced-motion aware).
 */
export declare const JobCardV2: React.ForwardRefExoticComponent<JobCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JobCardV2.d.ts.map