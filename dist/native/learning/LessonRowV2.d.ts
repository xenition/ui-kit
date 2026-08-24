import * as React from 'react';
import type { LessonRowProps } from './LessonRow';
/** Same public contract as {@link LessonRow} — a drop-in alternate design. */
export type LessonRowV2Props = LessonRowProps;
/**
 * LessonRow, design v2 — a **timeline node** row: a large ringed circle on the
 * left carries the 1-based index (or a status glyph when there's no index),
 * tinted by the lesson's semantic status. The title and meta sit to the right
 * with no surrounding card. Same props as {@link LessonRow}. Token-only colors.
 */
export declare function LessonRowV2({ title, index, durationLabel, status, kind, onPress, style, }: LessonRowV2Props): React.ReactElement;
//# sourceMappingURL=LessonRowV2.d.ts.map