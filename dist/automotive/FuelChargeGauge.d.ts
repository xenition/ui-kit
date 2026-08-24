import * as React from 'react';
/** Energy source powering the gauge. */
export type FuelKind = 'fuel' | 'ev';
/** Presentation for a {@link FuelChargeGauge}. */
export type FuelChargeVariant = 'bar' | 'compact';
export interface FuelChargeGaugeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Charge / tank level as a percentage 0–100. */
    percent: number;
    /** Energy source. `fuel` (tank) or `ev` (battery). */
    kind?: FuelKind;
    /** Heading above the gauge. Defaults to the source name. */
    label?: string;
    /** Estimated range remaining, pre-formatted (e.g. `'142 mi'`). */
    rangeLabel?: string;
    /** Percentage at/under which the level reads as low (default 15). */
    lowThreshold?: number;
    /** Whether the EV is actively charging (adds a text-labelled state). */
    charging?: boolean;
    /** Presentation variant. */
    variant?: FuelChargeVariant;
    /** Loading skeleton (indeterminate). */
    loading?: boolean;
}
/**
 * A fuel-tank or EV-battery level gauge — draws a token-tinted meter (the
 * {@link Progress} primitive) filled to `percent`, with an estimated-range
 * readout. A low level (at/under `lowThreshold`) resolves to the `danger` tone
 * per contract, but the band is always spelled out ("Low"/"Fair"/"Good") and the
 * a11y label states the number plus a glyph, so meaning never rests on color.
 * Colors come from `--xen-*` token classes — no literal colors. Input is clamped
 * to 0–100. Web parity of the native `FuelChargeGauge`.
 */
export declare const FuelChargeGauge: React.ForwardRefExoticComponent<FuelChargeGaugeProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FuelChargeGauge.d.ts.map