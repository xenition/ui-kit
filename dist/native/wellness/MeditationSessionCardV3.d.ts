import * as React from 'react';
import type { MeditationSessionCardProps } from './MeditationSessionCard';
/** Drop-in for {@link MeditationSessionCardProps} — same props, a different design. */
export type MeditationSessionCardV3Props = MeditationSessionCardProps;
/**
 * MeditationSessionCard — **media-left row** design (v3). A compact horizontal
 * item: a square category-tinted thumbnail on the left (with a small resume dot
 * when in progress), the category label + title + a meta line in the middle, and
 * a round start/resume control on the right. `locked` shows a lock control and
 * an unlock note; `loading` renders a skeleton. Same props as
 * {@link MeditationSessionCardProps}; token-only colors.
 */
export declare function MeditationSessionCardV3({ title, category, durationMin, level, instructor, description, progress, locked, loading, startLabel, onStart, style, }: MeditationSessionCardV3Props): React.ReactElement;
//# sourceMappingURL=MeditationSessionCardV3.d.ts.map