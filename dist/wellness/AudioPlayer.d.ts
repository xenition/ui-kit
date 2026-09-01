import * as React from 'react';
export type AudioPlayerVariant = 'bar' | 'full';
export interface AudioPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Track title (session name). */
    title: string;
    /** Secondary line — teacher, category, or narrator. */
    subtitle?: string;
    /** Leading glyph shown on the gradient cover. Default `'🎧'`. */
    coverGlyph?: string;
    /** Playing vs paused (controlled). */
    isPlaying?: boolean;
    /** Elapsed position, in seconds. */
    position?: number;
    /** Total duration, in seconds. */
    duration?: number;
    /** Compact `bar` (default) or the full `full` player. */
    variant?: AudioPlayerVariant;
    onPlayPause?: () => void;
    onSkipBack?: () => void;
    onSkipForward?: () => void;
    className?: string;
}
/**
 * AudioPlayer (web parity) — a frosted "glass" transport for a
 * meditation/soundscape track. A `GlassPanel` ground carries a gradient cover
 * tile, the title/teacher, a progress track (`bg-neutral-200` track with a
 * `bg-primary` fill via inline width %), and a gradient play/pause button.
 * `variant='full'` expands to a large cover with skip controls. Only the cover
 * and the play button are colored; everything else stays calm on the glass, on
 * tokens.
 */
export declare const AudioPlayer: React.ForwardRefExoticComponent<AudioPlayerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AudioPlayer.d.ts.map