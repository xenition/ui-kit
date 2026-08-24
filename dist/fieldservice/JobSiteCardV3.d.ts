import * as React from 'react';
import type { JobSiteCardProps } from './JobSiteCard';
/**
 * Alternate design (v3) of {@link JobSiteCard} — a drop-in with the **same
 * props**. The *compact row*: a small glyph disc, the site name over its
 * address + collapsed meta on one line each, a status badge, and an optional
 * trailing **Directions** icon-tap. Bordered surface, no card shadow. Status is
 * a text + glyph badge — never color alone. No literal colors.
 */
export type JobSiteCardV3Props = JobSiteCardProps;
export declare const JobSiteCardV3: React.ForwardRefExoticComponent<JobSiteCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JobSiteCardV3.d.ts.map