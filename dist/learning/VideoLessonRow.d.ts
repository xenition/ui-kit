import * as React from 'react';
export interface VideoLessonRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Lesson title. */
    title: string;
    /** Duration label, e.g. "12:30". */
    durationLabel?: string;
    /** Remote thumbnail URL. */
    thumbnail?: string;
    /** Watch progress 0–100; renders a thin progress bar when set. */
    watchProgress?: number;
    /** Whether this lesson is the one currently playing. */
    playing?: boolean;
    /** Whether the lesson is fully watched. */
    watched?: boolean;
    /** Optional section / index label, e.g. "3.2". */
    meta?: string;
    /** Fires when the row (play affordance) is clicked. */
    onPlay?: () => void;
}
/**
 * A video lesson list row: a thumbnail with a play overlay, the title, a
 * duration / meta line, an optional watch-progress bar, and playing / watched
 * indicators. Rendered as a `role="button"` element (Enter/Space activation)
 * announced with its play state. Token-only colors (`--xen-*`).
 */
export declare const VideoLessonRow: React.ForwardRefExoticComponent<VideoLessonRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VideoLessonRow.d.ts.map