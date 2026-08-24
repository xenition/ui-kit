import * as React from 'react';
import type { WorkoutCardProps } from './WorkoutCard';
/** Drop-in for {@link WorkoutCardProps} — same props, a different design. */
export type WorkoutCardV2Props = WorkoutCardProps;
/**
 * WorkoutCard — **hero** design (v2). A large discipline glyph on a tinted disc
 * anchors the card, with a tag badge, title, and an emphasized stat pair. The
 * primary action is a circular **start FAB** floating in the bottom-right;
 * completed workouts replace it with a `success` chip. Same props as
 * {@link WorkoutCardProps}; token-only colors.
 */
export declare function WorkoutCardV2({ title, variant, durationMin, calories, description, completed, startLabel, onStart, appearance, style, }: WorkoutCardV2Props): React.ReactElement;
//# sourceMappingURL=WorkoutCardV2.d.ts.map