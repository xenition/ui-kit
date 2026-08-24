import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** The ordered lifecycle stages of a ride. */
export type RideStage = 'requested' | 'arriving' | 'in-trip' | 'completed';
/** Presentation for a {@link RideStatusBar}. */
export type RideStatusVariant = 'stepper' | 'compact';
export interface RideStatusBarProps {
    /** The current stage. */
    stage: RideStage;
    /** Contextual detail for the active stage (e.g. `'Driver 3 min away'`). */
    detail?: string;
    /** Whether the ride was cancelled (renders a distinct cancelled state). */
    cancelled?: boolean;
    /** Presentation variant. */
    variant?: RideStatusVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * A ride lifecycle progress bar — walks `requested → arriving → in-trip →
 * completed`, marking each stage done / active / pending. Completed and active
 * stages are distinguished by a glyph (✓ / the stage icon) and a spelled-out
 * label plus an a11y label, so progress never rests on color alone. A
 * `cancelled` flag overrides with an explicit cancelled state. Colors come from
 * semantic tokens and `withAlpha` tints — no literal colors. The `stage` is
 * matched against a known set and falls back safely if unrecognised.
 */
export declare function RideStatusBar({ stage, detail, cancelled, variant, style, }: RideStatusBarProps): React.ReactElement;
//# sourceMappingURL=RideStatusBar.d.ts.map