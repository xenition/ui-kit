import * as React from 'react';
import type { LessonRowProps } from './LessonRow';
/** Same public contract as {@link LessonRow} — a drop-in alternate design. */
export type LessonRowV3Props = LessonRowProps;
/**
 * LessonRow, redesigned (v3): a **syllabus line**. The 1-based index leads as a
 * monospace-tabular number, the status glyph and title share one line, and the
 * duration/kind hug the right — hairline-separated for a tight table of contents.
 * The opposite of v2's elevated card. Same props, token-only.
 */
export declare const LessonRowV3: React.ForwardRefExoticComponent<LessonRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LessonRowV3.d.ts.map