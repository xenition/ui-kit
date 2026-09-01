import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AudioPlayerVariant = 'bar' | 'full';
export interface AudioPlayerProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * AudioPlayer — a frosted "glass" transport for a meditation/soundscape track.
 * A `GlassPanel` ground (the kit's translucent surface) carries a gradient cover
 * tile, the title/teacher, a progress track, and a gradient play/pause button.
 * `variant='full'` expands to a large cover with skip controls. Only the cover
 * and the play button are colored — everything else stays calm on the glass;
 * every color is a token, adapts light + dark, and restyles from the seed.
 */
export declare function AudioPlayer({ title, subtitle, coverGlyph, isPlaying, position, duration, variant, onPlayPause, onSkipBack, onSkipForward, style, }: AudioPlayerProps): React.ReactElement;
//# sourceMappingURL=AudioPlayer.d.ts.map