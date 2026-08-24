import * as React from 'react';
import type { JobSiteCardProps } from './JobSiteCard';
/**
 * Alternate design (v2) of {@link JobSiteCard} — a drop-in with the **same
 * props**. Where the original is a compact horizontal summary, V2 is a
 * *banner + stats card*: a tinted **site banner** (large glyph, name, address,
 * status pill), a row of **crew / open-order / distance stat tiles**, and a
 * full-width **Directions** action. Status is a text + glyph badge (never color
 * alone). Token-pure: semantic slots, `withAlpha` tints, and `shadow()`.
 */
export type JobSiteCardV2Props = JobSiteCardProps;
export declare function JobSiteCardV2({ name, address, status, crewCount, openOrders, distance, glyph, onNavigate, onPress, style, }: JobSiteCardV2Props): React.ReactElement;
//# sourceMappingURL=JobSiteCardV2.d.ts.map