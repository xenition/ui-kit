import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SetlistSong } from './types';
export type SetlistRowVariant = 'full' | 'compact';
export interface SetlistRowProps {
    /** The song for this row; omit to render an empty / unfilled slot. */
    song?: SetlistSong;
    /** 1-based position shown at the left. */
    index?: number;
    /** Whether this song is currently playing (lit + non-color affordance). */
    playing?: boolean;
    /**
     * - `full` — title, artist, and a key/BPM/duration meta row (default).
     * - `compact` — single line.
     */
    variant?: SetlistRowVariant;
    /** Label for an empty slot (no song). */
    emptyLabel?: string;
    /** Fires with the song when the row is tapped. */
    onPress?: (song: SetlistSong) => void;
    /** When set, shows a play button that fires with the song. */
    onPlay?: (song: SetlistSong) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A setlist row — one song in a performance / practice list, a UI shell only.
 * With a `song` it shows position, title, artist and a key/BPM/duration meta
 * line; with no `song` it renders a dimmed empty slot (so a fixed-length
 * setlist can show gaps). `playing` lights the row via a marker + weight, not
 * color alone. Tapping fires `onPress`; the optional play button fires
 * `onPlay`. Meta is guarded against missing fields. Token-only styling.
 */
export declare function SetlistRow({ song, index, playing, variant, emptyLabel, onPress, onPlay, style, }: SetlistRowProps): React.ReactElement;
//# sourceMappingURL=SetlistRow.d.ts.map