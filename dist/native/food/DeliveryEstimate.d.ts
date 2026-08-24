import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type DeliveryEstimateVariant = 'inline' | 'badge' | 'card';
export type FulfilmentMode = 'delivery' | 'pickup';
export interface DeliveryEstimateProps {
    /** Low end of the ETA window, in minutes. */
    minMinutes: number;
    /** High end of the ETA window, in minutes. When absent a single value shows. */
    maxMinutes?: number;
    /** Delivery vs. pickup — changes the glyph and default caption. */
    mode?: FulfilmentMode;
    /** Presentation (default `inline`). */
    variant?: DeliveryEstimateVariant;
    /** Caption under/next to the time (default derives from `mode`). */
    caption?: string;
    /** Loading placeholder — shows an em-dash while the ETA resolves. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A compact ETA readout — "25–35 min" with a mode glyph and caption. `variant`
 * renders it inline (glyph + text), as a token-tinted `badge` pill, or as a
 * bordered `card`. `loading` shows an em-dash placeholder. The window text is
 * built defensively so a missing `maxMinutes` collapses to a single value.
 * Token-only.
 */
export declare function DeliveryEstimate({ minMinutes, maxMinutes, mode, variant, caption, loading, style, }: DeliveryEstimateProps): React.ReactElement;
//# sourceMappingURL=DeliveryEstimate.d.ts.map