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
 * VideoLessonRow — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded row with a soft shadow, a thumbnail with a play / watched
 * overlay, the title, a section · duration meta line, an optional watch-progress
 * bar, and a "Now playing" pill when active. The playing state is carried by a
 * word + pill (never color alone). Rendered as a keyboard-operable `role="button"`
 * when `onPlay` is set. Honors the V4 `variant` — `full` (default) and `compact`
 * (a denser single line that hides the meta + progress). All colors from
 * `--xen-*` token classes (no literals).
 */
export declare const VideoLessonRowV4: React.ForwardRefExoticComponent<VideoLessonRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VideoLessonRowV4.d.ts.map