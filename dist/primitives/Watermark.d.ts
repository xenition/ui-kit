import * as React from 'react';
export interface WatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The repeated text (e.g. `'CONFIDENTIAL'`, a username). */
    text: string;
    /** Content the watermark overlays. */
    children?: React.ReactNode;
    /** Tile repetition count. Default `24`. */
    count?: number;
}
/**
 * Watermark — tiles faint, diagonally-rotated repeating text across its
 * children as a non-interactive overlay (`pointer-events-none`). The text is
 * the `muted` token at low opacity so it stays a pure theme color; the overlay
 * never intercepts clicks. Useful for "confidential" / ownership marks over
 * documents or previews. No literal colors.
 */
export declare const Watermark: React.ForwardRefExoticComponent<WatermarkProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Watermark.d.ts.map