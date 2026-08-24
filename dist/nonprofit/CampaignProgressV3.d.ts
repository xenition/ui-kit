import * as React from 'react';
import type { CampaignProgressProps } from './CampaignProgress';
/** Same public contract as {@link CampaignProgress} — a drop-in alternate design. */
export type CampaignProgressV3Props = CampaignProgressProps;
/**
 * CampaignProgress, redesigned (v3): a **minimal inline meter**. One thin bar with
 * a single caption line — "raised / goal · N%" — no headline, no ticks. For
 * embedding under a list item. The opposite of v2's stat hero. Same props,
 * token-only.
 */
export declare const CampaignProgressV3: React.ForwardRefExoticComponent<CampaignProgressProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CampaignProgressV3.d.ts.map