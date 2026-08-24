import * as React from 'react';
import type { WorkoutCardProps } from './WorkoutCard';
/** Drop-in for {@link WorkoutCardProps} — same props, a different design. */
export type WorkoutCardV2Props = WorkoutCardProps;
/**
 * WorkoutCard — **hero** design (v2). A large discipline glyph on a tinted disc
 * anchors the card, with a soft tag chip, title, and an emphasized stat pair.
 * The primary action is a circular **start FAB** floating bottom-right;
 * completed workouts replace it with a `success` chip. Elevated surface that
 * lifts on hover. Same props as {@link WorkoutCardProps}; token-only colors.
 */
export declare const WorkoutCardV2: React.ForwardRefExoticComponent<WorkoutCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WorkoutCardV2.d.ts.map