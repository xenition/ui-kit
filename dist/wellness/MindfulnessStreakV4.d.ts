import * as React from 'react';
import type { MindfulnessStreakProps } from './MindfulnessStreak';
export type MindfulnessStreakV4Props = MindfulnessStreakProps;
/**
 * MindfulnessStreakV4 — the "calm" restyle of {@link MindfulnessStreak}. Same
 * props, defaults, labels, a11y and behavior; the card becomes a soft gradient
 * hero: the streak count huge in near-white ink (`text-on-primary`), the unit
 * and best-streak stat in the softer ink (`text-primary-100`), and the last-7
 * week as frosted dots — practiced days fill (`bg-primary-500`) and missed days
 * read as a bordered track (state via fill + a11y label, not color alone). At
 * `count` 0 it drops the flame and shows the same encouraging prompt. The `tone`
 * prop is retained for parity; the calm ground is single-hue. Token-only colors.
 */
export declare const MindfulnessStreakV4: React.ForwardRefExoticComponent<MindfulnessStreakProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MindfulnessStreakV4.d.ts.map