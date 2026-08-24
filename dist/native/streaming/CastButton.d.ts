import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type CastButtonVariant = 'icon' | 'labeled';
export type CastButtonSize = 'sm' | 'md' | 'lg';
export interface CastButtonProps {
    /** Whether a cast/AirPlay target is currently connected (controlled). */
    connected?: boolean;
    /** Name of the connected device, shown in the `labeled` variant. */
    deviceName?: string;
    /**
     * - `icon`    — a single tappable cast glyph (default).
     * - `labeled` — glyph + "Cast" / device-name text.
     */
    variant?: CastButtonVariant;
    size?: CastButtonSize;
    /** Fires when the button is tapped (open the device picker / disconnect). */
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A cast / AirPlay toggle — a UI shell that reports taps via `onPress` and
 * reflects the current `connected` state in its color and accessible label
 * ("Cast to a device" vs. "Casting to <device>. Disconnect"). No native cast
 * dependency; wire an app's cast framework to `onPress`. Token-only: the active
 * (connected) tint is `primary`, idle is `onSurface`.
 */
export declare function CastButton({ connected, deviceName, variant, size, onPress, disabled, style, }: CastButtonProps): React.ReactElement;
//# sourceMappingURL=CastButton.d.ts.map