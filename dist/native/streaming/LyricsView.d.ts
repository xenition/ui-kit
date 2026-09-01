import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One line of a lyric sheet. */
export interface LyricLine {
    /** Optional timestamp in **seconds** for this line (enables a synced tap-to-seek). */
    time?: number;
    /** The lyric text for this line. */
    text: string;
}
/**
 * Props for {@link LyricsView} — a scrolling lyric sheet (native). Presentational
 * shell only: it renders shaped lines and reports a tapped index; nothing tracks
 * playback or fetches lyrics.
 */
export interface LyricsViewProps {
    /** The lyric lines, in order. */
    lines: readonly LyricLine[];
    /** Index of the currently-active line — emphasized in `onSurface`/bold; others muted. */
    activeIndex?: number;
    /** Fires with the tapped line's index (seek to `lines[index].time`); lines become buttons when set. */
    onLineTap?: (index: number) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * LyricsView — the **V4 "spotlight"** lyric sheet (native). Deliberately calm: a
 * scrollable list on the plain surface (NOT the gradient — that's reserved for
 * the hero moments), with the `activeIndex` line emphasized in bold `primary` /
 * `onSurface` and the rest muted. When `onLineTap` is set each line becomes a
 * seek button. The active line auto-scrolls into view. Token-only colors via
 * `useXenitionTheme()` — no literals; dark-mode safe.
 */
export declare function LyricsView({ lines, activeIndex, onLineTap, style }: LyricsViewProps): React.ReactElement;
//# sourceMappingURL=LyricsView.d.ts.map