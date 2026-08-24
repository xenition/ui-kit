import * as React from 'react';
import type { ChoreCardProps } from './ChoreCard';
/** Same public contract as {@link ChoreCard} — a drop-in alternate design. */
export type ChoreCardV2Props = ChoreCardProps;
/**
 * ChoreCard, redesigned (v2): a **big tappable quest card**. The icon rides in a
 * large primary-tinted disc up top, the title is oversized, the reward points
 * are a hero star chip, and "Mark done" is a full-width primary button anchoring
 * the card. Elevated with a shadow that lifts on hover. Same props as
 * {@link ChoreCard}, token-only.
 */
export declare const ChoreCardV2: React.ForwardRefExoticComponent<ChoreCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChoreCardV2.d.ts.map