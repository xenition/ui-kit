import * as React from 'react';
import { type SetlistSong } from './types';
export type SetlistRowVariant = 'full' | 'compact';
export interface SetlistRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onPlay'> {
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
    onClick?: (song: SetlistSong) => void;
    /** When set, shows a play button that fires with the song. */
    onPlay?: (song: SetlistSong) => void;
}
/**
 * A setlist row — one song in a performance / practice list, a UI shell only,
 * and the DOM parity of `native/music`'s `SetlistRow`. With a `song` it shows
 * position, title, artist and a key/BPM/duration meta line; with no `song` it
 * renders a dimmed empty slot (so a fixed-length setlist can show gaps).
 * `playing` lights the row via a marker + weight, not color alone. Tapping the
 * body fires `onClick`; an optional play button (a sibling, never a nested
 * button) fires `onPlay`. Meta is guarded against missing fields. Token-only.
 */
export declare const SetlistRow: React.ForwardRefExoticComponent<SetlistRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SetlistRow.d.ts.map