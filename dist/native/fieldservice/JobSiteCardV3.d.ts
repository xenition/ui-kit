import * as React from 'react';
import type { JobSiteCardProps } from './JobSiteCard';
/**
 * Alternate design (v3) of {@link JobSiteCard} — a drop-in with the **same
 * props**. The *compact row*: a small glyph, the site name over its address on
 * one line each, a status badge, and an optional trailing **Directions**
 * icon-tap. Status is a text + glyph badge (never color alone). Token-pure.
 */
export type JobSiteCardV3Props = JobSiteCardProps;
export declare function JobSiteCardV3({ name, address, status, crewCount, openOrders, distance, glyph, onNavigate, onPress, style, }: JobSiteCardV3Props): React.ReactElement;
//# sourceMappingURL=JobSiteCardV3.d.ts.map