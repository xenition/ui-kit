import * as React from 'react';
import type { MeditationSessionCardProps } from './MeditationSessionCard';
/** Drop-in for {@link MeditationSessionCardProps} — same props, a different design. */
export type MeditationSessionCardV2Props = MeditationSessionCardProps;
/**
 * MeditationSessionCard — **full-bleed hero** design (v2). A tall calm cover: a
 * dark neutral base washed with the category accent and a bottom scrim, a
 * category tag pinned top-left (lock top-right), one big centered play control,
 * and the title + a duration/level/teacher meta strip + a resume bar stacked
 * over the scrim. `locked` swaps the play for a lock and an unlock note;
 * `loading` renders a skeleton. Same props as {@link MeditationSessionCardProps};
 * token-only colors (semantic slots, fixed neutral-ramp ink, `withAlpha` tints).
 */
export declare function MeditationSessionCardV2({ title, category, durationMin, level, instructor, description, progress, locked, loading, startLabel, onStart, style, }: MeditationSessionCardV2Props): React.ReactElement;
//# sourceMappingURL=MeditationSessionCardV2.d.ts.map