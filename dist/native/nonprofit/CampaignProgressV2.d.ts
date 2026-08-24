import * as React from 'react';
import type { CampaignProgressProps } from './CampaignProgress';
/** Drop-in alternate of {@link CampaignProgressProps} — identical prop contract. */
export type CampaignProgressV2Props = CampaignProgressProps;
/**
 * CampaignProgress — design variant **V2**: a **thermometer with a hero total**.
 * A tall vertical column fills bottom-up to `raised/goal` (divide-by-zero guarded
 * via `goalPct`, clamped to [0,100]) beside an oversized raised amount, the goal,
 * a percent, and the donor/days meta. Progress is exposed through the
 * `progressbar` role AND printed as a percentage + amounts, so state never rests
 * on color alone. Same props as {@link CampaignProgressProps}. Token-only; money
 * is integer cents formatted through `formatMoney`.
 */
export declare function CampaignProgressV2({ raisedCents, goalCents, currency, donorCount, daysLeft, tone, hideAmounts, style, }: CampaignProgressV2Props): React.ReactElement;
//# sourceMappingURL=CampaignProgressV2.d.ts.map