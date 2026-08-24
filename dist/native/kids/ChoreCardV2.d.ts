import * as React from 'react';
import type { ChoreCardProps } from './ChoreCard';
/** Same public contract as {@link ChoreCard} — a drop-in alternate design. */
export type ChoreCardV2Props = ChoreCardProps;
/**
 * ChoreCard, redesigned (v2): a **big tappable quest card**. A large rounded
 * icon tile leads, the title is set large, and the reward points sit in a
 * prominent star badge up top. A full-width "Mark done" CTA anchors the card so
 * the primary action is unmissable. Lifted with a shadow and a press-scale
 * spring. Distinct from v1's compact row + small inline button. Same props.
 */
export declare function ChoreCardV2({ title, assignee, points, due, icon, status, loading, onComplete, onPress, style, }: ChoreCardV2Props): React.ReactElement;
//# sourceMappingURL=ChoreCardV2.d.ts.map