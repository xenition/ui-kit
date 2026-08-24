import * as React from 'react';
export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';
export interface TooltipProps {
    /** Tip content. */
    label: React.ReactNode;
    /** Retained for web prop parity; not used to anchor on native (see note). */
    side?: TooltipSide;
    children: React.ReactNode;
}
/**
 * Themed tooltip — the native mirror of the web `Tooltip`. Native has no hover,
 * so the tip is revealed by press / long-press on the trigger instead of
 * mouse-enter, and shows as a centered `Modal` bubble rather than a bubble
 * anchored to `side` (native simplification — `side` is kept for prop parity
 * only). The bubble uses the inverted `onSurface`/`surface` token pair. No
 * literal colors.
 */
export declare function Tooltip({ label, side, children }: TooltipProps): React.ReactElement;
//# sourceMappingURL=Tooltip.d.ts.map