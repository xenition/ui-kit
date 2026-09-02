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
 * LessonRow — **V4** "campus" design (web parity of the native V4). An elevated
 * rounded row with a soft shadow, a status glyph tucked in a tone-tinted well
 * (glyph + tone, never color alone), an optional index, the title, a content-kind
 * · duration meta line, and a chevron affordance. `locked` rows are
 * non-interactive and announced as such; interactive rows are a keyboard-operable
 * `role="button"`. Honors the V4 `variant` — `full` (default) and `compact` (a
 * denser single line that hides the meta). All colors from `--xen-*` token
 * classes (no literals).
 */
export declare const LessonRowV4: React.ForwardRefExoticComponent<LessonRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LessonRowV4.d.ts.map