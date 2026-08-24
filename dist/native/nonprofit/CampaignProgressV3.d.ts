import * as React from 'react';
import type { CampaignProgressProps } from './CampaignProgress';
/** Drop-in alternate of {@link CampaignProgressProps} — identical prop contract. */
export type CampaignProgressV3Props = CampaignProgressProps;
/**
 * CampaignProgress — design variant **V3**: a **slim inline bar**. A single hair
 * bar with the percent sitting on its right and the raised/goal (or meta) tucked
 * underneath — the lightest possible meter, sized to `raised/goal` with the
 * divide-by-zero guarded via `goalPct`. Progress is exposed through the
 * `progressbar` role AND printed as a percentage, so state never rests on color
 * alone. Same props as {@link CampaignProgressProps}. Token-only; money is
 * integer cents formatted through `formatMoney`.
 */
export declare function CampaignProgressV3({ raisedCents, goalCents, currency, donorCount, daysLeft, tone, hideAmounts, style, }: CampaignProgressV3Props): React.ReactElement;
//# sourceMappingURL=CampaignProgressV3.d.ts.map