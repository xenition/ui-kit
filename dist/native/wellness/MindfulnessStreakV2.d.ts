import * as React from 'react';
import type { MindfulnessStreakProps } from './MindfulnessStreak';
/** Drop-in for {@link MindfulnessStreakProps} — same props, a different design. */
export type MindfulnessStreakV2Props = MindfulnessStreakProps;
/**
 * MindfulnessStreak — **flame hero** design (v2). A big flame in a large tinted
 * disc with a huge day count beside it and the best streak underneath, crowned
 * by the last 7 days laid out as a curved dot arc (practiced days fill the tone
 * color, missed days read as a muted track — state via fill + a11y, not color
 * alone). At `count` 0 it drops the flame for a seed and an encouraging prompt.
 * Same props as {@link MindfulnessStreakProps}; token-only colors.
 */
export declare function MindfulnessStreakV2({ count, best, week, tone, unit, emptyLabel, style, }: MindfulnessStreakV2Props): React.ReactElement;
//# sourceMappingURL=MindfulnessStreakV2.d.ts.map