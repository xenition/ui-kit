import * as React from 'react';
/** Token-ramp gradient recipes; every stop is a `--xen-*` variable. */
export type GradientTextRamp = 'primary' | 'accent' | 'primary-accent' | 'accent-primary';
export interface GradientTextProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Which theme ramp(s) feed the gradient. `primary-accent` (default) sweeps
     * from the primary ramp into the accent ramp — the classic "energy word".
     */
    ramp?: GradientTextRamp;
    /** Gradient angle in degrees (default 92 — a near-horizontal sweep). */
    angle?: number;
    /** Rendered element (default `span`, inline inside headings). */
    as?: 'span' | 'strong' | 'em' | 'b';
}
/**
 * Ramp-driven clipped gradient text — the highlighted word inside a headline.
 * Purely token-colored (the four recipes are fixed blends of the primary and
 * accent ramps), so it reads correctly over light and dark surfaces and
 * restyles from the theme seed alone. No motion, so nothing to reduce.
 *
 * ```tsx
 * <h1>Launch <GradientText>faster</GradientText></h1>
 * ```
 */
export declare const GradientText: React.ForwardRefExoticComponent<GradientTextProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=GradientText.d.ts.map