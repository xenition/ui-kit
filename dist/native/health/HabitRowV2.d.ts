import * as React from 'react';
import type { HabitRowProps } from './HabitRow';
/** Drop-in for {@link HabitRowProps} — same props, a different design. */
export type HabitRowV2Props = HabitRowProps;
/**
 * HabitRow — **circular tile** design (v2). A grid-friendly square: a large
 * {@link ProgressRing} (full & `success` when done, an empty `border` track when
 * not) with a check in its center, the habit name beneath, and a streak flame
 * chip. The whole tile is one tap target that toggles `done`. Same props as
 * {@link HabitRowProps}; token-only colors.
 */
export declare function HabitRowV2({ name, done, streak, meta, onToggle, appearance, style, }: HabitRowV2Props): React.ReactElement;
//# sourceMappingURL=HabitRowV2.d.ts.map