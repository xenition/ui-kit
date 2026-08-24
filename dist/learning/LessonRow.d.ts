import * as React from 'react';
/** Lesson lifecycle state — drives the leading indicator and interactivity. */
export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';
export interface LessonRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Lesson title. */
    title: string;
    /** Optional 1-based index shown before the title. */
    index?: number;
    /** Duration label, e.g. "12 min". */
    durationLabel?: string;
    /** Lifecycle state; `locked` disables interaction. */
    status?: LessonStatus;
    /** Content type hint, e.g. "Video", "Reading", "Quiz". */
    kind?: string;
    /** Fires on click (suppressed when `locked`). */
    onSelect?: () => void;
}
/**
 * A single lesson row for a course/module list: a status indicator (glyph +
 * semantic tone, never color alone), an optional index, title, content-kind and
 * duration meta, and a chevron affordance. `locked` rows are non-interactive and
 * announced as such. Interactive rows are a `role="button"` element with
 * Enter/Space keyboard activation. Token-only colors (`--xen-*`).
 */
export declare const LessonRow: React.ForwardRefExoticComponent<LessonRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LessonRow.d.ts.map