import * as React from 'react';
/** The ordered lifecycle stages of a ride. */
export type RideStage = 'requested' | 'arriving' | 'in-trip' | 'completed';
/** Presentation for a {@link RideStatusBar}. */
export type RideStatusVariant = 'stepper' | 'compact';
export interface RideStatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The current stage. */
    stage: RideStage;
    /** Contextual detail for the active stage (e.g. `'Driver 3 min away'`). */
    detail?: string;
    /** Whether the ride was cancelled (renders a distinct cancelled state). */
    cancelled?: boolean;
    /** Presentation variant. */
    variant?: RideStatusVariant;
}
/**
 * A ride lifecycle progress bar — walks `requested → arriving → in-trip →
 * completed`, marking each stage done / active / pending. Completed and active
 * stages are distinguished by a glyph (✓ / the stage icon) and a spelled-out
 * label plus an a11y label, so progress never rests on color alone. A
 * `cancelled` flag overrides with an explicit cancelled state. Colors come from
 * `--xen-*` token classes — no literal colors. The `stage` is matched against a
 * known set and falls back safely if unrecognised. Web parity of the native
 * `RideStatusBar`.
 */
export declare const RideStatusBar: React.ForwardRefExoticComponent<RideStatusBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RideStatusBar.d.ts.map