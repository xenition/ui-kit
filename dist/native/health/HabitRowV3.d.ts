import * as React from 'react';
import type { HabitRowProps } from './HabitRow';
/** Drop-in for {@link HabitRowProps} — same props, a different design. */
export type HabitRowV3Props = HabitRowProps;
/**
 * HabitRow — **minimal line** design (v3). A single quiet line: a small round
 * check on the left, the habit name, then a `flame + count` and a compact row
 * of week dots (the last {@link MAX_DOTS} filled in `success`). No surface fill
 * by default — separation comes from spacing. Tapping toggles `done`. Same props
 * as {@link HabitRowProps}; token-only colors.
 */
export declare function HabitRowV3({ name, done, streak, meta, onToggle, appearance, style, }: HabitRowV3Props): React.ReactElement;
//# sourceMappingURL=HabitRowV3.d.ts.map