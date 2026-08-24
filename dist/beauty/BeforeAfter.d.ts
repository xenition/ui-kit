import * as React from 'react';
export type BeforeAfterVariant = 'split' | 'toggle';
export interface BeforeAfterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** "Before" image URL. */
    beforeUrl?: string;
    /** "After" image URL. */
    afterUrl?: string;
    /**
     * Split position 0–100 (percent of width showing the "after" image). Clamped.
     * In `split` mode a step control nudges it; ignored in `toggle` mode.
     */
    position?: number;
    /** How the two images are compared. `split` overlays; `toggle` swaps. */
    variant?: BeforeAfterVariant;
    /** Fixed height of the compare area in px (default 220). */
    height?: number;
    /** Labels for the two sides. */
    beforeLabel?: string;
    afterLabel?: string;
    /** Fires with the new split position when the divider is nudged. */
    onPositionChange?: (position: number) => void;
}
/**
 * A before/after image comparison built from plain styled `div`s + `img` (no
 * gesture/slider library). `variant="split"` overlays the "after" image clipped
 * to `position`% width with a divider and −/+ nudge buttons; `variant="toggle"`
 * swaps between the two full images on click. Missing images render a
 * token-tinted placeholder. Token-only colors — dimensions come from inline
 * px/percent, never literal colors.
 */
export declare const BeforeAfter: React.ForwardRefExoticComponent<BeforeAfterProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BeforeAfter.d.ts.map