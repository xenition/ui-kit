import * as React from 'react';
import type { LessonRowProps } from './LessonRow';
/** V4 layout choices for the "campus" design. */
export type LessonRowLayout = 'full' | 'compact';
/** Drop-in for {@link LessonRowProps} — same props, the V4 "campus" design. */
export interface LessonRowV4Props extends LessonRowProps {
    /** V4 layout: `full` (default) or `compact` (denser single line). */
    variant?: LessonRowLayout;
}
/**
 * LessonRow — **V4** "campus" design (native twin of the web V4). An elevated
 * rounded row with a soft shadow, a status glyph in a tone-tinted well (glyph +
 * tone, never color alone), an optional index, the title, a content-kind ·
 * duration meta line, and a chevron. `locked` rows are non-interactive; others
 * are a tappable `role="button"`. Honors the V4 `variant` — `full` (default) and
 * `compact` (a denser single line). Token-only colors via `useXenitionTheme()`.
 */
export declare function LessonRowV4({ title, index, durationLabel, status, kind, onPress, variant, style, }: LessonRowV4Props): React.ReactElement;
//# sourceMappingURL=LessonRowV4.d.ts.map