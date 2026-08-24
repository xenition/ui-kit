import * as React from 'react';
import type { JobCardProps } from './JobCard';
/** Drop-in alternate: identical props to {@link JobCardProps}. */
export type JobCardV3Props = JobCardProps;
/**
 * JobCard — design V3 (web). A minimal, borderless line item: a thin colored
 * accent rail on the left keyed to the employment type, then the title, a single
 * inline `company · location · type · posted` meta line, salary, and a tight
 * skill row. Separation comes from spacing, not a box. Same props as
 * {@link JobCardProps} (drop-in). Token-pure — the accent is a semantic fill.
 */
export declare const JobCardV3: React.ForwardRefExoticComponent<JobCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JobCardV3.d.ts.map