import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type BeforeAfterVariant = 'split' | 'toggle';
export interface BeforeAfterProps {
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
    /** Fixed height of the compare area (default 220). */
    height?: number;
    /** Labels for the two sides. */
    beforeLabel?: string;
    afterLabel?: string;
    /** Fires with the new split position when the divider is nudged. */
    onPositionChange?: (position: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A before/after image comparison built from plain styled `View`s + `Image`
 * (no gesture library). `variant="split"` overlays the "after" image clipped to
 * `position`% width with a divider and −/+ nudge buttons; `variant="toggle"`
 * swaps between the two full images on tap. Missing images render a token-tinted
 * placeholder. Divider/labels use `withAlpha` tints — token-only colors.
 */
export declare function BeforeAfter({ beforeUrl, afterUrl, position, variant, height, beforeLabel, afterLabel, onPositionChange, style, }: BeforeAfterProps): React.ReactElement;
//# sourceMappingURL=BeforeAfter.d.ts.map