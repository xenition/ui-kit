import * as React from 'react';
export type WaveformScrubberVariant = 'bars' | 'mirror';
export interface WaveformScrubberProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSeek' | 'onClick'> {
    /**
     * Per-bar amplitudes in `[0, 1]`. Values are clamped; an empty array renders
     * a flat rail (no bars) so an unanalyzed track still shows something seekable.
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
    /** Fires with the new fraction `[0, 1]` when the row is clicked / keyed to seek. */
    onSeek?: (fraction: number) => void;
    disabled?: boolean;
    /** Announced label (default `'Seek'`). */
    'aria-label'?: string;
}
/**
 * A token-bar waveform scrubber (web) — renders `peaks` as amplitude bars,
 * tints the played portion `primary` and the rest `border`, and seeks by click
 * (the click's x maps to a `[0, 1]` fraction) or by keyboard (←/→/↑/↓ nudge in
 * 5% steps). Exposed as an ARIA `slider` with `aria-valuenow` (a percentage).
 * Pure UI — no audio analysis or playback; feed it precomputed `peaks`.
 * Token-only — no literal hex.
 */
export declare const WaveformScrubber: React.ForwardRefExoticComponent<WaveformScrubberProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WaveformScrubber.d.ts.map