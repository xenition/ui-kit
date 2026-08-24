import * as React from 'react';
import type { MindfulnessStreakProps } from './MindfulnessStreak';
/** Same public contract as {@link MindfulnessStreak} — a drop-in alternate design. */
export type MindfulnessStreakV3Props = MindfulnessStreakProps;
/**
 * MindfulnessStreak, redesigned (v3): a **compact streak row**. A flame + count,
 * the "best" folded inline, and a tiny last-7-days dot strip on the right — all on
 * one dense line. The opposite of v2's medallion. Same props, token-only.
 */
export declare const MindfulnessStreakV3: React.ForwardRefExoticComponent<MindfulnessStreakProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MindfulnessStreakV3.d.ts.map