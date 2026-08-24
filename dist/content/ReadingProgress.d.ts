import * as React from 'react';
export type ReadingProgressVariant = 'bar' | 'labeled';
export interface ReadingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * How far through the article the reader is, `0`–`1` (clamped). Typically
     * derived from a scroll offset: `offsetY / (contentHeight - viewportHeight)`.
     */
    progress: number;
    /**
     * - `bar`     — a thin token-styled progress bar (default), for pinning to
     *               the top of a reader.
     * - `labeled` — bar plus a "42%" readout.
     */
    variant?: ReadingProgressVariant;
}
/**
 * A reading-progress indicator for an article reader — the thin bar that fills
 * as the reader scrolls. Web (React DOM) mirror of the native `ReadingProgress`.
 * Composes the `Progress` primitive (0–100 scale) from a clamped `0`–`1`
 * fraction, so a scroll handler can drive it directly. A `labeled` variant adds
 * a percentage readout. All colors come from `--xen-*` token classes.
 */
export declare const ReadingProgress: React.ForwardRefExoticComponent<ReadingProgressProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReadingProgress.d.ts.map