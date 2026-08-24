import * as React from 'react';
import type { HabitRowProps } from './HabitRow';
/** Drop-in for {@link HabitRowProps} — same props, a different design. */
export type HabitRowV3Props = HabitRowProps;
/**
 * HabitRow — **minimal line** design (v3). A single quiet line: a small round
 * check on the left, the habit name, a compact row of week dots (the last
 * {@link MAX_DOTS} filled in `success`), then a `flame + count`. A left accent
 * bar switches to `success` when done; no surface fill — separation comes from
 * spacing. Tapping toggles `done`. Same props as {@link HabitRowProps};
 * token-only colors.
 */
export declare const HabitRowV3: React.ForwardRefExoticComponent<HabitRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HabitRowV3.d.ts.map