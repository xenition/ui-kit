import * as React from 'react';
import type { WorkoutCardProps } from './WorkoutCard';
/** Drop-in for {@link WorkoutCardProps} — same props, a different design. */
export type WorkoutCardV3Props = WorkoutCardProps;
/**
 * WorkoutCard — **compact row** design (v3). A tinted glyph square leads, then
 * the title with its discipline label and an inline `duration · kcal` stat
 * strip, and a trailing soft start chip (or a `success` check when completed).
 * Borderless — reads as one line in a list. Same props as
 * {@link WorkoutCardProps}; token-only colors.
 */
export declare const WorkoutCardV3: React.ForwardRefExoticComponent<WorkoutCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WorkoutCardV3.d.ts.map