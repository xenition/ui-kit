import * as React from 'react';
import type { HabitRowProps } from './HabitRow';
/** Drop-in for {@link HabitRowProps} — same props, a different design. */
export type HabitRowV2Props = HabitRowProps;
/**
 * HabitRow — **circular tile** design (v2). A grid-friendly square: a large
 * ring (full & `success` when done, an empty `border` track when not) with a
 * check in its center, the habit name beneath, and a streak flame chip. The
 * whole tile is one tap target that toggles `done`. Elevated surface that lifts
 * on hover. Same props as {@link HabitRowProps}; token-only colors.
 */
export declare const HabitRowV2: React.ForwardRefExoticComponent<HabitRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HabitRowV2.d.ts.map