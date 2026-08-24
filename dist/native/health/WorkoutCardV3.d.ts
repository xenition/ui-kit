import * as React from 'react';
import type { WorkoutCardProps } from './WorkoutCard';
/** Drop-in for {@link WorkoutCardProps} — same props, a different design. */
export type WorkoutCardV3Props = WorkoutCardProps;
/**
 * WorkoutCard — **compact row** design (v3). A tinted glyph square leads, then
 * the title with its discipline label and an inline `duration · kcal` stat
 * strip, and a trailing start chip (or a `success` check when completed). Reads
 * as one line in a list. Same props as {@link WorkoutCardProps}; token-only.
 */
export declare function WorkoutCardV3({ title, variant, durationMin, calories, description, completed, startLabel, onStart, appearance, style, }: WorkoutCardV3Props): React.ReactElement;
//# sourceMappingURL=WorkoutCardV3.d.ts.map