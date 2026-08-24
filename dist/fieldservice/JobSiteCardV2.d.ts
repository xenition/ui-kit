import * as React from 'react';
import type { JobSiteCardProps } from './JobSiteCard';
/**
 * Alternate design (v2) of {@link JobSiteCard} — a drop-in with the **same
 * props**. Where the base is a compact horizontal summary, V2 is a *banner +
 * stats card*: a tinted **site banner** (large glyph, name, address, status
 * pill), a row of **crew / open-order / distance stat tiles**, and a
 * full-width **Directions** action. Status is a text + glyph badge — never
 * color alone. No literal colors.
 */
export type JobSiteCardV2Props = JobSiteCardProps;
export declare const JobSiteCardV2: React.ForwardRefExoticComponent<JobSiteCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JobSiteCardV2.d.ts.map