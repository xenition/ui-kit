import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface MapPinCardProps {
    /** Address / place name announced and shown under the pin. */
    address: string;
    /** Secondary line (neighborhood, coordinates, "0.4 mi to transit", …). */
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
 * A location preview for a listing — a STATIC, dependency-free styled
 * placeholder, NOT a live map. It intentionally imports no `react-native-maps`
 * / `MapView`, so it renders in any environment: a token-tinted frame with faux
 * grid lines standing in for tiles and a single pin marker. Wire a real map
 * behind `onPress`. Data + callback only; token-only colors; a11y-labelled.
 */
export declare function MapPinCard({ address, caption, pin, height, onPress, style, }: MapPinCardProps): React.ReactElement;
//# sourceMappingURL=MapPinCard.d.ts.map