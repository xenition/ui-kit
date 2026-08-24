import * as React from 'react';
export type CompatibilityMeterVariant = 'bar' | 'ring' | 'compact';
export type CompatibilityMeterSize = 'sm' | 'md' | 'lg';
export interface CompatibilityMeterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Compatibility score 0–100. */
    score: number;
    /** Heading above the meter. */
    label?: string;
    /** Show the numeric percentage. Defaults to true. */
    showValue?: boolean;
    /** Presentation. `bar` (default), `ring` (dial), or `compact` (inline pill). */
    variant?: CompatibilityMeterVariant;
    /** Size scale (drives ring diameter / text). Defaults to `md`. */
    size?: CompatibilityMeterSize;
    /** Loading skeleton (indeterminate). */
    loading?: boolean;
}
/**
 * Compatibility score meter — the web parity of the native meter. Visualises a
 * 0–100 match score as a token-styled bar, ring dial, or compact pill. The tone
 * shifts across score bands, but the band is always spelled out in words ("Great
 * match") and the a11y label states the number, so meaning never rests on color.
 * Token classes only — no literal colors. Guarded against out-of-range / NaN input.
 */
export declare const CompatibilityMeter: React.ForwardRefExoticComponent<CompatibilityMeterProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CompatibilityMeter.d.ts.map