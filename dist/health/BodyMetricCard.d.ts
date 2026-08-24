import * as React from 'react';
export type BodyMetricVariant = 'weight' | 'bmi' | 'body-fat' | 'muscle' | 'waist' | 'blood-sugar';
export interface BodyMetricCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Which body metric; drives the icon, label, and default unit. */
    variant: BodyMetricVariant;
    /** The current measurement. */
    value: React.ReactNode;
    /** Override the variant's default unit. Pass `''` to hide. */
    unit?: string;
    /** Change vs. the previous reading; positive reads success, negative danger. */
    delta?: number;
    /**
     * Invert the delta tone — for metrics where down is good (weight, body fat,
     * waist). When true a negative delta reads `success`.
     */
    lowerIsBetter?: boolean;
    /** Recent history for an inline sparkline trend. */
    trend?: number[];
    onPress?: () => void;
}
/**
 * A body-composition metric card: icon + label, the current value with unit, an
 * optional change delta, and an inline {@link Sparkline} trend. `lowerIsBetter`
 * flips the delta tone for metrics where a decrease is good. Web parity of the
 * native `BodyMetricCard`; colors trace to `--xen-*` token classes — no literals.
 * Clickable when `onPress` is set.
 */
export declare const BodyMetricCard: React.ForwardRefExoticComponent<BodyMetricCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BodyMetricCard.d.ts.map