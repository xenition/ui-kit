import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface MapCardProps {
    /** Place name announced and shown under the pin. */
    label: string;
    /** Secondary address/coordinate line. */
    caption?: string;
    /**
     * Pin position as fractions of the frame, `0`–`1` (default centered). Clamped
     * so the marker never leaves the card.
     */
    pin?: {
        x: number;
        y: number;
    };
    /** Frame height in px (default 160). */
    height?: number;
    /** Fires when the card is pressed (e.g. to open the real map elsewhere). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A location preview — a STATIC, dependency-free styled placeholder, NOT a live
 * map. It draws a token-tinted frame with faux grid lines and a single pin
 * marker; there is intentionally no `react-native-maps`/`MapView` import, so it
 * renders in any environment. Wire a real map behind `onPress` when needed.
 * Token-only colors.
 */
export declare function MapCard({ label, caption, pin, height, onPress, style, }: MapCardProps): React.ReactElement;
//# sourceMappingURL=MapCard.d.ts.map