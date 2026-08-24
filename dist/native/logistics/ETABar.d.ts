import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ETAStatus = 'on-time' | 'ahead' | 'delayed' | 'arrived';
export interface ETABarProps {
    /** Journey completion, 0–100 (clamped, NaN-safe). */
    progress?: number;
    /** ETA punctuality — carried by glyph + word, never color alone. */
    status?: ETAStatus;
    /** Human ETA text (e.g. `12:40 PM`, `~25 min`). */
    eta?: string;
    /** Origin label, shown at the left end. */
    origin?: string;
    /** Destination label, shown at the right end. */
    destination?: string;
    /** Render a muted, indeterminate placeholder while the ETA is unknown. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A horizontal journey/ETA progress bar for a shipment or vehicle: a token
 * fill sized to `progress`, with an origin→destination label row and a
 * glyph + word punctuality status. Exposes an `adjustable`-free `progressbar`
 * role with `accessibilityValue` so the completion is announced, not inferred
 * from the fill color. No literal colors — the fill and track come from theme
 * tokens.
 */
export declare function ETABar({ progress, status, eta, origin, destination, loading, style, }: ETABarProps): React.ReactElement;
//# sourceMappingURL=ETABar.d.ts.map