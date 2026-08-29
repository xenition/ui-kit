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
 *
 * This component predates the `gradient.brand` token, and it showed. Its stops
 * were hand-picked ramp steps starting at `300` — a pale tint of the brand,
 * used as **text**, on a light page. Nothing had measured it, and nothing
 * could: `300` is two steps from the surface, so the default recipe was an
 * unreadable headline word in every light-mode app that used it.
 *
 * The sweep is now the brand pair the compiler already owns — primary into
 * accent, the same two hues as `gradient.brand` — taken in the **contrast-safe
 * text form** of each. `--xen-primary-text` is `primary` walked in lightness
 * until it clears AA on `surface`, which is precisely the correction
 * `gradientInk` performs; doing it in the compiler rather than in the component
 * is what keeps this file free of hex, which the marketing token-purity sweep
 * requires. Single-ramp recipes fade that text slot toward `on-surface`, so
 * both of their stops are compiler-guaranteed against the page too.
 *
 * Purely token-coloured, so it restyles from the theme seed alone and reads on
 * light and dark surfaces. No motion, so nothing to reduce.
 *
 * ```tsx
 * <h1>Launch <GradientText>faster</GradientText></h1>
 * ```
 */
export declare const GradientText: React.ForwardRefExoticComponent<GradientTextProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=GradientText.d.ts.map