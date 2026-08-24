import * as React from 'react';
import type { MindfulnessStreakProps } from './MindfulnessStreak';
/** Drop-in for {@link MindfulnessStreakProps} — same props, a different design. */
export type MindfulnessStreakV3Props = MindfulnessStreakProps;
/**
 * MindfulnessStreak — **compact line** design (v3). One slim row: a small flame,
 * the day count with its unit, the best streak as a muted trailing stat, and a
 * tight inline 7-dot strip on the right (practiced days fill the tone color,
 * missed days read as a muted track — state via fill + a11y, not color alone).
 * At `count` 0 it shows a seed and an encouraging prompt. Same props as
 * {@link MindfulnessStreakProps}; token-only colors.
 */
export declare function MindfulnessStreakV3({ count, best, week, tone, unit, emptyLabel, style, }: MindfulnessStreakV3Props): React.ReactElement;
//# sourceMappingURL=MindfulnessStreakV3.d.ts.map