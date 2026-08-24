import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type WaveformScrubberVariant = 'bars' | 'mirror';
export interface WaveformScrubberProps {
    /**
     * Per-bar amplitudes in `[0, 1]`. Values are clamped; an empty array renders
     * a flat rail (no bars) so an unanalyzed track still shows something tappable.
     */
    peaks?: number[];
    /** Played fraction in `[0, 1]` — how much of the bar row is colored. */
    progress?: number;
    /**
     * - `bars`   — bottom-anchored amplitude bars (default).
     * - `mirror` — bars mirrored around the vertical center.
     */
    variant?: WaveformScrubberVariant;
    /** Row height in px (default 40). */
    height?: number;
    /** Fires with the new fraction `[0, 1]` when the row is tapped to seek. */
    onSeek?: (fraction: number) => void;
    disabled?: boolean;
    /** Announced label (default `'Seek'`). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A token-bar waveform scrubber — renders `peaks` as amplitude bars, tints the
 * played portion `primary` and the rest `border`, and seeks by tap: the tap's x
 * position maps to a `[0, 1]` fraction reported through `onSeek`. Exposed to
 * screen readers as an `adjustable` control with a percentage value. Pure UI —
 * no audio analysis or playback here; feed it precomputed `peaks`. Token-only.
 */
export declare function WaveformScrubber({ peaks, progress, variant, height, onSeek, disabled, accessibilityLabel, style, }: WaveformScrubberProps): React.ReactElement;
//# sourceMappingURL=WaveformScrubber.d.ts.map