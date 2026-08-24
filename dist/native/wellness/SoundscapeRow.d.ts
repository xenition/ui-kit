import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type Soundscape = 'rain' | 'ocean' | 'forest' | 'fire' | 'wind' | 'stream' | 'thunder' | 'white-noise';
export interface SoundscapeRowProps {
    /** Which soundscape — drives the icon, label, and accent tone. */
    variant: Soundscape;
    /** Override the default display name. */
    name?: string;
    /** Whether this soundscape is playing. */
    playing?: boolean;
    /** Volume 0–1; shows a slider when `onVolumeChange` is provided. */
    volume?: number;
    /** Fires when the play toggle is tapped, with the next playing state. */
    onToggle?: (next: boolean) => void;
    /** Fires as the volume slider moves. */
    onVolumeChange?: (volume: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A soundscape mixer row: icon + name, a round play / pause toggle, and an
 * optional volume slider that appears only while playing. `playing` fills the
 * toggle and updates its a11y state + label (state, not color alone). Token-only
 * colors (semantic slots + a `withAlpha` tint).
 */
export declare function SoundscapeRow({ variant, name, playing, volume, onToggle, onVolumeChange, style, }: SoundscapeRowProps): React.ReactElement;
//# sourceMappingURL=SoundscapeRow.d.ts.map