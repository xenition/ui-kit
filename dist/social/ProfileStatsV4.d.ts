import * as React from 'react';
import type { ProfileStatsProps } from './ProfileStats';
/** Drop-in for {@link ProfileStatsProps} — same props, the V4 "feed" design. */
export type ProfileStatsV4Props = ProfileStatsProps;
/**
 * ProfileStats — **V4** "feed" design (web parity of the native V4). The clean,
 * airy take on a profile stat row: big bold numerals stacked over muted labels,
 * generous 8-pt spacing, and a soft-primary tint on press for any tappable
 * column. Same props/behavior as {@link ProfileStatsProps} (values, labels,
 * per-column `onClick`, optional dividers); all colors from `--xen-*` token
 * classes (no literals). Renders bare so it drops into any header.
 */
export declare const ProfileStatsV4: React.ForwardRefExoticComponent<ProfileStatsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfileStatsV4.d.ts.map