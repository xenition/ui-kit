import * as React from 'react';
/** Layout of a {@link CampaignProgress}. */
export type CampaignProgressVariant = 'bar' | 'thermometer';
export type CampaignProgressTone = 'primary' | 'success' | 'accent';
export interface CampaignProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    /** Amount raised so far, integer **cents**. */
    raisedCents: number;
    /** Fundraising goal, integer **cents**. A zero/negative goal is guarded. */
    goalCents: number;
    /** ISO 4217 currency for money formatting (default `USD`). */
    currency?: string;
    /** Optional donor count shown in the meta row. */
    donorCount?: number;
    /** Optional days-left figure shown in the meta row. */
    daysLeft?: number;
    /** `bar` (default) is a horizontal fill; `thermometer` is a vertical fill. */
    variant?: CampaignProgressVariant;
    /** Fill color slot (default `primary`). */
    tone?: CampaignProgressTone;
    /** Hide the raised/goal headline (keep only the meter). */
    hideAmounts?: boolean;
}
/**
 * Web parity of the native `CampaignProgress`: a goal-progress meter for a
 * campaign — a horizontal `bar` or a vertical `thermometer`. The fill is sized
 * to `raised/goal` with the divide-by-zero guarded (`goalPct`) and clamped to
 * [0, 100]. Progress is announced through `role="progressbar"` AND printed as a
 * percentage + raised/goal amounts, so state never rests on color alone. Money
 * is integer cents formatted via `formatMoney`. All colors come from the
 * `--xen-*` token classes — no literal colors.
 */
export declare const CampaignProgress: React.ForwardRefExoticComponent<CampaignProgressProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CampaignProgress.d.ts.map