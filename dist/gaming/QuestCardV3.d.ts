import * as React from 'react';
import type { QuestCardProps } from './QuestCard';
/** Same public contract as {@link QuestCard} — a drop-in alternate design. */
export type QuestCardV3Props = QuestCardProps;
/**
 * QuestCard, redesigned (v3): a **dense quest line**. The title over a thin
 * progress bar with `progress/goal`, the reward folded in, and a compact Claim on
 * the right — hairline-bordered for a quest log. The opposite of v2's banner. Same
 * props, token-only.
 */
export declare const QuestCardV3: React.ForwardRefExoticComponent<QuestCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuestCardV3.d.ts.map