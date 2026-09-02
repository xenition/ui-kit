import * as React from 'react';
import type { QuizOptionProps } from './QuizOption';
/** Drop-in for {@link QuizOptionProps} — same props, the V4 "campus" design. */
export type QuizOptionV4Props = QuizOptionProps;
/**
 * QuizOption — **V4** "campus" design (web parity of the native V4). A single
 * selectable quiz answer rendered as an accessibility `radio` on an elevated
 * rounded surface. The lead marker sits in a tone-filled well and correct /
 * incorrect / selected states carry an explicit glyph (`✓` / `✕` / `●`) + spoken
 * suffix + a toned ring, so they never rely on color alone. Activates on click
 * and on Enter/Space. Identical props/behavior to {@link QuizOptionProps}. All
 * colors from `--xen-*` token classes (no literals).
 */
export declare const QuizOptionV4: React.ForwardRefExoticComponent<QuizOptionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuizOptionV4.d.ts.map