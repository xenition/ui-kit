import * as React from 'react';
import type { LessonRowProps } from './LessonRow';
/** Same public contract as {@link LessonRow} — a drop-in alternate design. */
export type LessonRowV3Props = LessonRowProps;
/**
 * LessonRow, design v3 — a **filled chip row**: a solid tinted disc holds the
 * status glyph on the left, the title stacks over quiet meta in the middle, and
 * a status {@link Badge} (glyph-free but spoken via the row a11y label) sits on
 * the right. The whole row is a rounded filled surface. Same props as
 * {@link LessonRow}. Token-only colors.
 */
export declare function LessonRowV3({ title, index, durationLabel, status, kind, onPress, style, }: LessonRowV3Props): React.ReactElement;
//# sourceMappingURL=LessonRowV3.d.ts.map