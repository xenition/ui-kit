import * as React from 'react';
/** One line of a lyric sheet. */
export interface LyricLine {
    /** Optional timestamp in **seconds** for this line (enables a synced tap-to-seek). */
    time?: number;
    /** The lyric text for this line. */
    text: string;
}
/**
 * Props for {@link LyricsView} — a scrolling lyric sheet (web). Presentational
 * shell only: it renders shaped lines and reports a tapped index; nothing tracks
 * playback or fetches lyrics.
 */
export interface LyricsViewProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The lyric lines, in order. */
    lines: readonly LyricLine[];
    /** Index of the currently-active line — emphasized in `on-surface`/bold; others muted. */
    activeIndex?: number;
    /** Fires with the tapped line's index (seek to `lines[index].time`); lines become buttons when set. */
    onLineTap?: (index: number) => void;
}
/**
 * LyricsView — the **V4 "spotlight"** lyric sheet (web). Deliberately calm: a
 * scrollable list on the plain `surface` (NOT the gradient — that's reserved for
 * the hero moments), with the `activeIndex` line emphasized in bold `on-surface`
 * / `primary` and the rest muted. When `onLineTap` is set each line becomes a
 * seek button. The active line auto-scrolls into view. All colors from `--xen-*`
 * token classes — no literal hex; dark-mode safe.
 */
export declare const LyricsView: React.ForwardRefExoticComponent<LyricsViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LyricsView.d.ts.map