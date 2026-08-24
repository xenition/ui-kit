import * as React from 'react';
import type { CampaignProgressProps } from './CampaignProgress';
/** Same public contract as {@link CampaignProgress} — a drop-in alternate design. */
export type CampaignProgressV2Props = CampaignProgressProps;
/**
 * CampaignProgress, redesigned (v2): a **stat-hero meter**. The percentage is the
 * headline (large, tone-colored), with raised-of-goal beneath, a thick rounded
 * bar with quarter ticks, and donor/days meta chips. Distinct from v1's inline
 * bar/thermometer. Same props, token-only.
 */
export declare const CampaignProgressV2: React.ForwardRefExoticComponent<CampaignProgressProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CampaignProgressV2.d.ts.map