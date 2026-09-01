import * as React from 'react';
import type { CampaignProgressProps } from './CampaignProgress';
/** Drop-in for {@link CampaignProgressProps} — same props, the V4 "rally" design. */
export type CampaignProgressV4Props = CampaignProgressProps;
/**
 * CampaignProgress — **V4** "rally" design. The warm, mission-driven take on a
 * goal meter: a bold raised numeral, a thick rounded track on a soft-primary
 * well, and the percent + donor/days meta as soft chips; when the goal is met it
 * celebrates with a labelled success note (never color alone). Honors both
 * `variant`s (`bar` / `thermometer`) and every `tone`, identical props/behavior
 * to {@link CampaignProgressProps}. Announced via the `progressbar` role and
 * printed as a percentage + amounts. Token-only colors via `useXenitionTheme()`.
 */
export declare function CampaignProgressV4({ raisedCents, goalCents, currency, donorCount, daysLeft, variant, tone, hideAmounts, style, }: CampaignProgressV4Props): React.ReactElement;
//# sourceMappingURL=CampaignProgressV4.d.ts.map