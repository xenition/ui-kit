import * as React from 'react';
export type TrialBannerTone = 'info' | 'warn' | 'success';
export interface TrialBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Headline (e.g. `'7 days of Pro, on us'`). */
    title: string;
    /** Optional supporting line (e.g. `'No charge until Aug 30'`). */
    subtitle?: string;
    /** Days remaining — when set, renders a `'N days left'` chip. */
    daysLeft?: number;
    /** Tone → primary/warn/success surface. Default `'info'`. */
    tone?: TrialBannerTone;
    /** Inline action copy (e.g. `'Manage'`). Hidden without `onAction`. */
    actionLabel?: string;
    /** Fires on the inline action. */
    onAction?: () => void;
    /** Leading glyph. Default `'✨'`. */
    icon?: string;
}
/**
 * Free-trial status strip — a tinted banner that advertises an active or
 * available trial and, optionally, a countdown chip and an inline action. Sits
 * atop the paywall (value-first framing, design.md §27) or in-app once a trial
 * is running. Tone maps to the primary/warn/success token pairs. No literal
 * colors.
 */
export declare const TrialBanner: React.ForwardRefExoticComponent<TrialBannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrialBanner.d.ts.map