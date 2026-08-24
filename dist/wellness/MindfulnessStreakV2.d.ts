import * as React from 'react';
import type { MindfulnessStreakProps } from './MindfulnessStreak';
/** Same public contract as {@link MindfulnessStreak} — a drop-in alternate design. */
export type MindfulnessStreakV2Props = MindfulnessStreakProps;
/**
 * MindfulnessStreak, redesigned (v2): a **big streak medallion**. A large flame +
 * count lead in a tone-tinted panel, the best streak is a secondary stat, and the
 * last-7-days render as filled/empty dots. Bolder than v1. Same props, token-only.
 */
export declare const MindfulnessStreakV2: React.ForwardRefExoticComponent<MindfulnessStreakProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MindfulnessStreakV2.d.ts.map