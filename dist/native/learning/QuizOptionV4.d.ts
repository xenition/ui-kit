import * as React from 'react';
import type { QuizOptionProps } from './QuizOption';
/** Drop-in for {@link QuizOptionProps} — same props, the V4 "campus" design. */
export type QuizOptionV4Props = QuizOptionProps;
/**
 * QuizOption — **V4** "campus" design (native twin of the web V4). A single
 * selectable quiz answer rendered as an accessibility `radio` on an elevated
 * rounded surface. The lead marker sits in a tone-filled well and correct /
 * incorrect / selected states carry an explicit glyph (`✓` / `✕` / `●`) + spoken
 * suffix + a toned border, so they never rely on color alone. Token-only colors
 * via `useXenitionTheme()`.
 */
export declare function QuizOptionV4({ label, marker, state, selected, disabled, onSelect, style }: QuizOptionV4Props): React.ReactElement;
//# sourceMappingURL=QuizOptionV4.d.ts.map