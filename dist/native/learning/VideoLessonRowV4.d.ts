import * as React from 'react';
import type { VideoLessonRowProps } from './VideoLessonRow';
/** V4 layout choices for the "campus" design. */
export type VideoLessonRowLayout = 'full' | 'compact';
/** Drop-in for {@link VideoLessonRowProps} — same props, the V4 "campus" design. */
export interface VideoLessonRowV4Props extends VideoLessonRowProps {
    /** V4 layout: `full` (default) or `compact` (denser single line). */
    variant?: VideoLessonRowLayout;
}
/**
 * VideoLessonRow — **V4** "campus" design (native twin of the web V4). An
 * elevated rounded row with a soft shadow, a thumbnail with a play / watched
 * overlay, the title, a section · duration meta line, an optional watch-progress
 * bar, and a "Now playing" pill when active (the playing state is a word + pill,
 * never color alone). Tappable when `onPlay` is set. Honors the V4 `variant` —
 * `full` (default) and `compact`. Token-only colors via `useXenitionTheme()`.
 */
export declare function VideoLessonRowV4({ title, durationLabel, thumbnail, watchProgress, playing, watched, meta, onPlay, variant, style, }: VideoLessonRowV4Props): React.ReactElement;
//# sourceMappingURL=VideoLessonRowV4.d.ts.map