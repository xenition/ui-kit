import * as React from 'react';
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
    className?: string;
}
/**
 * A soundscape mixer row (web parity of the native block): icon + name, a round
 * play / pause toggle rendered as a real `<button>`, and an optional volume
 * slider that appears only while playing. `playing` fills the toggle, tints the
 * card border, and updates `aria-pressed` + the label (state, not color alone).
 * Token-only colors.
 */
export declare const SoundscapeRow: React.ForwardRefExoticComponent<SoundscapeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SoundscapeRow.d.ts.map